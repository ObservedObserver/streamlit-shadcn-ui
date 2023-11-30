### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui
# Input Component
input_value = ui.input(default_value="Hello, Streamlit!", type='text', placeholder="Enter text here", key="input1")
st.write("Input Value:", input_value)
```