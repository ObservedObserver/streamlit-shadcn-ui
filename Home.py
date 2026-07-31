import numpy as np
import pandas as pd
import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.set_page_config(page_title="Streamlit Shadcn UI", page_icon="🧱")

st.header("Streamlit Shadcn UI")
ui.badges(
    items=[
        ("shadcn", "default"),
        ("in", "secondary"),
        ("streamlit", "destructive"),
    ],
)
st.caption(
    "A Streamlit component library for building beautiful apps easily. "
    "Bring the power of shadcn/ui to your Streamlit apps."
)
st.code("pip install streamlit-shadcn-ui", language="bash")

action_columns = st.columns([1, 1, 4])
with action_columns[0]:
    ui.link_button(
        "Get Started",
        "https://github.com/ObservedObserver/streamlit-shadcn-ui#readme",
        width="stretch",
    )
with action_columns[1]:
    ui.link_button(
        "GitHub",
        "https://github.com/ObservedObserver/streamlit-shadcn-ui",
        variant="outline",
        width="stretch",
    )

st.subheader("Dashboard")

active_tab = ui.tabs(
    options=["Overview", "Analytics", "Reports", "Notifications"],
    value="Overview",
)
st.caption(f"Current view: {active_tab}")

selected_date = ui.date_picker(
    "Reporting date",
)
if selected_date:
    st.caption(f"Reporting date: {selected_date}")

metric_columns = st.columns(3)
with metric_columns[0]:
    ui.metric_card(
        "Total Revenue",
        "$45,231.89",
        description="+20.1% from last month",
    )
with metric_columns[1]:
    ui.metric_card(
        "Subscriptions",
        "+2,350",
        description="+180.1% from last month",
    )
with metric_columns[2]:
    ui.metric_card(
        "Sales",
        "+12,234",
        description="+19% from last month",
    )


def generate_sales_data() -> pd.DataFrame:
    np.random.seed(0)
    months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    sales = np.random.randint(1000, 5000, size=len(months))
    return pd.DataFrame({"Month": months, "Sales": sales})


with st.container(border=True):
    st.vega_lite_chart(
        generate_sales_data(),
        {
            "mark": {
                "type": "bar",
                "tooltip": True,
                "fill": "#18181b",
                "cornerRadiusEnd": 4,
            },
            "encoding": {
                "x": {"field": "Month", "type": "ordinal"},
                "y": {
                    "field": "Sales",
                    "type": "quantitative",
                    "axis": {"grid": False},
                    "scale": {"domain": [0, 5000]},
                },
            },
        },
        width="stretch",
    )

invoice_data = [
    {
        "invoice": "INV001",
        "paymentStatus": "Paid",
        "totalAmount": 500,
        "paymentMethod": "Credit Card",
    },
    {
        "invoice": "INV002",
        "paymentStatus": "Unpaid",
        "totalAmount": 200,
        "paymentMethod": "Cash",
    },
    {
        "invoice": "INV003",
        "paymentStatus": "Paid",
        "totalAmount": 150,
        "paymentMethod": "Debit Card",
    },
    {
        "invoice": "INV004",
        "paymentStatus": "Unpaid",
        "totalAmount": 350,
        "paymentMethod": "Credit Card",
    },
    {
        "invoice": "INV005",
        "paymentStatus": "Paid",
        "totalAmount": 400,
        "paymentMethod": "PayPal",
    },
]

ui.table(
    invoice_data,
    caption="Recent invoices",
    max_height=300,
)

st.subheader("Interactive components")

button_clicked = ui.button("Button")
st.write("UI Button clicked:", button_clicked)

slider_value = ui.slider(
    "Select a value",
    min_value=0,
    max_value=100,
    value=20,
    step=2,
)
st.write("Slider value:", slider_value)

input_value = ui.input(
    "Message",
    value="Hello, Streamlit!",
    type="text",
    placeholder="Enter text here",
)
st.write("Input value:", input_value)

textarea_value = ui.textarea(
    "Long message",
    value="Type your message here...",
    placeholder="Enter longer text",
)
st.write("Textarea value:", textarea_value)

radio_value = ui.radio_group(
    "Choose an option",
    ["Option A", "Option B", "Option C"],
    value="Option B",
)
st.write("Selected radio option:", radio_value)

switch_value = ui.switch(
    "Toggle switch",
    value=True,
)
st.write("Switch is on:", switch_value)

select_value = ui.select(
    "Choose a fruit",
    ["Apple", "Banana", "Orange", "Grape", "Mango"],
)
st.write("Selected fruit:", select_value)

st.subheader("Alert Dialog")
show_dialog = ui.button("Open alert dialog")
dialog_result = ui.alert_dialog(
    show_dialog,
    "Alert Dialog",
    "This is an alert dialog backed by the V2 modal layer.",
    confirm_label="OK",
    cancel_label="Cancel",
)
if dialog_result is not None:
    st.write("Dialog confirmed:", dialog_result)
