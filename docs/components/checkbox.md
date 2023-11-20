### Basic usage

```py
import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Checkbox")


ui.checkbox(checked=True, label="I am a Checkbox 1")
ui.checkbox(checked=False, label="I am a Checkbox 2")
ui.checkbox(checked=False, label="I am a Checkbox 3")
```