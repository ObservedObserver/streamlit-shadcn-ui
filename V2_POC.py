import streamlit as st

import streamlit_shadcn_ui.v2 as ui
from streamlit_shadcn_ui.v2 import _component as v2_component
from streamlit_shadcn_ui.v2._protocol import metadata_cell, register_kind


@st.fragment
def lifecycle_rerender_fixture():
    completed = st.session_state.get("wave1_rerenders_completed", 0)
    ui.select(
        "Fragment lifecycle Select",
        ["Stable", "Updated"],
        key="wave1_fragment_lifecycle_select",
        disabled=bool(completed % 2),
    )

    if st.button(
        "Run 100 server rerenders",
        key="wave1_run_100_rerenders",
    ):
        st.session_state["wave1_rerenders_remaining"] = 100
        st.session_state["wave1_rerenders_completed"] = 0

    st.write(
        "Lifecycle rerenders completed:",
        st.session_state.get("wave1_rerenders_completed", 0),
    )

    remaining = st.session_state.get("wave1_rerenders_remaining", 0)
    if remaining > 0:
        st.session_state["wave1_rerenders_remaining"] = remaining - 1
        st.session_state["wave1_rerenders_completed"] = (
            st.session_state.get("wave1_rerenders_completed", 0) + 1
        )
        st.rerun(scope="fragment")


st.set_page_config(
    page_title="Streamlit Shadcn UI · Wave 1",
    page_icon="🧪",
    layout="wide",
)

st.title("Streamlit Shadcn UI · Wave 1")
st.caption(
    "Streamlit Components V2 + checked-in shadcn source + Base UI. "
    "Every component is iframe-free and style-isolated in a ShadowRoot."
)

# These selectors are acceptance-fixture scaffolding, not runtime component
# styles. They let one Streamlit page exercise light, dark, and custom host
# tokens at the same time.
st.markdown(
    """
    <style>
    .st-key-wave1_theme_light [data-testid="stBidiComponentIsolated"] {
      --st-background-color: #ffffff;
      --st-secondary-background-color: #f2f4f8;
      --st-text-color: #172033;
      --st-primary-color: #2563eb;
      --st-border-color: #cbd5e1;
      --st-base-radius: 0.5rem;
      --st-base-font-size: 16px;
      --st-font: ui-sans-serif, system-ui, sans-serif;
    }
    .st-key-wave1_theme_dark [data-testid="stBidiComponentIsolated"] {
      --st-background-color: #10141c;
      --st-secondary-background-color: #202838;
      --st-text-color: #f3f6fb;
      --st-primary-color: #7dd3fc;
      --st-border-color: #475569;
      --st-base-radius: 0.75rem;
      --st-base-font-size: 16px;
      --st-font: ui-sans-serif, system-ui, sans-serif;
    }
    .st-key-wave1_theme_custom [data-testid="stBidiComponentIsolated"] {
      --st-background-color: #fffaf0;
      --st-secondary-background-color: #f5ead3;
      --st-text-color: #352b1d;
      --st-primary-color: #7c3aed;
      --st-border-color: #b45309;
      --st-base-radius: 1rem;
      --st-base-font-size: 18px;
      --st-font: Georgia, "Times New Roman", serif;
    }
    #wave1-fixed-competitor {
      background: #ef4444;
      bottom: 0.25rem;
      color: white;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      position: fixed;
      right: 0.25rem;
      z-index: 2147483647;
    }
    </style>
    <div id="wave1-fixed-competitor">fixed stacking fixture</div>
    """,
    unsafe_allow_html=True,
)

if st.button("Reset Wave 1 state", type="secondary"):
    for state_key in list(st.session_state):
        if (
            str(state_key).startswith("wave1_")
            or state_key == "__streamlit_shadcn_ui_v2_runtime_v1__"
        ):
            del st.session_state[state_key]
    st.rerun()

