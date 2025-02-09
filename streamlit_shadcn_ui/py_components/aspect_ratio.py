from .utils import declare_component

_component_func = declare_component("aspect_ratio")

def aspect_ratio(src=None, alt=None, ratio=None, class_name=None, key=None):
    props = {
        "src": src,
        "alt": alt,
        "ratio": ratio,
        "className": class_name,
    }
    component_value = _component_func(comp="aspect_ratio", props=props, key=key)
    return component_value