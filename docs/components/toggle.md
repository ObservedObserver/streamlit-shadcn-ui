### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

toggle_value_bold = ui.toggle("Bold", value=False, icon="bold")
st.write("Bold Toggle is On:", toggle_value_bold)

st.write(ui.toggle)
```
