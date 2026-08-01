### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

toggle_group_value = ui.toggle_group(
    ["bold", "italic", "underline"],
    value=["bold"],
)

st.write("Selected Toggles:", toggle_group_value)  

st.write(ui.toggle_group) 
```
