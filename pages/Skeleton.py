import streamlit as st
import streamlit_shadcn_ui as ui

st.header("Skeleton Component")

skeletons = [
    {"key": "skeleton-1", "class_name": "h-12 w-12 rounded-full"},
    {"key": "skeleton-2", "class_name": "h-4 w-[250px]"},
    {"key": "skeleton-3", "class_name": "h-4 w-[200px]"},
]

for skeleton in skeletons:
    ui.skeleton(key=skeleton["key"], class_name=skeleton["class_name"])

st.write("Use to show a placeholder while content is loading.")