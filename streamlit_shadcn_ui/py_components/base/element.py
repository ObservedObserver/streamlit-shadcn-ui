from streamlit_shadcn_ui.py_components.utils.declare import declare_component
from .context import get_context
component_func = declare_component("element_renderer", release=False)

class UIElement:
    def __init__(self, name: str, props=None, key=None):
        self.key = key
        self.props = props
        self.name = name
        self.children = []
        self.is_root = False
    
    def renderTree(self, tree):
        c = component_func(comp="element_renderer", props={
            "tree": tree,
        }, key=self.key, default=None)
        return c

    def render(self):
        tree = {
            "name": self.name,
            "props": self.props,
            "children": []
        }
        for child in self.children:
            tree["children"].append(child.render())
        print(tree)
        return tree
    
    def __enter__(self):
        ctx = get_context()
        if (ctx["in_render"] is False):
            ctx["in_render"] = True
            self.is_root = True
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        tree = self.render()
        ctx = get_context()
        if (self.is_root):
            ctx["in_render"] = False
            return self.renderTree(tree)
        return

    def add_child(self, child):
        self.children.append(child)



# def ui_element():
    # case 1. 任意的shadcn ui组件

def element(name: str, key=None, **props):
    return UIElement(name=name, props=props, key=key)