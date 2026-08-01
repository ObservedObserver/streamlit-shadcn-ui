import streamlit as st

import streamlit_shadcn_ui as ui

st.title("Multipage lifecycle fixture")
st.caption(
    "This page verifies that component identity is session-scoped across "
    "Streamlit pages in the V2-only 1.0 runtime."
)

page_value = ui.select(
    "Multipage Select",
    ["Page A", "Page B", "Page C"],
    key="wave1_multipage_select",
)
st.write("Multipage value:", page_value)

if st.button("Return to Wave 1 POC"):
    st.switch_page("V2_POC.py")
