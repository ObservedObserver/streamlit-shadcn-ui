import streamlit as st
import streamlit_shadcn_ui as ui

st.subheader("Alert Dialog")

with open("docs/components/alert_dialog.md", "r") as f:
    st.markdown(f.read())

trigger_btn = ui.button("Trigger Button")
decision = ui.alert_dialog(
    show=trigger_btn,
    title="Alert Dialog",
    description="This is an alert dialog",
    confirm_label="OK",
    cancel_label="Cancel",
)
if decision is not None:
    st.write("Confirmed:", decision)

st.write(ui.alert_dialog)
