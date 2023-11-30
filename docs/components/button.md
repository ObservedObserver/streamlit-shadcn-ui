### Basic usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui


clicked = ui.button("Click", key="clk_btn")
ui.button("Reset", key="reset_btn")
st.write("UI Button Clicked:", clicked)
```
