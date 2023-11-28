import streamlit as st

def get_context():
    if (st.session_state.get("_shadcn_ui_context", None) is None):
        st.session_state["_shadcn_ui_context"] = {
            "current_element": None,
        }
    ctx = st.session_state.get("_shadcn_ui_context")
    return ctx