from .utils import declare_component

_component_func = declare_component("input")

def input(default_value='', type='text', placeholder=None, key=None):
    props = {
        "defaultValue": default_value,
        "type": type,
        "placeholder": placeholder
    }
    component_value = _component_func(comp="input", props=props, key=key, default=default_value)
    return component_value
