# Elements

`ui.elements` builds one nested React tree and mounts it as a single Streamlit
Components V2 instance. Use it when a UI needs real React parent-child
composition instead of several isolated component roots.

```python
import streamlit as st
import streamlit_shadcn_ui as ui

def changed(event: ui.ElementEvent) -> None:
    st.session_state["last_changed"] = {
        "node": event.node_id,
        "value": event.value,
    }

with ui.elements(key="profile-card") as el:
    with el.card(key="profile"):
        with el.card_header():
            el.heading("Profile")
            el.text("Update your account details.", variant="muted")
        with el.card_content():
            with el.stack(gap="md"):
                email = el.input(
                    "Email",
                    value="ada@example.com",
                    key="email",
                    on_change=changed,
                )
                alerts = el.checkbox(
                    "Security alerts",
                    value=True,
                    key="alerts",
                    on_change=changed,
                )
        with el.card_footer():
            save = el.button("Save", key="save", stretch=True)

st.write(email.value, alerts.value, save.clicked)
```

The root `key` and every stateful or action node `key` are required. Keys are
scoped by explicit container keys, so items in a reordered list keep their
values. Changing a node's Python default resets that node without resetting
unrelated siblings. A Card's direct children must be its typed Header,
Content, or Footer slots.

Callbacks may accept no arguments or one `ElementEvent`. Value callbacks
receive the decoded Python value; action callbacks receive the node identity,
event type, payload, and sequence number. Multiple actions created in the same
browser task are delivered as one ordered batch.

Available composition primitives are `stack`, `grid`, `card`, `card_header`,
`card_content`, and `card_footer`. Content nodes include `heading`, `text`,
`code`, `badge`, `separator`, `progress`, `image`, and `link_button`.
Interactive nodes include `input`, `textarea`, `checkbox`, `switch`, `slider`,
`radio_group`, `select`, and `button`.

An Elements tree can contain library-owned React components only. Native
Streamlit commands such as `st.dataframe` and `st.write` cannot be inserted as
React children. Handles are populated when the root context exits, so read
`.value` or `.clicked` after the `with ui.elements(...)` block.

Streamlit ignores custom-component trigger values inside `st.form`. An
Elements tree containing action nodes therefore fails closed in a form;
state-only trees retain Streamlit's deferred form submission behavior.

Run the documentation app with an explicit IPv4 loopback address, then open
the independent `V2 Elements` page at `http://127.0.0.1:8501/Elements`:

```sh
streamlit run Home.py \
  --server.address=127.0.0.1 \
  --browser.serverAddress=127.0.0.1
```

Using the same address for the server and browser also avoids local browser
profiles or proxy extensions that allow `http://localhost` but block the
corresponding `ws://localhost` Streamlit connection.
