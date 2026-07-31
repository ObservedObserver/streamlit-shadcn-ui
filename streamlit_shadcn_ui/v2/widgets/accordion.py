from __future__ import annotations

from typing import Any, Callable, Iterable, List, Mapping, Optional, Union

from .._protocol import validate_collection_size, validate_text
from ..types import AccordionItem
from ._common import boolean, enum_value, mount_stateful


def accordion(
    items: Iterable[Union[AccordionItem, Mapping[str, Any]]],
    *,
    value: Any = None,
    selection_mode: str = "single",
    key: Optional[str] = None,
    disabled: bool = False,
    label: str = "Accordion",
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> Any:
    """Render a controlled shadcn Accordion."""

    label = validate_text(label, "label")
    normalized_items = []
    values = set()
    for index, raw_item in enumerate(items):
        if isinstance(raw_item, AccordionItem):
            raw_item = {
                "value": raw_item.value,
                "label": raw_item.label,
                "content": raw_item.content,
                "disabled": raw_item.disabled,
            }
        elif not isinstance(raw_item, Mapping):
            raise TypeError(
                "Accordion items must be AccordionItem values or mappings."
            )
        item_label = validate_text(
            str(raw_item.get("label", raw_item.get("trigger", ""))),
            "accordion item label",
        )
        content = validate_text(
            str(raw_item.get("content", "")),
            "accordion item content",
        )
        item_value = validate_text(
            str(raw_item.get("value", index)),
            "accordion item value",
        )
        item_disabled = raw_item.get("disabled", False)
        if not isinstance(item_disabled, bool):
            raise TypeError("Accordion disabled flags must be booleans.")
        if item_value in values:
            raise ValueError("Accordion item values must be unique.")
        values.add(item_value)
        normalized_items.append(
            {
                "label": item_label,
                "content": content,
                "value": item_value,
                "disabled": item_disabled,
            }
        )
    validate_collection_size(normalized_items, "accordion items")
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
            raise TypeError("value must be an iterable in multiple mode.")
        try:
            raw_initial = list(value)
        except TypeError as error:
            raise TypeError(
                "value must be an iterable in multiple mode."
            ) from error
    else:
        raw_initial = [value]
    initial_values = [
        validate_text(item, "value") for item in raw_initial
    ]
    if len(initial_values) != len(set(initial_values)):
        raise ValueError("value must not contain duplicates.")
    if any(value not in values for value in initial_values):
        raise ValueError("value must reference accordion items.")

    value = mount_stateful(
        key=key,
        kind="accordion",
        default_value=initial_values,
        is_valid_value=lambda candidate: (
            isinstance(candidate, list)
            and len(candidate) == len(set(candidate))
            and all(item in values for item in candidate)
            and (multiple or len(candidate) <= 1)
        ),
        props={
            "label": label,
            "disabled": boolean(disabled, "disabled"),
            "multiple": bool(multiple),
            "items": normalized_items,
        },
        width=width,
        on_change=on_change,
    )
    selected = list(value)
    if multiple:
        return selected
    return selected[0] if selected else None
