### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

ui.breadcrumb(
     breadcrumb_items=[
        {"text": "Home", "href": "/"},
        {"text": "Components", "href": "/components"},
        {"text": "Breadcrumb", "isCurrentPage": True},
    ],
    class_name="flex gap-2 text-sm",
    separator="/",
    key="breadcrumb1"
)

The optional `separator` argument lets you customise the character that appears between breadcrumb items. If it is not
provided the default chevron icon from the shadcn/ui breadcrumb component is used.

st.write(ui.breadcrumb)
```
