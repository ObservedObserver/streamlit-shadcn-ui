from .utils import declare_component

_component_func = declare_component("card")

def card(title: str = None, content: str = None, description: str = None, key=None):
    props = {"title": title, "content": content, "description": description}
    component_value = _component_func(comp="card", props=props, key=key, default=None)
    return component_value
