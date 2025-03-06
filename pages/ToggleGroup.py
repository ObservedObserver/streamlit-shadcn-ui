import streamlit as st
import streamlit_shadcn_ui as ui  

st.header("Toggle Group")

with open("docs/components/toggle_group.md", "r") as f:
    st.markdown(f.read())

toggle_group_value = ui.toggle_group(default_values=["bold"], key="toggle_group1")

st.write("Selected Toggles:", toggle_group_value)  

st.write(ui.toggle_group)  