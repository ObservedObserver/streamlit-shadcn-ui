### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

clicked = ui.button("Click", key="clk_btn")
ui.button("Reset", variant="secondary", key="reset_btn")
st.write("UI Button Clicked:", clicked)
```
