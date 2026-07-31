import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.header("Button")

with open("docs/components/button.md", "r") as f:
    st.markdown(f.read())

st.subheader("Click events")

button_columns = st.columns(2)
with button_columns[0]:
    clicked = ui.button("Click", key="clk_btn", width="stretch")
with button_columns[1]:
    reset = ui.button(
        "Reset",
        variant="secondary",
        key="reset_btn",
        width="stretch",
    )
st.write("UI Button clicked:", clicked)
st.write("UI Reset Button clicked:", reset)

st.subheader("shadcn variants")

variant_options = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
]
variant_columns = st.columns(3)
for index, variant in enumerate(variant_options):
    with variant_columns[index % len(variant_columns)]:
        ui.button(
            text=f"Button ({variant})",
            variant=variant,
            key=f"variant_{variant}",
            width="stretch",
        )

st.subheader("Disabled state")
ui.button(
    "Unavailable action",
    key="disabled_button",
    disabled=True,
)

st.write(ui.button)
