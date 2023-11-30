import pandas as pd
import streamlit_shadcn_ui as ui
import streamlit as st

st.header("Table")
with open("docs/components/table.md", "r") as f:
    st.markdown(f.read())

# Sample data
data = [
    {"invoice": "INV001", "paymentStatus": "Paid", "totalAmount": 500, "paymentMethod": "Credit Card"},
    {"invoice": "INV002", "paymentStatus": "Unpaid", "totalAmount": 200, "paymentMethod": "Cash"},
    {"invoice": "INV003", "paymentStatus": "Paid", "totalAmount": 150, "paymentMethod": "Debit Card"},
    {"invoice": "INV004", "paymentStatus": "Unpaid", "totalAmount": 350, "paymentMethod": "Credit Card"},
    {"invoice": "INV005", "paymentStatus": "Paid", "totalAmount": 400, "paymentMethod": "PayPal"},
    # Add more records as needed
]

# Creating a DataFrame
invoice_df = pd.DataFrame(data)

ui.table(data=invoice_df, maxHeight=300)

st.write(ui.table)