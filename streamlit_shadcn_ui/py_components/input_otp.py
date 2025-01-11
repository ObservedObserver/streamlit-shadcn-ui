from .utils import declare_component

_component_func = declare_component("input_otp")

def input_otp(default_value='', max_length=6, key=None):
    props = {
        "defaultValue": default_value,
        "maxLength": max_length,
    }

    component_value = _component_func(
        comp="input_otp",
        props=props,
        key=key,
        default=default_value,
    )
    return component_value