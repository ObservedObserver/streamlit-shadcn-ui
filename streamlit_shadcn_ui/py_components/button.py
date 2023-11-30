from streamlit_shadcn_ui.py_components.base.element import element, init_default_state
from streamlit_shadcn_ui.py_components.utils.callback import register_callback
from streamlit_shadcn_ui.py_components.utils.session import init_session
from .utils import declare_component
import streamlit as st

_component_func = declare_component("button")

# variant "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"


def button(text: str, variant: str = "default", class_name: str = None, key=None, **kwargs):
    props = {"text": text, "variant": variant, "className": class_name, **kwargs}
    default_state = init_default_state(key, default_value=False)
    non_resettable_state_key = f"{key}__non_resettable_state"
    init_session(key, default_state)
    init_session(non_resettable_state_key, default_value=default_state)

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
        st.session_state[non_resettable_state_key]["value"] = False

    _component_func(comp="button", props=props, key=key, default=default_state)
    clicked = st.session_state[non_resettable_state_key]["value"]
    return clicked
