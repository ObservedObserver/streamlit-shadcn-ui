### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

dt = ui.date_picker(key="date_picker", label="Date Picker")

st.write("Date:", dt)
```
