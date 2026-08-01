### Basic Usage

Each V2 checkbox owns one boolean value. Compose several checkboxes when the user may choose multiple options.

```python
import streamlit as st
import streamlit_shadcn_ui as ui

accepted = ui.checkbox(
    "Accept the terms",
    value=False,
)
st.write("Accepted:", accepted)

options = ["Email", "SMS", "Push"]
values = {
    option: ui.checkbox(option, key=f"channel_{index}")
    for index, option in enumerate(options)
}
selected = [option for option, checked in values.items() if checked]
st.write("Selected channels:", selected)
```

Use `disabled=True` to render a non-interactive checkbox and `on_change` for a Streamlit callback.
