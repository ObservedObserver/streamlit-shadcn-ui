import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.header("V2 Dashboard Composition")
ui.badges(
    items=[
        ("DataFrame", "default"),
        ("with", "secondary"),
        ("shadcn", "outline"),
    ],
)
st.caption(
    "Compose data-driven Streamlit pages with typed V2 shadcn components."
)

metric_columns = st.columns(3)
with metric_columns[0]:
    ui.metric_card(
        "V2 Components",
        "35",
        description="Documented public surfaces",
    )
with metric_columns[1]:
    ui.metric_card(
        "Browser Errors",
        "0",
        description="Canonical page verification",
    )
with metric_columns[2]:
    ui.metric_card(
        "Architecture",
        "Shadow DOM",
        description="shadcn + Base UI",
    )

action_columns = st.columns([1, 1, 4])
with action_columns[0]:
    ui.link_button(
        "Get Started",
        "https://github.com/ObservedObserver/streamlit-shadcn-ui#readme",
        width="stretch",
    )
with action_columns[1]:
    ui.link_button(
        "GitHub",
        "https://github.com/ObservedObserver/streamlit-shadcn-ui",
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
    caption="V2 component verification sample",
)
