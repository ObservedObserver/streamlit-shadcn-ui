### Basic Usage

```python
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

columns = st.columns([1, 4])
with columns[0]:
    ui.skeleton(
        key="skeleton_circle",
        width_px=48,
        height_px=48,
        shape="circle",
        width="content",
    )
with columns[1]:
    ui.skeleton(
        key="skeleton_line_1",
        width_px="100%",
        height_px=16,
    )
    ui.skeleton(
        key="skeleton_line_2",
        width_px="80%",
        height_px=16,
    )
```

`shape` accepts `"rectangle"` or `"circle"`. Dimensions accept pixel numbers or CSS dimensions such as `"80%"` and `"12rem"`.
