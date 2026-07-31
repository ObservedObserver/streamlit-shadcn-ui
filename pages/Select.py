import streamlit as st
import streamlit_shadcn_ui.v2 as ui

st.header("Select")

with open("docs/components/select.md", "r") as f:
    st.markdown(f.read())

choice = ui.select(
    "Choose a fruit",
    ["Apple", "Banana", "Orange"],
    key="fruit_select",
)

st.markdown(f"Current value: {choice}")

st.write(ui.select)
