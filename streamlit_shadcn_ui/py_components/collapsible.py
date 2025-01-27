from .utils import declare_component

_component_func = declare_component("collapsible")

def collapsible(title=None, fistItem=None, items=None, class_name=None, key=None):
    props = {
        "title": title,
        "fistItem":fistItem,
        "items":items,
        "className": class_name,
    }
    component_value = _component_func(comp="collapsible", props=props, key=key)
    return component_value
