### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

choice = ui.select(options=["Apple", "Banana", "Orange"])

st.markdown(f"Currrent value: {choice}")

```