import streamlit as st
import streamlit_shadcn_ui as ui
with open("docs/introduction.md", "r") as f:
    st.markdown(f.read())

ui.date_picker()
