### Basic Usage

```py
ui.breadcrumb(
     breadcrumb_items=[
        {"text": "Home", "href": "/"},
        {"text": "Components", "href": "/components"},
        {"text": "Breadcrumb", "isCurrentPage": True},
    ],
    class_name="flex gap-2 text-sm",
    key="breadcrumb1"
)

st.write(ui.breadcrumb)
```