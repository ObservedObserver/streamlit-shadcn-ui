### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

# Textarea Component
textarea_value = ui.textarea(
    default_value="Type your message here...",
    label="Message",
    placeholder="Enter longer text",
    key="textarea1",
)
st.write("Textarea Value:", textarea_value)
```
