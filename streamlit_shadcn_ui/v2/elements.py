from __future__ import annotations

from dataclasses import dataclass, field
from functools import partial
import inspect
import math
import re
from typing import (
    Any,
    Callable,
    Dict,
    Generic,
    List,
    Mapping,
    Optional,
    Sequence,
    TypeVar,
    Union,
)

from ._component import (
    get_result_value,
    mount,
    noop_callback,
    private_component_key,
)
from ._protocol import (
    PROTOCOL_VERSION,
    _valid_revision,
    metadata_cell,
    prepare_elements_state,
    validate_envelope,
    validate_text,
)
from ._streamlit_compat import fail_if_trigger_in_form, require_v2_runtime
from .widgets._common import (
    boolean,
    enum_value,
    normalize_choices,
    safe_image_src,
    safe_url,
    token_for_value,
    utf16_length,
)


T = TypeVar("T")
Number = Union[int, float]
ElementCallback = Callable[..., None]

_NODE_KEY = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_.-]{0,127}$")
_GAPS = {"none", "xs", "sm", "md", "lg", "xl"}
_ALIGNMENTS = {"start", "center", "end", "stretch"}
_JUSTIFICATIONS = {"start", "center", "end", "between"}
_CARD_SIZES = {"default", "sm"}
_TEXT_VARIANTS = {"body", "muted", "label", "caption"}
_BUTTON_VARIANTS = {
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
}
_BUTTON_SIZES = {
    "default",
    "xs",
    "sm",
    "lg",
    "icon",
    "icon-xs",
    "icon-sm",
    "icon-lg",
}
_BADGE_VARIANTS = {
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
}
_MAX_NODES = 1_000
_MAX_DEPTH = 32
_MAX_NODE_ID_LENGTH = 512
_CARD_SLOTS = {"card_header", "card_content", "card_footer"}


@dataclass(frozen=True)
class ElementEvent(Generic[T]):
    """Typed payload delivered by an Elements value or action callback."""

    root_key: str
    node_id: str
    event_type: str
    value: Optional[T]
    payload: Any
    sequence: int


@dataclass
class ElementHandle(Generic[T]):
    """Value handle populated when the surrounding Elements context exits."""

    key: str
    node_id: str
    value: Optional[T] = None
    clicked: bool = False


@dataclass
class _Node:
    node_id: str
    node_type: str
    props: Dict[str, Any]
    children: List["_Node"] = field(default_factory=list)

    def serialize(self) -> Dict[str, Any]:
        return {
            "id": self.node_id,
            "type": self.node_type,
            "props": dict(self.props),
            "children": [child.serialize() for child in self.children],
        }


@dataclass
class _Frame:
    path: str
    node: Optional[_Node]
    sibling_keys: set[str] = field(default_factory=set)


@dataclass
class _StateSpec:
    kind: str
    default: Any
    validator: Callable[[Any], bool]
    decoder: Callable[[Any], Any]
    handle: ElementHandle[Any]
    on_change: Optional[ElementCallback]


class _ContainerContext:
    def __init__(self, builder: "ElementsBuilder", frame: _Frame) -> None:
        self._builder = builder
        self._frame = frame
        self._entered = False

    def __enter__(self) -> "ElementsBuilder":
        if self._entered:
            raise RuntimeError("An Elements container cannot be entered twice.")
        self._entered = True
        self._builder._push(self._frame)
        return self._builder

    def __exit__(self, exc_type, exc_value, traceback) -> bool:
        if self._entered:
            self._builder._pop(self._frame)
        return False


