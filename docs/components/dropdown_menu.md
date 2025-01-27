### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

ui.dropdown_menu(
    label="Open",
    items=[
       "Home", "Components", "DropdownMenu",
    ],
    key="dropdownmenu1"
)

st.write(ui.dropdown_menu)
```