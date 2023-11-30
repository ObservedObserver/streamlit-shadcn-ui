import streamlit as st

import streamlit_shadcn_ui as ui


st.header("Button")

with open("docs/components/button.md", "r") as f:
    st.markdown(f.read())

st.subheader("Click Events")

clicked = ui.button("Click", key="clk_btn")
reset = ui.button("Reset", variant="secondary", key="reset_btn")
st.write("UI Button Clicked:", clicked)
st.write("UI Reset Button Clicked:", reset)

st.subheader("Variants")

variant_options = ["default", "destructive", "outline", "secondary", "ghost", "link"]

for variant in variant_options:
    ui.button(text=f"Button ({variant})", variant=variant, key=variant)

st.subheader("Custom style of button")
st.markdown('''
```python
    ui.button(text="Beautiful Button", key="styled_btn_tailwind", className="bg-orange-500 text-white")
```
> class_name and className are both supported, class_name is used in python layer and will be converted to className for the frontend
''')
ui.button(text="Beautiful Button", key="styled_btn_tailwind", className="bg-orange-500 text-white")

st.write(ui.button)