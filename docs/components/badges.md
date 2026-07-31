### Basic Usage

```py
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

ui.badges(
    badge_list=[
        ("default", "default"),
        ("secondary", "secondary"),
        ("outline", "outline"),
        ("Hello", "destructive"),
    ],
    key="badges1",
)
```
