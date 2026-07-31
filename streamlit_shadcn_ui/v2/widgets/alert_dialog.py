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


def _prepare_request(entry: dict, show: bool) -> tuple:
    open_request_id = int(entry.get("open_request_id", 0))
    resolved_request_id = int(entry.get("resolved_request_id", 0))
    previously_showing = bool(entry.get("show_active", False))

    if show and not previously_showing:
        open_request_id += 1
    if not show:
        resolved_request_id = open_request_id

    entry["open_request_id"] = open_request_id
    entry["resolved_request_id"] = resolved_request_id
    entry["show_active"] = show
    return open_request_id, resolved_request_id


def alert_dialog(
    show: bool,
    title: str,
    description: str,
    confirm_label: Optional[str] = None,
    cancel_label: Optional[str] = None,
    *,
    key: str,
    on_decision: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> Optional[bool]:
    """Render a modal shadcn Base UI confirmation dialog."""

    fail_if_trigger_in_form("alert_dialog")
    entry = register_kind(key, "alert_dialog")
    normalized_show = bool(show)
    request_id, resolved_id = _prepare_request(entry, normalized_show)
    title = validate_text(title, "title")
    description = validate_text(description, "description")
    confirm_text = validate_text(
        "Confirm" if confirm_label is None else confirm_label,
        "confirm_label",
    )
    cancel_text = validate_text(
        "Cancel" if cancel_label is None else cancel_label,
        "cancel_label",
    )

    envelope = validate_envelope(
        {
            "protocolVersion": PROTOCOL_VERSION,
            "kind": "alert_dialog",
            "props": {
                "show": normalized_show,
                "openRequestId": request_id,
                "resolvedRequestId": resolved_id,
                "title": title,
                "description": description,
                "confirmLabel": confirm_text,
                "cancelLabel": cancel_text,
            },
        }
    )
    result = mount(
        key=key,
        data=envelope,
        default={"meta": metadata_cell("alert_dialog")},
        width=width,
        callbacks={
            "on_decision_change": on_decision or noop_callback,
        },
    )
    decision = get_result_value(result, "decision")
    if not isinstance(decision, bool):
        return None

    entry["resolved_request_id"] = request_id
    return decision
