from __future__ import annotations

from typing import Any, Callable, Iterable, List, Optional, Union

from .._component import mount, noop_callback
from .._protocol import (
    PROTOCOL_VERSION,
    metadata_cell,
    prepare_state,
    validate_collection_size,
    validate_envelope,
    validate_text,
)


def select(
    label: str,
    options: Iterable[Any],
    *,
    key: str,
    value: Optional[str] = None,
    index: Optional[int] = 0,
    placeholder: str = "Select an option",
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> Optional[str]:
    """Render a shadcn Base UI Select in a Streamlit V2 ShadowRoot."""

    label = validate_text(label, "label")
    placeholder = validate_text(placeholder, "placeholder")
    option_values = [validate_text(str(option), "option") for option in options]
    validate_collection_size(option_values, "options")
    if len(option_values) != len(set(option_values)):
        raise ValueError("V2 select options must be unique.")

    initial_value = _resolve_initial_value(option_values, value=value, index=index)
    allowed_values = set(option_values)
    state = prepare_state(
        key=key,
        kind="select",
        default_value=initial_value,
        is_valid_value=lambda candidate: (
            candidate is None or candidate in allowed_values
        ),
    )
    envelope = validate_envelope(
        {
            "protocolVersion": PROTOCOL_VERSION,
            "kind": "select",
            "state": state,
            "props": {
                "disabled": bool(disabled),
                "label": label,
                "options": [
                    {"label": option, "value": option}
                    for option in option_values
                ],
                "placeholder": placeholder,
            },
        }
    )
    mount(
        key=key,
        data=envelope,
        default={
            "meta": metadata_cell("select"),
            "state": state,
        },
        width=width,
        callbacks={"on_state_change": on_change or noop_callback},
    )
    return state["value"]


def _resolve_initial_value(
    options: List[str],
    *,
    value: Optional[str],
    index: Optional[int],
) -> Optional[str]:
    if value is not None:
        normalized = validate_text(str(value), "value")
        if normalized not in options:
            raise ValueError("The Select default value is not present in options.")
        return normalized
    if index is None or not options:
        return None
    if index < 0 or index >= len(options):
        raise IndexError("Select index is outside the available option range.")
    return options[index]
