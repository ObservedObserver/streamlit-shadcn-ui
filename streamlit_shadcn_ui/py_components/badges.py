from .utils import declare_component
from typing import List, Tuple

_component_func = declare_component("badges")

def badges(badge_list: List[Tuple[str, str]], class_name: str = None, key = None):
    bl = [{"text": b[0], "variant": b[1] } for b in badge_list]
    props = {"badges":bl , "className": class_name}
    clicked = _component_func(comp="badges", props=props, key=key, default=False)
    return clicked
