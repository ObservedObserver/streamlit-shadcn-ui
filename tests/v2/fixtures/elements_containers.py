import streamlit as st
import streamlit_shadcn_ui as ui

st.title("Elements container acceptance")
st.session_state["runs"] = st.session_state.get("runs", 0) + 1
reverse = st.checkbox("Reverse panels")
st.button("Rerun")
st.caption(f"Runs: {st.session_state['runs']}")

with ui.elements(key="container-acceptance") as el:
    with el.tabs(key="settings", label="Settings"):
        for value, label in (
            reversed([("general", "General"), ("advanced", "Advanced")])
            if reverse
            else [("general", "General"), ("advanced", "Advanced")]
        ):
            with el.tab(value, label):
                if value == "general":
                    name = el.input("Name", key="name", value="Ada")
                    with el.accordion(key="sections", default_value=["details"]):
                        with el.accordion_item("details", "Details"):
                            enabled = el.checkbox("Enabled", key="enabled", value=True)
                            with el.collapsible("More", key="more"):
                                notes = el.textarea("Notes", key="notes")
                        with el.accordion_item(
                            "disabled", "Unavailable", disabled=True
                        ):
                            el.text("Should stay closed")
                else:
                    with el.scroll_area(key="scroll", height=160, label="Records"):
                        for index in range(30):
                            el.text(f"Record {index}")

st.write({"name": name.value, "enabled": enabled.value, "notes": notes.value})
st.subheader("Generated-control references")
ui.tabs(["General", "Advanced"], key="reference-tabs")
ui.accordion(
    [{"value": "details", "label": "Details", "content": "Reference"}],
    key="reference-accordion",
    value="details",
)
ui.button("More", key="reference-button", variant="outline")
