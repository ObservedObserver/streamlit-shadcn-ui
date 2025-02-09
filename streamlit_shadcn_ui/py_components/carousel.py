from .utils import declare_component

_component_func = declare_component("carousel")

def carousel(content=None, class_name=None, key=None):
    props = {
        "content": content or [],
        "className": class_name,
        "length": len(content),
    }
    component_value = _component_func(comp="carousel", props=props, key=key)
    return component_value
