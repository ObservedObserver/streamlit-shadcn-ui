from streamlit_shadcn_ui.py_components.utils.declare import declare_component


class UIElement:
    def __init__(self, key, value):
        self.key = key
        self.value = value

    def render(self):
        raise NotImplementedError

    def get_key(self):
        return self.key

    def get_value(self):
        return self.value

    def set_value(self, value):
        self.value = value

    def set_key(self, key):
        self.key = key

    def __str__(self):
        return f"{self.key}: {self.value}"

    def __repr__(self):
        return f"{self.key}: {self.value}"

component_func = declare_component("element_renderer", release=False)


# def ui_element():
    # case 1. 任意的shadcn ui组件

def element(key):
    tree = {
        "name": "card",
        "props": {
            "className": "bg-red-500"
        },
        "children": ["Hello World", {
            "name": "input",
            "props": {
                "className": "bg-yellow-500"
            }
        }]
    }
    c = component_func(comp="element_renderer", props={
        "tree": tree,
    }, key=key, default=None)
    return c