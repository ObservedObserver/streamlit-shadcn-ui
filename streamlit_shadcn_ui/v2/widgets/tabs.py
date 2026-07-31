from __future__ import annotations

from typing import Any, Callable, Iterable, Optional, Union

from .._protocol import validate_text
from ._common import enum_value, mount_stateful, normalize_choices


def tabs(
    options: Iterable[Any],
    default_value: Optional[str] = None,
    *,
    key: str,
    label: str = "Tabs",
    orientation: str = "horizontal",
    variant: str = "default",
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> str:
    """Render controlled shadcn Tabs that return the selected value."""

    choices = normalize_choices(options)
    if not choices:
        raise ValueError("Tabs require at least one option.")
    values = {option["value"] for option in choices}
    if default_value is None:
        default_value = choices[0]["value"]
    else:
        default_value = validate_text(
            str(default_value),
            "default_value",
        )
    if default_value not in values:
        raise ValueError("default_value is not present in options.")
    label = validate_text(label, "label")
    orientation = enum_value(
        orientation,
        {"horizontal", "vertical"},
        "orientation",
    )
    variant = enum_value(
        variant,
        {"default", "line"},
        "variant",
    )

    value = mount_stateful(
        key=key,
        kind="tabs",
        default_value=default_value,
        is_valid_value=lambda candidate: candidate in values,
        props={
            "label": label,
            "options": choices,
            "orientation": orientation,
            "variant": variant,
            "disabled": bool(disabled),
        },
        width=width,
        on_change=on_change,
    )
    return str(value)
