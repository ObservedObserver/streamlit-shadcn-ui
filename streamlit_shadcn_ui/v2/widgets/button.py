from __future__ import annotations

from typing import Callable, Optional, Union

from .._component import get_result_value, noop_callback
from .._protocol import (
    validate_text,
)
from .._streamlit_compat import fail_if_trigger_in_form
from ._common import boolean, enum_value, mount_trigger

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


def button(
    label: str,
    *,
    key: Optional[str] = None,
    variant: str = "default",
    size: str = "default",
    disabled: bool = False,
    on_click: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> bool:
    """Render a transient shadcn Base UI Button trigger."""

    fail_if_trigger_in_form("button")
    label = validate_text(label, "label")
    variant = enum_value(variant, _BUTTON_VARIANTS, "variant")
    size = enum_value(size, _BUTTON_SIZES, "size")
    result = mount_trigger(
        key=key,
        kind="button",
        props={
            "disabled": boolean(disabled, "disabled"),
            "text": label,
            "variant": variant,
            "size": size,
            "stretch": width == "stretch",
        },
        width=width,
        callbacks={"on_click_change": on_click or noop_callback},
    )
    return bool(get_result_value(result, "click", False))
