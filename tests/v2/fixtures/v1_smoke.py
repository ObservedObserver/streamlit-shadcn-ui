import streamlit as st
import streamlit_shadcn_ui as ui


st.title("V1 rollback smoke")
clicked = ui.button("Legacy button", key="legacy-button")
choice = ui.select(
    "Legacy select",
    ["Alpha", "Beta"],
    key="legacy-select",
)
st.write({"clicked": clicked, "choice": choice})
