import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.header("Separator")

with open("docs/components/separator.md", "r") as f:
    st.markdown(f.read())

st.subheader("Horizontal")
st.write("Streamlit Shadcn UI")
ui.separator(key="horizontal_separator")
st.caption("An open-source UI component library.")

st.subheader("Vertical")
navigation_columns = st.columns([1, 0.1, 1, 0.1, 1])
with navigation_columns[0]:
    st.write("Blog")
with navigation_columns[1]:
    ui.separator(
        key="vertical_separator_1",
        orientation="vertical",
        width="content",
    )
with navigation_columns[2]:
    st.write("Docs")
with navigation_columns[3]:
    ui.separator(
        key="vertical_separator_2",
        orientation="vertical",
        width="content",
    )
with navigation_columns[4]:
    st.write("Source")

st.write(ui.separator)