with st.sidebar:
    st.header("Sidebar placement")
    sidebar_value = ui.select(
        "Sidebar fruit",
        ["Apple", "Banana", "Orange"],
        key="wave1_sidebar_select",
    )
    st.write("Value:", sidebar_value)

st.subheader("1. Select — primary acceptance target")
left, middle, right = st.columns(3)

with left:
    fruit = ui.select(
        "Fruit",
        ["Apple", "Banana", "Orange", "Grape", "Mango"],
        key="wave1_fruit",
        placeholder="Choose a fruit",
    )
    st.write("Python value:", fruit)

with middle:
    timezone = ui.select(
        "Long, scrollable list",
        [f"UTC {offset:+03d}:00" for offset in range(-12, 15)],
        key="wave1_timezone",
        value="UTC +00:00",
    )
    st.write("Python value:", timezone)

with right:
    long_value = ui.select(
        "Long labels",
        [
            "Short",
            "A deliberately long option label that must remain bounded",
            "Another long option used to verify popup width and clipping",
        ],
        key="wave1_long_select",
    )
    st.write("Python value:", long_value)

with st.expander("Nested expander placement", expanded=True):
    expander_value = ui.select(
        "Inside expander",
        ["First", "Second", "Third"],
        key="wave1_expander_select",
    )
    st.write("Value:", expander_value)

with st.expander("Initially collapsed placement", expanded=False):
    collapsed_value = ui.select(
        "Inside initially collapsed expander",
        ["North", "East", "South", "West"],
        key="wave1_collapsed_select",
    )
    st.write("Value:", collapsed_value)

st.subheader("Theme token laboratory")
theme_light, theme_dark, theme_custom = st.columns(3)
with theme_light:
    with st.container(key="wave1_theme_light"):
        st.caption("Explicit light tokens")
        light_theme_value = ui.select(
            "Light theme Select",
            ["One", "Two", "Three"],
            key="wave1_theme_light_select",
        )
with theme_dark:
    with st.container(key="wave1_theme_dark"):
        st.caption("Explicit dark tokens")
        dark_theme_value = ui.select(
            "Dark theme Select",
            ["One", "Two", "Three"],
            key="wave1_theme_dark_select",
        )
with theme_custom:
    with st.container(key="wave1_theme_custom"):
        st.caption("Custom color, font, radius, and base size")
        custom_theme_value = ui.select(
            "Custom theme Select",
            ["One", "Two", "Three"],
            key="wave1_theme_custom_select",
        )

tab_select, tab_states, tab_forms, tab_lifecycle = st.tabs(
    [
        "Overlay placements",
        "States and triggers",
        "Form behavior",
        "Lifecycle and errors",
    ]
)

with tab_select:
    st.caption("The popup must remain visible over a bounded scroll container.")
    with st.container(height=220):
        for row in range(4):
            st.write(f"Scrollable content row {row + 1}")
        scroll_value = ui.select(
            "Inside height-constrained container",
            ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"],
            key="wave1_scroll_select",
        )
        st.write("Value:", scroll_value)
        for row in range(4, 8):
            st.write(f"Scrollable content row {row + 1}")

    disabled_left, empty_right = st.columns(2)
    with disabled_left:
        ui.select(
            "Disabled Select",
            ["Unavailable"],
            key="wave1_disabled_select",
            disabled=True,
        )
    with empty_right:
        ui.select(
            "Empty Select",
            [],
            key="wave1_empty_select",
            index=None,
        )

    remove_banana = st.checkbox(
        "Remove Banana from the dynamic options",
        key="wave1_remove_banana",
    )
    dynamic_options = ["Apple", "Orange"] if remove_banana else [
        "Apple",
        "Banana",
        "Orange",
    ]
    dynamic_value = ui.select(
        "Dynamic option invalidation",
        dynamic_options,
        key="wave1_dynamic_select",
    )
    st.write("Dynamic value:", dynamic_value)

