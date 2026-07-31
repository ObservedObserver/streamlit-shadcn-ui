### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

tags = [f"v1.2.0-beta.{50 - i}" for i in range(50)]

ui.scroll_area(title="Tags", items=tags)
st.write(ui.scroll_area)
```
