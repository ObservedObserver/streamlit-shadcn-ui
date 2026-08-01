from __future__ import annotations

import streamlit as st

import streamlit_shadcn_ui as ui


SEO_TITLE = "Streamlit Shadcn UI"
SEO_DESCRIPTION = (
    "A Streamlit component library for building beautiful apps easily. "
    "Bring the power of shadcn/ui to your Streamlit apps."
)


st.set_page_config(
    page_title=SEO_TITLE,
    page_icon="◼",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.html(
    """
    <style>
      [data-testid="stApp"]:has(.st-key-showcase_hero) {
        --showcase-background: oklch(1 0 0);
        --showcase-foreground: oklch(0.145 0 0);
        --showcase-card: oklch(1 0 0);
        --showcase-card-foreground: oklch(0.145 0 0);
        --showcase-muted-foreground: oklch(0.556 0 0);
        --showcase-border: oklch(0.922 0 0);
        --showcase-copy: oklch(0.269 0 0);
        --showcase-chart-1: oklch(0.87 0 0);
        --showcase-chart-2: oklch(0.556 0 0);
        --showcase-chart-3: oklch(0.439 0 0);
        --showcase-chart-4: oklch(0.371 0 0);
        --showcase-chart-5: oklch(0.269 0 0);

        background: var(--showcase-background);
        color: var(--showcase-foreground);
      }

      [data-testid="stApp"]:has(
          .st-key-showcase_hero
          [data-ssui-v2-host][data-theme="dark"]
        ) {
        --showcase-background: oklch(0.145 0 0);
        --showcase-foreground: oklch(0.985 0 0);
        --showcase-card: oklch(0.205 0 0);
        --showcase-card-foreground: oklch(0.985 0 0);
        --showcase-muted-foreground: oklch(0.708 0 0);
        --showcase-border: oklch(1 0 0 / 10%);
        --showcase-copy: oklch(0.708 0 0);
      }

      [data-testid="stApp"]:has(.st-key-showcase_hero)
      [data-testid="stHeader"] {
        background: var(--showcase-background);
      }

      [data-testid="stApp"]:has(.st-key-showcase_hero)
      [data-testid="stMainBlockContainer"] {
        max-inline-size: none;
        padding-inline: 0;
      }

      .st-key-showcase_hero,
      .st-key-showcase_mosaic {
        box-sizing: border-box;
        inline-size: 100%;
        max-inline-size: 100%;
        margin-inline: 0;
        color: var(--showcase-foreground);
      }

      .st-key-showcase_hero {
        padding: 1rem 1rem 3.5rem;
        background: var(--showcase-background);
        text-align: center;
      }

      .showcase-hero-copy {
        margin: 0 auto;
        max-width: 80rem;
      }

      .showcase-hero-copy h1 {
        margin: 0.75rem auto 1.25rem;
        color: var(--showcase-foreground);
        font-size: clamp(2.75rem, 4vw, 3.9rem);
        font-weight: 650;
        letter-spacing: -0.055em;
        line-height: 0.98;
        text-wrap: balance;
      }

      .st-key-showcase_seo_description {
        margin: 0 auto;
        max-width: 50rem;
        color: var(--showcase-copy);
      }

      .st-key-showcase_seo_description [data-testid="stText"] {
        margin: 0;
        color: inherit;
        font-family: inherit;
        font-size: clamp(1.05rem, 1.6vw, 1.35rem);
        line-height: 1.55;
        text-align: center;
        text-wrap: balance;
        white-space: normal;
      }

      .st-key-showcase_install_command {
        inline-size: min(100%, 28rem);
        margin: 0.5rem auto 0.25rem;
        text-align: start;
      }

      .st-key-showcase_mosaic {
        padding: 1.5rem;
        border-top: 1px solid var(--showcase-border);
      }

      .st-key-showcase_rails {
        display: grid !important;
        grid-template-columns:
          repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
        align-items: start !important;
        gap: clamp(1rem, 1.5vw, 2rem) !important;
        inline-size: 100%;
      }

      .st-key-showcase_rails > [data-testid="stLayoutWrapper"],
      .st-key-showcase_rails [class*="st-key-showcase_rail_"] {
        min-inline-size: 0;
        inline-size: 100%;
      }

      .st-key-showcase_mosaic [class*="st-key-showcase_card_"] {
        border-color: var(--showcase-border);
        background: var(--showcase-card);
        color: var(--showcase-card-foreground);
        border-radius: 1.15rem;
      }

      .showcase-card-heading h3 {
        margin: 0;
        color: var(--showcase-card-foreground);
        font-size: 1.05rem;
        font-weight: 650;
        letter-spacing: -0.015em;
      }

      .showcase-card-heading p {
        margin: 0.3rem 0 0;
        color: var(--showcase-muted-foreground);
        font-size: 0.9rem;
        line-height: 1.45;
      }

      .showcase-bars {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        align-items: end;
        gap: 0.7rem;
        height: 13rem;
        padding-top: 0.75rem;
      }

      .showcase-bar {
        display: grid;
        grid-template-rows: 1fr auto;
        align-items: end;
        gap: 0.55rem;
        height: 100%;
      }

      .showcase-bar span {
        display: block;
        min-height: 0.5rem;
        border-radius: 0.65rem;
        background: var(--bar-color);
      }

      .showcase-bar small {
        color: var(--showcase-muted-foreground);
        text-align: center;
      }

      @media (max-width: 900px) {
        .st-key-showcase_hero {
          padding-block: 1rem 3rem;
        }

        .st-key-showcase_mosaic {
          padding-inline: 1rem;
        }
      }
    </style>
    """
)


def card_heading(title: str, description: str | None = None) -> None:
    description_markup = f"<p>{description}</p>" if description else ""
    st.html(
        '<div class="showcase-card-heading">'
        f"<h3>{title}</h3>{description_markup}</div>"
    )


def showcase_card(key: str) -> st.delta_generator.DeltaGenerator:
    return st.container(
        border=True,
        key=f"showcase_card_{key}",
        gap="medium",
    )


with st.container(key="showcase_hero", gap="small"):
    with st.container(horizontal=True, horizontal_alignment="center"):
        ui.badge(
            "Streamlit Shadcn UI 1.0 · Components V2",
            variant="secondary",
        )

    st.html(
        """
        <section class="showcase-hero-copy">
          <h1>Beautiful shadcn components, built for Streamlit</h1>
        </section>
        """
    )

    with st.container(key="showcase_seo_description"):
        st.text(SEO_DESCRIPTION)

    with st.container(key="showcase_install_command"):
        st.code("pip install streamlit-shadcn-ui", language="bash")

    with st.container(
        horizontal=True,
        horizontal_alignment="center",
        gap="small",
    ):
        if ui.button("Get Started  →", key="showcase_get_started"):
            st.switch_page("site_pages/GettingStarted.py")
        ui.link_button(
            "GitHub",
            "https://github.com/ObservedObserver/streamlit-shadcn-ui",
            variant="outline",
            target="_blank",
        )


with st.container(key="showcase_mosaic", gap="large"):
    with st.container(
        key="showcase_rails",
        horizontal=True,
        gap="medium",
        vertical_alignment="top",
    ):
        left = st.container(key="showcase_rail_controls", gap="medium")
        activity = st.container(key="showcase_rail_activity", gap="medium")
        finance = st.container(key="showcase_rail_finance", gap="medium")
        connect = st.container(key="showcase_rail_connect", gap="medium")

    with left:
        with showcase_card("ui_elements"):
            card_heading(
                "Real V2 controls",
                "Every control below is a shadcn component with a Python return value.",
            )
            with st.container(horizontal=True, gap="small"):
                ui.button("Primary  →")
                ui.button("Secondary", variant="secondary")
                ui.button("Outline", variant="outline")

            ui.input(
                "Project name",
                placeholder="My Streamlit app",
            )
            ui.textarea(
                "Feedback",
                placeholder="Tell us what you want to build...",
                rows=3,
            )
            ui.badges(
                [
                    ("Components V2", "default"),
                    ("Base UI", "secondary"),
                ]
            )

            control_left, control_right = st.columns(2, gap="small")
            with control_left:
                ui.checkbox("Python-first API", value=True)
            with control_right:
                ui.switch("Dark mode ready", value=True)

            open_dialog = ui.button(
                "Try Alert Dialog",
                variant="outline",
                width="stretch",
            )
            dialog_result = ui.alert_dialog(
                open_dialog,
                "V2 modal round-trip",
                (
                    "This shadcn alert dialog is rendered through Streamlit "
                    "Components V2 without an iframe."
                ),
                confirm_label="Looks good",
                cancel_label="Close",
                key="showcase_v2_dialog",
                width="stretch",
            )
            if dialog_result is not None:
                st.caption(
                    "Dialog result returned to Python: "
                    f"{dialog_result}"
                )
            quick_action = ui.dropdown_menu(
                "Explore the API",
                ["Button docs", "Select docs", "Migration guide", "GitHub"],
                menu_label="Explore the API",
                width="stretch",
            )
            if quick_action:
                st.caption(f"Selected: {quick_action}")

        with showcase_card("navigation"):
            card_heading(
                "Explore the library",
                "Open the live examples and API documentation.",
            )
            for slug, label, page_path in (
                ("playground", "Playground", "site_pages/Playground.py"),
                ("button", "Button", "pages/Button.py"),
                ("select", "Select", "pages/Select.py"),
                ("date_picker", "Date Picker", "pages/DatePicker.py"),
                ("lifecycle", "V2 Lifecycle", "pages/V2_Lifecycle.py"),
            ):
                if ui.button(
                    label,
                    key=f"showcase_nav_{slug}",
                    variant="ghost",
                    width="stretch",
                ):
                    st.switch_page(page_path)

    with activity:
        with showcase_card("contribution"):
            card_heading(
                "V2 component coverage",
                "Production-ready APIs delivered across five migration waves.",
            )
            bars = (
                ("W1", 68, "var(--showcase-chart-1)"),
                ("W2", 82, "var(--showcase-chart-2)"),
                ("W3", 91, "var(--showcase-chart-3)"),
                ("W4", 96, "var(--showcase-chart-4)"),
                ("W5", 100, "var(--showcase-chart-5)"),
            )
            bar_markup = "".join(
                (
                    '<div class="showcase-bar">'
                    f'<span style="height:{height}%;--bar-color:{color}"></span>'
                    f"<small>{month}</small></div>"
                )
                for month, height, color in bars
            )
            st.html(
                '<div class="showcase-bars" role="img" '
                'aria-label="V2 component migration coverage by wave">'
                f"{bar_markup}</div>"
            )

            catalog, overlays = st.columns(2, gap="small")
            with catalog:
                ui.card(
                    "35 APIs",
                    "Documented",
                    "V2 catalog",
                    size="sm",
                )
            with overlays:
                ui.card(
                    "0 iframes",
                    "Native overlays",
                    "ShadowRoot",
                    size="sm",
                )
            if ui.button("Browse Components", width="stretch"):
                st.switch_page("pages/Button.py")

        ui.metric_card(
            "Release",
            "1.0.0",
            description="The package root now exposes the V2-only API.",
            delta="Ready",
        )

    with finance:
        with showcase_card("install_requirements"):
            card_heading(
                "Install Streamlit Shadcn UI",
                (
                    "Use the same Python-first API locally, on Community "
                    "Cloud, or in your own deployment."
                ),
            )
            ui.input(
                "Package",
                value="streamlit-shadcn-ui",
                disabled=True,
            )
            python, streamlit_version = st.columns(2, gap="small")
            with python:
                ui.input("Python", value=">= 3.10", disabled=True)
            with streamlit_version:
                ui.input("Streamlit", value=">= 1.60", disabled=True)
            if ui.button("Open Playground", width="stretch"):
                st.switch_page("site_pages/Playground.py")
            ui.link_button(
                "View on GitHub",
                "https://github.com/ObservedObserver/streamlit-shadcn-ui",
                variant="outline",
                width="stretch",
            )

        with showcase_card("state_round_trip"):
            card_heading(
                "Live V2 state round-trip",
                "Each control returns a typed value directly to your Streamlit script.",
            )
            favorite = ui.select(
                "Favorite component",
                [
                    "Select",
                    "Date Picker",
                    "Alert Dialog",
                    "Tabs",
                ],
            )
            demo_value = ui.slider(
                "Demo value",
                0,
                100,
                64,
                1,
            )
            ui.progress(
                demo_value,
                label=f"Current Python value: {demo_value}",
                show_value=True,
            )
            component_request = ui.textarea(
                "What should we build next?",
                placeholder="Tell us which component would help your app...",
                rows=3,
            )
            if ui.button("Inspect current state", width="stretch"):
                st.caption(
                    "Python received: "
                    f"favorite={favorite!r}, value={demo_value!r}, "
                    f"request={component_request!r}"
                )

    with connect:
        with showcase_card("install"):
            card_heading(
                "Install in seconds",
                (
                    "Add the package, import one module, and use familiar "
                    "Streamlit return values."
                ),
            )
            st.code("pip install streamlit-shadcn-ui", language="bash")
            ui.badges(
                [
                    ("1.0.0", "default"),
                    ("V2 only", "secondary"),
                ]
            )
            ui.link_button(
                "Read the README  →",
                (
                    "https://github.com/ObservedObserver/"
                    "streamlit-shadcn-ui#readme"
                ),
                width="stretch",
            )

        with showcase_card("request"):
            card_heading(
                "Help shape the component catalog",
                "Request a component, report a bug, or share your use case.",
            )
            ui.textarea(
                "Component request",
                placeholder="Which shadcn component should come next?",
                rows=8,
            )
            ui.link_button(
                "Open a GitHub issue  →",
                (
                    "https://github.com/ObservedObserver/"
                    "streamlit-shadcn-ui/issues/new"
                ),
                width="stretch",
            )
