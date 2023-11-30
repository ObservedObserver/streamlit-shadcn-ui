import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Tabs")

with open("docs/components/tabs.md", "r") as f:
    st.markdown(f.read())

value = ui.tabs(options=['PyGWalker', 'Graphic Walker', 'GWalkR', 'RATH'], default_value='PyGWalker', key="kanaries")

with ui.card(key="image"):
    if value == "PyGWalker":
        ui.element("img", src="https://pub-8e7aa5bf51e049199c78b4bc744533f8.r2.dev/pygwalker-banner.png", className="w-full")
        ui.element("link_button", text=value + " Github", url="https://github.com/Kanaries/pygwalker", className="mt-2", key="btn2")
    elif value == "Graphic Walker":
        ui.element("img", src="https://pub-8e7aa5bf51e049199c78b4bc744533f8.r2.dev/graphic-walker-banner.png", className="w-full")
        ui.element("link_button", text=value + " Github", url="https://github.com/Kanaries/graphic-walker", className="mt-2", key="btn2")
    elif value == "GWalkR":
        ui.element("img", src="https://pub-8e7aa5bf51e049199c78b4bc744533f8.r2.dev/gwalkr-banner.png", className="w-full")
        ui.element("link_button", text=value + " Github", url="https://github.com/Kanaries/gwalkr", className="mt-2", key="btn2")
    elif value == "RATH":
        ui.element("img", src="https://pub-8e7aa5bf51e049199c78b4bc744533f8.r2.dev/rath-painter.png", className="w-full")
        ui.element("link_button", text=value + " Github", url="https://github.com/Kanaries/Rath", className="mt-2", key="btn2")
    st.write("Selected:", value)

st.write(ui.tabs)
