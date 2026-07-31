import numpy as np
import pandas as pd
import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.set_page_config(page_title="Streamlit Shadcn UI", page_icon="🧱")

st.header("Streamlit Shadcn UI")
ui.badges(
    badge_list=[
        ("shadcn", "default"),
        ("in", "secondary"),
        ("streamlit", "destructive"),
    ],
    key="main_badges",
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
        key="get_started",
        width="stretch",
    )
with action_columns[1]:
    ui.link_button(
        "GitHub",
        "https://github.com/ObservedObserver/streamlit-shadcn-ui",
        key="github",
        variant="outline",
        width="stretch",
    )

st.subheader("Dashboard")

active_tab = ui.tabs(
    options=["Overview", "Analytics", "Reports", "Notifications"],
    default_value="Overview",
    key="main_tabs",
)
st.caption(f"Current view: {active_tab}")

selected_date = ui.date_picker(
    "Reporting date",
    key="reporting_date",
)
if selected_date:
    st.caption(f"Reporting date: {selected_date}")

metric_columns = st.columns(3)
with metric_columns[0]:
    ui.metric_card(
        title="Total Revenue",
        content="$45,231.89",
        description="+20.1% from last month",
        key="revenue_card",
    )
with metric_columns[1]:
    ui.metric_card(
        title="Subscriptions",
        content="+2,350",
        description="+180.1% from last month",
        key="subscriptions_card",
    )
with metric_columns[2]:
    ui.metric_card(
        title="Sales",
        content="+12,234",
        description="+19% from last month",
        key="sales_card",
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
    key="invoice_table",
    caption="Recent invoices",
    max_height=300,
)

st.subheader("Interactive components")

button_clicked = ui.button("Button", key="demo_button")
st.write("UI Button clicked:", button_clicked)

slider_value = ui.slider(
    default_value=[20],
    min_value=0,
    max_value=100,
    step=2,
    label="Select a value",
    key="demo_slider",
)
st.write("Slider value:", slider_value)

input_value = ui.input(
    default_value="Hello, Streamlit!",
    label="Message",
    type="text",
    placeholder="Enter text here",
    key="demo_input",
)
st.write("Input value:", input_value)

textarea_value = ui.textarea(
    default_value="Type your message here...",
    label="Long message",
    placeholder="Enter longer text",
    key="demo_textarea",
)
st.write("Textarea value:", textarea_value)

radio_value = ui.radio_group(
    options=[
        {"label": "Option A", "value": "A"},
        {"label": "Option B", "value": "B"},
        {"label": "Option C", "value": "C"},
    ],
    default_value="B",
    label="Choose an option",
    key="demo_radio",
)
st.write("Selected radio option:", radio_value)

switch_value = ui.switch(
    default_checked=True,
    label="Toggle switch",
    key="demo_switch",
)
st.write("Switch is on:", switch_value)

select_value = ui.select(
    "Choose a fruit",
    ["Apple", "Banana", "Orange", "Grape", "Mango"],
    key="demo_select",
)
st.write("Selected fruit:", select_value)

st.subheader("Alert Dialog")
show_dialog = ui.button("Open alert dialog", key="dialog_trigger")
dialog_result = ui.alert_dialog(
    show_dialog,
    "Alert Dialog",
    "This is an alert dialog backed by the V2 modal layer.",
    confirm_label="OK",
    cancel_label="Cancel",
    key="demo_alert_dialog",
)
if dialog_result is not None:
    st.write("Dialog confirmed:", dialog_result)
