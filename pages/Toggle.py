import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Toggle Component")

with open("docs/components/toggle.md", "r") as f:
    st.markdown(f.read())
    
toggle_value = ui.toggle(default_checked=False, key="toggle1")
st.write("Toggle is On:", toggle_value)

st.write(ui.toggle)