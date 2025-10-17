from streamlit_shadcn_ui.py_components.utils.callback import register_callback
from streamlit_shadcn_ui.py_components.utils.declare import declare_component
from streamlit_extras.stylable_container import stylable_container

from streamlit_shadcn_ui.py_components.utils.session import init_session 
import streamlit as st

def date_picker_trigger(value = None, label: str = None, open_status = False, key = None):
    name = "date_picker_trigger"
    _component_func = declare_component(name)
    props = {"value": value, "open": open_status, "label": label}
    return _component_func(comp=name, props=props, key=key,  default={"x": 0, "y": 0, "open": False})

def date_picker_content(x: int, y: int, mode: str, value=None, default_value=None, open: bool = False, key=None, on_change=None, args=None, kwargs=None):
    name = "date_picker_content"
    _component_func = declare_component(name)
    register_callback(key=key, callback=on_change, args=args, kwargs=kwargs)
    container = stylable_container(key=f"cont_{key}", css_styles=f"""
        {{
            position: absolute;
            top: {y}px;
            left: {x}px;
            display: { "block" if open else "none" };
            background-color: transparent;
            z-index: 1000;
        }}
        """)
    with container:
        props = {"value": value, "mode": mode}
        result = _component_func(comp=name, props=props, key=key, default={"value": default_value, "open": False})

        return result

def date_choosen_handler(from_key, to_key):
    st.session_state[to_key]['open'] = st.session_state[from_key]['open']

def date_picker(label=None, mode="single", default_value=None, key=None):
    trigger_component_key = f"trigger_{key}"
    content_component_key = f"content_{key}"
    prev_value_key = f"prev_value_{key}"
    prev_open_key = f"prev_open_{key}"
    
    init_session(key=trigger_component_key, default_value={"x": 0, "y": 0, "open": False})
    init_session(key=content_component_key, default_value={"value": default_value, "open": False})
    
    open_status = st.session_state[trigger_component_key]['open']
    value = st.session_state[content_component_key]['value']
    
    # Initialize prev_value if not exists
    if prev_value_key not in st.session_state:
        st.session_state[prev_value_key] = value
    
    # Track previous content open state
    if prev_open_key not in st.session_state:
        st.session_state[prev_open_key] = st.session_state[content_component_key].get('open', False)
    
    prev_value = st.session_state[prev_value_key]
    prev_content_open = st.session_state[prev_open_key]
    current_content_open = st.session_state[content_component_key].get('open', False)
    
    # Check if value changed - this means user clicked "Pick"
    if prev_value != value:
        # Value changed, close the dropdown
        open_status = False
        st.session_state[trigger_component_key]['open'] = False
    # Check if content's open state changed from True to False - user clicked Cancel or Pick
    elif prev_content_open == True and current_content_open == False:
        # Content explicitly closed, ensure trigger is also closed
        open_status = False
        st.session_state[trigger_component_key]['open'] = False
    
    with stylable_container(key=f"root_{key}", css_styles="""                  
            {
                position: relative;
            }
            """):
        trigger_pos = date_picker_trigger(value=value, label=label, open_status=open_status, key=trigger_component_key)
        # Sync trigger state to content - this allows content to know the open state
        st.session_state[content_component_key]['open'] = trigger_pos['open']
        
        content_state = date_picker_content(value=value, mode=mode, x=trigger_pos['x'], y=trigger_pos['y'], open=open_status, key=content_component_key, on_change=date_choosen_handler, kwargs={"from_key": content_component_key, "to_key": trigger_component_key})
        
        value = content_state['value']
        
        # Update tracking vars for next render
        st.session_state[prev_value_key] = value
        st.session_state[prev_open_key] = st.session_state[content_component_key].get('open', False)
        
        return value