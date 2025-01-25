from .utils import declare_component

_component_func = declare_component("pagination")

def pagination(key=None,totalPages=3,initialPage=1):
    props = {
        "totalPages": totalPages,
        "initialPage": initialPage
    }
    component_value = _component_func(comp="pagination",props=props,key=key)
    return component_value
