from typing import List, Optional, Any, Dict
from streamlit_shadcn_ui.py_components.utils.declare import declare_component
from .context import get_context

__RELEASE = True
component_func = declare_component("element_renderer", release=__RELEASE)

class UIElement:
    def __init__(self, name: str, props: Optional[Dict[str, Any]] = None, key: Optional[str] = None):
        self.key = key
        self.props = props if props is not None else {}
        self.name = name
        self.children: List['UIElement'] = []
        self.is_root = False
    
    def render_tree(self, tree: Dict[str, Any]) -> Any:
        return component_func(comp="element_renderer", props={"tree": tree}, key=self.key, default=None)

    def render(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "props": self.props,
            "children": [child.render() for child in self.children]
        }
    
    def __enter__(self) -> 'UIElement':
        ctx = get_context()
        if not ctx["in_render"]:
            ctx["in_render"] = True
            self.is_root = True
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        if self.is_root:
            get_context()["in_render"] = False
            self.render_tree(self.render())

    def add_child(self, child: 'UIElement') -> None:
        self.children.append(child)

def element(name: str, key: Optional[str] = None, **props) -> UIElement:
    return UIElement(name=name, props=props, key=key)
