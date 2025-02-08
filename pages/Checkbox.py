import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Checkbox")

st.subheader("Single Choice")
checkbox_options = [
    {"label": "I am a Checkbox 1", "id": "s1", "default_checked": True},
    {"label": "I am a Checkbox 2", "id": "s2", "default_checked": False},
    {"label": "I am a Checkbox 3", "id": "s3", "default_checked": False},
]

checkbox_values = [option["default_checked"] for option in checkbox_options]

checkbox_values[0] = ui.checkbox(mode="single", options=[checkbox_options[0]], key="cb1")
checkbox_values[1] = ui.checkbox(mode="single", options=[checkbox_options[1]], key="cb2")
checkbox_values[2] = ui.checkbox(mode="single", options=[checkbox_options[2]], key="cb3")

st.markdown(f"""
+ checkbox 1 value: {checkbox_values[0]}
+ checkbox 2 value: {checkbox_values[1]}
+ checkbox 3 value: {checkbox_values[2]}
""")

st.subheader("Multiple Choices")
checkbox_options_multiple = [
    {"label": "Option A", "id": "m1", "default_checked":False},
    {"label": "Option B", "id": "m2", "default_checked":False},
    {"label": "Option C", "id": "m3", "default_checked":False},
    {"label": "Option D", "id": "m4", "default_checked":False}
]
radio_value_1 = ui.checkbox(mode="multiple", options=checkbox_options_multiple, key="cb4")
st.write("Selected Option:", radio_value_1)

st.write(ui.checkbox)

with open("docs/components/checkbox.md", "r") as f:
    st.markdown(f.read())