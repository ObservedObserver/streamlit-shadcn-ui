### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

choice = ui.select(
    "Choose a fruit",
    ["Apple", "Banana", "Orange"],
)

st.markdown(f"Current value: {choice}")

```

`key` is optional. Add a stable key when this component is created in a loop,
can be reordered, or must retain identity while its parameters change.
