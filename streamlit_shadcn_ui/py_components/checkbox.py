from .utils import declare_component

_component_func = declare_component("checkbox")

def checkbox(default_checked=False, label=None, key=None):
    props = {"default_checked": default_checked, "label": label}
    component_value = _component_func(comp="checkbox", props=props, key=key, default=default_checked)
    return component_value
