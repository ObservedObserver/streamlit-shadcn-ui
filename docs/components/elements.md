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

Available composition primitives include `stack`, `grid`, Card slots, Item
slots and groups, Button Group, Dialog, Sheet, Empty, Field Set, Field Group,
Field, and Tooltip. Content nodes
include `heading`, `text`, `code`, `badge`, `separator`, `progress`, `spinner`,
`image`, `avatar`, and `link_button`. Item media supports a native `item_image`
thumbnail without the Aspect Ratio wrapper. See [Item](./item.md). Interactive nodes include `input`, `input_group`,
`number_input`, `textarea`, `checkbox`, `switch`, `slider`, `radio_group`,
`select`, `combobox`, and `button`.

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

## Nested panels and scroll regions

Tabs, Accordion, Collapsible, and Scroll Area accept supported Elements
children. Their panels can contain inputs, actions, cards, and other panels:

```python
import streamlit as st
import streamlit_shadcn_ui as ui

with ui.elements(key="record-settings") as el:
    with el.tabs(key="settings", default_value="general"):
        with el.tab("general", "General"):
            name = el.input("Name", key="name", value="Ada")
            with el.accordion(key="sections", default_value=["details"]):
                with el.accordion_item("details", "Details"):
                    enabled = el.checkbox("Enabled", key="enabled", value=True)
        with el.tab("advanced", "Advanced"):
            with el.collapsible("More options", key="more"):
                with el.scroll_area(height=240, label="Advanced options"):
                    notes = el.textarea("Notes", key="notes")

st.write(name.value, enabled.value, notes.value)
```

Elements Tabs currently supports horizontal navigation only. The pinned
shadcn Tabs wrapper does not forward vertical orientation to Base UI, so this
API does not expose an orientation option. This leaves the generated source
and existing standalone API unchanged.

`tabs` accepts only `tab` children; `accordion` accepts only
`accordion_item` children. Their item `value` is also their stable key and
must follow the Elements key rules. Values must be unique among siblings.
Nonempty containers and valid initial selections are required. Accordion
accepts a sequence of default item values and `multiple=True` for multiple
expanded items. A tab or accordion item can be disabled. Collapsible uses
an existing Button variant and size for its trigger.

Selection and expansion remain local to the browser and do not rerun
Python. These context managers do not return selected/open value handles.
Changing `default_value` or `default_open` resets the local state; an ordinary
rerun with the same defaults preserves it. Removing a selected tab falls
back to the first enabled tab; removed accordion items are not rendered as
expanded. Reinserting a removed item does not restore its old selection or
expansion. Disabling an already selected tab leaves its panel displayed and
prevents selecting it again after navigating away. Reloading or remounting
starts again from the Python defaults.

Hidden panels remain mounted and are hidden by the underlying Base UI panel
behavior. Their inputs retain values and nested panel state when reopened;
hidden content is excluded from keyboard navigation. Python still builds
all panels and receives their input values, so hiding a panel does not defer
its Python work. Removing a node is different from hiding its panel and
follows the existing keyed-node lifecycle.

Scroll Area's height constrains a surrounding layout wrapper. Its generated
control receives no custom sizing, padding, or appearance classes. It
contains library-owned children only, like every other Elements container.

See the [component composition matrix](../elements-support-matrix.md) for
standalone versus Elements support and event semantics.
