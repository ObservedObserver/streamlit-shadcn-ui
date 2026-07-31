### Basic Usage

```python
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

page_value = ui.pagination(
    key="pagination1",
    total_pages=10,
    initial_page=1,
)
st.write("Selected page:", page_value)
```

### Parameters

- `key` (required): Stable Streamlit component identity.
- `total_pages` (default `3`): Total number of pages.
- `initial_page` (default `1`): Initial page.
- `sibling_count` (default `1`): Nearby page buttons shown on each side.
- `label`: Accessible pagination label.
- `disabled`: Disables pagination interaction.
- `on_change`: Streamlit callback invoked after a page change.
- `width`: `"stretch"`, `"content"`, or a pixel width.

### Large Page Counts

```python
page_value = ui.pagination(
    key="pagination_large",
    total_pages=100,
    initial_page=1,
    sibling_count=2,
)
st.write("Current page:", page_value)
```
