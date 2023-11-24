from .utils import declare_component
_RELEASE = True

_component_func = declare_component("button", release=_RELEASE)

# variant "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
def button(text: str, variant: str = "default", class_name: str = None, key = None):
    props = {"text": text, "variant": variant, "className": class_name}
    clicked = _component_func(comp="button", props=props, key=key, default=False)
    return clicked
