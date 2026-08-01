import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Date Picker")

with open("docs/components/date_picker.md", "r") as f:
    st.markdown(f.read())
    
dt = ui.date_picker("Date Picker")

st.write("Date Value:", dt)

dt2 = ui.date_picker("Date range", selection_mode="range")

st.write("Date Range:", dt2)


st.write(ui.date_picker)
