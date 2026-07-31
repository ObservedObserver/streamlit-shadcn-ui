import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Link Button")

with open("docs/components/link_button.md", "r") as f:
    st.markdown(f.read())

ui.link_button("Go To GitHub", "https://github.com/ObservedObserver/streamlit-shadcn-ui")

st.write(ui.link_button)
