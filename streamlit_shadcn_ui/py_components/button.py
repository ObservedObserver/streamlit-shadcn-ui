from .utils import declare_component
_RELEASE = True

_component_func = declare_component("button", release=_RELEASE)

# variant "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
def button(text: str, variant: str = "default", key = None):
    props = {"text": text, "variant": variant}
    clicked = _component_func(comp="button", props=props, key=key, default=False)
    return clicked
