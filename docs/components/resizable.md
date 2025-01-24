### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

panels=[
    { "content": "One", "defaultSize": 50 },
    { "content": "Two", "defaultSize": 25 },
    { "content": "Three", "defaultSize": 25 },
] 
ui.resizable(key="resizable1", direction="horizontal",panels=panels)
st.write(ui.resizable)
```