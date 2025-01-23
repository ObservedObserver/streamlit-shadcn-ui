from .utils import declare_component
from streamlit_extras.stylable_container import stylable_container
import streamlit as st
from typing import Optional
from .utils import init_session

def dropdown_menu_trigger(
    value=None,
    open_status=False, 
    key=None
):
    component_name = "dropdown_menu_trigger"
    _component_func = declare_component(component_name)
    props = {"value": value, "open": open_status}
    return _component_func(comp=component_name, props=props, key=key, default={"x": 0, "y": 0, "open": False})


def dropdown_menu_content(
    x,
    y,
    label,
    items: list[str],
    open_status = False,
    key = None,
):
    component_name = "dropdown_menu_content"
    _component_func = declare_component(component_name)
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
        props = {
            "label":label,
            "items": items,
            "open": open_status
        }
        result = _component_func(comp=component_name, props=props, key=key, default={"open": False})
        return result

def dropdown_menu(
    items: list[str],
    label = "Open",
    menu_label= "Position",
    key = "ui_dropdown"
):
    trigger_key = f"trigger_{key}"
    content_key = f"content_{key}"

    # Initialize session state
    init_session(key=trigger_key, default_value={"x": 0, "y": 0, "open": False})
    init_session(key=content_key, default_value={"open": False})

    open_status = st.session_state[trigger_key]["open"]

    with stylable_container(key=f"root_{key}", css_styles="""
        {
            position: relative;
        }
        """):
        # Render the trigger component
        trigger_state = dropdown_menu_trigger(
            value=label,
            key=trigger_key,
            open_status=open_status
        )

        content_state = dropdown_menu_content(
            x=trigger_state['x'], 
            y=trigger_state['y'],
            label = menu_label,
            items = items,
            open_status=trigger_state['open'],
            key = content_key,
        )

        return content_state