import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Skeleton")

with open("docs/components/skeleton.md", "r") as f:
    st.markdown(f.read())

with ui.element("div", key="base_ele_div_l2", className="flex items-center space-x-4"):
    ui.element("circle", key="skeleton_circle_1",className="h-12 w-12")
    with ui.element("div", key="base_ele_div_l3", className="space-y-2"): 
        ui.element("rectangle", key="skeleton_rectangle_1",className="h-4 w-48")
        ui.element("rectangle", key="skeleton_rectangle_2",className="h-4 w-44")
