from .utils import declare_component
from typing import Dict, List, Optional

_component_func = declare_component("breadcrumb")


def breadcrumb(
    breadcrumb_items: List[Dict[str, Optional[str]]],
    class_name: Optional[str] = None,
    separator: Optional[str] = None,
    key: Optional[str] = None,
):
    """Render a breadcrumb navigation component."""

    items = [
        {
            "text": item["text"],
            "href": item.get("href"),
            "isCurrentPage": item.get("isCurrentPage", False),
        }
        for item in breadcrumb_items
    ]

    props = {"items": items}

    if class_name is not None:
        props["className"] = class_name

    if separator is not None:
        props["separator"] = separator

    component_value = _component_func(
        comp="breadcrumb", props=props, key=key, default=None
    )
    return component_value

