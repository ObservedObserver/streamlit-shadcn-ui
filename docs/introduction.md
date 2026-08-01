# Introduction

`streamlit-shadcn-ui` 1.0 brings shadcn components to Streamlit through the
Streamlit Components V2 runtime.

```python
import streamlit_shadcn_ui as ui

fruit = ui.select(
    "Fruit",
    ["Apple", "Banana", "Orange"],
    value="Banana",
)
```

The package owns checked-in component source generated from shadcn's Base UI
registry. Base UI supplies interaction and accessibility behavior; shadcn
supplies composition and visual design. Streamlit supplies component lifecycle,
Python/JavaScript transport, and an isolated ShadowRoot.

There are no component iframes. Select, Dropdown Menu, Popover, Hover Card,
Date Picker, and Alert Dialog mount their overlays in the component's own
ShadowRoot and use the browser top layer to escape clipping and stacking
contexts.

The `key` argument is optional. Use it for dynamic or reorderable collections;
otherwise the package derives a private Streamlit-safe identity. Read state
from component return values and use documented callbacks. Internal transport
entries in `st.session_state` are private.

Version 1.0 requires Python 3.10+ and Streamlit 1.60+. It does not include the
old V1 iframe implementation. See the
[migration guide](./v2-compatibility-matrix.md) when upgrading from 0.1.x.
