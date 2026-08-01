import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Toggle")

with open("docs/components/toggle.md", "r") as f:
    st.markdown(f.read())

toggle_value_bold = ui.toggle("Bold", value=False, icon="bold")
st.write("Bold Toggle is On:", toggle_value_bold)

toggle_value_italic = ui.toggle("Italic", value=False, icon="italic")
st.write("Italic Toggle is On:", toggle_value_italic)

toggle_value_underline = ui.toggle("Underline", value=False, icon="underline")
st.write("Underline Toggle is On:", toggle_value_underline)

st.write(ui.toggle)
