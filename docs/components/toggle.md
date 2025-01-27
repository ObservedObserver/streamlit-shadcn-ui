### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

toggle_value = ui.toggle(default_checked=False, label="Toggle", key="toggle1")
st.write("Switch is On:", toggle_value)

st.write(ui.toggle)
```