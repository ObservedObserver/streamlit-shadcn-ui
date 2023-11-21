import streamlit as st

import streamlit_shadcn_ui as ui

# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run my_component/example.py`
st.header("Button")

with open("docs/components/button.md", "r") as f:
    st.markdown(f.read())
variant_options = ["default", "destructive", "outline", "secondary", "ghost", "link"]

for variant in variant_options:
    ui.button(text=f"Button ({variant})", variant=variant, key=variant)
# ui.button(text="Click me!", key="default")
# ui.button(text="Click me!", variant="primary", key="primary")
# ui.button(text="Click me!", variant="secondary", key="secondary")


