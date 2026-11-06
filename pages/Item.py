import streamlit as st
import streamlit_shadcn_ui as ui

st.title("Item")
st.caption(
    "Compose member and resource rows with the default shadcn Item slots."
)

with ui.elements(key="item-demo") as el:
    with el.item_group(key="members"):
        with el.item(key="ada", variant="outline"):
            with el.item_media():
                el.avatar(fallback="AL", alt="Ada Lovelace")
            with el.item_content():
                el.item_title("Ada Lovelace")
                el.item_description("Workspace administrator")
            with el.item_actions():
                manage = el.button("Manage", key="manage")
        with el.item(key="grace", variant="outline"):
            with el.item_media():
                el.avatar(fallback="GH", alt="Grace Hopper")
            with el.item_content():
                el.item_title("Grace Hopper")
                el.item_description("Workspace member")
            with el.item_actions():
                el.badge("Member", variant="secondary")
if manage.clicked:
    st.info("Manage Ada selected.")
