import streamlit as st
import streamlit_shadcn_ui.v2 as ui

st.header("Accordion")

with open("docs/components/accordion.md", "r") as f:
     st.markdown(f.read())
    
data = [
    {"trigger": "Is it accessible?", "content": "Yes. It adheres to the WAI-ARIA design pattern."},
    {"trigger": "Is it styled?", "content": "Yes. It comes with default styles that match the other components' aesthetic."},
    {"trigger": "Is it animated?", "content": "Yes. It's animated by default, but you can disable it if you prefer."},
]
open_sections = ui.accordion(data, key="accordion1")
st.write("Open sections:", open_sections)

st.write(ui.accordion)
