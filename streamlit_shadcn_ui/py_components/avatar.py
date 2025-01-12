from .utils import declare_component

_component_func = declare_component("avatar")

def avatar(src: str, fallback: str = None, key = None):
    props = {"src": src, "fallback": fallback}
    component_value = _component_func(comp="avatar", props=props, key=key, default=None)
    return component_value
