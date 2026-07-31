import streamlit as st
import streamlit_shadcn_ui.v2 as ui

st.header("Progress")

with open("docs/components/progress.md", "r") as f:
    st.markdown(f.read())
    
ui.progress(
    value=30,
    label="Upload progress",
    show_value=True,
    key="progress1",
)

st.write(ui.progress)
