from .utils import declare_component

_component_func = declare_component("toggle_group")

def toggle_group(default_values=None, key=None):
    if default_values is None:
        default_values = []

    props = {
        "defaultValues": default_values,  
    }
    
    component_value = _component_func(comp="toggle_group", props=props, key=key, default=default_values)
    
    return component_value