class ElementsBuilder:
    """Build one nested React tree and mount it as a single V2 component."""

    def __init__(self, *, key: str, width: Union[str, int] = "stretch") -> None:
        if not isinstance(key, str):
            raise TypeError("key must be a string.")
        if not key:
            raise ValueError("key must not be empty.")
        self.key = key
        self.width = width
        self._roots: List[_Node] = []
        self._frames = [_Frame(path="", node=None)]
        self._state_specs: Dict[str, _StateSpec] = {}
        self._event_handlers: Dict[tuple[str, str], ElementCallback] = {}
        self._event_handles: Dict[tuple[str, str], ElementHandle[Any]] = {}
        self._node_ids: set[str] = set()
        self._entered = False
        self._closed = False
        self.result: Any = None

    def __enter__(self) -> "ElementsBuilder":
        if self._entered or self._closed:
            raise RuntimeError("An Elements builder can only be used once.")
        self._entered = True
        return self

    def __exit__(self, exc_type, exc_value, traceback) -> bool:
        if exc_type is not None:
            self._closed = True
            return False
        if len(self._frames) != 1:
            raise RuntimeError("An Elements container was not closed.")
        self._render()
        self._closed = True
        return False

    def stack(
        self,
        *,
        key: Optional[str] = None,
        direction: str = "vertical",
        gap: str = "md",
        align: str = "stretch",
        justify: str = "start",
        wrap: bool = False,
    ) -> _ContainerContext:
        direction = enum_value(
            direction,
            {"vertical", "horizontal"},
            "direction",
        )
        return self._container(
            "stack",
            key,
            {
                "direction": direction,
                "gap": enum_value(gap, _GAPS, "gap"),
                "align": enum_value(align, _ALIGNMENTS, "align"),
                "justify": enum_value(
                    justify,
                    _JUSTIFICATIONS,
                    "justify",
                ),
                "wrap": boolean(wrap, "wrap"),
            },
        )

    def grid(
        self,
        *,
        key: Optional[str] = None,
        columns: int = 2,
        gap: str = "md",
        min_column_width: Optional[int] = None,
    ) -> _ContainerContext:
        if isinstance(columns, bool) or not isinstance(columns, int):
            raise TypeError("columns must be an integer.")
        if not 1 <= columns <= 6:
            raise ValueError("columns must be between 1 and 6.")
        if min_column_width is not None and (
            isinstance(min_column_width, bool)
            or not isinstance(min_column_width, int)
            or not 160 <= min_column_width <= 1_200
        ):
            raise ValueError(
                "min_column_width must be between 160 and 1,200 pixels."
            )
        return self._container(
            "grid",
            key,
            {
                "columns": columns,
                "gap": enum_value(gap, _GAPS, "gap"),
                "minColumnWidth": min_column_width,
            },
        )

    def card(
        self,
        *,
        key: Optional[str] = None,
        size: str = "default",
    ) -> _ContainerContext:
        return self._container(
            "card",
            key,
            {"size": enum_value(size, _CARD_SIZES, "size")},
        )

    def card_header(self, *, key: Optional[str] = None) -> _ContainerContext:
        self._require_parent("card", "card_header")
        return self._container("card_header", key, {})

    def card_content(self, *, key: Optional[str] = None) -> _ContainerContext:
        self._require_parent("card", "card_content")
        return self._container("card_content", key, {})

    def card_footer(self, *, key: Optional[str] = None) -> _ContainerContext:
        self._require_parent("card", "card_footer")
        return self._container("card_footer", key, {})

    def text(
        self,
        value: str,
        *,
        key: Optional[str] = None,
        variant: str = "body",
    ) -> None:
        self._leaf(
            "text",
            key,
            {
                "text": validate_text(value, "value"),
                "variant": enum_value(
                    variant,
                    _TEXT_VARIANTS,
                    "variant",
                ),
            },
        )

    def heading(
        self,
        value: str,
        *,
        key: Optional[str] = None,
        level: int = 3,
    ) -> None:
        if isinstance(level, bool) or level not in {2, 3, 4}:
            raise ValueError("level must be 2, 3, or 4.")
        self._leaf(
            "heading",
            key,
            {"text": validate_text(value, "value"), "level": level},
        )

    def code(
        self,
        value: str,
        *,
        key: Optional[str] = None,
        language: str = "python",
    ) -> None:
        self._leaf(
            "code",
            key,
            {
                "text": validate_text(value, "value"),
                "language": validate_text(language, "language"),
            },
        )

    def badge(
        self,
        value: str,
        *,
        key: Optional[str] = None,
        variant: str = "default",
    ) -> None:
        self._leaf(
            "badge",
            key,
            {
                "badges": [
                    {
                        "text": validate_text(value, "value"),
                        "variant": enum_value(
                            variant,
                            _BADGE_VARIANTS,
                            "variant",
                        ),
                    }
                ]
            },
        )

    def separator(
        self,
        *,
        key: Optional[str] = None,
        orientation: str = "horizontal",
    ) -> None:
        self._leaf(
            "separator",
            key,
            {
                "orientation": enum_value(
                    orientation,
                    {"horizontal", "vertical"},
                    "orientation",
                )
            },
        )

    def progress(
        self,
        value: Number,
        *,
        key: Optional[str] = None,
        label: Optional[str] = None,
        show_value: bool = False,
    ) -> None:
        if (
            isinstance(value, bool)
            or not isinstance(value, (int, float))
            or not math.isfinite(float(value))
            or not 0 <= float(value) <= 100
        ):
            raise ValueError("value must be a finite number from 0 to 100.")
        self._leaf(
            "progress",
            key,
            {
                "value": float(value),
                "label": (
                    None if label is None else validate_text(label, "label")
                ),
                "showValue": boolean(show_value, "show_value"),
            },
        )

    def image(
        self,
        src: str,
        alt: str,
        *,
        key: Optional[str] = None,
        ratio: Number = 16 / 9,
    ) -> None:
        if (
            isinstance(ratio, bool)
            or not isinstance(ratio, (int, float))
            or not math.isfinite(float(ratio))
            or not 0.1 <= float(ratio) <= 10
        ):
            raise ValueError("ratio must be between 0.1 and 10.")
        self._leaf(
            "aspect_ratio",
            key,
            {
                "src": safe_image_src(src),
                "alt": validate_text(alt, "alt"),
                "ratio": float(ratio),
            },
        )

    def link_button(
        self,
        label: str,
        url: str,
        *,
        key: Optional[str] = None,
        variant: str = "outline",
        size: str = "default",
        disabled: bool = False,
        target: str = "_blank",
    ) -> None:
        self._leaf(
            "link_button",
            key,
            {
                "text": validate_text(label, "label"),
                "url": safe_url(url),
                "variant": enum_value(
                    variant,
                    _BUTTON_VARIANTS,
                    "variant",
                ),
                "size": enum_value(size, _BUTTON_SIZES, "size"),
                "disabled": boolean(disabled, "disabled"),
                "target": enum_value(
                    target,
                    {"_blank", "_self"},
                    "target",
                ),
            },
        )

    def input(
        self,
        label: str,
        value: str = "",
        *,
        key: str,
        type: str = "text",
        placeholder: Optional[str] = None,
        disabled: bool = False,
        max_length: Optional[int] = None,
        on_change: Optional[ElementCallback] = None,
    ) -> ElementHandle[str]:
        value = validate_text(value, "value")
        if max_length is not None:
            if (
                isinstance(max_length, bool)
                or not isinstance(max_length, int)
                or not 1 <= max_length <= 16 * 1024
            ):
                raise ValueError("max_length must be between 1 and 16,384.")
            if utf16_length(value) > max_length:
                raise ValueError("value exceeds max_length.")
        return self._stateful_leaf(
            "input",
            key,
            value,
            lambda candidate: (
                isinstance(candidate, str)
                and len(candidate.encode("utf-8")) <= 16 * 1024
                and (
                    max_length is None
                    or utf16_length(candidate) <= max_length
                )
            ),
            str,
            {
                "label": validate_text(label, "label"),
                "placeholder": validate_text(
                    placeholder or "",
                    "placeholder",
                ),
                "type": enum_value(
                    type,
                    {"text", "email", "password", "search", "tel", "url"},
                    "type",
                ),
                "disabled": boolean(disabled, "disabled"),
                "maxLength": max_length,
            },
            on_change,
        )

    def textarea(
        self,
        label: str,
        value: str = "",
        *,
        key: str,
        placeholder: Optional[str] = None,
        disabled: bool = False,
        rows: int = 4,
        max_length: Optional[int] = None,
        on_change: Optional[ElementCallback] = None,
    ) -> ElementHandle[str]:
        value = validate_text(value, "value")
        if isinstance(rows, bool) or not isinstance(rows, int) or not 2 <= rows <= 20:
            raise ValueError("rows must be between 2 and 20.")
        if max_length is not None and (
            isinstance(max_length, bool)
            or not isinstance(max_length, int)
            or not 1 <= max_length <= 16 * 1024
        ):
            raise ValueError("max_length must be between 1 and 16,384.")
        return self._stateful_leaf(
            "textarea",
            key,
            value,
            lambda candidate: (
                isinstance(candidate, str)
                and len(candidate.encode("utf-8")) <= 16 * 1024
                and (
                    max_length is None
                    or utf16_length(candidate) <= max_length
                )
            ),
            str,
            {
                "label": validate_text(label, "label"),
                "placeholder": validate_text(
                    placeholder or "",
                    "placeholder",
                ),
                "disabled": boolean(disabled, "disabled"),
                "rows": rows,
                "maxLength": max_length,
            },
            on_change,
        )

    def checkbox(
        self,
        label: str,
        value: bool = False,
        *,
        key: str,
        disabled: bool = False,
        on_change: Optional[ElementCallback] = None,
    ) -> ElementHandle[bool]:
        initial = boolean(value, "value")
        return self._stateful_leaf(
            "checkbox",
            key,
            initial,
            lambda candidate: isinstance(candidate, bool),
            bool,
            {
                "label": validate_text(label, "label"),
                "disabled": boolean(disabled, "disabled"),
            },
            on_change,
        )

    def switch(
        self,
        label: str,
        value: bool = False,
        *,
        key: str,
        disabled: bool = False,
        on_change: Optional[ElementCallback] = None,
    ) -> ElementHandle[bool]:
        initial = boolean(value, "value")
        return self._stateful_leaf(
            "switch",
            key,
            initial,
            lambda candidate: isinstance(candidate, bool),
            bool,
            {
                "label": validate_text(label, "label"),
                "disabled": boolean(disabled, "disabled"),
            },
            on_change,
        )

    def slider(
        self,
        label: str,
        min_value: Number = 0,
        max_value: Number = 100,
        value: Optional[Union[Number, Sequence[Number]]] = None,
        step: Number = 1,
        *,
        key: str,
        disabled: bool = False,
        on_change: Optional[ElementCallback] = None,
    ) -> ElementHandle[Any]:
        raw_numbers = [min_value, max_value, step]
        if any(
            isinstance(item, bool) or not isinstance(item, (int, float))
            for item in raw_numbers
        ):
            raise TypeError("Slider bounds and step must be numbers.")
        minimum, maximum, step_value = [float(item) for item in raw_numbers]
        if any(not math.isfinite(item) for item in [minimum, maximum, step_value]):
            raise ValueError("Slider bounds and step must be finite.")
        if maximum <= minimum:
            raise ValueError("max_value must be greater than min_value.")
        if step_value <= 0 or step_value > maximum - minimum:
            raise ValueError("step must be positive and within the slider range.")
        is_range = value is not None and not isinstance(value, (int, float))
        if value is None:
            raw_initial: List[Number] = [min_value]
        elif isinstance(value, (int, float)) and not isinstance(value, bool):
            raw_initial = [value]
        else:
            if isinstance(value, (str, bytes)):
                raise TypeError("value must be a number or a two-item sequence.")
            raw_initial = list(value)
        if any(
            isinstance(item, bool) or not isinstance(item, (int, float))
            for item in raw_initial
        ):
            raise TypeError("value entries must be numbers.")
        initial = [float(item) for item in raw_initial]
        if len(initial) != (2 if is_range else 1):
            raise ValueError("A range value must contain exactly two values.")
        if any(item < minimum or item > maximum for item in initial):
            raise ValueError("value must be within the slider range.")
        if len(initial) == 2 and initial[0] > initial[1]:
            raise ValueError("Slider range values must be ascending.")
        preserve_int = all(
            isinstance(item, int) and not isinstance(item, bool)
            for item in [min_value, max_value, step, *raw_initial]
        )

        def decode(candidate: Any) -> Any:
            converted = (
                [int(item) for item in candidate]
                if preserve_int
                else [float(item) for item in candidate]
            )
            return tuple(converted) if is_range else converted[0]

        return self._stateful_leaf(
            "slider",
            key,
            initial,
            lambda candidate: (
                isinstance(candidate, list)
                and len(candidate) in (1, 2)
                and all(
                    isinstance(item, (int, float))
                    and not isinstance(item, bool)
                    and math.isfinite(float(item))
                    and minimum <= float(item) <= maximum
                    for item in candidate
                )
                and (
                    len(candidate) == 1
                    or float(candidate[0]) <= float(candidate[1])
                )
            ),
            decode,
            {
                "label": validate_text(label, "label"),
                "min": minimum,
                "max": maximum,
                "step": step_value,
                "disabled": boolean(disabled, "disabled"),
            },
            on_change,
        )

    def radio_group(
        self,
        label: str,
        options: Sequence[T],
        *,
        key: str,
        value: Optional[T] = None,
        index: Optional[int] = 0,
        format_func: Callable[[T], str] = str,
        disabled: bool = False,
        on_change: Optional[ElementCallback] = None,
    ) -> ElementHandle[Optional[T]]:
        choices, values_by_token = normalize_choices(options, format_func)
        if value is not None:
            initial = token_for_value(
                value,
                choices,
                values_by_token,
                "value",
            )
        elif index is None or not choices:
            initial = None
        else:
            if isinstance(index, bool) or not isinstance(index, int):
                raise TypeError("index must be an integer or None.")
            if index < 0 or index >= len(choices):
                raise IndexError("index is outside the available option range.")
            initial = choices[index]["value"]

        return self._stateful_leaf(
            "radio_group",
            key,
            initial,
            lambda candidate: candidate is None or candidate in values_by_token,
            lambda token: (
                None if token is None else values_by_token[token]
            ),
            {
                "label": validate_text(label, "label"),
                "options": choices,
                "disabled": boolean(disabled, "disabled"),
            },
            on_change,
        )

    def select(
        self,
        label: str,
        options: Sequence[T],
        *,
        key: str,
        value: Optional[T] = None,
        index: Optional[int] = 0,
        format_func: Callable[[T], str] = str,
        placeholder: str = "Select an option",
        disabled: bool = False,
        on_change: Optional[ElementCallback] = None,
    ) -> ElementHandle[Optional[T]]:
        choices, values_by_token = normalize_choices(options, format_func)
        if value is not None:
            initial = token_for_value(
                value,
                choices,
                values_by_token,
                "value",
            )
        elif index is None or not choices:
            initial = None
        else:
            if isinstance(index, bool) or not isinstance(index, int):
                raise TypeError("index must be an integer or None.")
            if index < 0 or index >= len(choices):
                raise IndexError("index is outside the available option range.")
            initial = choices[index]["value"]

        return self._stateful_leaf(
            "select",
            key,
            initial,
            lambda candidate: candidate is None or candidate in values_by_token,
            lambda token: (
                None if token is None else values_by_token[token]
            ),
            {
                "label": validate_text(label, "label"),
                "options": choices,
                "placeholder": validate_text(placeholder, "placeholder"),
                "disabled": boolean(disabled, "disabled"),
            },
            on_change,
        )

    def button(
        self,
        label: str,
        *,
        key: str,
        variant: str = "default",
        size: str = "default",
        disabled: bool = False,
        stretch: bool = False,
        on_click: Optional[ElementCallback] = None,
    ) -> ElementHandle[None]:
        node = self._leaf(
            "button",
            key,
            {
                "disabled": boolean(disabled, "disabled"),
                "text": validate_text(label, "label"),
                "variant": enum_value(
                    variant,
                    _BUTTON_VARIANTS,
                    "variant",
                ),
                "size": enum_value(size, _BUTTON_SIZES, "size"),
                "stretch": boolean(stretch, "stretch"),
            },
            require_key=True,
        )
        handle: ElementHandle[None] = ElementHandle(
            key=key,
            node_id=node.node_id,
        )
        event_key = (node.node_id, "click")
        self._event_handles[event_key] = handle
        if on_click is not None:
            self._require_callback(on_click, "on_click")
            self._event_handlers[event_key] = on_click
        return handle

    def _container(
        self,
        node_type: str,
        key: Optional[str],
        props: Mapping[str, Any],
    ) -> _ContainerContext:
        parent_path = self._frames[-1].path
        node = self._append_node(node_type, key, props)
        return _ContainerContext(
            self,
            _Frame(
                path=node.node_id if key is not None else parent_path,
                node=node,
            ),
        )

    def _leaf(
        self,
        node_type: str,
        key: Optional[str],
        props: Mapping[str, Any],
        *,
        require_key: bool = False,
    ) -> _Node:
        if require_key and key is None:
            raise ValueError(
                "%s nodes require an explicit stable key." % node_type
            )
        return self._append_node(node_type, key, props)

    def _stateful_leaf(
        self,
        kind: str,
        key: str,
        default: Any,
        validator: Callable[[Any], bool],
        decoder: Callable[[Any], Any],
        props: Mapping[str, Any],
        on_change: Optional[ElementCallback],
    ) -> ElementHandle[Any]:
        node = self._leaf(
            kind,
            key,
            props,
            require_key=True,
        )
        handle = ElementHandle(
            key=key,
            node_id=node.node_id,
            value=decoder(default),
        )
        if on_change is not None:
            self._require_callback(on_change, "on_change")
        self._state_specs[node.node_id] = _StateSpec(
            kind=kind,
            default=default,
            validator=validator,
            decoder=decoder,
            handle=handle,
            on_change=on_change,
        )
        return handle

    def _append_node(
        self,
        node_type: str,
        key: Optional[str],
        props: Mapping[str, Any],
    ) -> _Node:
        self._require_active()
        if sum(1 for _ in self._walk_nodes()) >= _MAX_NODES:
            raise ValueError("An Elements tree cannot exceed 1,000 nodes.")
        frame = self._frames[-1]
        if key is not None:
            if not isinstance(key, str):
                raise TypeError("Element keys must be strings.")
            if not _NODE_KEY.fullmatch(key):
                raise ValueError(
                    "Element keys must contain only letters, numbers, '.', "
                    "'_', or '-', and be at most 128 characters."
                )
            local_key = key
        else:
            siblings = self._roots if frame.node is None else frame.node.children
            local_key = "%s-%d" % (node_type, len(siblings))
        if local_key in frame.sibling_keys:
            raise ValueError(
                "Duplicate sibling element key %r." % local_key
            )
        frame.sibling_keys.add(local_key)
        id_base = (
            frame.path
            if key is not None or frame.node is None
            else frame.node.node_id
        )
        node_id = (
            "%s/%s" % (id_base, local_key)
            if id_base
            else local_key
        )
        if node_id in self._node_ids:
            raise ValueError("Duplicate element identity %r." % node_id)
        if len(node_id) > _MAX_NODE_ID_LENGTH:
            raise ValueError("An Elements node identity cannot exceed 512 characters.")
        if frame.node is not None and frame.node.node_type == "card":
            if node_type not in _CARD_SLOTS:
                raise RuntimeError(
                    "Direct children of card must use card_header, "
                    "card_content, or card_footer."
                )
            if any(child.node_type == node_type for child in frame.node.children):
                raise ValueError("A card cannot contain duplicate %s slots." % node_type)
        self._node_ids.add(node_id)
        if len(self._frames) > _MAX_DEPTH:
            raise ValueError("An Elements tree cannot exceed 32 levels.")
        node = _Node(
            node_id=node_id,
            node_type=node_type,
            props=dict(props),
        )
        if frame.node is None:
            self._roots.append(node)
        else:
            frame.node.children.append(node)
        return node

    def _walk_nodes(self):
        pending = list(self._roots)
        while pending:
            node = pending.pop()
            yield node
            pending.extend(node.children)

    def _push(self, frame: _Frame) -> None:
        self._require_active()
        if len(self._frames) >= _MAX_DEPTH + 1:
            raise ValueError("An Elements tree cannot exceed 32 levels.")
        self._frames.append(frame)

    def _pop(self, frame: _Frame) -> None:
        if self._frames[-1] is not frame:
            raise RuntimeError("Elements containers must close in nesting order.")
        self._frames.pop()

    def _require_active(self) -> None:
        if not self._entered or self._closed:
            raise RuntimeError(
                "Elements can only be added inside an active with block."
            )

    def _require_parent(self, parent_type: str, child_type: str) -> None:
        self._require_active()
        parent = self._frames[-1].node
        if parent is None or parent.node_type != parent_type:
            raise RuntimeError(
                "%s must be an immediate child of %s."
                % (child_type, parent_type)
            )

    @staticmethod
    def _require_callback(callback: ElementCallback, field: str) -> None:
        if not callable(callback):
            raise TypeError("%s must be callable or None." % field)

    def _render(self) -> None:
        mount_key = private_component_key(
            key=self.key,
            kind="elements",
            identity={},
        )
        node_defaults = {
            node_id: {"kind": spec.kind, "value": spec.default}
            for node_id, spec in self._state_specs.items()
        }
        state = prepare_elements_state(
            key=mount_key,
            node_defaults=node_defaults,
            validators={
                node_id: spec.validator
                for node_id, spec in self._state_specs.items()
            },
        )
        state_nodes = state["value"]["nodes"]
        for node_id, spec in self._state_specs.items():
            spec.handle.value = spec.decoder(state_nodes[node_id]["value"])

        state_handlers = {
            node_id: spec.on_change
            for node_id, spec in self._state_specs.items()
            if spec.on_change is not None
        }
        baseline_sequences = {
            node_id: int(cell["changeSequence"])
            for node_id, cell in state_nodes.items()
        }
        callbacks: Dict[str, Callable[[], None]] = {
            "on_state_change": (
                partial(
                    _dispatch_state_changes,
                    mount_key,
                    self.key,
                    baseline_sequences,
                    state_handlers,
                    {
                        node_id: spec.kind
                        for node_id, spec in self._state_specs.items()
                    },
                    {
                        node_id: spec.validator
                        for node_id, spec in self._state_specs.items()
                    },
                    {
                        node_id: spec.decoder
                        for node_id, spec in self._state_specs.items()
                    },
                )
                if state_handlers
                else noop_callback
            )
        }
        if self._event_handles:
            fail_if_trigger_in_form("elements with action nodes")
            callbacks["on_events_change"] = (
                partial(
                    _dispatch_events,
                    mount_key,
                    self.key,
                    self._event_handlers,
                )
                if self._event_handlers
                else noop_callback
            )

        envelope = validate_envelope(
            {
                "protocolVersion": PROTOCOL_VERSION,
                "kind": "elements",
                "state": state,
                "props": {
                    "nodes": [node.serialize() for node in self._roots],
                },
            }
        )
        self.result = mount(
            key=mount_key,
            data=envelope,
            default={
                "meta": metadata_cell("elements"),
                "state": state,
            },
            width=self.width,
            callbacks=callbacks,
        )
        events = get_result_value(self.result, "events", [])
        if isinstance(events, list):
            for event in events:
                if not isinstance(event, Mapping):
                    continue
                event_key = (event.get("nodeId"), event.get("type"))
                handle = self._event_handles.get(event_key)
                if handle is not None and event.get("type") == "click":
                    handle.clicked = True


