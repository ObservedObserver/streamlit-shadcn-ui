import streamlit as st

import streamlit_shadcn_ui.v2 as ui

st.header("Link Button")

with open("docs/components/link_button.md", "r") as f:
    st.markdown(f.read())

ui.link_button(text="Go To Github", url="https://github.com/ObservedObserver/streamlit-shadcn-ui", key="link_btn")

st.write(ui.link_button)
