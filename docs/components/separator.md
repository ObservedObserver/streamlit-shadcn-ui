### Basic Usage

```python
import streamlit as st
import streamlit_shadcn_ui as ui

st.write("Streamlit Shadcn UI")
ui.separator()
st.caption("An open-source UI component library.")

columns = st.columns([1, 0.1, 1])
with columns[0]:
    st.write("Docs")
with columns[1]:
    ui.separator(
        orientation="vertical",
        width="content",
    )
with columns[2]:
    st.write("Source")
```

`orientation` accepts `"horizontal"` or `"vertical"`.
