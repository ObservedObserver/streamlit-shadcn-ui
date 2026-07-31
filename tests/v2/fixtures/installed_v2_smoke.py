"""Minimal app used to verify an installed Components V2 distribution."""

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
crumb = ui.breadcrumb(
    [
        {"text": "Installed", "href": "/"},
        {"text": "Smoke", "isCurrentPage": True},
    ],
    key="installed_breadcrumb",
)

ui.alert(
    "Installed Alert",
    "Wheel or sdist display source is available.",
    key="installed_alert",
)
ui.avatar(fallback="V2", key="installed_avatar")
ui.badges(
    [("Installed", "default"), ("Ready", "secondary")],
    key="installed_badges",
)
ui.card(
    "Installed Card",
    "Content",
    "Description",
    key="installed_card",
)
ui.metric_card(
    "Installed Metric",
    "16",
    "component hosts",
    key="installed_metric_card",
)
ui.aspect_ratio(
    (
        "data:image/svg+xml,"
        "%3Csvg xmlns='http://www.w3.org/2000/svg' "
        "viewBox='0 0 16 9'%3E"
        "%3Crect width='16' height='9' fill='%232563eb'/%3E"
        "%3C/svg%3E"
    ),
    "Installed aspect ratio",
    key="installed_aspect_ratio",
)
ui.progress(
    75,
    key="installed_progress",
    label="Installed progress",
    show_value=True,
)
ui.separator(key="installed_separator")
ui.skeleton(
    key="installed_skeleton",
    width_px="100%",
    height_px=20,
)
ui.table(
    [{"component": "V2", "status": "Ready"}],
    [
        {"key": "component", "label": "Component"},
        {"key": "status", "label": "Status"},
    ],
    key="installed_table",
    caption="Installed table",
)
ui.link_button(
    "Installed Link",
    "https://example.com",
    key="installed_link",
)

st.write(
    {
        "selected": selected,
        "action": action,
        "checked": checked,
        "clicked": clicked,
        "crumb": crumb,
    }
)
