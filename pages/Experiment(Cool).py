import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.header("V2 Composition")

with open("docs/components/experiment.md", "r") as f:
    st.markdown(f.read())

st.caption(
    "Streamlit owns page layout while typed V2 components own the shadcn UI."
)

composition_columns = st.columns(2)
with composition_columns[0]:
    ui.card(
        title="Typed components",
        content="No generic DOM renderer is required in V2.",
        description="shadcn + Base UI",
        key="composition_card",
    )
with composition_columns[1]:
    project_name = ui.input(
        label="Project name",
        placeholder="streamlit-shadcn-ui",
        key="composition_input",
    )
    submitted = ui.button(
        "Create project",
        key="composition_button",
    )

st.write({"project_name": project_name, "submitted": submitted})
