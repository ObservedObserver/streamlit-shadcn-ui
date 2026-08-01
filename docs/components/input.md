### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui
# Input Component
input_value = ui.input(
    "Message",
    value="Hello, Streamlit!",
    type="text",
    placeholder="Enter text here",
)
st.write("Input Value:", input_value)
```
