import streamlit as st
import streamlit_shadcn_ui.v2 as ui

st.header("Input-OTP Component")

with open("docs/components/input_otp.md", "r") as f:
    st.markdown(f.read())

# Input OTP Component
otp_value = ui.input_otp(
    max_length=6,
    label="One-time password",
    key="otp1",
)
st.write("OTP Value:", otp_value)

st.write(ui.input_otp)
