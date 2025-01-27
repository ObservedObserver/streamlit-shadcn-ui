from .utils import declare_component

_component_func = declare_component("progress")

def progress(data=0, class_name=None, key=None):
    props = {
        "data": data,
        "className": class_name,
    }
    component_value = _component_func(comp="progress", props=props, key=key)
    return component_value
