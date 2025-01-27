from .utils import declare_component

_component_func = declare_component("calendar")

def calendar(class_name=None, key=None):
    props = {
        "className": class_name,
    }
    component_value = _component_func(comp="calendar", props=props, key=key)
    return component_value
