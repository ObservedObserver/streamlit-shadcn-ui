import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Breadcrumb")

ui.breadcrumb(
    breadcrumb_items=[
        {"text": "Home", "href": "/"},
        {"text": "Components", "href": "/components"},
        {"text": "Breadcrumb", "isCurrentPage": True},
    ],
    separator="/",
    class_name="flex gap-2 text-sm",
    key="breadcrumb1"
)

st.write(ui.breadcrumb)