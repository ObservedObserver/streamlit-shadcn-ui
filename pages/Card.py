import streamlit as st

import streamlit_shadcn_ui as ui


st.header("Card")

with open("docs/components/card.md", "r") as f:
    st.markdown(f.read())

card_columns = st.columns(2)
with card_columns[0]:
    ui.card(
        title="Create project",
        content="Start from a clean V2 component surface.",
        description="Standard size",
    )
with card_columns[1]:
    ui.card(
        title="Activity",
        content="Three components were verified today.",
        description="Compact size",
        size="sm",
    )

st.write(ui.card)
