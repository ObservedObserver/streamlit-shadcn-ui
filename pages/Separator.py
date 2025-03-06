import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Separator")

with open("docs/components/separator.md", "r") as f:
    st.markdown(f.read())

with ui.element("div", key="base_ele_div_s1", className="space-y-1"):
    ui.element("h4", key="header_1", className="text-sm font-medium leading-none", children="Streamlit Shadcn UI")
    ui.element("p", key="p_1", className="text-sm text-muted-foreground", children="An open-source UI component library.")
    ui.element("separator", key="separator_0",orientation="horizontal")
    with ui.element("div", key="base_ele_div_s2", className="flex h-5 items-center space-x-4 text-sm"):
        ui.element("div", key="base_ele_div_s3",children="Blog")
        ui.element("separator", key="separator_1",orientation="vertical",className="h-5")
        ui.element("div", key="base_ele_div_s4",children="Docs")
        ui.element("separator", key="separator_2",orientation="vertical",className="h-5")
        ui.element("div", key="base_ele_div_s5",children="Source")

