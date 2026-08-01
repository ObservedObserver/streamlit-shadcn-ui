from __future__ import annotations

from typing import Callable, Optional, Union

from .._protocol import validate_text
from ._common import boolean, enum_value, mount_stateful


def toggle(
    label: Optional[str] = None,
    value: bool = False,
    *,
    icon: Optional[str] = "bold",
    key: Optional[str] = None,
    variant: str = "default",
    size: str = "default",
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> bool:
    """Render a persistent shadcn Toggle."""

    normalized_icon = None
    if icon is not None:
        normalized_icon = enum_value(
            icon,
            {"bold", "italic", "underline"},
            "icon",
        )
    label_value = validate_text(
        label or (normalized_icon or "Toggle").replace("_", " ").title(),
        "label",
    )
    variant = enum_value(
        variant,
        {"default", "outline"},
        "variant",
    )
    size = enum_value(size, {"default", "sm", "lg"}, "size")
    value = mount_stateful(
        key=key,
        kind="toggle",
        default_value=boolean(value, "value"),
        is_valid_value=lambda candidate: isinstance(candidate, bool),
        props={
            "label": label_value,
            "icon": normalized_icon,
            "variant": variant,
            "size": size,
            "disabled": boolean(disabled, "disabled"),
        },
        width=width,
        on_change=on_change,
    )
    return bool(value)
