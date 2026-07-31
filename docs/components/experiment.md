### V2 Composition

V2 intentionally replaces the experimental generic `element()` renderer with typed component APIs. Streamlit owns the page layout, while each V2 component owns its shadcn markup, Base UI behavior, accessibility, and Shadow DOM styling.

```python
import streamlit as st
import streamlit_shadcn_ui.v2 as ui

columns = st.columns(2)
with columns[0]:
    ui.card(
        title="Typed components",
        content="No generic DOM renderer is required in V2.",
        description="shadcn + Base UI",
        key="composition_card",
    )
with columns[1]:
    project_name = ui.input(
        label="Project name",
        placeholder="streamlit-shadcn-ui",
        key="composition_input",
    )
    submitted = ui.button(
        "Create project",
        key="composition_button",
    )

st.write({"project_name": project_name, "submitted": submitted})
```

This keeps arbitrary Tailwind and DOM injection out of the public Python API, so registry updates and accessibility behavior remain verifiable for the 1.0 release.
