from .utils import declare_component

_component_func = declare_component("textarea")

def textarea(default_value='', placeholder=None, key=None, **kwargs):
    props = {
        "defaultValue": default_value,
        "placeholder": placeholder,
        **kwargs
    }
    component_value = _component_func(comp="textarea", props=props, key=key, default=default_value)
    return component_value
