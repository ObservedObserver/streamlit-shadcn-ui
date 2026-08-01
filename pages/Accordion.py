import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Accordion")

with open("docs/components/accordion.md", "r") as f:
     st.markdown(f.read())
    
data = [
    ui.AccordionItem("accessible", "Is it accessible?", "Yes. It adheres to the WAI-ARIA design pattern."),
    ui.AccordionItem("styled", "Is it styled?", "Yes. It comes with styles that match the other components."),
    ui.AccordionItem("animated", "Is it animated?", "Yes. It is animated by default."),
]
open_sections = ui.accordion(data)
st.write("Open sections:", open_sections)

st.write(ui.accordion)
