from __future__ import annotations

from typing import Any, Callable, Iterable, List, Mapping, Optional, Union

from .._protocol import validate_collection_size, validate_text
from ._common import mount_stateful


def accordion(
    data: Iterable[Mapping[str, Any]],
    *,
    key: str,
    default_values: Optional[Iterable[str]] = None,
    multiple: bool = False,
    disabled: bool = False,
    label: str = "Accordion",
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> List[str]:
    """Render a controlled shadcn Accordion."""

    label = validate_text(label, "label")
    items = []
    values = set()
    for index, raw_item in enumerate(data):
        if not isinstance(raw_item, Mapping):
            raise TypeError("Accordion items must be mappings.")
        item_label = validate_text(
            str(raw_item.get("label", raw_item.get("trigger", ""))),
            "accordion item label",
        )
        content = validate_text(
            str(raw_item.get("content", "")),
            "accordion item content",
        )
        value = validate_text(
            str(raw_item.get("value", index)),
            "accordion item value",
        )
        item_disabled = raw_item.get("disabled", False)
        if not isinstance(item_disabled, bool):
            raise TypeError("Accordion disabled flags must be booleans.")
        if value in values:
            raise ValueError("Accordion item values must be unique.")
        values.add(value)
        items.append(
            {
                "label": item_label,
                "content": content,
                "value": value,
                "disabled": item_disabled,
            }
        )
    validate_collection_size(items, "accordion items")

    initial_values = [
        validate_text(str(value), "default_values")
        for value in (default_values or [])
    ]
    if len(initial_values) != len(set(initial_values)):
        raise ValueError("default_values must be unique.")
    if any(value not in values for value in initial_values):
        raise ValueError("default_values must reference accordion items.")
    if not multiple and len(initial_values) > 1:
        raise ValueError(
            "A single Accordion accepts at most one default value."
        )

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
            "disabled": bool(disabled),
            "multiple": bool(multiple),
            "items": items,
        },
        width=width,
        on_change=on_change,
    )
    return list(value)
