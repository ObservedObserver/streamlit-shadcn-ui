### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

calendar_value = ui.calendar(key="calendar")
st.write("Calendar value is:", calendar_value)

st.write(ui.calendar)
```
