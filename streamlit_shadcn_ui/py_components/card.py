from streamlit_shadcn_ui.py_components.base.element import element

def card(title: str = None, content: str = None, description: str = None, key=None):
    return element(name="card", key=key, title=title, content=content, description=description)
