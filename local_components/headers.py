from streamlit_extras.stylable_container import stylable_container
import streamlit as st
def h2(text, key=None):
    st.markdown(f'<span style="padding: 0em !important; font-size: 2em;">{text}</span>', unsafe_allow_html=True)
    # with stylable_container(key=key, css_styles=[
    # f"""
    # h2 {{
    #     padding: 0em !important;
    # }}
    # """,
    # ]):
    #     st.header("Dashboard")