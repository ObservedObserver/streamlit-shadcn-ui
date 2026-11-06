import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Sheet acceptance")
st.session_state["runs"] = st.session_state.get("runs", 0) + 1
st.write("Python runs:", st.session_state["runs"])
for side in ("right", "left", "top", "bottom"):
    with ui.elements(key=f"sheet-{side}") as el:
        with el.sheet(f"{side} details", key="details", side=side,
                      description="Edit this record.", trigger_label=f"Open {side}"):
            name = el.input("Name", "Ada", key="name")
            with el.sheet_footer():
                save = el.button("Save", key="save")
                done = el.sheet_close_button("Done", key="done")
    if save.clicked:
        st.session_state["saves"] = st.session_state.get("saves", 0) + 1
    if done.clicked:
        st.session_state["closes"] = st.session_state.get("closes", 0) + 1
    st.write(f"{side} name:", name.value)
st.write("Saves:", st.session_state.get("saves", 0))
st.write("Closes:", st.session_state.get("closes", 0))
