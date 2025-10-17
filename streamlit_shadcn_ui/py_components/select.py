from typing import List

from streamlit_extras.stylable_container import stylable_container

from streamlit_shadcn_ui.py_components.utils.callback import register_callback 
from .utils import declare_component
import streamlit as st
from .utils import init_session

def select_trigger(value=None, open_status=False, key=None):
    name = "select_trigger"
    _component_func = declare_component(name)
    props = {"value": value, "open": open_status}
    return _component_func(comp=name, props=props, key=key, default={"x": 0, "y": 0, "open": False})

def select_options(options: List[str], x, y, open_status=False, key=None, default_value=None, on_change=None, args=None, kwargs=None):
    name = "select_options"
    _component_func = declare_component(name)
    register_callback(key=key, callback=on_change, args=args, kwargs=kwargs)
    container = stylable_container(key=f"cont_{key}", css_styles=f"""
        {{
            position: absolute;
            top: {y}px;
            left: {x}px;
            display: { "block" if open_status else "none" };
            z-index: 1000;
        }}
        """)
    result = default_value
    with container:
        props = {"options": options}
        result = _component_func(comp=name, props=props, key=key, default={"value": default_value, "open": False})
        return result

def option_choosen_handler(from_key, to_key):
    st.session_state[to_key]['open'] = st.session_state[from_key]['open']

def select(label=None, options=None, key="ui_select"):

    trigger_component_key = f"trigger_{key}"
    options_component_key = f"options_{key}"
    prev_choice_key = f"prev_choice_{key}"

    option_list = list(options)
    init_session(key=trigger_component_key, default_value={"x": 0, "y": 0, "open": False})
    init_session(key=options_component_key, default_value={"value": option_list[0], "open": False})
    init_session(key=prev_choice_key, default_value=None)
    
    open_status = st.session_state[trigger_component_key]['open']
    choice = st.session_state[options_component_key]['value']
    
    # Check if user just selected an option (choice changed while dropdown was open)
    if open_status and st.session_state[prev_choice_key] != choice and st.session_state[prev_choice_key] is not None:
        # Close immediately for this render
        open_status = False
        st.session_state[trigger_component_key]['open'] = False
    
    with stylable_container(key=f"root_{key}", css_styles="""
            {
                position: relative;
            }
            """):
        trigger_state = select_trigger(value=choice, open_status=open_status, key=trigger_component_key)

        options_state = select_options(options=option_list, x=trigger_state['x'], y=trigger_state['y'], open_status=open_status, default_value=option_list[0], key=options_component_key, on_change=option_choosen_handler, kwargs={"from_key": options_component_key, "to_key": trigger_component_key})

        choice = options_state['value']
        st.session_state[prev_choice_key] = choice
        
        return choice
