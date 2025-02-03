### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

ui.popover(key="popover1", label="popover", content="Place content for the popover here.")

st.write(ui.popover)
```