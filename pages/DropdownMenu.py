import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Dropdown Menu")

with open("docs/components/dropdown_menu.md", "r") as f:
    st.markdown(f.read())

value = ui.dropdown_menu(
    label="Open",
    items=[
       "Home", "Components", "DropdownMenu",
    ],
    key="dropdownmenu1"
)

st.write(ui.dropdown_menu)
st.write(value)
