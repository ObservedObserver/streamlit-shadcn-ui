"""Real Streamlit chart acceptance app. Run from the repository root."""

import pandas as pd
import streamlit as st
import streamlit_shadcn_ui as ui

st.set_page_config(page_title="Chart acceptance", layout="wide")
st.title("Chart acceptance")
scale = st.selectbox("Dataset", ["Original", "Doubled"])
factor = 1 if scale == "Original" else 2
legend = st.checkbox("Show legends", value=True)
tooltip = st.checkbox("Show tooltips", value=True)
data = pd.DataFrame(
    [
        {"month": name, "desktop": a * factor, "mobile": b * factor}
        for name, a, b in [
            ("Jan", 186, 80),
            ("Feb", 305, 200),
            ("Mar", 237, 120),
            ("Apr", 73, 190),
            ("May", 209, 130),
            ("Jun", 214, 140),
        ]
    ]
)
segments = [
    {"device": name, "visitors": value * factor}
    for name, value in [("Desktop", 275), ("Mobile", 200), ("Tablet", 90)]
]
series = {"desktop": "Desktop", "mobile": "Mobile"}
options = {"show_legend": legend, "show_tooltip": tooltip}
left, right = st.columns(2)
with left:
    ui.line_chart(data, "month", series, title="Line", key="line", **options)
    ui.bar_chart(data, "month", series, title="Bar", key="bar", **options)
    ui.pie_chart(segments, title="Pie", key="pie", **options)
    ui.radar_chart(data, "month", series, title="Radar", key="radar", **options)
with right:
    ui.area_chart(data, "month", series, title="Area", key="area", **options)
    ui.bar_chart(
        data,
        "month",
        series,
        stacked=True,
        horizontal=True,
        title="Horizontal stacked bar",
        key="horizontal",
        **options,
    )
    ui.pie_chart(segments, donut=True, title="Donut", key="donut", **options)
    ui.radial_chart(segments, title="Radial", key="radial", **options)
ui.area_chart(
    data, "month", series, stacked=True, title="Stacked area", key="stacked", **options
)
gaps = [
    {"day": "series-0", "sales": 10},
    {"day": "Tue", "sales": None},
    {"day": "Wed", "sales": 20},
    {"day": "Thu", "sales": 15},
]
ui.line_chart(
    gaps, title="Missing values", key="gaps", show_legend=False, show_tooltip=tooltip
)
st.write("Current first value:", 186 * factor)
