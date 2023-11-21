from .utils import declare_component

_component_func = declare_component("button")
# variant "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
def button(text: str, variant: str = None, key = None):
    props = {"text": text, "variant": variant}
    component_value = _component_func(comp="button", props=props, key=key, default=None)
    return component_value
