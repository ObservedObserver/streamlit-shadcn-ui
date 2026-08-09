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
    initial_sidebar_state="collapsed",
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

      .st-key-showcase_hero {
        box-sizing: border-box;
        inline-size: 100%;
        max-inline-size: 100%;
        margin-inline: 0;
        padding: 1.5rem 1rem 4.5rem;
        background: var(--showcase-background);
        color: var(--showcase-foreground);
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
        box-sizing: border-box;
        inline-size: 100%;
        max-inline-size: 100%;
        margin-inline: 0;
        padding: 1.5rem;
        border-top: 1px solid var(--showcase-border);
        color: var(--showcase-foreground);
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

      .st-key-showcase_mosaic [class*="st-key-showcase_card_"],
      .st-key-showcase_mosaic [class*="st-key-showcase_nav_"] {
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

      .showcase-public-note {
        margin: 0;
        color: var(--showcase-muted-foreground);
        font-size: 0.78rem;
        line-height: 1.4;
      }

      @media (max-width: 900px) {
        .st-key-showcase_hero {
          padding-block: 1rem 3.5rem;
        }

        .st-key-showcase_mosaic {
          padding-inline: 1rem;
        }
      }
    </style>
    """
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


def card_heading(title: str, description: str | None = None) -> None:
    description_markup = f"<p>{description}</p>" if description else ""
    st.html(
        '<div class="showcase-card-heading">'
        f"<h3>{title}</h3>{description_markup}</div>"
    )


def public_api_note(*names: str) -> None:
    calls = " · ".join(f"ui.{name}" for name in names)
    st.html(f'<p class="showcase-public-note">Public API: {calls}</p>')


def showcase_card(key: str) -> st.delta_generator.DeltaGenerator:
    return st.container(
        border=True,
        key=f"showcase_card_{key}",
        gap="medium",
    )


def nav_card(
    key: str,
    eyebrow: str,
    label: str,
    page_path: str,
) -> None:
    with st.container(
        border=True,
        key=f"showcase_nav_{key}",
        gap="small",
    ):
        st.caption(eyebrow)
        if ui.button(
            label,
            key=f"showcase_nav_button_{key}",
            variant="ghost",
            width="stretch",
        ):
            st.switch_page(page_path)


with st.container(key="showcase_mosaic", gap="large"):
    with st.container(
        key="showcase_rails",
        horizontal=True,
        gap="medium",
        vertical_alignment="top",
    ):
        controls_rail = st.container(
            key="showcase_rail_controls",
            gap="medium",
        )
        coverage_rail = st.container(
            key="showcase_rail_coverage",
            gap="medium",
        )
        state_rail = st.container(
            key="showcase_rail_state",
            gap="medium",
        )
        project_rail = st.container(
            key="showcase_rail_project",
            gap="medium",
        )

    with controls_rail:
        with showcase_card("controls"):
            card_heading(
                "Real public V2 controls",
                "These are the same calls available after pip install.",
            )
            public_api_note(
                "button",
                "input",
                "textarea",
                "checkbox",
                "switch",
            )

            with st.container(horizontal=True, gap="small"):
                ui.button("Button  →", key="showcase_primary")
                ui.button(
                    "Secondary",
                    key="showcase_secondary",
                    variant="secondary",
                )
                ui.button(
                    "Outline",
                    key="showcase_outline",
                    variant="outline",
                )

            ui.input(
                "Project name",
                key="showcase_project_name",
                placeholder="My Streamlit app",
            )
            ui.textarea(
                "Feedback",
                key="showcase_feedback",
                placeholder="Tell us what you want to build...",
                rows=3,
            )
            ui.badges(
                [
                    ("Components V2", "default"),
                    ("Base UI", "secondary"),
                    ("Typed state", "outline"),
                ],
                key="showcase_badges",
            )

            control_left, control_right = st.columns(2, gap="small")
            with control_left:
                ui.checkbox(
                    "Python-first API",
                    value=True,
                    key="showcase_checkbox",
                )
            with control_right:
                ui.switch(
                    "Dark mode ready",
                    value=True,
                    key="showcase_switch",
                )

            with st.container(horizontal=True, gap="small"):
                open_dialog = ui.button(
                    "Alert Dialog",
                    key="showcase_open_dialog",
                    variant="outline",
                )
                action = ui.dropdown_menu(
                    "Quick Actions",
                    ["Button docs", "Select docs", "Migration guide"],
                    key="showcase_quick_actions",
                    menu_label="Quick Actions",
                )

            dialog_result = ui.alert_dialog(
                open_dialog,
                "Public API round-trip",
                "This dialog is opened by ui.alert_dialog in Homepage.py.",
                confirm_label="Looks good",
                cancel_label="Close",
                key="showcase_dialog",
            )
            if dialog_result is not None:
                st.caption(f"Python received dialog result: {dialog_result}")
            if action is not None:
                st.caption(f"Python received menu action: {action}")

        nav_top_left, nav_top_right = st.columns(2, gap="small")
        with nav_top_left:
            nav_card(
                "start",
                "Start",
                "Getting Started  →",
                "site_pages/GettingStarted.py",
            )
        with nav_top_right:
            nav_card(
                "components",
                "Components",
                "Button  →",
                "pages/Button.py",
            )

        nav_bottom_left, nav_bottom_right = st.columns(2, gap="small")
        with nav_bottom_left:
            nav_card(
                "guides",
                "Guides",
                "V2 Lifecycle  →",
                "pages/V2_Lifecycle.py",
            )
        with nav_bottom_right:
            nav_card(
                "lab",
                "Project",
                "Component Lab  →",
                "pages/Experiment(Cool).py",
            )

    with coverage_rail:
        with showcase_card("coverage"):
            card_heading(
                "V2 component coverage",
                "Real progress components show the five delivery waves.",
            )
            public_api_note("progress", "badges", "button")

            for wave, value in (
                ("Wave 1", 68),
                ("Wave 2", 82),
                ("Wave 3", 91),
                ("Wave 4", 96),
                ("Wave 5", 100),
            ):
                ui.progress(
                    value,
                    label=wave,
                    show_value=True,
                    key=f"showcase_{wave.lower().replace(' ', '_')}",
                )

            ui.badges(
                [
                    ("36 APIs", "default"),
                    ("0 iframes", "secondary"),
                    ("Native overlays", "outline"),
                ],
                key="showcase_coverage_badges",
            )
            if ui.button(
                "Browse Components  →",
                key="showcase_browse_components",
                width="stretch",
            ):
                st.switch_page("pages/Button.py")

        ui.metric_card(
            "Current release",
            "1.1.0",
            description="The package root exposes the public V2 API.",
            delta="36 documented components",
            key="showcase_release",
        )

        with showcase_card("source"):
            card_heading(
                "No homepage-only API",
                "The interactive state card is built with these public calls.",
            )
            st.code(
                "\n".join(
                    (
                        "choice = ui.select(\"Component\", options)",
                        "value = ui.slider(\"Value\", 0, 100, 64)",
                        "ui.progress(value, show_value=True)",
                    )
                ),
                language="python",
            )
            ui.link_button(
                "View Homepage.py  →",
                "https://github.com/ObservedObserver/"
                "streamlit-shadcn-ui/blob/main/site_pages/Homepage.py",
                key="showcase_view_source",
                variant="outline",
                target="_blank",
                width="stretch",
            )

    with state_rail:
        with showcase_card("install_requirements"):
            card_heading(
                "Install Streamlit Shadcn UI",
                "Use the same Python-first API in any Streamlit app.",
            )
            public_api_note("input", "button", "link_button")

            ui.input(
                "Package",
                value="streamlit-shadcn-ui",
                disabled=True,
                key="showcase_package",
            )
            python_col, streamlit_col = st.columns(2, gap="small")
            with python_col:
                ui.input(
                    "Python",
                    value=">= 3.10",
                    disabled=True,
                    key="showcase_python",
                )
            with streamlit_col:
                ui.input(
                    "Streamlit",
                    value=">= 1.60",
                    disabled=True,
                    key="showcase_streamlit",
                )

            if ui.button(
                "Open Playground",
                key="showcase_playground",
                width="stretch",
            ):
                st.switch_page("site_pages/Playground.py")
            ui.link_button(
                "View on GitHub",
                "https://github.com/ObservedObserver/streamlit-shadcn-ui",
                key="showcase_github",
                variant="outline",
                target="_blank",
                width="stretch",
            )

        with showcase_card("state_round_trip"):
            card_heading(
                "Live V2 state round-trip",
                "Change a value and Streamlit receives the typed Python result.",
            )
            public_api_note("select", "slider", "progress", "textarea")

            favorite = ui.select(
                "Favorite component",
                ["Select", "Date Picker", "Alert Dialog", "Tabs"],
                key="showcase_favorite",
            )
            demo_value = ui.slider(
                "Demo value",
                0,
                100,
                64,
                1,
                key="showcase_demo_value",
            )
            ui.progress(
                demo_value,
                label=f"Current Python value: {demo_value}",
                show_value=True,
                key="showcase_demo_progress",
            )
            component_request = ui.textarea(
                "What should we build next?",
                placeholder="Which component would help your app?",
                rows=3,
                key="showcase_component_request",
            )
            if ui.button(
                "Inspect current state",
                key="showcase_inspect_state",
                width="stretch",
            ):
                st.caption(
                    "Python received: "
                    f"favorite={favorite!r}, value={demo_value!r}, "
                    f"request={component_request!r}"
                )

    with project_rail:
        with showcase_card("install"):
            card_heading(
                "Install in seconds",
                "One package, familiar Streamlit return values.",
            )
            st.code("pip install streamlit-shadcn-ui", language="bash")
            ui.badges(
                [
                    ("1.1.0", "default"),
                    ("V2 only", "secondary"),
                    ("MIT", "outline"),
                ],
                key="showcase_install_badges",
            )
            ui.link_button(
                "Read the README  →",
                "https://github.com/ObservedObserver/"
                "streamlit-shadcn-ui#readme",
                key="showcase_readme",
                target="_blank",
                width="stretch",
            )

        with showcase_card("request"):
            card_heading(
                "Shape the component catalog",
                "Request a component, report a bug, or share your use case.",
            )
            public_api_note("textarea", "link_button")
            ui.textarea(
                "Component request",
                placeholder="Which shadcn component should come next?",
                rows=9,
                key="showcase_request_textarea",
            )
            ui.link_button(
                "Open a GitHub issue  →",
                "https://github.com/ObservedObserver/"
                "streamlit-shadcn-ui/issues/new",
                key="showcase_issue",
                target="_blank",
                width="stretch",
            )

        with showcase_card("principle"):
            card_heading(
                "Built from the package itself",
                "No screenshot, mock iframe, or private showcase renderer.",
            )
            ui.alert(
                "Dogfooded",
                "Every ui.* call on this page belongs to the public API.",
                key="showcase_public_api_alert",
            )
