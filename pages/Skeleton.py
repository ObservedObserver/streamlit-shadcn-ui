import streamlit as st

import streamlit_shadcn_ui as ui


st.header("Skeleton")

with open("docs/components/skeleton.md", "r") as f:
    st.markdown(f.read())

skeleton_columns = st.columns([1, 4])
with skeleton_columns[0]:
    ui.skeleton(
        skeleton_width=48,
        skeleton_height=48,
        shape="circle",
        width="content",
    )
with skeleton_columns[1]:
    ui.skeleton(
        skeleton_width="100%",
        skeleton_height=16,
    )
    ui.skeleton(
        skeleton_width="80%",
        skeleton_height=16,
    )

st.write(ui.skeleton)
