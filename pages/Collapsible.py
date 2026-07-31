import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Collapsible")

with open("docs/components/collapsible.md", "r") as f:
    st.markdown(f.read())
    
is_open = ui.collapsible(
    title="@peduarte starred 3 repositories",
    content="@base-ui-components/react",
    items=["shadcn/ui", "streamlit/streamlit"],
)
st.write("Open:", is_open)

st.write(ui.collapsible)
