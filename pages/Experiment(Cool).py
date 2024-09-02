import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Experiment(Cool)")

with open("docs/components/experiment.md", "r") as f:
    st.markdown(f.read())

with ui.card(key="base_ele_card_l1"):
    with ui.element("div", key="base_ele_div_l1", className="text-red-500 bg-red-400"):
        ui.element("h1", "hello world")
    with ui.card(key="base_ele_card_l2"):
    # with ui.element("card", key="base_ele1") as card2:
        ui.element("input", key="nst2_input")
        ui.element("button", key="nst2_btn", text="Nest Submmit", variant="outline")

    ui.element("button", key="nst_btn", text="Hello World2")

st.write(ui.element)
