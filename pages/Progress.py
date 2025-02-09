import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Progress")

with open("docs/components/progress.md", "r") as f:
    st.markdown(f.read())
    
progress_value = ui.progress(data=30, key="progress1")

st.write(ui.progress)