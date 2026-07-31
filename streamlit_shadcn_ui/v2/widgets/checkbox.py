from __future__ import annotations

from typing import Callable, Optional, Union

from .._component import mount, noop_callback
from .._protocol import (
    PROTOCOL_VERSION,
    metadata_cell,
    prepare_state,
    validate_envelope,
    validate_text,
)


def checkbox(
    label: str,
    *,
    key: str,
    default_checked: bool = False,
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> bool:
    """Render a persistent shadcn Base UI Checkbox."""

    label = validate_text(label, "label")
    state = prepare_state(
        key=key,
        kind="checkbox",
        default_value=bool(default_checked),
        is_valid_value=lambda candidate: isinstance(candidate, bool),
    )
    envelope = validate_envelope(
        {
            "protocolVersion": PROTOCOL_VERSION,
            "kind": "checkbox",
            "state": state,
            "props": {
                "disabled": bool(disabled),
                "label": label,
            },
        }
    )
    mount(
        key=key,
        data=envelope,
        default={
            "meta": metadata_cell("checkbox"),
            "state": state,
        },
        width=width,
        callbacks={"on_state_change": on_change or noop_callback},
    )
    return bool(state["value"])
