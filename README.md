# streamlit-shadcn-ui :construction:

> streamlit-shadcn-ui is in early development, the updates is shipped frequently. A relative stable will be launched after 11/27 2023. Follow the developer on twitter for updates: ![Follow ob12er](https://img.shields.io/twitter/follow/ob12er)


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

<img width="735" alt="POC example" src="https://github.com/ObservedObserver/streamlit-shadcn-ui/assets/22167673/ace9670f-64a4-4417-973e-7f8a86c704e2">

## Reference
+ [streamlit-shadcn-ui examples and docs repo](https://github.com/ObservedObserver/steamlit-shadcn-ui-docs)
+ [Streamlit](https://streamlit.io/)
+ [shadcn-ui](https://ui.shadcn.com/)

# License
This repo is under MIT license. See [LICENSE](LICENSE) for details.
`streamlit_shadcn_ui/components/packages/streamlit-components-lib` is under its original Apache-2.0 license. It is a temporal patch for streamlit-components-lib in react 18. 
