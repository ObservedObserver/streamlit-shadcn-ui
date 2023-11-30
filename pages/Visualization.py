import pandas as pd
import streamlit.components.v1 as components
import streamlit as st
from pygwalker.api.streamlit import init_streamlit_comm, get_streamlit_html
import streamlit_shadcn_ui as ui

st.set_page_config(
    # page_title="Use Pygwalker to build visualization with drag and drop",
    layout="wide"
)

st.header("Use Pygwalker to build visualization with drag-and-drop operations")
ui.badges(badge_list=[("Dataframe", "default"), ("to", "secondary"), ("Interactive Data App", "destructive")], class_name="flex gap-2", key="viz_badges1")
st.caption("This is build with Pygwalker and Streamlit. PyGWalker is a Python library turns your dataframe into a tableau-alternative")
ui.badges(badge_list=[("pip install pygwalker", "secondary")], class_name="flex gap-2", key="viz_badges2")

cols = st.columns(3)

with cols[0]:
    ui.metric_card(title="Github Stars", content="7,984", description="1k stars in 12 hours.", key="card1")
with cols[1]:
    ui.metric_card(title="Total Install", content="234,300", description="Since launched in 2023/02", key="card2")
with cols[2]:
    ui.metric_card(title="HackerNews upvotes", content="712", description="Rank No.1 story of the day", key="card3")



with ui.element("div", className="flex gap-2", key="buttons_group1"):
    ui.element("link_button", varient="primary", url="https://github.com/Kanaries/pygwalker", text="Get Started", key="btn1")
    ui.element("link_button", text="Github", url="https://github.com/Kanaries/pygwalker", variant="outline", key="btn2")

# Initialize pygwalker communication
init_streamlit_comm()

# When using `use_kernel_calc=True`, you should cache your pygwalker html, if you don't want your memory to explode
@st.cache_resource
def get_pyg_html(df: pd.DataFrame) -> str:
    # When you need to publish your application, you need set `debug=False`,prevent other users to write your config file.
    html = get_streamlit_html(df, use_kernel_calc=True, debug=False)
    return html

@st.cache_data
def get_df() -> pd.DataFrame:
    return pd.read_csv("https://kanaries-app.s3.ap-northeast-1.amazonaws.com/public-datasets/bike_sharing_dc.csv")

df = get_df()

components.html(get_pyg_html(df), width=1000, height=1000, scrolling=True)