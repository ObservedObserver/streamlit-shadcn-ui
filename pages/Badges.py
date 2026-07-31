import streamlit as st

import streamlit_shadcn_ui.v2 as ui

st.header("Badges")

with open("docs/components/badges.md", "r") as f:
    st.markdown(f.read())

ui.badges(
    badge_list=[
        ("default", "default"),
        ("secondary", "secondary"),
        ("outline", "outline"),
        ("Hello", "destructive"),
        ("World", "destructive"),
    ],
    key="badges1",
)

st.write(ui.badges)
