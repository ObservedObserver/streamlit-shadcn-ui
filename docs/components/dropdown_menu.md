### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

selected = ui.dropdown_menu(
    label="Open",
    items=[
       "Home", "Components", "DropdownMenu",
    ],
)

st.write("Selected:", selected)
```
