import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.header("Skeleton")

with open("docs/components/skeleton.md", "r") as f:
    st.markdown(f.read())

skeleton_columns = st.columns([1, 4])
with skeleton_columns[0]:
    ui.skeleton(
        key="skeleton_circle",
        width_px=48,
        height_px=48,
        shape="circle",
        width="content",
    )
with skeleton_columns[1]:
    ui.skeleton(
        key="skeleton_line_1",
        width_px="100%",
        height_px=16,
    )
    ui.skeleton(
        key="skeleton_line_2",
        width_px="80%",
        height_px=16,
    )

st.write(ui.skeleton)
