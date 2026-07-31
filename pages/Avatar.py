import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Avatar Component")

with open("docs/components/avatar.md", "r") as f:
    st.markdown(f.read())

ui.avatar(
    src="https://imagedelivery.net/tSvh1MGEu9IgUanmf58srQ/e2b094c8-8519-4e8b-e92e-1cf8d4b58f00/public",
    fallback="SO",
    alt="Streamlit Shadcn UI avatar",
)

st.write(ui.avatar)
