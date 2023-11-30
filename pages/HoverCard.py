import streamlit as st

import streamlit_shadcn_ui as ui

st.header("Hover Card")

with open("docs/components/hover_card.md", "r") as f:
    st.markdown(f.read())

ui.hover_card(label="Hover on me1!", content="I am a hover card1!", content_type="text", key="hover_card_1")

ui.hover_card(label="Hover on me2!", content="I am a hover card2!", content_type="text", key="hover_card_2")

ui.hover_card(label="Hover on me3!", content="I am a hover card3!", content_type="text", key="hover_card_3")

st.write(ui.hover_card)