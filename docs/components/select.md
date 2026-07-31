### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

choice = ui.select(
    "Choose a fruit",
    ["Apple", "Banana", "Orange"],
    key="fruit_select",
)

st.markdown(f"Current value: {choice}")

```
