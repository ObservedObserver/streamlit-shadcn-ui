from pathlib import Path

import streamlit as st
import streamlit_shadcn_ui as ui


st.header("Sheet")
st.caption("Details and filters in a side panel within one Elements tree.")
side = st.selectbox("Side", ["right", "left", "top", "bottom"])
with ui.elements(key="sheet-demo") as el:
    with el.sheet(
        "Edit profile",
        key="profile-sheet",
        side=side,
        description="Review the profile before closing.",
        trigger_label="Open profile sheet",
    ):
        name = el.input("Display name", "Ada", key="name")
        with el.sheet_footer():
            save = el.button("Save without closing", key="save")
            done = el.sheet_close_button("Done", key="done")

st.write("Display name:", name.value)
st.write("Sheet action:", "save" if save.clicked else "done" if done.clicked else "none")
st.markdown((Path(__file__).resolve().parents[1] / "docs/components/sheet.md").read_text())
