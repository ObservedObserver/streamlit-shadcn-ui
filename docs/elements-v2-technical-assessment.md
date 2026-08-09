# `ui.elements` V2 technical assessment

Status: implemented and accepted as a V2-only API.

## Decision

`ui.elements` should be built on Streamlit Components V2. Reimplementing the
old V1 iframe transport would add lifecycle, sizing, theming, focus, overlay,
and message-channel work without solving the hard part: preserving stable
identity and routing state and events between a Python rerun model and one
long-lived React tree.

V2 supplies the correct host boundary: one component mount owns one Shadow DOM
and one React root, accepts a structured data envelope, persists state values,
and sends trigger values with Python callbacks. The library still needs its
own tree protocol and reconciliation layer, but it no longer needs to invent a
component runtime.

The resulting feasibility judgement is:

- Nested library-owned React UI is fully feasible in V2.
- Persistent values, value callbacks, action callbacks, dynamic keyed lists,
  responsive layout, and server-driven resets are feasible and implemented.
- V1 is not required for any of those mechanisms.
- Arbitrary native Streamlit elements cannot become descendants of the React
  tree. They remain siblings outside the `ui.elements` component boundary.
- Trigger nodes cannot be supported correctly inside `st.form` while
  Streamlit ignores custom-component trigger values there. The API fails
  closed for that case; state-only trees remain usable in forms.

## Why the old attempt became difficult

Serializing nested visual structure is only the first layer. A complete API
also needs to define:

1. identity when nodes are inserted, removed, or reordered;
2. ownership of client state versus a changed Python default;
3. ordered delivery when more than one child changes;
4. transient action semantics that do not replay old clicks;
5. callback routing from one component host to many Python handlers;
6. validation before untrusted serialized data reaches React; and
7. lifecycle behavior across Streamlit's full-script reruns.

The implementation addresses these as a protocol rather than trying to map a
Python context manager directly to independent Streamlit components.

## Architecture

```text
Python context API
  -> typed recursive AST
    -> one `components.v2.component` envelope
      -> strict TypeScript parser
        -> one React root / one Shadow DOM
          -> recursive shadcn renderer

child value change
  -> per-node revisioned state
    -> one aggregate state cell
      -> Streamlit rerun + root callback
        -> ordered dispatch to the matching Python callback

child action
  -> ordered transient event batch
    -> Streamlit trigger value
      -> Streamlit rerun + root callback
        -> dispatch to the matching Python action callback
```

The complete tree is sent in `props.nodes`. Stateful child cells are stored in
one aggregate `state.value.nodes` mapping. Buttons do not enter persistent
state; they emit transient entries through one `events` trigger.

## Public API contract

The root is a one-shot context manager:

```python
with ui.elements(key="settings") as el:
    with el.card(key="account"):
        with el.card_header():
            el.heading("Account")
        with el.card_content():
            email = el.input("Email", key="email")
        with el.card_footer():
            save = el.button("Save", key="save")

st.write(email.value, save.clicked)
```

The root key is required. Stateful and action node keys are also required.
Container and static-content keys are optional, but explicit container keys
create scopes for descendant identities. Handles are populated only after the
root context exits because mounting occurs once, after the AST is complete.

The initial allowlist includes:

- composition: `stack`, `grid`, `card`, `card_header`, `card_content`, and
  `card_footer`;
- content: `heading`, `text`, `code`, `badge`, `separator`, `progress`,
  `image`, and `link_button`;
- values: `input`, `textarea`, `checkbox`, `switch`, `slider`,
  `radio_group`, and `select`;
- actions: `button`.

Additional library components can be added by extending the Python node
builder, protocol allowlist, and recursive renderer. This is an incremental
catalog task, not an architectural change.

## Identity and dynamic lists

Every serialized node has a deterministic path such as
`notifications/transactions` or `transfer/amount`. Explicit container keys
scope their descendants. Anonymous layout and Card-slot containers do not
change the identity of explicitly keyed interactive descendants, so adding a
layout wrapper does not reset a field.

The protocol rejects duplicate node identities, kind changes under an existing
key, full node paths longer than 512 characters, more than 1,000 nodes, and
trees deeper than 32 levels. Cards accept at most one of each typed Header,
Content, and Footer slot. Removed nodes are pruned. Reordered keyed nodes
retain their values. Reintroduced nodes start from their Python defaults.

## State and responsive values

Each child state cell contains:

```text
kind, value, clientRevision, serverRevision, changeSequence
```

The aggregate state additionally contains a global sequence and its own
client/server revisions.

- `clientRevision` prevents a stale Python rerun from overwriting a newer
  local edit.
