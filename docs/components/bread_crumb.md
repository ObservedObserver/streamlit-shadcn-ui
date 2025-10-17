### Basic Usage

The breadcrumb component returns a click event when a user clicks on any breadcrumb item (except the current page). You can use this to handle navigation in your Streamlit app.

```py
import streamlit as st
import streamlit_shadcn_ui as ui

clicked = ui.breadcrumb(
    breadcrumb_items=[
        {"text": "Home", "href": "/"},
        {"text": "Components", "href": "/components"},
        {"text": "Breadcrumb", "isCurrentPage": True},
    ],
    class_name="flex gap-2 text-sm",
    key="breadcrumb1"
)

if clicked:
    st.write(f"Clicked: {clicked['text']} at index {clicked['index']}")
```

### Interactive Navigation Example

```py
import streamlit as st
import streamlit_shadcn_ui as ui

# Initialize current page in session state
if "current_page" not in st.session_state:
    st.session_state.current_page = 0

pages = ["Home", "Products", "Details"]

# Build breadcrumb items based on current page
breadcrumb_items = []
for i, page in enumerate(pages):
    breadcrumb_items.append({
        "text": page,
        "href": f"/{page.lower()}",
        "isCurrentPage": i == st.session_state.current_page
    })

# Handle breadcrumb clicks
clicked = ui.breadcrumb(
    breadcrumb_items=breadcrumb_items,
    class_name="flex gap-2 text-sm",
    key="nav_breadcrumb"
)

if clicked:
    st.session_state.current_page = clicked["index"]
    st.rerun()

st.write(f"Current page: {pages[st.session_state.current_page]}")
```

### Return Value

When a breadcrumb item is clicked, the component returns a dictionary with:
- `text`: The text of the clicked item
- `href`: The href value (if provided)
- `index`: The index of the clicked item in the breadcrumb_items list

Returns `None` when no item is clicked.