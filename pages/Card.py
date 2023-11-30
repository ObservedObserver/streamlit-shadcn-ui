import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Card")

with open("docs/components/card.md", "r") as f:
    st.markdown(f.read())


with ui.card(key="card1"):
    ui.element("span", children=["Email"], className="text-gray-400 text-sm font-medium m-1", key="label1")
    ui.element("input", key="email_input", placeholder="Your email")

    ui.element("span", children=["User Name"], className="text-gray-400 text-sm font-medium m-1", key="label2")
    ui.element("input", key="username_input", placeholder="Create a User Name")
    ui.element("button", text="Submit", key="button", className="m-1")

st.write(ui.card)
