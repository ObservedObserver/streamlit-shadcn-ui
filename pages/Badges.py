import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Badges")

with open("docs/components/badges.md", "r") as f:
    st.markdown(f.read())

ui.badges(badge_list=[("default", "default"), ("secondary", "secondary"), ("outline", "outline"), ("Hello", "destructive"), ("World", "destructive")], class_name="flex gap-2", key="badges1")

st.write(ui.badges)