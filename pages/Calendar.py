import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Calendar")

with open("docs/components/calendar.md", "r") as f:
    st.markdown(f.read())
    
calendar_calue = ui.calendar(class_name=None, key="calendar")
st.write("Calendar value is:", calendar_calue)

st.write(ui.calendar)