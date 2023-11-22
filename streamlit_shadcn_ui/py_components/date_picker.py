from streamlit_shadcn_ui.py_components.utils.declare import declare_component
from streamlit_extras.stylable_container import stylable_container 


def date_picker_trigger():
    name = "date_picker_trigger"
    _component_func = declare_component(name, release=False)
    return _component_func(comp=name)

def date_picker_content(x: int, y: int, open: bool = False):
    name = "date_picker_content"
    _component_func = declare_component(name, release=False)
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
        result = _component_func(comp=name)
        return result

def date_picker(label=None, value=None, min_value=None, max_value=None, key=None):
    with stylable_container(key="all", css_styles="""
            {
                position: relative;
            }
            """):
        trigger_pos = date_picker_trigger()

        choice = date_picker_content(x=trigger_pos['x'], y=trigger_pos['y'], open=trigger_pos['open'])
        return choice
