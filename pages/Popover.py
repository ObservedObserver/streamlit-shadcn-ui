import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Popover")

with open("docs/components/popover.md", "r") as f:
    st.markdown(f.read())
    
ui.popover(key="popover1", label="popover", content="Place content for the popover here.")

st.write(ui.popover)