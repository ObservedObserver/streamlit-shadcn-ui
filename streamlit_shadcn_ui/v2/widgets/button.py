from __future__ import annotations

from typing import Callable, Optional, Union

from .._component import get_result_value, mount, noop_callback
from .._protocol import (
    PROTOCOL_VERSION,
    metadata_cell,
    register_kind,
    validate_envelope,
    validate_text,
)
from .._streamlit_compat import fail_if_trigger_in_form

_BUTTON_VARIANTS = {
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
}


def button(
    text: str,
    *,
    key: str,
    variant: str = "default",
    disabled: bool = False,
    on_click: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> bool:
    """Render a transient shadcn Base UI Button trigger."""

    fail_if_trigger_in_form("button")
    register_kind(key, "button")
    text = validate_text(text, "text")
    if variant not in _BUTTON_VARIANTS:
        raise ValueError("Unsupported V2 button variant.")

    envelope = validate_envelope(
        {
            "protocolVersion": PROTOCOL_VERSION,
            "kind": "button",
            "props": {
                "disabled": bool(disabled),
                "text": text,
                "variant": variant,
            },
        }
    )
    result = mount(
        key=key,
        data=envelope,
        default={"meta": metadata_cell("button")},
        width=width,
        callbacks={"on_click_change": on_click or noop_callback},
    )
    return bool(get_result_value(result, "click", False))
