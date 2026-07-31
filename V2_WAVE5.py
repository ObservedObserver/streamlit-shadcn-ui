import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.set_page_config(
    page_title="Streamlit Shadcn UI · Wave 5",
    page_icon="🛡️",
    layout="wide",
)

st.title("Streamlit Shadcn UI · Wave 5")
st.caption(
    "The stable V1 Alert Dialog now uses generated shadcn source, "
    "Base UI modal behavior, a same-ShadowRoot native top-layer host, "
    "and a versioned cross-root modal layer coordinator."
)

st.html(
    """
    <div
      data-wave5-fixed-competitor
      style="
        position: fixed;
        right: 0;
        top: 40%;
        z-index: 2147483647;
        width: 6rem;
        height: 6rem;
        background: rgb(220 38 38);
        color: white;
        display: grid;
        place-items: center;
      "
    >
      Fixed competitor
    </div>
    """
)

if st.button("Reset Wave 5 state", type="secondary"):
    for state_key in list(st.session_state):
        if (
            str(state_key).startswith("wave5_")
            or state_key == "__streamlit_shadcn_ui_v2_runtime_v1__"
        ):
            del st.session_state[state_key]
    st.rerun()

st.subheader("Single modal lifecycle")
open_primary = st.button(
    "Open primary dialog",
    key="wave5_open_primary",
)
primary_decision = ui.alert_dialog(
    open_primary,
    "Ship the V2 migration?",
    "Focus is trapped here; Escape and Cancel resolve false.",
    confirm_label="Ship it",
    cancel_label="Keep reviewing",
    key="wave5_primary_dialog",
)
if primary_decision is not None:
    st.session_state["wave5_primary_result"] = primary_decision
st.caption(
    "Primary decision: %s"
    % st.session_state.get("wave5_primary_result", "—")
)

background_count = st.session_state.get("wave5_background_count", 0)
if st.button(
    "Background action",
    key="wave5_background_action",
):
    background_count += 1
    st.session_state["wave5_background_count"] = background_count
st.caption("Background action count: %d" % background_count)

st.subheader("Independent modal stack")
if st.button(
    "Open stacked dialogs",
    key="wave5_open_stack",
):
    st.session_state["wave5_stack_first"] = True
    st.session_state["wave5_stack_second"] = True

first_decision = ui.alert_dialog(
    st.session_state.get("wave5_stack_first", False),
    "First queued dialog",
    "This dialog resumes after the top dialog resolves.",
    confirm_label="Accept first",
    cancel_label="Cancel first",
    key="wave5_stack_first_dialog",
)
if first_decision is not None:
    st.session_state["wave5_stack_first"] = False
    st.session_state["wave5_stack_first_result"] = first_decision

second_decision = ui.alert_dialog(
    st.session_state.get("wave5_stack_second", False),
    "Second top dialog",
    "Only this topmost independent modal owns global effects.",
    confirm_label="Accept second",
    cancel_label="Cancel second",
    key="wave5_stack_second_dialog",
)
if second_decision is not None:
    st.session_state["wave5_stack_second"] = False
    st.session_state["wave5_stack_second_result"] = second_decision

st.caption(
    "Stack decisions: first=%s, second=%s"
    % (
        st.session_state.get("wave5_stack_first_result", "—"),
        st.session_state.get("wave5_stack_second_result", "—"),
    )
)

st.subheader("Rerun and conditional-unmount cleanup")
if "wave5_render_conditional" not in st.session_state:
    st.session_state["wave5_render_conditional"] = True
if "wave5_conditional_requested" not in st.session_state:
    st.session_state["wave5_conditional_requested"] = False

control_columns = st.columns(4)
with control_columns[0]:
    if st.button(
        "Open conditional dialog",
        key="wave5_open_conditional",
    ):
        st.session_state["wave5_conditional_requested"] = True
with control_columns[1]:
    if st.button(
        "Rerun while open",
        key="wave5_rerun_open",
    ):
        st.session_state["wave5_rerun_count"] = (
            st.session_state.get("wave5_rerun_count", 0) + 1
        )
with control_columns[2]:
    if st.button(
        "Close conditional externally",
        key="wave5_close_conditional",
    ):
        st.session_state["wave5_conditional_requested"] = False
with control_columns[3]:
    if st.button(
        "Remove conditional component",
        key="wave5_remove_conditional",
    ):
        st.session_state["wave5_render_conditional"] = False

if not st.session_state["wave5_render_conditional"]:
    if st.button(
        "Restore conditional component",
        key="wave5_restore_conditional",
    ):
        st.session_state["wave5_render_conditional"] = True
        st.session_state["wave5_conditional_requested"] = False
        st.rerun()

if st.session_state["wave5_render_conditional"]:
    conditional_decision = ui.alert_dialog(
        st.session_state["wave5_conditional_requested"],
        "Conditional dialog",
        "This fixture can rerun, close, or unmount while open.",
        confirm_label="Confirm conditional",
        cancel_label="Cancel conditional",
        key="wave5_conditional_dialog",
    )
    if conditional_decision is not None:
        st.session_state["wave5_conditional_requested"] = False
        st.session_state[
            "wave5_conditional_result"
        ] = conditional_decision

st.caption(
    "Conditional fixture: rendered=%s, reruns=%d, decision=%s"
    % (
        st.session_state["wave5_render_conditional"],
        st.session_state.get("wave5_rerun_count", 0),
        st.session_state.get("wave5_conditional_result", "—"),
    )
)

with st.sidebar:
    st.header("Sidebar modal placement")
    sidebar_open = st.button(
        "Open sidebar dialog",
        key="wave5_open_sidebar",
    )
    sidebar_decision = ui.alert_dialog(
        sidebar_open,
        "Sidebar-launched dialog",
        "The backdrop still covers the document viewport.",
        key="wave5_sidebar_dialog",
    )
    if sidebar_decision is not None:
        st.session_state["wave5_sidebar_result"] = sidebar_decision

for index in range(24):
    st.caption("Scroll-lock evidence row %02d" % (index + 1))

st.status(
    "Wave 5 fixture: Alert Dialog, top-layer coverage, focus, "
    "scroll lock, independent modal stack, rerun, and unmount cleanup.",
    state="complete",
)
