from .utils import declare_component

_component_func = declare_component("accordtion")

def accordtion(data=None, class_name=None, key=None):
    props = {
        "data": data,
        "className": class_name,
    }
    component_value = _component_func(comp="accordtion", props=props, key=key)
    return component_value
