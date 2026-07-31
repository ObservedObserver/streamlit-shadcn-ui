import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Badges")

with open("docs/components/badges.md", "r") as f:
    st.markdown(f.read())

ui.badges(
    items=[
        ("default", "default"),
        ("secondary", "secondary"),
        ("outline", "outline"),
        ("Hello", "destructive"),
        ("World", "destructive"),
    ],
)

st.write(ui.badges)
