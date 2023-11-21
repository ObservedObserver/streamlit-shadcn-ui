import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Card")

cols = st.columns(3)

with cols[0]:
    ui.card(title="Total Revenue", content="$45,231.89", description="+20.1% from last month", key="card1")
with cols[1]:
    ui.card(title="Total Revenue", content="$45,231.89", description="+20.1% from last month", key="card2")
with cols[2]:
    ui.card(title="Total Revenue", content="$45,231.89", description="+20.1% from last month", key="card3")


