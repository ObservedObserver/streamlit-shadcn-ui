"""Minimal app used to verify an installed Wave 1 distribution."""

import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.title("Installed Streamlit Shadcn UI V2 smoke")

selected = ui.select(
    "Installed Select",
    ["Alpha", "Beta", "Gamma"],
    key="installed_select",
)
action = ui.dropdown_menu(
    "Installed Menu",
    ["Inspect", "Archive"],
    key="installed_menu",
    menu_label="Actions",
)
checked = ui.checkbox(
    "Installed Checkbox",
    key="installed_checkbox",
)
clicked = ui.button(
    "Installed Button",
    key="installed_button",
)

st.write(
    {
        "selected": selected,
        "action": action,
        "checked": checked,
        "clicked": clicked,
    }
)
