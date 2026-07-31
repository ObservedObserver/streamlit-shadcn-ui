### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

# Textarea Component
textarea_value = ui.textarea(
    "Message",
    value="Type your message here...",
    placeholder="Enter longer text",
)
st.write("Textarea Value:", textarea_value)
```
