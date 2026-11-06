from pathlib import Path

import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Data Table")
st.caption("Search records, select an action, and edit the record in a detail panel.")
if "data_table_demo_records" not in st.session_state:
    st.session_state.data_table_demo_records = [
        {"id": "alpha", "name": "Alpha", "status": "Draft", "amount": 100},
        {"id": "beta", "name": "Beta", "status": "Ready", "amount": 20},
        {"id": "gamma", "name": "Gamma", "status": "Draft", "amount": 75},
    ]
records = st.session_state.data_table_demo_records
result = ui.data_table(
    records,
    columns=["name", "status", "amount"],
    key="data-table-demo",
    row_id="id",
    page_size=2,
    actions=[{"id": "edit", "label": "Edit details"}],
)
if result.action:
    st.session_state.data_table_demo_active = result.action.row_id
st.write("Selected records:", result.selected_ids)
active = st.session_state.get("data_table_demo_active")
record = next((row for row in records if row["id"] == active), None)
if record:
    st.write("Record to edit:", record["name"])
    with ui.elements(key=f"record-editor-{record['id']}") as el:
        with el.sheet(
            "Edit record",
            key="details",
            trigger_label="Open record editor",
            description="Save writes this example's session data.",
        ):
            with el.field("Name"):
                name = el.input("Name", record["name"], key="name")
            with el.field("Status"):
                status = el.select(
                    "Status", ["Draft", "Ready"], value=record["status"], key="status"
                )
            with el.sheet_footer():
                save = el.button("Save record", key="save")
                el.sheet_close_button("Close", key="close")
    if save.clicked:
        record["name"] = name.value
        record["status"] = status.value
        st.rerun()

st.markdown(
    (Path(__file__).resolve().parents[1] / "docs/components/data_table.md").read_text()
)