with tab_states:
    menu_event = ui.dropdown_menu(
        "Open actions",
        ["Inspect", "Duplicate", "Archive"],
        key="wave1_menu",
        menu_label="Actions",
    )
    if menu_event:
        st.session_state["wave1_last_menu_event"] = menu_event
    st.write(
        "Latest menu event:",
        st.session_state.get("wave1_last_menu_event", "—"),
    )

    state_left, state_right = st.columns(2)
    with state_left:
        checked = ui.checkbox(
            "Keep this checked across reruns",
            key="wave1_checkbox",
            default_checked=True,
        )
        st.write("Checkbox:", checked)

    with state_right:
        clicked = ui.button(
            "V2 button",
            key="wave1_button",
            variant="outline",
        )
        if clicked:
            st.session_state["wave1_click_count"] = (
                st.session_state.get("wave1_click_count", 0) + 1
            )
        st.write("Button clicks:", st.session_state.get("wave1_click_count", 0))

    st.button("Unrelated Streamlit rerun", key="wave1_native_rerun")

with tab_forms:
    with st.form("wave1_state_form"):
        form_value = ui.select(
            "Stateful Select in st.form",
            ["Draft", "Ready", "Published"],
            key="wave1_form_select",
        )
        form_checked = ui.checkbox(
            "Stateful Checkbox in st.form",
            key="wave1_form_checkbox",
        )
        submitted = st.form_submit_button("Submit form")

    if submitted:
        st.session_state["wave1_form_result"] = {
            "select": form_value,
            "checkbox": form_checked,
        }
    st.write(
        "Last submitted state:",
        st.session_state.get("wave1_form_result", "—"),
    )

    st.caption(
        "Button and Dropdown Menu are deliberately unsupported inside "
        "st.form because Streamlit ignores V2 trigger values there."
    )

with tab_lifecycle:
    render_conditional = st.checkbox(
        "Render the conditional V2 Select",
        value=True,
        key="wave1_render_conditional",
    )
    conditional_slot = st.empty()
    if render_conditional:
        with conditional_slot.container():
            conditional_value = ui.select(
                "Conditional lifecycle Select",
                ["Mounted", "Stable"],
                key="wave1_conditional_select",
            )
            st.write("Conditional value:", conditional_value)
    else:
        conditional_slot.caption(
            "The component was unmounted through st.empty()."
        )

    register_kind("wave1_error_fixture", "select")
    v2_component.mount(
        key="wave1_error_fixture",
        data={
            "protocolVersion": 999,
            "kind": "select",
        },
        default={"meta": metadata_cell("select")},
        width="stretch",
    )

    lifecycle_rerender_fixture()

st.subheader("Current acceptance state")
st.json(
    {
        "fruit": fruit,
        "timezone": timezone,
        "long_select": long_value,
        "sidebar": sidebar_value,
        "expander": expander_value,
        "collapsed_expander": collapsed_value,
        "theme_light": light_theme_value,
        "theme_dark": dark_theme_value,
        "theme_custom": custom_theme_value,
        "last_menu_event": st.session_state.get("wave1_last_menu_event"),
        "click_count": st.session_state.get("wave1_click_count", 0),
    }
)

st.info(
    "Wave 1 acceptance: no iframe, no document.body popup, no document-level "
    "inert/scroll mutation, stable values across reruns, and correct keyboard "
    "and outside-press behavior in every placement above."
)

benchmark_raw = st.query_params.get("instances", "0")
try:
    benchmark_count = min(100, max(0, int(benchmark_raw)))
except (TypeError, ValueError):
    benchmark_count = 0

if benchmark_count:
    st.subheader("CSS-per-instance benchmark fixture")
    st.caption(
        "Enabled through ?instances=N; capped at 100 and excluded from the "
        "public component API."
    )
    benchmark_columns = st.columns(5)
    for benchmark_index in range(benchmark_count):
        with benchmark_columns[benchmark_index % len(benchmark_columns)]:
            ui.button(
                "Fixture %d" % (benchmark_index + 1),
                key="wave1_benchmark_%d_%d"
                % (benchmark_count, benchmark_index),
                disabled=True,
                width="stretch",
            )
