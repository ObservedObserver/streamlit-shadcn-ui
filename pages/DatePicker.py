import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Date Picker")

with open("docs/components/date_picker.md", "r") as f:
    st.markdown(f.read())
    
dt = ui.date_picker(key="date_picker", label="Date Picker")

st.write("Date:", dt)

dt2 = ui.date_picker(key="date_picker2", label="Date Picker")


st.write(ui.date_picker)