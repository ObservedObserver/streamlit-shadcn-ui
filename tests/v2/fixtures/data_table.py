import streamlit as st
import streamlit_shadcn_ui as ui

if st.query_params.get("example") == "1":
    from pathlib import Path
    example = Path(__file__).resolve().parents[3] / "pages/DataTable.py"
    exec(compile(example.read_text(), str(example), "exec"), {"__file__": str(example)})
    st.stop()

st.header("Data Table acceptance")
st.session_state["runs"] = st.session_state.get("runs", 0) + 1
st.write("Python runs:", st.session_state["runs"])
st.button("Unrelated rerun")
if "rows" not in st.session_state:
    st.session_state.rows = [
        {"id": str(i), "name": f"Record {i}", "amount": amount}
        for i, amount in enumerate([100, 2, 30, 4, 50, 6, 70])
    ]
if st.button("Remove first record"):
    st.session_state.rows = st.session_state.rows[1:]
result = ui.data_table(
    st.session_state.rows,
    columns=["name", "amount"],
    key="records",
    row_id="id",
    page_size=3,
    actions=[
        {"id": "edit", "label": "Edit"},
        {"id": "delete", "label": "Delete", "disabled": True},
    ],
)
if result.action:
    st.session_state["actions"] = st.session_state.get("actions", 0) + 1
    st.session_state["last_action"] = (
        f"{result.action.row_id}:{result.action.action_id}"
    )
st.write("Selected:", ",".join(map(str, result.selected_ids)))
st.write("Action count:", st.session_state.get("actions", 0))
st.write("Last action:", st.session_state.get("last_action", "none"))
