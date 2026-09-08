from pathlib import Path

import pandas as pd
import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Charts")
st.markdown(Path("docs/components/charts.md").read_text())

visitors = pd.DataFrame(
    [
        {"month": "Jan", "desktop": 186, "mobile": 80},
        {"month": "Feb", "desktop": 305, "mobile": 200},
        {"month": "Mar", "desktop": 237, "mobile": 120},
        {"month": "Apr", "desktop": 73, "mobile": 190},
        {"month": "May", "desktop": 209, "mobile": 130},
        {"month": "Jun", "desktop": 214, "mobile": 140},
    ]
)
devices = [
    {"device": "Desktop", "visitors": 275},
    {"device": "Mobile", "visitors": 200},
    {"device": "Tablet", "visitors": 90},
]
series = {"desktop": "Desktop", "mobile": "Mobile"}

ui.line_chart(visitors, "month", series, title="Line chart", key="docs-line")
st.code('ui.line_chart(visitors, "month", {"desktop": "Desktop", "mobile": "Mobile"})')
ui.area_chart(
    visitors, "month", series, stacked=True, title="Stacked area chart", key="docs-area"
)
st.code('ui.area_chart(visitors, "month", ["desktop", "mobile"], stacked=True)')
ui.bar_chart(visitors, "month", series, title="Bar chart", key="docs-bar")
st.code('ui.bar_chart(visitors, "month", ["desktop", "mobile"])')
ui.pie_chart(devices, donut=True, title="Donut chart", key="docs-pie")
st.code('ui.pie_chart(devices, names="device", values="visitors", donut=True)')
ui.radar_chart(visitors, "month", series, title="Radar chart", key="docs-radar")
st.code('ui.radar_chart(visitors, "month", ["desktop", "mobile"])')
ui.radial_chart(
    devices,
    title="Radial chart",
    description="Relative visitor counts by device",
    key="docs-radial",
)
st.code('ui.radial_chart(devices, names="device", values="visitors")')

st.caption(
    "Charts use native shadcn tooltips and legends. For a tabular alternative, render the same data with ui.table."
)
