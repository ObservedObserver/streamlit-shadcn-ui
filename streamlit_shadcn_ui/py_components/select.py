from streamlit_extras.stylable_container import stylable_container 
from .utils import declare_component
import datetime
import streamlit as st

def select_trigger(value=None):
    name = "select_trigger"
    _component_func = declare_component(name)
    props = {"value": value}
    return _component_func(comp=name, props=props, key="ss2", default={"x": 0, "y": 0, "open": False})

def select_options(options: list[str], x, y, open=False, default_value=None):
    name = "select_options"
    _component_func = declare_component(name)
    container = stylable_container(key="cont", css_styles=f"""
        {{
            position: absolute;
            top: {y}px;
            left: {x}px;
            display: { "block" if open else "none" };
            z-index: 1000;
        }}
        """)
    result = default_value
    with container:
        props = {"options": options}
        result = _component_func(comp=name, props=props, key="ss", default={"value": default_value, "open": False})
        return result

choice = None
trigger_id = 0
open_status = False
def select(label=None, options=None):
    global choice
    global trigger_id
    global open_status
    option_list = list(options)
    with stylable_container(key="all", css_styles="""
            {
                position: relative;
            }
            """):
        # st.button(label="test")
        c = st.session_state.get('ss', {"value": option_list[0]})
        if c is None:
            c = option_list[0]
        else:
            c = c['value']
        print(c, 'c')
        trigger_pos = select_trigger(value=c)
        open_status = trigger_pos['open']
        ts = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(ts, 'trigger', trigger_pos, choice)
        print(st.session_state)
        select_result = select_options(options=option_list, x=trigger_pos['x'], y=trigger_pos['y'], open=trigger_pos['open'], default_value=option_list[0])
        open_status = select_result['open']
        print(ts, datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'), trigger_pos, select_result)
        choice = select_result['value']
        return choice