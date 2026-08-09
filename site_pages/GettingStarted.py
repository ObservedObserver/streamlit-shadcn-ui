from __future__ import annotations

import streamlit as st

import streamlit_shadcn_ui as ui


st.set_page_config(
    page_title="Getting Started · Streamlit Shadcn UI",
    page_icon="🚀",
)

st.title("Get started with Streamlit Shadcn UI")
st.caption(
    "Install the V2-only package, build your first shadcn control, and then "
    "explore the complete component documentation."
)
ui.badges(
    items=[
        ("1.1.0", "default"),
        ("Components V2", "secondary"),
        ("No iframes", "outline"),
    ]
)

st.subheader("1. Install")
st.code("pip install streamlit-shadcn-ui", language="bash")
st.caption("Requires Python 3.10 or newer and Streamlit 1.60 or newer.")

st.subheader("2. Build your first app")
st.code(
    '''import streamlit as st
import streamlit_shadcn_ui as ui

fruit = ui.select(
    "Fruit",
    ["Apple", "Banana", "Orange"],
    value="Banana",
)

enabled = ui.switch("Enable notifications", value=True)

if ui.button("Save"):
    st.write({"fruit": fruit, "enabled": enabled})''',
    language="python",
)

with st.container(border=True):
    st.markdown("#### Live result")
    fruit = ui.select(
        "Fruit",
        ["Apple", "Banana", "Orange"],
        value="Banana",
    )
    enabled = ui.switch("Enable notifications", value=True)
    if ui.button("Save"):
        st.success(f"Saved: fruit={fruit}, notifications={enabled}")

st.info(
    "`key` is optional for ordinary calls. Add a stable key when controls "
    "are created in a loop, can be reordered, or need identity to survive "
    "changes to their other arguments."
)

st.subheader("3. Explore the documentation")
st.caption(
    "Start with Select to see the iframe-free overlay architecture, or open "
    "the Playground for a broader interactive example."
)

left, right = st.columns(2, gap="medium")
with left:
    if ui.button("Select documentation", width="stretch"):
        st.switch_page("pages/Select.py")
    if ui.button(
        "Date Picker documentation",
        variant="outline",
        width="stretch",
    ):
        st.switch_page("pages/DatePicker.py")
with right:
    if ui.button("Open Playground", width="stretch"):
        st.switch_page("site_pages/Playground.py")
    if ui.button(
        "Browse Button API",
        variant="outline",
        width="stretch",
    ):
        st.switch_page("pages/Button.py")
