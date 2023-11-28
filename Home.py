import streamlit as st
import streamlit_shadcn_ui as ui
with open("docs/introduction.md", "r") as f:
    st.markdown(f.read())

# ui.date_picker()

from streamlit_shadcn_ui import slider, input, textarea, radio_group, switch
from streamlit_extras.stylable_container import stylable_container

ui_result = ui.button("Button", key="btn")
st.write("UI Button Clicked:", ui_result)
st.write(st.session_state.get("btn"))

st_result = ui.button("Button", key="btn2")
st.write("ST Button Clicked:", st_result)
st.write(st.session_state.get("btn2"))



# Slider Component
slider_value = slider(default_value=[20], min_value=0, max_value=100, step=2, label="Select a Range", key="slider1")
st.write("Slider Value:", slider_value)

# Input Component
input_value = input(default_value="Hello, Streamlit!", type='text', placeholder="Enter text here", key="input1")
st.write("Input Value:", input_value)

# Textarea Component
textarea_value = textarea(default_value="Type your message here...", placeholder="Enter longer text", key="textarea1")
st.write("Textarea Value:", textarea_value)

# Radio Group Component
radio_options = [
    {"label": "Option A", "value": "A", "id": "r1"},
    {"label": "Option B", "value": "B", "id": "r2"},
    {"label": "Option C", "value": "C", "id": "r3"}
]
radio_value = radio_group(options=radio_options, default_value="B", key="radio1")
st.write("Selected Radio Option:", radio_value)

# Switch Component
switch_value = switch(default_checked=True, label="Toggle Switch", key="switch1")
st.write("Switch is On:", switch_value)

st.header("Button Component")
trigger_btn = ui.button(text="Trigger Button", key="trigger_btn")
ui.alert_dialog(show=trigger_btn, title="Alert Dialog", description="This is an alert dialog", confirm_label="OK", cancel_label="Cancel", key="alert_dialog1")

st.header("Nest Element 1")

with ui.card(key="base_ele_card_l1"):
    with ui.card(key="base_ele_card_l2"):
    # with ui.element("card", key="base_ele1") as card2:
        ui.element("input", key="nst2_input", label="Value")
        ui.element("button", key="nst2_btn", text="Nest Submmit", variant="outline")

    ui.element("button", key="nst_btn", text="Hello World")

st.header("Nest Element 2")
card = ui.element("card", key="base_ele_2")
card2 = ui.element("card", key="base_ele2_2")
card2.add_child(ui.element("input", key="nst2_input_2", label="Value"))
card2.add_child(ui.element("button", key="nst2_btn_2", text="Nest Submmit", variant="outline"))
card.add_child(card2)
card.add_child(ui.element("button", key="nst_btn_2", text="Hello World"))
card.render()