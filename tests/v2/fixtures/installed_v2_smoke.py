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

input_value = ui.input(
    "Installed input",
    key="installed_input",
    label="Installed Input",
)
textarea_value = ui.textarea(
    "Installed textarea",
    key="installed_textarea",
    label="Installed Textarea",
)
accordion_value = ui.accordion(
    [{"trigger": "Installed question", "content": "Installed answer"}],
    key="installed_accordion",
)
collapsible_value = ui.collapsible(
    "Installed Collapsible",
    "First",
    ["Second"],
    key="installed_collapsible",
)
otp_value = ui.input_otp(
    "123",
    6,
    key="installed_otp",
)
pagination_value = ui.pagination(
    key="installed_pagination",
    total_pages=10,
)
radio_value = ui.radio_group(
    ["Alpha", "Beta"],
    "Alpha",
    key="installed_radio",
)
ui.scroll_area(
    "Installed Scroll Area",
    ["One", "Two"],
    key="installed_scroll",
)
slider_value = ui.slider(
    [25, 75],
    0,
    100,
    5,
    "Installed Slider",
    key="installed_slider",
)
switch_value = ui.switch(
    True,
    "Installed Switch",
    key="installed_switch",
)
tabs_value = ui.tabs(
    ["Overview", "Details"],
    "Overview",
    key="installed_tabs",
)
toggle_value = ui.toggle(
    False,
    "bold",
    key="installed_toggle",
)
toggle_group_value = ui.toggle_group(
    ["bold"],
    key="installed_toggle_group",
)
calendar_value = ui.calendar(
    key="installed_calendar",
    value="2026-07-30",
)

st.write(
    {
        "accordion": accordion_value,
        "selected": selected,
        "action": action,
        "calendar": calendar_value,
        "checked": checked,
        "clicked": clicked,
        "collapsible": collapsible_value,
        "crumb": crumb,
        "input": input_value,
        "otp": otp_value,
        "pagination": pagination_value,
        "radio": radio_value,
        "slider": slider_value,
        "switch": switch_value,
        "tabs": tabs_value,
        "textarea": textarea_value,
        "toggle": toggle_value,
        "toggle_group": toggle_group_value,
    }
)
