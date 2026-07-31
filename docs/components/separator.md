### Basic Usage

```python
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

st.write("Streamlit Shadcn UI")
ui.separator(key="horizontal_separator")
st.caption("An open-source UI component library.")

columns = st.columns([1, 0.1, 1])
with columns[0]:
    st.write("Docs")
with columns[1]:
    ui.separator(
        key="vertical_separator",
        orientation="vertical",
        width="content",
    )
with columns[2]:
    st.write("Source")
```

`orientation` accepts `"horizontal"` or `"vertical"`.
