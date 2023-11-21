from streamlit_extras.stylable_container import stylable_container 
from .utils import declare_component

def select_trigger():
    name = "select_trigger"
    _component_func = declare_component(name)
    return _component_func(comp=name)

def select_options(x, y, open=False, options=None):
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
    with container:
        props = {"options": options}
        result = _component_func(comp=name, props=props, key="ss")
        return result


def select(label=None, options=None):
    option_list = list(options)
    with stylable_container(key="all", css_styles="""
            {
                position: relative;
            }
            """):
        # st.button(label="test")
        trigger_pos = select_trigger()
        choice = select_options(x=trigger_pos['x'], y=trigger_pos['y'], open=trigger_pos['open'], options=option_list)
        return choice