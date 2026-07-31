from __future__ import annotations

from typing import Any, Callable, Dict, Iterable, Mapping, Optional, Union

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


def breadcrumb(
    breadcrumb_items: Iterable[Mapping[str, Any]],
    *,
    key: str,
    label: str = "Breadcrumb",
    on_select: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> Optional[Dict[str, Any]]:
    """Render an interactive shadcn Breadcrumb action trigger."""

    fail_if_trigger_in_form("breadcrumb")
    register_kind(key, "breadcrumb")
    items = []
    for item in breadcrumb_items:
        if not isinstance(item, Mapping):
            raise TypeError("Each breadcrumb item must be a mapping.")
        items.append(
            {
                "text": validate_text(str(item.get("text", "")), "text"),
                "href": (
                    None
                    if item.get("href") is None
                    else validate_text(str(item["href"]), "href")
                ),
                "current": bool(
                    item.get(
                        "current",
                        item.get("isCurrentPage", False),
                    )
                ),
            }
        )
    validate_collection_size(items, "breadcrumb items")
    if sum(1 for item in items if item["current"]) > 1:
        raise ValueError(
            "Breadcrumb can contain at most one current item."
        )
    envelope = validate_envelope(
        {
            "protocolVersion": PROTOCOL_VERSION,
            "kind": "breadcrumb",
            "props": {
                "label": validate_text(label, "label"),
                "items": items,
            },
        }
    )
    result = mount(
        key=key,
        data=envelope,
        default={"meta": metadata_cell("breadcrumb")},
        width=width,
        callbacks={"on_action_change": on_select or noop_callback},
    )
    action = get_result_value(result, "action")
    if not isinstance(action, Mapping):
        return None
    index = action.get("index")
    if (
        not isinstance(index, int)
        or isinstance(index, bool)
        or index < 0
        or index >= len(items)
        or items[index]["current"]
        or action.get("text") != items[index]["text"]
        or action.get("href") != items[index]["href"]
    ):
        return None
    return {
        "text": items[index]["text"],
        "href": items[index]["href"],
        "index": index,
    }
