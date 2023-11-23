# streamlit-shadcn-ui :construction:

[![PyPI - Version](https://img.shields.io/pypi/v/streamlit-shadcn-ui)](https://pypi.org/project/streamlit-shadcn-ui/)
[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://shadcn.streamlit.app/)

Using shadcn-ui components in streamlit


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
