import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Slider")

with open("docs/components/slider.md", "r") as f:
    st.markdown(f.read())

# Slider Component
slider_value = ui.slider("Select a Value", min_value=0, max_value=100, value=20, step=2)
st.write("Slider Value:", slider_value)

slider_range = ui.slider("Select a Range", min_value=0, max_value=100, value=(20, 80), step=2)
st.write("Slider Range:", slider_range)

st.write(ui.slider)
