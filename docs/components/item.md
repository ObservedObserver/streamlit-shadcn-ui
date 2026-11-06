# Item

Item composes resource rows, members, search results, and settings inside one
Elements tree. The API uses the pinned shadcn Item slots and default styles.
It does not add a standalone `ui.item` widget.

```python
import streamlit as st
import streamlit_shadcn_ui as ui

with ui.elements(key="members") as el:
    with el.item_group(key="members"):
        with el.item(key="ada", variant="outline"):
            with el.item_media():
                el.avatar(fallback="AL", alt="Ada Lovelace")
            with el.item_content():
                el.item_title("Ada Lovelace")
                el.item_description("Workspace administrator")
            with el.item_actions():
                manage = el.button("Manage", key="manage")

if manage.clicked:
    st.write("Manage Ada")
```

`item` accepts `variant="default" | "outline" | "muted"` and
`size="default" | "sm" | "xs"`. Both defaults come from the pinned component.
An Item's direct children must be `item_media`, `item_content`, `item_actions`,
`item_header`, or `item_footer`. Multiple content slots are supported; the
other slots accept at most one occurrence each. `item_title(value)` and
`item_description(value)` belong inside `item_content`. They render plain
text with the generated typography, without an extra `text` wrapper.

`item_group` accepts Item rows and `item_separator()` only. Grouped Items
have list-item semantics. Standalone Items do not claim a list-item role.
Headers, footers, content, and actions can contain supported Elements nodes,
including existing Button, Badge, and input controls. Native `st.*` children
are not supported.

`avatar(src=None, fallback="?", alt=None, size="default")` renders the pinned
Avatar directly. Its sizes are `sm`, `default`, and `lg`. The fallback remains
available if an image fails to load. Provide a meaningful `alt` for portraits.

The media slot accepts one Avatar or Spinner. With `variant="image"`, it
accepts exactly one `item_image`. Separators in groups are decorative.

For file thumbnails, use `item_image` inside an image media slot. The generated
ItemMedia controls the image dimensions, crop, and radius; `el.image` is a
separate Aspect Ratio component and is not supported in Item media.

```python
import streamlit_shadcn_ui as ui

with ui.elements(key="files") as el:
    with el.item(size="xs", variant="muted"):
        with el.item_media(variant="image"):
            el.item_image("https://example.com/preview.png", alt="Report preview")
        with el.item_content():
            el.item_title("report.png")
            el.item_description("Image export")
```

Give each Item a stable key when rendering dynamic lists. Button callbacks
receive the item-scoped node ID; reordering rows does not change that ID.
Read handles after the Elements context exits. Items do not introduce their
own selection state or row-click event: put actions in `item_actions`.
