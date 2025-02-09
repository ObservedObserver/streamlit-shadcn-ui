from .utils import declare_component

_component_func = declare_component("scroll_area")

def scroll_area(title=None, tags=None, class_name=None, key=None):
    props = {
        "title": title,
        "tags":tags,
        "className": class_name,
    }
    component_value = _component_func(comp="scroll_area", props=props, key=key)
    return component_value
