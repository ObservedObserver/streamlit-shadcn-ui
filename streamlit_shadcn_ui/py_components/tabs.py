from .utils import declare_component

_component_func = declare_component("tabs")

def tabs(options, defaultValue=None, key=None):
    option_list = list(options)
    props = {"options": option_list, "defaultValue": defaultValue}
    component_value = _component_func(comp="tabs", props=props, key=key, default=None)
    return component_value
