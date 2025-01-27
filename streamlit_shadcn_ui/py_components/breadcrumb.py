from .utils import declare_component
from typing import List, Dict, Optional

_component_func = declare_component("breadcrumb")

def breadcrumb(
    breadcrumb_items: List[Dict[str, Optional[str]]], 
    class_name: Optional[str] = None, 
    key=None
):

    items = [
        {
            "text": item["text"],
            "href": item.get("href"),
            "isCurrentPage": item.get("isCurrentPage", False),
        }
        for item in breadcrumb_items
    ]
    props = {
        "items": items,
        "className": class_name,
    }
    component_value =  _component_func(comp="breadcrumb", props=props, key=key, default=None)
    return component_value