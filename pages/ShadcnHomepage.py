from __future__ import annotations

import streamlit as st

import streamlit_shadcn_ui as ui


st.set_page_config(
    page_title="shadcn Homepage · V2 Showcase",
    page_icon="◼",
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.html(
    """
    <style>
      .st-key-showcase_hero {
        margin-inline: calc(50% - 50vw);
        padding: 1rem 1rem 3.5rem;
        text-align: center;
      }

      .showcase-hero-copy {
        margin: 0 auto;
        max-width: 80rem;
      }

      .showcase-hero-copy h1 {
        margin: 0.75rem auto 1.25rem;
        color: #09090b;
        font-size: clamp(2.75rem, 4vw, 3.9rem);
        font-weight: 650;
        letter-spacing: -0.055em;
        line-height: 0.98;
        text-wrap: balance;
      }

      .showcase-hero-copy p {
        margin: 0 auto;
        max-width: 50rem;
        color: #27272a;
        font-size: clamp(1.05rem, 1.6vw, 1.35rem);
        line-height: 1.55;
        text-wrap: balance;
      }

      .st-key-showcase_mosaic {
        margin-inline: calc(50% - 50vw);
        padding: 1.5rem;
        border-top: 1px solid #e4e4e7;
        background: #f4f4f5;
      }

      .st-key-showcase_mosaic [class*="st-key-showcase_card_"] {
        background: #ffffff;
        border-radius: 1.15rem;
      }

      .showcase-card-heading h3 {
        margin: 0;
        color: #18181b;
        font-size: 1.05rem;
        font-weight: 650;
        letter-spacing: -0.015em;
      }

      .showcase-card-heading p {
        margin: 0.3rem 0 0;
        color: #71717a;
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
        color: #71717a;
        text-align: center;
      }

      .showcase-qr-frame {
        display: flex;
        justify-content: center;
        padding: 1rem 0 0.25rem;
      }

      .showcase-qr {
        display: grid;
        grid-template-columns: repeat(21, 0.48rem);
        grid-template-rows: repeat(21, 0.48rem);
        padding: 1rem;
        border: 1px solid #e4e4e7;
        border-radius: 1rem;
        background: white;
      }

      .showcase-qr span {
        width: 0.48rem;
        height: 0.48rem;
        background: var(--qr-cell, white);
      }

      @media (max-width: 900px) {
        .st-key-showcase_hero {
          padding-block: 1rem 3rem;
        }

        .st-key-showcase_mosaic {
          padding-inline: 1rem;
        }

        .showcase-qr {
          grid-template-columns: repeat(21, 0.36rem);
          grid-template-rows: repeat(21, 0.36rem);
        }

        .showcase-qr span {
          width: 0.36rem;
          height: 0.36rem;
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
        ui.badge("React Aria is now available  →", variant="secondary")

    st.html(
        """
        <section class="showcase-hero-copy">
          <h1>The Foundation for your Design System</h1>
          <p>
            A set of beautifully designed components that you can customize,
            extend, and build on. Start here then make it your own.
            Open Source. Open Code.
          </p>
        </section>
        """
    )

    with st.container(horizontal=True, horizontal_alignment="center"):
        ui.link_button(
            "Build Your Own  →",
            "https://ui.shadcn.com/create?preset=b27GcrRo",
            target="_blank",
        )


with st.container(key="showcase_mosaic", gap="large"):
    left, activity, finance, connect = st.columns(
        4,
        gap="medium",
        vertical_alignment="top",
    )

    with left:
        with showcase_card("ui_elements"):
            with st.container(horizontal=True, gap="small"):
                ui.button("Button  →")
                ui.button("Secondary", variant="secondary")
                ui.button("Outline", variant="outline")

            ui.input("Name", placeholder="Name")
            ui.textarea("Message", placeholder="Message", rows=3)
            ui.badges(
                [
                    ("Badge", "default"),
                    ("Secondary", "secondary"),
                ]
            )

            control_left, control_right = st.columns(2, gap="small")
            with control_left:
                ui.checkbox("Email alerts", value=True)
            with control_right:
                ui.switch("Compact mode", value=True)

            open_dialog = ui.button(
                "Alert Dialog",
                variant="outline",
                width="stretch",
            )
            ui.alert_dialog(
                open_dialog,
                "Allow accessory to connect?",
                "Allow the USB accessory to connect to this device and your data?",
                confirm_label="Allow",
                cancel_label="Don't allow",
                key="showcase_accessory_dialog",
                width="stretch",
            )
            quick_action = ui.dropdown_menu(
                "Quick Actions",
                ["Mute Conversation", "Mark as Read", "Block User", "Delete"],
                menu_label="Quick Actions",
                width="stretch",
            )
            if quick_action:
                st.caption(f"Selected: {quick_action}")

        with showcase_card("navigation"):
            card_heading("Planning")
            for slug, label in (
                ("documents", "Documents"),
                ("budget", "Budget"),
                ("reports", "Reports"),
                ("goals", "Goals"),
                ("calendar", "Calendar"),
            ):
                ui.button(
                    label,
                    key=f"showcase_nav_{slug}",
                    variant="ghost",
                    width="stretch",
                )

    with activity:
        with showcase_card("contribution"):
            card_heading(
                "Contribution History",
                "Last 6 months of activity",
            )
            bars = (
                ("Dec", 68, "#d4d4d8"),
                ("Jan", 94, "#858585"),
                ("Feb", 78, "#5d5d5d"),
                ("Mar", 98, "#3f3f3f"),
                ("Apr", 63, "#27272a"),
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
                'aria-label="Last six months of contribution activity">'
                f"{bar_markup}</div>"
            )

            upcoming, plan = st.columns(2, gap="small")
            with upcoming:
                ui.card(
                    "May 2024",
                    "Scheduled",
                    "Upcoming",
                    size="sm",
                )
            with plan:
                ui.card(
                    "Accelerated",
                    "Recurring",
                    "Savings Plan",
                    size="sm",
                )
            ui.button("View Full Report", width="stretch")

        ui.metric_card(
            "Claimable Balance",
            "$1,211.29",
            description="Ready for the next monthly distribution",
            delta="Pending setup",
        )

    with finance:
        with showcase_card("milestone"):
            card_heading(
                "Set a new milestone",
                "Define your financial target and we'll help you pace your savings.",
            )
            ui.input(
                "Goal Name",
                placeholder="e.g. New Car, Home Downpayment",
            )
            amount, target_date = st.columns(2, gap="small")
            with amount:
                ui.input("Target Amount", value="$15,000")
            with target_date:
                ui.input("Target Date", value="Dec 2025")
            ui.button("Create Goal", width="stretch")
            ui.button("Cancel", variant="outline", width="stretch")

        with showcase_card("payout"):
            card_heading(
                "Payout Threshold",
                "Set the minimum balance required before a payout is triggered.",
            )
            ui.select(
                "Preferred Currency",
                [
                    "USD — United States Dollar",
                    "EUR — Euro",
                    "GBP — British Pound",
                    "JPY — Japanese Yen",
                ],
            )
            minimum = ui.slider(
                "Minimum Payout Amount",
                50,
                10_000,
                2_500,
                50,
            )
            ui.progress(
                minimum / 10_000 * 100,
                label=f"${minimum:,.0f} of $10,000",
                show_value=True,
            )
            ui.textarea(
                "Notes",
                placeholder="Add notes for this payout configuration...",
                rows=3,
            )
            ui.button("Save Threshold", width="stretch")

    with connect:
        with showcase_card("qr"):
            qr_cells = (
                "111111100101101111111",
                "100000101001001000001",
                "101110101111101011101",
                "101110100100001011101",
                "101110101010101011101",
                "100000100111001000001",
                "111111101010101111111",
                "000000001101000000000",
                "101011111001111010110",
                "010100001110010101001",
                "111010111011101111010",
                "001101000101000010101",
                "110111101111010111011",
                "000000001001010001010",
                "111111101101111101001",
                "100000100010001001111",
                "101110101011101110100",
                "101110100110100010011",
                "101110101000111101110",
                "100000101101000011001",
                "111111101011101101111",
            )
            qr_markup = "".join(
                (
                    '<span style="--qr-cell:#09090b"></span>'
                    if cell == "1"
                    else "<span></span>"
                )
                for row in qr_cells
                for cell in row
            )
            st.html(
                '<div class="showcase-qr-frame">'
                '<div class="showcase-qr" role="img" '
                'aria-label="Connect device QR code">'
                f"{qr_markup}</div></div>"
            )
            card_heading(
                "Scan to connect your mobile device",
                "Open the Ledger mobile app and scan this code to link your device.",
            )

        with showcase_card("chat"):
            card_heading("New Chat", "How can I help you today?")
            ui.textarea(
                "Message",
                placeholder="Ask anything...",
                rows=8,
            )
            ui.button("Send message", width="stretch")
