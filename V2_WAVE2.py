import streamlit as st

import streamlit_shadcn_ui.v2 as ui


st.set_page_config(
    page_title="Streamlit Shadcn UI · Wave 2",
    page_icon="🧱",
    layout="wide",
)

st.title("Streamlit Shadcn UI · Wave 2")
st.caption(
    "Low-risk display components built from the pinned shadcn Base UI "
    "registry snapshot. All instances use the shared Components V2 runtime."
)

st.markdown(
    """
    <style>
    .st-key-wave2_theme_dark [data-testid="stBidiComponentIsolated"] {
      --st-background-color: #10141c;
      --st-secondary-background-color: #202838;
      --st-text-color: #f3f6fb;
      --st-primary-color: #7dd3fc;
      --st-border-color: #475569;
      --st-base-radius: 0.75rem;
      --st-base-font-size: 16px;
      --st-font: ui-sans-serif, system-ui, sans-serif;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

with st.sidebar:
    st.header("Wave 2 sidebar")
    ui.alert(
        "Sidebar ready",
        "Display components inherit sidebar theme tokens.",
        key="wave2_sidebar_alert",
    )
    ui.progress(
        68,
        key="wave2_sidebar_progress",
        label="Migration",
        show_value=True,
    )

st.subheader("Status and identity")
status_left, status_middle, status_right = st.columns(3)

with status_left:
    ui.alert(
        "Heads up",
        "The Wave 2 display catalog is mounted without an iframe.",
        key="wave2_alert",
    )
    ui.alert(
        "Destructive state",
        "This variant is still rendered as plain React text.",
        key="wave2_alert_destructive",
        variant="destructive",
    )

with status_middle:
    avatar_columns = st.columns(3)
    for index, (fallback, size) in enumerate(
        [("SM", "sm"), ("OO", "default"), ("LG", "lg")]
    ):
        with avatar_columns[index]:
            ui.avatar(
                fallback=fallback,
                key="wave2_avatar_%s" % size,
                alt="%s avatar" % fallback,
                size=size,
            )
    ui.badges(
        [
            ("Default", "default"),
            ("Secondary", "secondary"),
            ("Outline", "outline"),
            ("Risk", "destructive"),
        ],
        key="wave2_badges",
    )

with status_right:
    clicked_crumb = ui.breadcrumb(
        [
            {"text": "Home", "href": "/"},
            {"text": "Components", "href": "/components"},
            {"text": "Wave 2", "current": True},
        ],
        key="wave2_breadcrumb",
        label="Wave 2 navigation",
    )
    if clicked_crumb is not None:
        st.session_state["wave2_last_breadcrumb"] = clicked_crumb
    last_breadcrumb = st.session_state.get("wave2_last_breadcrumb")
    if last_breadcrumb is None:
        st.caption("Breadcrumb event: none")
    else:
        st.caption(
            "Breadcrumb event: %s|%s|%s"
            % (
                last_breadcrumb.index,
                last_breadcrumb.text,
                last_breadcrumb.href,
            )
        )

st.subheader("Cards")
card_left, card_middle, card_right = st.columns(3)
with card_left:
    ui.card(
        "Deployment",
        "All systems operational.",
        "General content card",
        key="wave2_card",
    )
with card_middle:
    ui.metric_card(
        "Migrated components",
        "16",
        description="Wave 1 + Wave 2 kinds",
        key="wave2_metric_components",
    )
with card_right:
    with st.container(key="wave2_theme_dark"):
        ui.metric_card(
            "Iframe count",
            "0",
            description="Explicit dark Streamlit tokens",
            key="wave2_metric_iframes",
        )

st.subheader("Media and progress")
media_left, media_right = st.columns([2, 1])
with media_left:
    ui.aspect_ratio(
        (
            "data:image/svg+xml,"
            "%3Csvg xmlns='http://www.w3.org/2000/svg' "
            "viewBox='0 0 800 450'%3E"
            "%3Crect width='800' height='450' fill='%23172033'/%3E"
            "%3Ccircle cx='400' cy='225' r='110' fill='%232563eb'/%3E"
            "%3Ctext x='400' y='240' text-anchor='middle' "
            "font-family='sans-serif' font-size='48' fill='white'%3E"
            "Wave 2%3C/text%3E%3C/svg%3E"
        ),
        "Wave 2 aspect ratio fixture",
        key="wave2_aspect_ratio",
    )
with media_right:
    progress_value = st.slider(
        "Progress fixture",
        min_value=0,
        max_value=100,
        value=42,
        key="wave2_progress_slider",
    )
    ui.progress(
        progress_value,
        key="wave2_progress",
        label="Completion",
        show_value=True,
    )
    ui.skeleton(
        key="wave2_skeleton_circle",
        skeleton_width=48,
        skeleton_height=48,
        shape="circle",
    )
    ui.skeleton(
        key="wave2_skeleton_rectangle",
        skeleton_width="100%",
        skeleton_height=20,
    )

st.subheader("Structure and data")
ui.separator(key="wave2_separator_horizontal")
structure_left, structure_right = st.columns([1, 3])
with structure_left:
    ui.separator(
        key="wave2_separator_vertical",
        orientation="vertical",
        width="content",
    )
    ui.link_button(
        "Open project",
        "https://github.com/ObservedObserver/streamlit-shadcn-ui",
        key="wave2_link_button",
        variant="outline",
    )
with structure_right:
    ui.table(
        [
            {
                "component": "Alert",
                "primitive": "React",
                "status": "Ready",
            },
            {
                "component": "Avatar",
                "primitive": "Base UI",
                "status": "Ready",
            },
            {
                "component": "Progress",
                "primitive": "Base UI",
                "status": "Ready",
            },
            {
                "component": "Table",
                "primitive": "React",
                "status": "Ready",
            },
        ],
        [
            {"key": "component", "label": "Component"},
            {"key": "primitive", "label": "Primitive"},
            {"key": "status", "label": "Status", "align": "right"},
        ],
        key="wave2_table",
        caption="Wave 2 implementation provenance",
        max_height=320,
    )

st.status(
    "Wave 2 fixture: shared V2 runtime, ShadowRoot isolation, no iframe, "
    "bounded payloads, and explicit trigger/form policy.",
    state="complete",
)
