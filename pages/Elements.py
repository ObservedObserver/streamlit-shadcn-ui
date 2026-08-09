import streamlit as st

import streamlit_shadcn_ui as ui


st.title("Streamlit Shadcn UI · Elements")
st.caption(
    "A single Components V2 mount reproducing two nested cards from the "
    "shadcn/ui homepage: NotificationSettings and TransferFunds."
)


def record_change(event: ui.ElementEvent) -> None:
    st.session_state["elements_last_change"] = {
        "node_id": event.node_id,
        "value": event.value,
        "sequence": event.sequence,
    }


def record_action(event: ui.ElementEvent) -> None:
    st.session_state["elements_last_action"] = {
        "node_id": event.node_id,
        "event_type": event.event_type,
        "sequence": event.sequence,
    }


notifications = [
    (
        "transactions",
        "Transaction alerts",
        "Deposits, withdrawals, and transfers.",
        True,
    ),
    (
        "security",
        "Security alerts",
        "Login attempts and account changes.",
        True,
    ),
    (
        "goals",
        "Goal milestones",
        "Updates at 25%, 50%, 75%, and 100%.",
        False,
    ),
    (
        "market",
        "Market updates",
        "Daily portfolio summary and price alerts.",
        False,
    ),
]
from_accounts = [
    {
        "label": "Main Checking (··8402) — $12,450.00",
        "value": "checking",
    },
    {
        "label": "Business (··7731) — $8,920.00",
        "value": "business",
    },
]
to_accounts = [
    {
        "label": "High Yield Savings (··1192) — $42,100.00",
        "value": "savings",
    },
    {
        "label": "Investment (··3349) — $18,200.00",
        "value": "investment",
    },
]

notification_handles = {}
with ui.elements(key="shadcn-homepage-cards") as el:
    with el.grid(columns=2, gap="lg", min_column_width=360):
        with el.card(key="notifications"):
            with el.card_header():
                el.heading("Notifications")
                el.text(
                    "Choose which email and push alerts you want to receive.",
                    variant="muted",
                )
            with el.card_content():
                with el.stack(gap="md"):
                    for item_key, label, description, checked in notifications:
                        with el.stack(key="field-%s" % item_key, gap="xs"):
                            notification_handles[item_key] = el.checkbox(
                                label,
                                key=item_key,
                                value=checked,
                                on_change=record_change,
                            )
                            el.text(description, variant="caption")
            with el.card_footer():
                save_preferences = el.button(
                    "Save Preferences",
                    key="save-preferences",
                    stretch=True,
                    on_click=record_action,
                )

        with el.card(key="transfer"):
            with el.card_header():
                el.heading("Transfer Funds")
                el.text(
                    "Move money between your connected accounts.",
                    variant="muted",
                )
            with el.card_content():
                with el.stack(gap="md"):
                    amount = el.input(
                        "Amount to Transfer",
                        value="1,200.00",
                        key="amount",
                        on_change=record_change,
                    )
                    from_account = el.select(
                        "From Account",
                        from_accounts,
                        key="from-account",
                        on_change=record_change,
                    )
                    to_account = el.select(
                        "To Account",
                        to_accounts,
                        key="to-account",
                        on_change=record_change,
                    )
                    with el.stack(key="summary", gap="sm"):
                        with el.stack(
                            key="arrival-row",
                            direction="horizontal",
                            justify="between",
                            align="center",
                        ):
                            el.text("Estimated arrival", variant="muted")
                            el.text("Today, Apr 14", variant="label")
                        el.separator()
                        with el.stack(
                            key="fee-row",
                            direction="horizontal",
                            justify="between",
                            align="center",
                        ):
                            el.text("Transaction fee", variant="muted")
                            el.text("$0.00", variant="label")
                        el.separator()
                        with el.stack(
                            key="total-row",
                            direction="horizontal",
                            justify="between",
                            align="center",
                        ):
                            el.text("Total amount", variant="label")
                            el.text("$1,200.00", variant="label")
            with el.card_footer():
                confirm_transfer = el.button(
                    "Confirm Transfer",
                    key="confirm-transfer",
                    stretch=True,
                    on_click=record_action,
                )


st.subheader("Current aggregate result")
st.json(
    {
        "notifications": {
            key: handle.value
            for key, handle in notification_handles.items()
        },
        "transfer": {
            "amount": amount.value,
            "from": from_account.value,
            "to": to_account.value,
        },
        "clicked": {
            "save_preferences": save_preferences.clicked,
            "confirm_transfer": confirm_transfer.clicked,
        },
        "last_change": st.session_state.get("elements_last_change"),
        "last_action": st.session_state.get("elements_last_action"),
    }
)

st.status(
    "Elements acceptance: one V2 host, recursive Card composition, stable "
    "dynamic keys, aggregate values, ordered callbacks, and action batching.",
    state="complete",
)
