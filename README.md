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

## Components

Check docs and compoenent examples in [![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://shadcn.streamlit.app/)

+ [x] button
+ [x] checkbox
+ [x] select
+ [x] tabs
+ [x] card
+ [x] avatar
+ [x] date_picker
+ [ ] date_range_picker
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
