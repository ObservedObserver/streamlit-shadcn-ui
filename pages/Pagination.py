import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Pagination")

with open("docs/components/pagination.md", "r") as f:
    st.markdown(f.read())
    
page_value = ui.pagination(key="pagination1",totalPages=10,initialPage=1)

st.write(page_value)
st.write(ui.pagination)
