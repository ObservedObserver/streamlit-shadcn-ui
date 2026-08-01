import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Input Component")

with open("docs/components/input.md", "r") as f:
    st.markdown(f.read())
    
# Input Component
input_value = ui.input(
    "Message",
    value="Hello, Streamlit!",
    type="text",
    placeholder="Enter text here",
)
st.write("Input Value:", input_value)

st.write(ui.input)
