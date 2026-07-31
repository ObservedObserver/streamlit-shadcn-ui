from __future__ import annotations

from typing import Any, Callable, Iterable, Optional, Union

from .._component import get_result_value, mount, noop_callback
from .._protocol import (
    PROTOCOL_VERSION,
    metadata_cell,
    register_kind,
    validate_collection_size,
    validate_envelope,
    validate_text,
)
from .._streamlit_compat import fail_if_trigger_in_form


def dropdown_menu(
    label: str,
    items: Iterable[Any],
    *,
    key: str,
    menu_label: Optional[str] = None,
    disabled: bool = False,
    on_select: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> Optional[str]:
    """Render a non-modal shadcn Base UI action menu."""

    fail_if_trigger_in_form("dropdown_menu")
    register_kind(key, "dropdown_menu")
    label = validate_text(label, "label")
    normalized_menu_label = (
        None if menu_label is None else validate_text(menu_label, "menu_label")
    )
    item_values = [validate_text(str(item), "item") for item in items]
    validate_collection_size(item_values, "items")
    if len(item_values) != len(set(item_values)):
        raise ValueError("V2 dropdown menu items must be unique.")

    envelope = validate_envelope(
        {
            "protocolVersion": PROTOCOL_VERSION,
            "kind": "dropdown_menu",
            "props": {
                "disabled": bool(disabled),
                "items": [
                    {"label": item, "value": item}
                    for item in item_values
                ],
                "label": label,
                "menuLabel": normalized_menu_label,
            },
        }
    )
    result = mount(
        key=key,
        data=envelope,
        default={"meta": metadata_cell("dropdown_menu")},
        width=width,
        callbacks={"on_action_change": on_select or noop_callback},
    )
    action = get_result_value(result, "action")
    return action if action in set(item_values) else None
