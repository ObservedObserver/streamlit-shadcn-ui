from .utils import declare_component
_RELEASE = True

_component_func = declare_component("link_button", release=_RELEASE)

def link_button(text: str, url: str, variant: str = "default", class_name: str = None, key = None):
    props = {"text": text, "variant": variant, "url": url, "className": class_name}
    _component_func(comp="link_button", props=props, key=key)
    return None
