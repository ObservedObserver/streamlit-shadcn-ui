import streamlit as st
import streamlit_shadcn_ui as ui

cols = st.columns([0.7, 0.3])

with cols[0]:
    ui.textarea(key="textarea1", className="w-full h-96")
with cols[1]:
    # st.text("Mode")
    ui.tabs(options=["Ma", "HT", "BA"], default_value="Ma", className="w-full", key="tabs1")
    with ui.element("div", className="flex flex-col gap-4 text-sm text-gray-500"):
        with ui.element("div", className="flex justify-between"):
            
            ui.element("h2", className="font-medium", children=["Model"])
        ui.element("__select", className="my-0")
        
        with ui.element("div", className="flex justify-between"):
            
            ui.element("h2", className="font-medium", children=["Temperature"])
            ui.element("span", children=["0.2"])
        ui.element("slider", default_value=[20], min_value=0, max_value=100, step=2, key="slider1")
        with ui.element("div", className="flex justify-between"):
            
            ui.element("h2", className="font-medium", children=["Maximum Length"])
            ui.element("span", children=["0.2"])
        ui.element("slider", default_value=[20], min_value=0, max_value=100, step=2, key="slider2")
        with ui.element("div", className="flex justify-between"):
            
            ui.element("h2", className="font-medium", children=["Top P"])
            ui.element("span", children=["0.2"])
        ui.element("slider", default_value=[20], min_value=0, max_value=100, step=2, key="slider3")
