import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Aspect Ratio")

with open("docs/components/aspect_ratio.md", "r") as f:
    st.markdown(f.read())

ui.aspect_ratio(
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80",
    alt="Photo by Drew Beamer",
    ratio=16/9,  
    class_name="rounded-md",
    key="aspect1"
)

st.write(ui.aspect_ratio)