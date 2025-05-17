from .utils import declare_component

_component_func = declare_component("accordion")

def accordion(data=None, class_name=None, key=None):
    props = {
        "data": data,
        "className": class_name,
    }
    component_value = _component_func(comp="accordion", props=props, key=key)
    return component_value
