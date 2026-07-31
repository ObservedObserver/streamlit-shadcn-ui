import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Metric Card")

with open("docs/components/metric_card.md", "r") as f:
    st.markdown(f.read())

cols = st.columns(3)

with cols[0]:
    ui.metric_card("Total Revenue", "$45,231.89", delta="+20.1%")
with cols[1]:
    ui.metric_card("Subscriptions", "+2,350", delta="+180.1%")
with cols[2]:
    ui.metric_card("Sales", "+12,234", delta="+19%")

st.write(ui.metric_card)
