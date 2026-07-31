import streamlit as st

import streamlit_shadcn_ui.v2 as ui

st.header("Breadcrumb")

with open("docs/components/bread_crumb.md", "r") as f:
    st.markdown(f.read())

clicked = ui.breadcrumb(
    items=[
        ui.BreadcrumbItem("Home", href="/"),
        ui.BreadcrumbItem("Components", href="/components"),
        ui.BreadcrumbItem("Breadcrumb", current=True),
    ],
)

if clicked:
    st.write("Clicked breadcrumb item:", clicked)
    st.info(f"You clicked on: **{clicked.text}** (index: {clicked.index})")

st.divider()

st.subheader("Interactive Example")
st.write("The breadcrumb now returns click events. You can use this to navigate between pages or update your app state.")

# Example with dynamic navigation
if "current_page" not in st.session_state:
    st.session_state.current_page = 2

pages = ["Home", "Components", "Breadcrumb"]

breadcrumb_items = []
for i, page in enumerate(pages):
    breadcrumb_items.append({
        "text": page,
        "href": f"/{page.lower()}",
        "current": i == st.session_state.current_page
    })

clicked2 = ui.breadcrumb(items=breadcrumb_items, key="breadcrumb2")

if clicked2:
    st.session_state.current_page = clicked2.index
    st.rerun()

st.write(f"Current page: **{pages[st.session_state.current_page]}**")
