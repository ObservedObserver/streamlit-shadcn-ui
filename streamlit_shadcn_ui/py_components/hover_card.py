from streamlit_extras.stylable_container import stylable_container

from .utils import declare_component
import streamlit as st
from .utils import init_session

def hover_card_trigger(label=None, open_status=False, key=None):
    name = "hover_card_trigger"
    _component_func = declare_component(name)
    props = {"label": label, "open": open_status}
    return _component_func(comp=name, props=props, key=key, default={"x": 0, "y": 0, "open": False})

def hover_card_content(x, y, content: str, content_type: str, open_status=False, key=None):
    name = "hover_card_content"
    _component_func = declare_component(name)
    container = stylable_container(key=f"cont_{key}", css_styles=f"""
        {{
            position: absolute;
            top: {y}px;
            left: {x}px;
            display: { "block" if open_status else "none" };
            z-index: 1000;
        }}
        """)
    with container:
        props = {"content": content, "contentType": content_type, "open": open_status}
        result = _component_func(comp=name, props=props, key=key, default={"open": False})
        return result

def hover_card(label: str, content: str, content_type: str="text", key="ui_card"):

    trigger_component_key = f"trigger_{key}"
    content_component_key = f"content_{key}"

    init_session(key=trigger_component_key, default_value={"x": 0, "y": 0, "open": False})
    init_session(key=content_component_key, default_value={"open": False})
    open_status = st.session_state[trigger_component_key]['open']
    with stylable_container(key=f"root_{key}", css_styles="""
        {
            position: relative;
        }
        """):

        trigger_state = hover_card_trigger(label=label, open_status=open_status, key=trigger_component_key)

        options_state = hover_card_content(
            x=trigger_state['x'],
            y=trigger_state['y'],
            content=content,
            content_type=content_type,
            open_status=trigger_state['open'],
            key=content_component_key)

        return None