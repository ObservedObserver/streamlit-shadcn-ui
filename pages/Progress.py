import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Progress")

with open("docs/components/progress.md", "r") as f:
    st.markdown(f.read())
    
ui.progress(
    value=30,
    label="Upload progress",
    show_value=True,
)

st.write(ui.progress)
