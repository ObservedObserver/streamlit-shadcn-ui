import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Carousel")

with open("docs/components/carousel.md", "r") as f:
    st.markdown(f.read())
    
ui.carousel(content=["1","2","3"], class_name=None, key="carousel1")

st.write(ui.carousel)