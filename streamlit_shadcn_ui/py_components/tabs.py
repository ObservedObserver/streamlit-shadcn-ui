from .utils import declare_component

_component_func = declare_component("tabs")

def tabs(options, default_value=None, key=None, **kwargs):
    option_list = list(options)
    props = {"options": option_list, "defaultValue": default_value, **kwargs}
    component_value = _component_func(comp="tabs", props=props, key=key, default=default_value)
    return component_value
