import streamlit as st
import streamlit_shadcn_ui.v2 as ui

st.header("Calendar")

with open("docs/components/calendar.md", "r") as f:
    st.markdown(f.read())
    
calendar_value = ui.calendar(key="calendar")
st.write("Calendar value is:", calendar_value)

st.write(ui.calendar)
