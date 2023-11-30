import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Radio Group Component")
with open("docs/components/radio_group.md", "r") as f:
    st.markdown(f.read())

# Radio Group Component
radio_options = [
    {"label": "Option A", "value": "A", "id": "r1"},
    {"label": "Option B", "value": "B", "id": "r2"},
    {"label": "Option C", "value": "C", "id": "r3"}
]
radio_value = ui.radio_group(options=radio_options, default_value="B", key="radio1")
st.write("Selected Radio Option:", radio_value)

st.write(ui.radio_group)