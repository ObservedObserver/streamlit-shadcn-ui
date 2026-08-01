import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.set_page_config(
    page_title="Streamlit Shadcn UI · Wave 3",
    page_icon="🧩",
    layout="wide",
)

st.title("Streamlit Shadcn UI · Wave 3")
st.caption(
    "Inline state and form controls from the pinned shadcn Base UI "
    "registry snapshot. Input drafts commit on blur or Enter; sliders "
    "commit when interaction finishes."
)

if st.button("Reset Wave 3 state", type="secondary"):
    for state_key in list(st.session_state):
        if (
            str(state_key).startswith("wave3_")
            or state_key == "__streamlit_shadcn_ui_v2_runtime_v1__"
        ):
            del st.session_state[state_key]
    st.rerun()

with st.sidebar:
    st.header("Sidebar placement")
    sidebar_enabled = ui.switch(
        "Sidebar enabled",
        True,
        key="wave3_sidebar_switch",
    )
    st.write("Sidebar switch:", sidebar_enabled)
    sidebar_toggle = ui.toggle(
        "Sidebar italic",
        False,
        icon="italic",
        key="wave3_sidebar_toggle",
    )
    st.write("Sidebar toggle:", sidebar_toggle)

st.subheader("Draft-based text inputs")
input_column, textarea_column, otp_column = st.columns(3)
with input_column:
    name = ui.input(
        "Name",
        "Ada",
        key="wave3_input",
        placeholder="Type a name",
        max_length=40,
    )
    st.write("Input Python value:", name)
with textarea_column:
    notes = ui.textarea(
        "Notes",
        "Initial notes",
        key="wave3_textarea",
        placeholder="Write a longer note",
        rows=4,
        max_length=200,
    )
    st.write("Textarea Python value:", notes)
with otp_column:
    otp = ui.input_otp(
        "Verification code",
        "",
        max_length=6,
        key="wave3_otp",
    )
    st.write("OTP Python value:", otp or "—")

st.subheader("Disclosure and navigation")
disclosure_left, disclosure_middle, disclosure_right = st.columns(3)
with disclosure_left:
    open_items = ui.accordion(
        [
            {
                "trigger": "Is it accessible?",
                "content": "Yes. Base UI owns the behavior.",
                "value": "accessible",
            },
            {
                "trigger": "Is it iframe-free?",
                "content": "Yes. It renders in a Streamlit ShadowRoot.",
                "value": "iframe-free",
            },
        ],
        key="wave3_accordion",
        value=["accessible"],
        selection_mode="multiple",
        label="Migration questions",
    )
    st.write("Accordion open:", ",".join(open_items) or "—")
with disclosure_middle:
    opened = ui.collapsible(
        "Repository details",
        "@base-ui/react",
        items=["shadcn source", "Streamlit V2 host"],
        key="wave3_collapsible",
    )
    st.write("Collapsible open:", opened)
with disclosure_right:
    page_number = ui.pagination(
        key="wave3_pagination",
        total_pages=100,
        page=50,
        sibling_count=1,
        label="Migration pages",
    )
    st.write("Pagination page:", page_number)

st.subheader("Choice and range controls")
choice_left, choice_middle, choice_right = st.columns(3)
with choice_left:
    radio_value = ui.radio_group(
        "Release channel",
        [
            {"label": "Alpha", "value": "alpha"},
            {"label": "Beta", "value": "beta"},
            {
                "label": "Unavailable",
                "value": "unavailable",
                "disabled": True,
            },
        ],
        value="alpha",
        key="wave3_radio",
    )
    st.write("Radio value:", radio_value)
with choice_middle:
    slider_value = ui.slider(
        "Confidence range",
        0,
        100,
        (20, 80),
        5,
        key="wave3_slider",
    )
    st.caption(
        "Slider value: %s"
        % ",".join("%g" % item for item in slider_value)
    )
with choice_right:
    ui.scroll_area(
        ["Wave %d ready" % index for index in range(1, 21)],
        title="Migration log",
        key="wave3_scroll_area",
        height=180,
    )

st.subheader("Compact selection controls")
compact_left, compact_middle, compact_right = st.columns(3)
with compact_left:
    enabled = ui.switch(
        "Feature enabled",
        False,
        key="wave3_switch",
    )
    st.write("Switch value:", enabled)
with compact_middle:
    selected_tab = ui.tabs(
        ["Overview", "Analytics", "Reports"],
        value="Overview",
        key="wave3_tabs",
        label="Workspace section",
        variant="line",
    )
    st.write("Tabs value:", selected_tab)
with compact_right:
    pressed = ui.toggle(
        "Bold",
        False,
        icon="bold",
        key="wave3_toggle",
        variant="outline",
    )
    formatting = ui.toggle_group(
        ["bold", "italic", "underline"],
        value=["bold"],
        key="wave3_toggle_group",
        label="Formatting",
    )
    st.write("Toggle value:", pressed)
    st.write("Toggle group:", ",".join(formatting) or "—")

st.subheader("Calendar")
selected_date = ui.calendar(
    key="wave3_calendar",
    value="2026-07-30",
    label="Migration date",
    min_date="2026-07-01",
    max_date="2026-08-31",
)
st.write("Calendar value:", selected_date or "—")

st.subheader("Streamlit form integration")
with st.form("wave3_state_form"):
    form_name = ui.input(
        "Form name",
        "Draft",
        key="wave3_form_input",
    )
    form_channel = ui.radio_group(
        "Form status",
        ["Draft", "Ready", "Published"],
        value="Draft",
        key="wave3_form_radio",
    )
    form_slider = ui.slider(
        "Form progress",
        0,
        100,
        25,
        5,
        key="wave3_form_slider",
    )
    form_submitted = st.form_submit_button("Submit Wave 3 form")

if form_submitted:
    st.session_state["wave3_form_result"] = {
        "name": form_name,
        "status": form_channel,
        "progress": form_slider,
    }
form_result = st.session_state.get("wave3_form_result")
if form_result is None:
    st.caption("Last submitted Wave 3 form: —")
else:
    st.caption(
        "Last submitted Wave 3 form: %s|%s|%s"
        % (
            form_result["name"],
            form_result["status"],
            "%g" % form_result["progress"],
        )
    )

st.status(
    "Wave 3 fixture: 14 component kinds, revisioned persistent state, "
    "bounded payloads, form support, ShadowRoot isolation, and no iframe.",
    state="complete",
)
