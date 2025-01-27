import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Accordtion")

with open("docs/components/accordtion.md", "r") as f:
     st.markdown(f.read())
    
data = [
    {"trigger": "Is it accessible?", "content": "Yes. It adheres to the WAI-ARIA design pattern."},
    {"trigger": "Is it styled?", "content": "Yes. It comes with default styles that match the other components' aesthetic."},
    {"trigger": "Is it animated?", "content": "Yes. It's animated by default, but you can disable it if you prefer."},
]
ui.accordtion(data = data, class_name=None, key="accordtion1")

st.write(ui.accordtion)