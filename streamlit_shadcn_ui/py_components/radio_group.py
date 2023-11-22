from .utils import declare_component

_component_func = declare_component("radio_group")

def radio_group(options, default_value=None, key=None):
    props = {
        "defaultValue": default_value,
        "options": options
    }
    component_value = _component_func(comp="radio_group", props=props, key=key, default=default_value)
    return component_value
