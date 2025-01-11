from .utils import declare_component

_component_func = declare_component("skeleton")

def skeleton(class_name: str = None, key = None):
    props = {
        "className": class_name,
    }

    component_value = _component_func(
        comp="skeleton",
        props=props,
        key=key,
        default=None
    )
    return component_value