import streamlit as st
import streamlit_shadcn_ui.v2 as ui

st.subheader("Alert Dialog")

with open("docs/components/alert_dialog.md", "r") as f:
    st.markdown(f.read())

trigger_btn = ui.button(text="Trigger Button", key="trigger_btn_1")
decision = ui.alert_dialog(
    show=trigger_btn,
    title="Alert Dialog",
    description="This is an alert dialog",
    confirm_label="OK",
    cancel_label="Cancel",
    key="alert_dialog_1",
)
if decision is not None:
    st.write("Confirmed:", decision)

st.write(ui.alert_dialog)
