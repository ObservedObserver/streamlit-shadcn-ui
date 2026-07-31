import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Select")

with open("docs/components/select.md", "r") as f:
    st.markdown(f.read())

choice = ui.select(
    "Choose a fruit",
    ["Apple", "Banana", "Orange"],
)

st.markdown(f"Current value: {choice}")

st.write(ui.select)
