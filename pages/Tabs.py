import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.header("Tabs")

with open("docs/components/tabs.md", "r") as f:
    st.markdown(f.read())

products = {
    "PyGWalker": {
        "description": "Turn a pandas DataFrame into an exploratory visual interface.",
        "url": "https://github.com/Kanaries/pygwalker",
    },
    "Graphic Walker": {
        "description": "Embed a grammar-of-graphics visual analytics interface.",
        "url": "https://github.com/Kanaries/graphic-walker",
    },
    "GWalkR": {
        "description": "Use the Graphic Walker workflow from an R environment.",
        "url": "https://github.com/Kanaries/gwalkr",
    },
    "RATH": {
        "description": "Explore automated insights and visual data analysis.",
        "url": "https://github.com/Kanaries/Rath",
    },
}

value = ui.tabs(
    options=products,
    value="PyGWalker",
)
selected_product = products[value]

ui.card(
    title=value,
    content=selected_product["description"],
    description="Selected tab",
)
ui.link_button(
    f"{value} GitHub",
    selected_product["url"],
    variant="outline",
)
st.write("Selected:", value)

st.write(ui.tabs)
