import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Resizable")

with open("docs/components/resizable.md", "r") as f:
    st.markdown(f.read())

panels=[
    { "content": "One", "defaultSize": 50 },
    { "content": "Two", "defaultSize": 25 },
    { "content": "Three", "defaultSize": 25 },
] 
ui.resizable(key="resizable1", direction="horizontal",panels=panels)
st.write(ui.resizable)