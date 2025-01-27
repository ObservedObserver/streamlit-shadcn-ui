from .utils import declare_component

_component_func = declare_component("command")

def command(class_name=None,items=None, title=None, key=None):
    props = {
        "className": class_name,
        "items": items, 
        "title":title
    }
    component_value = _component_func(comp="command", props=props, key=key)
    return component_value