def _read_persisted_state(mount_key: str) -> Optional[Mapping[str, Any]]:
    st = require_v2_runtime()
    result = st.session_state.get(mount_key)
    state = get_result_value(result, "state")
    if not isinstance(state, Mapping) or state.get("kind") != "elements":
        return None
    value = state.get("value")
    if not isinstance(value, Mapping) or not isinstance(value.get("nodes"), Mapping):
        return None
    return state


def _dispatch_state_changes(
    mount_key: str,
    root_key: str,
    baseline_sequences: Mapping[str, int],
    handlers: Mapping[str, ElementCallback],
    kinds: Mapping[str, str],
    validators: Mapping[str, Callable[[Any], bool]],
    decoders: Mapping[str, Callable[[Any], Any]],
) -> None:
    state = _read_persisted_state(mount_key)
    if state is None:
        return
    nodes = state["value"]["nodes"]
    changed: List[tuple[int, str, Any]] = []
    for node_id, callback in handlers.items():
        cell = nodes.get(node_id)
        if not isinstance(cell, Mapping):
            continue
        sequence = cell.get("changeSequence")
        if (
            cell.get("kind") == kinds[node_id]
            and _valid_revision(cell.get("clientRevision"))
            and _valid_revision(cell.get("serverRevision"))
            and _valid_revision(sequence)
            and sequence > baseline_sequences.get(node_id, sequence)
        ):
            try:
                raw_value = cell.get("value")
                if not validators[node_id](raw_value):
                    continue
                decoded = decoders[node_id](raw_value)
            except (KeyError, TypeError, ValueError, OverflowError):
                continue
            changed.append((sequence, node_id, decoded))

    for sequence, node_id, decoded in sorted(changed):
        _invoke_callback(
            handlers[node_id],
            ElementEvent(
                root_key=root_key,
                node_id=node_id,
                event_type="change",
                value=decoded,
                payload=decoded,
                sequence=sequence,
            ),
        )


