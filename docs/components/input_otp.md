### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui
# Input OTP Component
otp_value = ui.input_otp(max_length=6, key="otp1")
st.write("OTP Value:", otp_value)
```