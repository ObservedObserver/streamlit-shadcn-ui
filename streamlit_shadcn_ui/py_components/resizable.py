from .utils import declare_component

_component_func = declare_component("resizable")

def resizable(panels=None, direction="horizontal", key=None):
    props = {
        "panels":panels,
        "direction":direction
    }
    component_value = _component_func(comp="resizable",props=props,key=key)
    return component_value
