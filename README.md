# streamlit-shadcn-ui :construction:

[![PyPI - Version](https://img.shields.io/pypi/v/streamlit-shadcn-ui)](https://pypi.org/project/streamlit-shadcn-ui/)
![PyPI - Downloads](https://img.shields.io/pypi/dm/streamlit-shadcn-ui)
[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://shadcn.streamlit.app/)

Using shadcn-ui components in streamlit

<img width="1453" alt="streamlit-shadcn" src="https://github.com/ObservedObserver/streamlit-shadcn-ui/assets/22167673/75620347-9e9c-454c-a7ce-381d7464c519">


## Installation

```bash
pip install streamlit-shadcn-ui
```

example:
```py
import streamlit_shadcn_ui as ui
trigger_btn = ui.button(text="Trigger Button", key="trigger_btn")

ui.alert_dialog(show=trigger_btn, title="Alert Dialog", description="This is an alert dialog", confirm_label="OK", cancel_label="Cancel", key="alert_dialog1")

```

## Components V2 migration

The accepted V2 architecture is available through an opt-in namespace. Install
its Streamlit floor explicitly:

```sh
pip install "streamlit-shadcn-ui[components-v2]"
```

Select, Dropdown Menu, Checkbox, and Button form the accepted Wave 1. Wave 2
adds the low-risk display catalog:

`alert`, `avatar`, `badge`, `badges`, `breadcrumb`, `card`, `metric_card`,
`aspect_ratio`, `progress`, `separator`, `skeleton`, `table`, and
`link_button`.

Wave 3 adds the inline and form catalog:

`input`, `textarea`, `input_otp`, `accordion`, `collapsible`, `pagination`,
`radio_group`, `scroll_area`, `slider`, `switch`, `tabs`, `toggle`,
`toggle_group`, and `calendar`.

Wave 4 completes the stable anchored-overlay catalog:

`popover`, `hover_card`, and single/range `date_picker`.

Wave 5 migrates the stable modal API:

`alert_dialog`.

For example:

```py
import streamlit_shadcn_ui.v2 as ui

fruit = ui.select(
    "Fruit",
    ["Apple", "Banana", "Orange"],
    key="fruit",
)
```

Component source is generated from a pinned, checked-in shadcn Base UI
registry snapshot; Base UI remains the interaction and accessibility
primitive. This is not a from-scratch replacement for shadcn.

Select, Dropdown Menu, Popover, Hover Card, and Date Picker portal into an
instance-owned overlay root in the same Streamlit ShadowRoot. The native
Popover top layer escapes Streamlit clipping and stacking contexts without an
iframe, a second popup iframe, or a popup in `document.body`.

Alert Dialog uses generated shadcn source backed by Base UI. Its popup stays in
the same ShadowRoot top-layer host. A versioned modal coordinator adds native
background `inert`, independent-root stacking, exact document-style
restoration, and WebKit launch-focus recovery without replacing the Base UI
dialog kernel.

V2 requires Python 3.10 or newer and Streamlit 1.60 or newer. V1 keeps its
existing package-wide compatibility floor.

The stable catalog implementation is complete, but V2 intentionally remains
opt-in while the Windows NVDA/Firefox promotion check and first published
feedback cycle remain open. The package root still points to V1. Applications
can also make that rollback choice explicit:

```py
import streamlit_shadcn_ui.v1 as ui
```

V2 return values and callbacks are public; its raw
`st.session_state[key]` protocol envelope is not.

Run a completed-wave acceptance page with:

```sh
./scripts/poc_v2.sh
./scripts/wave2_v2.sh
./scripts/wave3_v2.sh
./scripts/wave4_v2.sh
./scripts/wave5_v2.sh
```

See the
[Wave 1 acceptance record](docs/v2-wave1-acceptance.md),
[Wave 2 acceptance record](docs/v2-wave2-acceptance.md),
[Wave 3 acceptance record](docs/v2-wave3-acceptance.md),
[Wave 3 state contract](docs/v2-wave3-state-contract.md),
[Wave 4 acceptance record](docs/v2-wave4-acceptance.md),
[Wave 4 state and overlay contract](docs/v2-wave4-state-and-overlay-contract.md),
[Wave 5 acceptance record](docs/v2-wave5-acceptance.md),
[Wave 5 modal contract](docs/v2-wave5-modal-contract.md),
[Wave 5 modal decision](docs/adr/007-v2-alert-dialog-modal-effects.md),
[V1/V2 compatibility matrix](docs/v2-compatibility-matrix.md),
[cutover and rollback decision](docs/adr/008-v2-cutover-and-session-state.md),
[Wave 6 release-readiness record](docs/v2-wave6-release-readiness.md),
[full migration tracker](docs/v2-full-migration-tracker.md),
[anchored-overlay decision](docs/adr/001-v2-anchored-overlay-host.md), and
[migration plan](docs/v2-production-migration-plan.md). Waves 1–5 and the
Wave 6 technical compatibility decision are complete. A Windows NVDA/Firefox
promotion check plus a real opt-in release and feedback window remain the
deliberate gates before any default cutover.

## Components

Check docs and compoenent examples in [![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://shadcn.streamlit.app/)

+ [x] button
+ [x] checkbox
+ [x] select
+ [x] tabs
+ [x] card
+ [x] avatar
+ [x] date_picker
+ [x] date_range_picker (date_picker with mode="range")
+ [x] table
+ [x] input
+ [x] slider
+ [x] textarea
+ [x] switch
+ [x] radio_group
+ [x] alert_dialog
+ [x] hover_card
+ [x] badges
+ [x] link_button
+ [x] accordion
+ [x] alert
+ [x] aspect_ratio
+ [x] calendar
+ [x] carousel
+ [x] checkbox
+ [x] collapsible
+ [x] command
+ [x] dialog
+ [x] dropdown_menu
+ [x] input-OTP
+ [x] metric_card
+ [x] pagination
+ [x] popover
+ [x] progress
+ [x] radio_group
+ [x] resizable
+ [x] scroll_area
+ [x] separator
+ [x] skeleton
+ [x] toggle
+ [x] toggle_group

![streamlit card](https://github.com/ObservedObserver/streamlit-shadcn-ui/assets/22167673/799b9235-96a6-406e-b270-e685de9ba5fd)

![streamlit date picker](https://github.com/ObservedObserver/streamlit-shadcn-ui/assets/22167673/8c32c4e0-8aaf-421d-b459-bceb63f1dd0a)

![streamlit select](https://github.com/ObservedObserver/streamlit-shadcn-ui/assets/22167673/f5a6eb8d-163f-4a7b-b88b-9b962d32dc1b)



## One more thing
There is a new component in testing, it will allows you to nest all streamlit-shadcn-ui components together.
It will not treat each component as an independent streamlit custom component in iframe, but parse the component structure as data and render them all at once in one iframe.

example ([live demo](https://shadcn.streamlit.app/Experiment(Cool))):
```py
with ui.card(key="card1"):
    with ui.card(key="card2"):
        ui.element("input", key="card2_input")
        ui.element("button", key="card2_btn", text="Nest Submmit", variant="outline")
    ui.element("button", key="card1_btn", text="Hello World")
```

![streamlit react_component](https://github.com/ObservedObserver/streamlit-shadcn-ui/assets/22167673/ab40ed25-cc41-4630-adc9-7d604e44d538)

## Development Guide

There are several scripts in `scripts` folder to help you develop this project.

```sh
# For local development
./scripts/frontend.sh # frontend dev server
./scripts/frontend_v2.sh # V2 frontend watch build
./scripts/poc_v2.sh # build and run the independent V2 POC
./scripts/wave2_v2.sh # build and run the Wave 2 acceptance catalog
./scripts/wave3_v2.sh # build and run the Wave 3 state/form catalog
./scripts/wave4_v2.sh # build and run the Wave 4 anchored-overlay catalog
./scripts/wave5_v2.sh # build and run the Wave 5 modal catalog
./scripts/dev.sh # streamlit dev server
```

This repo follows the streamlit custom component structure.
+ `./streamlit_shadcn_ui` is the python package
    + `./streamlit_shadcn_ui/components` is the frontend mono repo
        + `./streamlit_shadcn_ui/components/packages/frontend` is the custom components collection.
        + `./streamlit_shadcn_ui/components/packages/streamlit-components-lib` is a patch of streamlit-components-lib for react 18 (For now, only the react/react-dom version is changed).
    + `./streamlit_shadcn_ui/py_components` is the python level API for components.



## Reference
+ [streamlit-shadcn-ui examples and docs repo](https://github.com/ObservedObserver/steamlit-shadcn-ui-docs)
+ [Streamlit](https://streamlit.io/)
+ [shadcn-ui](https://ui.shadcn.com/)

# License
This repo is under MIT license. See [LICENSE](LICENSE) for details.
`streamlit_shadcn_ui/components/packages/streamlit-components-lib` is under its original Apache-2.0 license. It is a temporal patch for streamlit-components-lib in react 18. 
