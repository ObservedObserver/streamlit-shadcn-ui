import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Command Component")

with open("docs/components/command.md", "r") as f:
    st.markdown(f.read())

items = [
    {"label": "Calendar"},
    {"label": "Search Emoji"},
    {"label": "Calculator"},
]
ui.command(items=items, key="command1", title="Suggestions")

st.write(ui.command)