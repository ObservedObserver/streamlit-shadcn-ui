from __future__ import annotations

from typing import Callable, Optional, Union

from .._protocol import validate_text
from ._common import enum_value, mount_stateful


def toggle(
    default_checked: bool = False,
    icon: Optional[str] = "bold",
    *,
    key: str,
    label: Optional[str] = None,
    variant: str = "default",
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
    value = mount_stateful(
        key=key,
        kind="toggle",
        default_value=bool(default_checked),
        is_valid_value=lambda candidate: isinstance(candidate, bool),
        props={
            "label": label_value,
            "icon": normalized_icon,
            "variant": variant,
            "disabled": bool(disabled),
        },
        width=width,
        on_change=on_change,
    )
    return bool(value)
