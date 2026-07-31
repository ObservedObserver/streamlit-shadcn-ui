import streamlit as st
import streamlit_shadcn_ui.v2 as ui

st.header("Scroll Area")

with open("docs/components/scroll_area.md", "r") as f:
    st.markdown(f.read())

tags = [f"v1.2.0-beta.{50 - i}" for i in range(50)]

ui.scroll_area(title="Tags", items=tags, key="scroll_area-1")
st.write(ui.scroll_area)
