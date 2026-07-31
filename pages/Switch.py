import streamlit as st
import streamlit_shadcn_ui.v2 as ui

st.header("Switch")

with open("docs/components/switch.md", "r") as f:
    st.markdown(f.read())

# Switch Component
switch_value = ui.switch("Toggle Switch", value=False)
st.write("Switch is On:", switch_value)

st.write(ui.switch)