- `serverRevision` makes a changed Python default or invalid persisted value
  an explicit reset. Both root and per-node server revisions are maintained
  authoritatively on the Python side.
- `changeSequence` records the order in which child values changed.
- A reset is repeated until the browser acknowledges the exact revision.
- A changed default resets only the affected node, not the entire tree.

The return handle exposes the decoded Python value. Choice components preserve
the original Python option objects rather than exposing transport tokens.

This gives the API two useful forms of responsiveness: immediate React-local
interaction without waiting for Python, and authoritative Python values after
the normal Streamlit rerun.

## Events and callbacks

Value callbacks may accept zero arguments or one `ElementEvent`. The root
callback reads the persisted aggregate state, selects cells whose
`changeSequence` is newer than the baseline from the previous run, sorts them,
decodes their values, and invokes the registered handlers in order.

Action callbacks use transient trigger values. Events created in the same
browser task are microtask-batched and carry `nodeId`, `type`, `payload`, and
`sequence`. Python dispatches only to handlers registered for the exact
node/type pair. A button handle is `clicked=True` only for the action rerun.

This central router is the main reason nested callbacks are tractable in V2:
there is one host callback per channel, not a dynamically changing set of
independent component mounts.

## Validation and failure policy

Both sides validate the protocol:

- Python validates public arguments and caps the serialized envelope at 2 MiB.
- TypeScript recursively parses an allowlisted AST and reuses the existing
  component-specific parsers for leaf props and values.
- Node IDs must be unique; state cells must correspond exactly to the stateful
  leaves in the tree; extra or missing state is rejected.
- Unsafe URLs and image sources are rejected by the existing leaf validators.
- A persisted key cannot change component kind during a session.
- Malformed or no-longer-valid values are replaced through a revisioned server
  reset rather than passed through to React.

Unknown nodes are not rendered as arbitrary HTML. This keeps the API typed and
prevents the tree format from becoming an unreviewed remote-rendering surface.

## shadcn homepage acceptance case

The local shadcn/ui checkout was used as the visual and structural reference:

- `apps/v4/app/(app)/(root)/cards/notification-settings.tsx`
- `apps/v4/app/(app)/(root)/cards/transfer-funds.tsx`
- `apps/v4/app/(app)/(root)/cards/index.tsx`

`pages/Elements.py` reproduces the two cards inside one responsive `el.grid`
and one V2 component host. It is registered as the independent `V2 Elements`
page at `/Elements`; the existing product homepage remains the default route.
The case exercises:

- Card/Header/Content/Footer nesting;
- a dynamically generated checkbox list with stable keys;
- text input and two choice values;
- nested summary rows and separators;
- value callbacks and action callbacks;
- preservation of edited values after a Streamlit rerun; and
- one Shadow DOM/React owner for both cards.

Run the documentation app using one explicit loopback address for both the
listener and the URL that Streamlit opens, then visit
`http://127.0.0.1:8501/Elements`:

```sh
streamlit run Home.py \
  --server.address=127.0.0.1 \
  --browser.serverAddress=127.0.0.1
```

Acceptance requires protocol unit tests, Python callback and reconciliation
tests, React renderer tests, a production frontend build, an AppTest smoke
run, and a real Chromium end-to-end interaction.

## Known boundaries

The following are deliberate boundaries rather than reasons to return to V1:

- Only components owned by this library can appear in the tree. Embedding an
  `st.dataframe`, arbitrary DeltaGenerator, or another third-party Streamlit
  component as a React descendant is not possible across the component host
  boundary.
- Python callbacks still cause a Streamlit rerun. They cannot be synchronous
  browser callbacks, so interactions that need sub-frame latency should stay
  in React-local state and report a semantic result to Python.
- The initial API does not expose arbitrary JSX, arbitrary CSS classes, raw
  HTML, or user-defined React components. An extension registry could be
  designed later, but it would require its own trusted registration contract.
- Cross-node computed UI is currently expressed by the Python rerun model. A
  future controlled-expression or client-reducer layer could support richer
  local dependencies without changing the aggregate transport.
- Action nodes inside `st.form` remain unsupported until Streamlit supports
  custom-component trigger semantics there.

## Completion criteria and recommendation

The architecture is sufficient for a production `ui.elements` API. The hard
mechanisms—single-root composition, stable identity, persistent and responsive
values, ordered callbacks, transient actions, server resets, strict parsing,
and dynamic lists—are present and independently tested.

The recommended next work is catalog expansion driven by real compositions,
not a V1 fallback or a generic JSX serializer. New nodes should be admitted
only when their props, state ownership, events, accessibility, and reset
semantics are specified and tested through the same protocol.
