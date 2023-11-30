from streamlit_shadcn_ui.py_components.utils.session import init_session
from .utils import declare_component
from streamlit_extras.stylable_container import stylable_container
import streamlit as st

_component_func = declare_component("alert_dialog")

def dialog_layer(props, open_status=False, key=None):
    container = stylable_container(key=f"dialog_layer_{key}", css_styles=f"""
        {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999992;
            background-color: rgba(255,255,255,0.8);
            backdrop-filter: blur(4px);
            display: { "flex" if open_status else "none" };
            justify-content: center;
            align-items: center;
        }}
        """)
    with container:
        component_value = _component_func(comp="alert_dialog", props=props, key=key, default=None)
        return component_value


def alert_dialog(show: bool, title: str, description: str, confirm_label: str=None, cancel_label: str=None, key = None):
    props = {"title": title, "description": description, "confirmLabel": confirm_label, "cancelLabel": cancel_label}
    init_session(key=key, default_value={"open": False, "confirm": False })
    if show:
        st.session_state[key]['open'] = True
    component_state = dialog_layer(props=props, key=key, open_status=st.session_state[key]['open'])
    
    return component_state['confirm']
