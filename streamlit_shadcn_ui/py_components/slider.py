from .utils import declare_component

_component_func = declare_component("slider")

def slider(default_value=None, min_value=0, max_value=100, step=1, label=None, key=None):
    props = {
        "defaultValue": default_value,
        "min": min_value,
        "max": max_value,
        "step": step,
        "label": label
    }
    component_value = _component_func(comp="slider", props=props, key=key, default=default_value)
    return component_value
