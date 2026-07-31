### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

is_open = ui.collapsible(
    title="@peduarte starred 3 repositories",
    first_item="@base-ui-components/react",
    items=["shadcn/ui", "streamlit/streamlit"],
    key="collapsible1",
)
st.write("Open:", is_open)

st.write(ui.collapsible)
```
