import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Checkbox")

checkbox_values = [True, False, False]


checkbox_values[0] = ui.checkbox(default_checked=True, label="I am a Checkbox 1", key="cb1")
checkbox_values[1] = ui.checkbox(default_checked=False, label="I am a Checkbox 2", key="cb2")
checkbox_values[2] = ui.checkbox(default_checked=False, label="I am a Checkbox 3", key="cb3")

st.markdown(f"""
+ checkbox 1 value: {checkbox_values[0]}
+ checkbox 2 value: {checkbox_values[1]}
+ checkbox 3 value: {checkbox_values[2]}
""")

with open("docs/components/checkbox.md", "r") as f:
    st.markdown(f.read())

st.write(ui.checkbox)