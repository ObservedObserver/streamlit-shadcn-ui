import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Metric Card")

with open("docs/components/metric_card.md", "r") as f:
    st.markdown(f.read())

cols = st.columns(3)

with cols[0]:
    ui.metric_card(
        "Total Revenue",
        "$45,231.89",
        description="Compared with last month",
        delta="+20.1%",
    )
with cols[1]:
    ui.metric_card(
        "Subscriptions",
        "+2,350",
        description="New recurring subscriptions",
        delta="+180.1%",
    )
with cols[2]:
    ui.metric_card(
        "Sales",
        "+12,234",
        description="Orders in the current period",
        delta="+19%",
    )

st.subheader("Dashboard variant")
ui.metric_card(
    "Total Revenue",
    "$45,231.89",
    description="Compared with last month",
    delta="+20.1%",
    variant="dashboard",
)

st.write(ui.metric_card)
