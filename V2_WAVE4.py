import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.set_page_config(
    page_title="Streamlit Shadcn UI · Wave 4",
    page_icon="🪟",
    layout="wide",
)

st.title("Streamlit Shadcn UI · Wave 4")
st.caption(
    "Anchored shadcn overlays stay in each Streamlit V2 ShadowRoot and "
    "use the shared native top-layer host. No iframe or document-body "
    "portal is involved."
)

if st.button("Reset Wave 4 state", type="secondary"):
    for state_key in list(st.session_state):
        if (
            str(state_key).startswith("wave4_")
            or state_key == "__streamlit_shadcn_ui_v2_runtime_v1__"
        ):
            del st.session_state[state_key]
    st.rerun()

with st.sidebar:
    st.header("Sidebar placement")
    ui.hover_card(
        "Sidebar architecture",
        "The Preview Card portal belongs to this component ShadowRoot.",
        key="wave4_sidebar_hover",
    )

st.subheader("Informational overlays")
popover_column, hover_column = st.columns(2)
with popover_column:
    ui.popover(
        "Open migration details",
        "This is generated shadcn Popover source backed by Base UI.",
        key="wave4_popover",
    )
with hover_column:
    ui.hover_card(
        "Hover for architecture",
        "Streamlit V2 → shadcn → Base UI, with one owned overlay root.",
        key="wave4_hover",
    )

st.subheader("Persistent date selection")
single_column, range_column = st.columns(2)
with single_column:
    release_date = ui.date_picker(
        "Release date",
        default_value="2026-07-30",
        key="wave4_single_date",
        min_date="2026-07-01",
        max_date="2026-08-31",
    )
    st.write("Single date Python value:", release_date or "—")
with range_column:
    release_window = ui.date_picker(
        "Release window",
        mode="range",
        key="wave4_date_range",
        min_date="2026-07-01",
        max_date="2026-08-31",
    )
    st.write(
        "Range Python value:",
        " – ".join(release_window) if release_window else "—",
    )

st.subheader("Clipping escape")
with st.container(height=170):
    for index in range(4):
        st.caption("Bounded container row %d" % (index + 1))
    ui.popover(
        "Open beyond bounded container",
        "The native top-layer host lets this popup cross the container edge.",
        key="wave4_bounded_popover",
    )

st.subheader("Streamlit form integration")
with st.form("wave4_state_form"):
    form_date = ui.date_picker(
        "Form release date",
        default_value="2026-07-30",
        key="wave4_form_date",
        min_date="2026-07-01",
        max_date="2026-08-31",
    )
    form_submitted = st.form_submit_button("Submit Wave 4 form")

if form_submitted:
    st.session_state["wave4_form_result"] = form_date
st.caption(
    "Last submitted Wave 4 form: %s"
    % (st.session_state.get("wave4_form_result") or "—")
)

st.status(
    "Wave 4 fixture: Popover, Hover Card, single/range Date Picker, "
    "form state, shared ShadowRoot overlay ownership, and no iframe.",
    state="complete",
)
