import streamlit as st

import streamlit_shadcn_ui as ui


st.header("Checkbox")

with open("docs/components/checkbox.md", "r") as f:
    st.markdown(f.read())

st.subheader("Single choices")
single_options = [
    ("I am Checkbox 1", True),
    ("I am Checkbox 2", False),
    ("I am Checkbox 3", False),
]
single_values = [
    ui.checkbox(
        label,
        value=default_checked,
        key=f"single_checkbox_{index}",
    )
    for index, (label, default_checked) in enumerate(single_options)
]
st.write("Checkbox values:", single_values)

st.subheader("Multiple choices")
multiple_options = ["Option A", "Option B", "Option C", "Option D"]
multiple_values = {
    label: ui.checkbox(label, key=f"multiple_checkbox_{index}")
    for index, label in enumerate(multiple_options)
}
selected_options = [
    label for label, checked in multiple_values.items() if checked
]
st.write("Selected options:", selected_options)

st.write(ui.checkbox)
