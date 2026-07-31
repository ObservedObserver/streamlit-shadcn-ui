import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.header("V2 Dashboard Composition")
ui.badges(
    badge_list=[
        ("DataFrame", "default"),
        ("with", "secondary"),
        ("shadcn", "outline"),
    ],
    key="visualization_badges",
)
st.caption(
    "Compose data-driven Streamlit pages with typed V2 shadcn components."
)

metric_columns = st.columns(3)
with metric_columns[0]:
    ui.metric_card(
        title="V2 Components",
        content="35",
        description="Documented public surfaces",
        key="component_metric",
    )
with metric_columns[1]:
    ui.metric_card(
        title="Browser Errors",
        content="0",
        description="Canonical page verification",
        key="error_metric",
    )
with metric_columns[2]:
    ui.metric_card(
        title="Architecture",
        content="Shadow DOM",
        description="shadcn + Base UI",
        key="architecture_metric",
    )

action_columns = st.columns([1, 1, 4])
with action_columns[0]:
    ui.link_button(
        "Get Started",
        "https://github.com/ObservedObserver/streamlit-shadcn-ui#readme",
        key="visualization_get_started",
        width="stretch",
    )
with action_columns[1]:
    ui.link_button(
        "GitHub",
        "https://github.com/ObservedObserver/streamlit-shadcn-ui",
        key="visualization_github",
        variant="outline",
        width="stretch",
    )

component_data = [
    {"component": "Select", "interactions": 92, "status": "Ready"},
    {"component": "Date Picker", "interactions": 78, "status": "Ready"},
    {"component": "Tabs", "interactions": 65, "status": "Ready"},
    {"component": "Table", "interactions": 58, "status": "Ready"},
    {"component": "Dialog", "interactions": 44, "status": "Ready"},
]

with st.container(border=True):
    st.subheader("Example interaction volume")
    for index, row in enumerate(component_data):
        ui.progress(
            row["interactions"],
            key=f"component_progress_{index}",
            label=row["component"],
            show_value=True,
        )

ui.table(
    component_data,
    key="visualization_table",
    caption="V2 component verification sample",
)
