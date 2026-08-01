import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Radio Group")
with open("docs/components/radio_group.md", "r") as f:
    st.markdown(f.read())

# Radio Group Component
radio_options = [
    ui.Choice("A", "Option A"),
    ui.Choice("B", "Option B"),
    ui.Choice("C", "Option C"),
    ui.Choice("D", "Option D"),
]
radio_value = ui.radio_group(
    "Choose an option",
    radio_options,
    value="B",
)
st.write("Selected Radio Option:", radio_value)

st.write(ui.radio_group)
