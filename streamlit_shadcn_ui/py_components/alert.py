from .utils import declare_component

_component_func = declare_component("alert")

def alert(title=None, description=None, class_name=None, key=None):
    props = {
        "title": title,
        "description":description,
        "className": class_name,
    }
    component_value = _component_func(comp="alert", props=props, key=key)
    return component_value
