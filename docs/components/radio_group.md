### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui as ui

# Radio Group Component
radio_options = ["Option A", "Option B", "Option C", "Option D"]
radio_value = ui.radio_group(
    "Choose an option",
    radio_options,
    value="Option B",
)
st.write("Selected Radio Option:", radio_value)

st.write(ui.radio_group)
```
