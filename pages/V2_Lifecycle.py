import streamlit as st

import streamlit_shadcn_ui.v2 as ui

st.title("V2 multipage lifecycle fixture")
st.caption(
    "This page verifies that the V2 runtime remains opt-in and that component "
    "identity is session-scoped across Streamlit pages."
)

page_value = ui.select(
    "Multipage Select",
    ["Page A", "Page B", "Page C"],
    key="wave1_multipage_select",
)
st.write("Multipage value:", page_value)

if st.button("Return to Wave 1 POC"):
    st.switch_page("V2_POC.py")
