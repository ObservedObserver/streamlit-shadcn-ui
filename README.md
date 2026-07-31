# streamlit-shadcn-ui

[![PyPI - Version](https://img.shields.io/pypi/v/streamlit-shadcn-ui)](https://pypi.org/project/streamlit-shadcn-ui/)
![PyPI - Downloads](https://img.shields.io/pypi/dm/streamlit-shadcn-ui)
[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://shadcn.streamlit.app/)

shadcn components for Streamlit, implemented on Streamlit Components V2.

Version 1.0 is a V2-only release: it uses checked-in shadcn source backed by
Base UI, React 19, Tailwind CSS 4, and Streamlit's isolated Shadow DOM runtime.
Components render without an iframe. Anchored and modal overlays stay in their
own component ShadowRoot and use the browser top layer, so Select, Dropdown
Menu, Popover, Hover Card, Date Picker, and Alert Dialog are not clipped by the
Streamlit layout.

## Installation

```sh
pip install streamlit-shadcn-ui
```

Python 3.10 or newer and Streamlit 1.60 or newer are required.

## Quick start

```python
import streamlit as st
import streamlit_shadcn_ui as ui

fruit = ui.select(
    "Fruit",
    ["Apple", "Banana", "Orange"],
    value="Banana",
)

enabled = ui.switch("Enable notifications", value=True)

if ui.button("Save", variant="default"):
    st.write({"fruit": fruit, "enabled": enabled})
```

`key` is optional for ordinary calls. Add a stable key when components are
created from a loop, can be reordered, or need identity that survives changes
to their other arguments:

```python
for project in projects:
    ui.checkbox(project.name, key=f"project_{project.id}")
```

Choice components return the original Python values rather than their display
labels. Use `format_func`, `Choice`, or `MenuItem` to customize presentation
without changing the returned value.

## Components

- Choice and action: `select`, `dropdown_menu`, `radio_group`, `button`,
  `link_button`, `breadcrumb`, `pagination`
- Inputs: `checkbox`, `input`, `textarea`, `input_otp`, `slider`, `switch`,
  `toggle`, `toggle_group`
- Date and navigation: `calendar`, `date_picker`, `tabs`, `accordion`,
  `collapsible`
- Overlays: `popover`, `hover_card`, `alert_dialog`
- Display: `alert`, `avatar`, `badge`, `badges`, `card`, `metric_card`,
  `aspect_ratio`, `progress`, `scroll_area`, `separator`, `skeleton`, `table`

The repository's [Home.py](Home.py) and [component pages](pages) are executable
API documentation for the complete catalog.

## Architecture

The production component path is deliberately kept recognizable and
upgradable:

```text
Python API
  -> Streamlit Components V2 adapter
    -> owned generated shadcn component
      -> Base UI behavior primitive
```

shadcn owns the component palette, radius, typography, focus rings, and
interaction styling. Streamlit provides the surrounding light/dark color
scheme, language, and direction. The package does not restyle shadcn to look
like Streamlit.

Each call is an independently isolated V2 component. Precomposed helpers such
as Card, Popover, and Collapsible accept documented text or data arguments;
they do not accept arbitrary React children or nested Streamlit elements.

See the [1.0 API decision](docs/adr/011-v2-1.0-python-api.md),
[architecture plan](docs/v2-production-migration-plan.md), and
[V1-to-1.0 migration guide](docs/v2-compatibility-matrix.md) for the detailed
contracts.

## Migrating from 0.1.x

The 1.0 package root is the V2 API. The V1 iframe implementation and
`streamlit_shadcn_ui.v1` compatibility namespace are not shipped. Applications
that cannot migrate yet should remain on the last 0.1.x release.

The most common source changes are:

- `button(text=...)` becomes `button(label=...)`;
- grouped V1 checkboxes become ordinary composition of scalar checkboxes;
- `with ui.card(...)` becomes Streamlit layout around a declarative Card;
- low-level trigger/content helpers and experimental `element()` trees are
  removed;
- component return values and callbacks replace reliance on raw session-state
  transport dictionaries.

The full mapping is in the
[compatibility matrix](docs/v2-compatibility-matrix.md).

## Development

Use Node 22.20.0 and the pnpm version pinned in the frontend manifest.

```sh
./scripts/frontend_v2.sh            # watch the V2 frontend build
./scripts/dev.sh                    # run the documentation app
./scripts/verify_v2_release_source.sh
python3 -m pytest tests/v2 -q
```

The Python implementation lives in `streamlit_shadcn_ui/v2`, generated and
adapted frontend source in `streamlit_shadcn_ui/frontend_v2`, and release
assets in `streamlit_shadcn_ui/frontend_v2/dist`.

## References

- [Streamlit](https://streamlit.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Base UI](https://base-ui.com/)

## License

MIT. See [LICENSE](LICENSE).
