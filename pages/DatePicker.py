import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Date Picker")
dt = ui.date_picker(key="date_picker")

st.write("Date:", dt)
