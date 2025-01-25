### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui
    
items = [
    {"label": "Calendar"},
    {"label": "Search Emoji"},
    {"label": "Calculator"},
]
value = ui.command(items=items, key="command1", title="Suggestions")

st.write("value:", value)
st.write(ui.command)
```