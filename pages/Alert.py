import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Alert")

with open("docs/components/alert.md", "r") as f:
    st.markdown(f.read())
    
ui.alert(title="Heads up!", description =" You can add components to your app using the cli.", key="alert1")

st.write(ui.alert)