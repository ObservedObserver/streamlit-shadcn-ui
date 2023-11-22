from .utils import declare_component

_component_func = declare_component("switch")

def switch(default_checked=False, label=None, key=None):
    props = {
        "default_checked": default_checked,
        "label": label
    }
    component_value = _component_func(comp="switch", props=props, key=key, default=default_checked)
    return component_value
