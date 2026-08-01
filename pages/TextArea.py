import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Textarea")

with open("docs/components/textarea.md", "r") as f:
    st.markdown(f.read())

# Textarea Component
textarea_value = ui.textarea(
    "Message",
    value="Type your message here...",
    placeholder="Enter longer text",
)
st.write("Textarea Value:", textarea_value)

st.write(ui.textarea)
