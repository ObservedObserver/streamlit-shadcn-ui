### Basic Usage

The V2 card API is declarative: pass its title, description, and content directly. Use Streamlit columns or containers when composing cards into a larger page layout.

```python
import streamlit as st
import streamlit_shadcn_ui as ui

columns = st.columns(2)
with columns[0]:
    ui.card(
        title="Create project",
        content="Start from a clean V2 component surface.",
        description="Standard size",
    )
with columns[1]:
    ui.card(
        title="Activity",
        content="Three components were verified today.",
        description="Compact size",
        size="sm",
    )
```

`size` accepts `"default"` or `"sm"`. The component uses the standard shadcn Card source and theme tokens.
