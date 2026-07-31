### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

items = [
    ui.AccordionItem("accessibility", "Is it accessible?", "Yes. It follows the WAI-ARIA pattern."),
    ui.AccordionItem("styling", "Is it styled?", "Yes. It uses the shadcn default style."),
]
open_section = ui.accordion(items, value="accessibility")
st.write("Open section:", open_section)

st.write(ui.accordion)
```
