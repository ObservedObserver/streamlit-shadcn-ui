import streamlit as st

def init_session(key: str, default_value=None):
    if st.session_state.get(key) is None:
        st.session_state[key] = default_value
    return st.session_state[key]