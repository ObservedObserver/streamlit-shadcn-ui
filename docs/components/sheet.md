# Sheet

Sheet opens a side panel within an Elements tree. Use it for filters, record
details, and editing forms. It supports the pinned shadcn `right` default and
`left`, `top`, and `bottom` sides without changing their dimensions or styles.

```python
import streamlit as st
import streamlit_shadcn_ui as ui

with ui.elements(key="profile") as el:
    with el.sheet(
        "Edit profile",
        key="details",
        description="Review before closing.",
        trigger_label="Open profile",
        side="right",
    ):
        name = el.input("Display name", "Ada", key="name")
        with el.sheet_footer():
            save = el.button("Save without closing", key="save")
            done = el.sheet_close_button("Done", key="done")

st.write(name.value, save.clicked, done.clicked)
```

Opening, Escape, outside dismissal, and closing stay in the browser. A normal
footer button emits an action and keeps the panel open across its Python rerun.
`sheet_close_button` closes before emitting its action. Application code owns
saving and validation; closing does not imply saving or rolling back values.

The trigger accepts the existing Button `trigger_variant` and `trigger_size`
options and `disabled`. `show_close_button=False` hides the built-in close button;
Escape, outside dismissal, and a footer close button remain available.

Use stable root and Sheet keys to retain open state during reruns. Removing or
re-keying the Sheet unmounts it. Closed content follows Base UI's popup lifecycle;
input values remain in the Elements state while their keyed nodes stay declared.
The shared modal coordinator serializes competing modal requests, locks host
scrolling, and restores focus when the panel closes.

A Sheet accepts supported Elements nodes and at most one `sheet_footer`.
The footer accepts Button, Link Button, and `sheet_close_button` nodes. Native
`st.*` elements cannot be children. Like Dialog, action-bearing Sheet trees
cannot be placed inside `st.form`.

Long content should use a bounded Scroll Area inside the panel once that
Elements container is available. Sheet itself retains the upstream layout and
does not add an adapter-specific scrolling region. When independent modal requests overlap, the newest modal becomes active and
the previous one resumes after it closes. Only one modal is active at a time.

RTL direction and keyboard focus are supported, but the pinned preset has
`rtl: false` and does not mirror the built-in close button. Its fixed top-right
placement can overlap a right-aligned title. For RTL content, use
`show_close_button=False` with a labeled footer close button. This retains
upstream options; the adapter does not override close positioning or title
padding. RTL browser tests cover direction and focus, not fully mirrored layout.

The source is captured from the repository's pinned shadcn commit and nova CSS.
No preset, theme, existing control styles, or package versions are changed.
