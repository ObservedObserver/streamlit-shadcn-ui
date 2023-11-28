from streamlit_shadcn_ui.py_components.base.element import element
from streamlit_shadcn_ui.py_components.utils.declare import declare_component

component_func = declare_component("card")

def metric_card(title: str = None, content: str = None, description: str = None, key=None):
    props = {
        "title": title,
        "content": content,
        "description": description,
    }
    return component_func(comp="card", key=key, props=props)
