from .utils import declare_component
from .base.element import init_default_state
from .utils.session import init_session
from typing import List, Dict, Optional
import streamlit as st

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
    
    # Initialize state for tracking clicks
    default_state = init_default_state(key, default_value=None)
    non_resettable_state_key = f"{key}__non_resettable_state"
    init_session(key, default_state)
    init_session(non_resettable_state_key, default_value=default_state)

    # Check if a new click event occurred
    if (
        st.session_state[non_resettable_state_key]["event_id"]
        != st.session_state[key]["event_id"]
    ):
        st.session_state[non_resettable_state_key]["value"] = st.session_state[key][
            "value"
        ]
        st.session_state[non_resettable_state_key]["event_id"] = st.session_state[key][
            "event_id"
        ]
    else:
        st.session_state[non_resettable_state_key]["value"] = None

    _component_func(comp="breadcrumb", props=props, key=key, default=default_state)
    clicked_item = st.session_state[non_resettable_state_key]["value"]
    
    return clicked_item