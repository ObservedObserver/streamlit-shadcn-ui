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
        True,
        "Sidebar enabled",
        key="wave3_sidebar_switch",
    )
    st.write("Sidebar switch:", sidebar_enabled)
    sidebar_toggle = ui.toggle(
        False,
        "italic",
        key="wave3_sidebar_toggle",
        label="Sidebar italic",
    )
    st.write("Sidebar toggle:", sidebar_toggle)

st.subheader("Draft-based text inputs")
input_column, textarea_column, otp_column = st.columns(3)
with input_column:
    name = ui.input(
        "Ada",
        key="wave3_input",
        label="Name",
        placeholder="Type a name",
        max_length=40,
    )
    st.write("Input Python value:", name)
with textarea_column:
    notes = ui.textarea(
        "Initial notes",
        key="wave3_textarea",
        label="Notes",
        placeholder="Write a longer note",
        rows=4,
        max_length=200,
    )
    st.write("Textarea Python value:", notes)
with otp_column:
    otp = ui.input_otp(
        "",
        6,
        key="wave3_otp",
        label="Verification code",
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
        default_values=["accessible"],
        multiple=True,
        label="Migration questions",
    )
    st.write("Accordion open:", ",".join(open_items) or "—")
with disclosure_middle:
    opened = ui.collapsible(
        "Repository details",
        "@base-ui/react",
        ["shadcn source", "Streamlit V2 host"],
        key="wave3_collapsible",
    )
    st.write("Collapsible open:", opened)
with disclosure_right:
    page_number = ui.pagination(
        key="wave3_pagination",
        total_pages=100,
        initial_page=50,
        sibling_count=1,
        label="Migration pages",
    )
    st.write("Pagination page:", page_number)

st.subheader("Choice and range controls")
choice_left, choice_middle, choice_right = st.columns(3)
with choice_left:
    radio_value = ui.radio_group(
        [
            {"label": "Alpha", "value": "alpha"},
            {"label": "Beta", "value": "beta"},
            {
                "label": "Unavailable",
                "value": "unavailable",
                "disabled": True,
            },
        ],
        "alpha",
        key="wave3_radio",
        label="Release channel",
    )
    st.write("Radio value:", radio_value)
with choice_middle:
    slider_value = ui.slider(
        [20, 80],
        0,
        100,
        5,
        "Confidence range",
        key="wave3_slider",
    )
    st.caption(
        "Slider value: %s"
        % ",".join("%g" % item for item in slider_value)
    )
with choice_right:
    ui.scroll_area(
        "Migration log",
        ["Wave %d ready" % index for index in range(1, 21)],
        key="wave3_scroll_area",
        height=180,
    )

st.subheader("Compact selection controls")
compact_left, compact_middle, compact_right = st.columns(3)
with compact_left:
    enabled = ui.switch(
        False,
        "Feature enabled",
        key="wave3_switch",
    )
    st.write("Switch value:", enabled)
with compact_middle:
    selected_tab = ui.tabs(
        ["Overview", "Analytics", "Reports"],
        "Overview",
        key="wave3_tabs",
        label="Workspace section",
        variant="line",
    )
    st.write("Tabs value:", selected_tab)
with compact_right:
    pressed = ui.toggle(
        False,
        "bold",
        key="wave3_toggle",
        label="Bold",
        variant="outline",
    )
    formatting = ui.toggle_group(
        ["bold"],
        key="wave3_toggle_group",
        label="Formatting",
        options=["bold", "italic", "underline"],
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
        "Draft",
        key="wave3_form_input",
        label="Form name",
    )
    form_channel = ui.radio_group(
        ["Draft", "Ready", "Published"],
        "Draft",
        key="wave3_form_radio",
        label="Form status",
    )
    form_slider = ui.slider(
        [25],
        0,
        100,
        5,
        "Form progress",
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
            ",".join("%g" % item for item in form_result["progress"]),
        )
    )

st.status(
    "Wave 3 fixture: 14 component kinds, revisioned persistent state, "
    "bounded payloads, form support, ShadowRoot isolation, and no iframe.",
    state="complete",
)
