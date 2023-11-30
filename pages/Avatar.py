import streamlit_shadcn_ui as ui
import streamlit as st

st.header("Avatar Component")

with open("docs/components/avatar.md", "r") as f:
    st.markdown(f.read())

ui.avatar(src="https://imagedelivery.net/tSvh1MGEu9IgUanmf58srQ/e2b094c8-8519-4e8b-e92e-1cf8d4b58f00/public")

st.write(ui.avatar)