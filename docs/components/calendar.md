### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

calendar_calue = ui.calendar(class_name=None, key="calendar")
st.write("Calendar value is:", calendar_calue)

st.write(ui.calendar)
```
