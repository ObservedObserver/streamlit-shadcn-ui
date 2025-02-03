### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

toggle_group_value = ui.toggle_group(default_values=["bold"], key="toggle_group1")

st.write("Selected Toggles:", toggle_group_value)  

st.write(ui.toggle_group) 
```