import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Checkbox")


ui.checkbox(checked=True, label="I am a Checkbox 1", key="cb1")
ui.checkbox(checked=False, label="I am a Checkbox 2", key="cb2")
ui.checkbox(checked=False, label="I am a Checkbox 3", key="cb3")

with open("docs/components/checkbox.md", "r") as f:
    st.markdown(f.read())