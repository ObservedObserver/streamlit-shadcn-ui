import streamlit as st
import streamlit_shadcn_ui.v2 as ui

st.header("Pagination")

with open("docs/components/pagination.md", "r") as f:
    st.markdown(f.read())

st.subheader("Basic Example (10 pages)")
page_value = ui.pagination(
    key="pagination1",
    total_pages=10,
    initial_page=1,
)
st.write(f"Selected page: {page_value}")

st.subheader("Large Page Count Example (100 pages, sibling_count=1)")
st.write("This demonstrates how the pagination handles many pages with ellipsis.")
page_value2 = ui.pagination(
    key="pagination2",
    total_pages=100,
    initial_page=1,
    sibling_count=1,
)
st.write(f"Selected page: {page_value2}")

st.subheader("Large Page Count with More Siblings (100 pages, sibling_count=2)")
st.write("With sibling_count=2, more page buttons are visible around the current page.")
page_value3 = ui.pagination(
    key="pagination3",
    total_pages=100,
    initial_page=1,
    sibling_count=2,
)
st.write(f"Selected page: {page_value3}")