def _dispatch_events(
    mount_key: str,
    root_key: str,
    handlers: Mapping[tuple[str, str], ElementCallback],
) -> None:
    st = require_v2_runtime()
    result = st.session_state.get(mount_key)
    events = get_result_value(result, "events", [])
    if not isinstance(events, list):
        return
    for event in events:
        if not isinstance(event, Mapping):
            continue
        node_id = event.get("nodeId")
        event_type = event.get("type")
        sequence = event.get("sequence")
        if (
            not isinstance(node_id, str)
            or not isinstance(event_type, str)
            or not isinstance(sequence, int)
            or isinstance(sequence, bool)
            or sequence < 0
        ):
            continue
        callback = handlers.get((node_id, event_type))
        if callback is None:
            continue
        payload = event.get("payload")
        _invoke_callback(
            callback,
            ElementEvent(
                root_key=root_key,
                node_id=node_id,
                event_type=event_type,
                value=None,
                payload=payload,
                sequence=sequence,
            ),
        )


def _invoke_callback(callback: ElementCallback, event: ElementEvent[Any]) -> None:
    try:
        signature = inspect.signature(callback)
    except (TypeError, ValueError):
        callback(event)
        return
    try:
        signature.bind(event)
    except TypeError:
        try:
            signature.bind()
        except TypeError as error:
            raise TypeError(
                "Elements callbacks must accept zero arguments or one "
                "ElementEvent argument."
            ) from error
        callback()
    else:
        callback(event)


def elements(
    *,
    key: str,
    width: Union[str, int] = "stretch",
) -> ElementsBuilder:
    """Create one nested, stateful React tree in a V2 component root."""

    return ElementsBuilder(key=key, width=width)


__all__ = [
    "ElementEvent",
    "ElementHandle",
    "ElementsBuilder",
    "elements",
]
