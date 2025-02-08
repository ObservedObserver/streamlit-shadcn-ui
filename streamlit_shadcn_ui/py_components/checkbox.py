from .utils import declare_component

_component_func = declare_component("checkbox")

def checkbox(mode = None, options=None,key=None):
    
    props = {
        "options": options,
        "mode": mode
        }
    component_value = _component_func(comp="checkbox", props=props, key=key)
    return component_value
