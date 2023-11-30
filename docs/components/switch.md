### Switch

```py
import streamlit as st
import streamlit_shadcn_ui as ui


switch_value = ui.switch(default_checked=True, label="Toggle Switch", key="switch1")
st.write("Switch is On:", switch_value)
```