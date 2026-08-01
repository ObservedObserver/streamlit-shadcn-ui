### Basic Usage

```python
import streamlit as st
import streamlit_shadcn_ui as ui

columns = st.columns([1, 4])
with columns[0]:
    ui.skeleton(
        skeleton_width=48,
        skeleton_height=48,
        shape="circle",
        width="content",
    )
with columns[1]:
    ui.skeleton(
        skeleton_width="100%",
        skeleton_height=16,
    )
    ui.skeleton(
        skeleton_width="80%",
        skeleton_height=16,
    )
```

`shape` accepts `"rectangle"` or `"circle"`. Dimensions accept pixel numbers or CSS dimensions such as `"80%"` and `"12rem"`.
