from __future__ import annotations

from typing import Any, Callable, Iterable, List, Optional, TypeVar, Union

from .._protocol import validate_text
from ._common import (
    boolean,
    enum_value,
    mount_stateful,
    normalize_choices,
    token_for_value,
)


T = TypeVar("T")


def toggle_group(
    options: Optional[Iterable[T]] = None,
    *,
    value: Any = None,
    selection_mode: str = "multiple",
    format_func: Callable[[T], str] = str,
    key: Optional[str] = None,
    label: str = "Text formatting",
    orientation: str = "horizontal",
    variant: str = "outline",
    size: str = "default",
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> Any:
    """Render a persistent shadcn Toggle Group."""

    choices, values_by_token = normalize_choices(
        options
        if options is not None
        else ["bold", "italic", "underline"],
        format_func,
    )
    if not choices:
        raise ValueError("Toggle Group requires at least one option.")
    selection_mode = enum_value(
        selection_mode,
        {"single", "multiple"},
        "selection_mode",
    )
    multiple = selection_mode == "multiple"
    if value is None:
        raw_initial = []
    elif multiple:
        if isinstance(value, (str, bytes)):
            raise TypeError(
                "value must be an iterable of options in multiple mode."
            )
        try:
            raw_initial = list(value)
        except TypeError as error:
            raise TypeError(
                "value must be an iterable of options in multiple mode."
            ) from error
    else:
        raw_initial = [value]
    initial = [
        token_for_value(
            item,
            choices,
            values_by_token,
            "value",
        )
        for item in raw_initial
    ]
    if len(initial) != len(set(initial)):
        raise ValueError("value must not contain duplicate options.")
    label = validate_text(label, "label")
    orientation = enum_value(
        orientation,
        {"horizontal", "vertical"},
        "orientation",
    )
    variant = enum_value(
        variant,
        {"default", "outline"},
        "variant",
    )
    size = enum_value(size, {"default", "sm", "lg"}, "size")

    value = mount_stateful(
        key=key,
        kind="toggle_group",
        default_value=initial,
        is_valid_value=lambda candidate: (
            isinstance(candidate, list)
            and len(candidate) == len(set(candidate))
            and all(item in values_by_token for item in candidate)
            and (multiple or len(candidate) <= 1)
        ),
        props={
            "label": label,
            "options": choices,
            "multiple": bool(multiple),
            "orientation": orientation,
            "variant": variant,
            "size": size,
            "disabled": boolean(disabled, "disabled"),
        },
        width=width,
        on_change=on_change,
    )
    selected = [values_by_token[token] for token in value]
    if multiple:
        return selected
    return selected[0] if selected else None
