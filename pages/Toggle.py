import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Toggle")

with open("docs/components/toggle.md", "r") as f:
    st.markdown(f.read())

toggle_value_bold = ui.toggle(default_checked=False, icon="bold", key="toggle_bold")
st.write("Bold Toggle is On:", toggle_value_bold)

toggle_value_italic = ui.toggle(default_checked=False, icon="italic", key="toggle_italic")
st.write("Italic Toggle is On:", toggle_value_italic)

toggle_value_underline = ui.toggle(default_checked=False, icon="underline", key="toggle_underline")
st.write("Underline Toggle is On:", toggle_value_underline)

st.write(ui.toggle)