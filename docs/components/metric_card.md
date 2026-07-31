### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

cols = st.columns(3)
with cols[0]:
    ui.metric_card("Total Revenue", "$45,231.89", delta="+20.1%")
with cols[1]:
    ui.metric_card("Subscriptions", "+2,350", delta="+180.1%")
with cols[2]:
    ui.metric_card("Sales", "+12,234", delta="+19%")
```
