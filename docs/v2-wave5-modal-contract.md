# V2 Wave 5 Alert Dialog contract

Status: **Accepted**

Date: 2026-07-30

## Python API

```python
decision = ui.alert_dialog(
    show,
    title,
    description,
    confirm_label=None,
    cancel_label=None,
    *,
    key,
    on_decision=None,
    width="content",
)
```

`key` is required and is permanently bound to `alert_dialog` for the
Streamlit session. Title, description, and labels are bounded plain text and
are escaped by React. Default labels are `Confirm` and `Cancel`.

The return value is:

- `None` before a decision;
- `True` after Confirm;
- `False` after Cancel or Escape.

`on_decision` is the callback for the transient decision trigger. It receives
no argument, matching the V2 callback convention; the current decision is the
function return value during that rerun.

## Request lifecycle

`show` is an edge, not persistent open state:

1. `False → True` increments a monotonically increasing open request ID.
2. The frontend opens that request once.
3. Confirm, Cancel, or Escape marks the request resolved locally before
   publishing its trigger.
4. The Python runtime acknowledges the resolved request.
5. Repeated `show=True` does not reopen it.
6. A later `show=False → True` creates the next request.

This avoids the V1 failure mode where a caller that kept `show=True` could
immediately reopen a dialog after its action rerun. The request and resolution
IDs are internal protocol metadata, not public widget state.

## Form and session-state policy

Alert Dialog publishes a transient decision and is rejected before mount
inside `st.form`, where Streamlit does not support custom-component trigger
semantics.

`st.session_state[key]` contains Streamlit's V2 metadata and the current
transient trigger only. The package-owned session registry stores component
kind, open request ID, resolved request ID, and the last observed `show`
level. It stores no title, description, or user value.

## Modal and focus policy

The popup uses generated shadcn Alert Dialog source backed by Base UI. Cancel
receives initial focus. Tab and Shift+Tab remain inside the top dialog;
backdrop press cannot dismiss it; Escape resolves `False`.

A versioned global coordinator serializes independent roots into one modal
stack:

- only the newest request is active;
- an earlier request is suspended without a portal or global effect;
- resolving the top request resumes the previous one;
- final release restores all document effects.

The coordinator applies native `inert` outside the active component branch,
while Base UI owns alert semantics, `aria-hidden`, focus management, backdrop,
and scroll locking. Launch focus is captured from the last real pointer or
keyboard activation so it survives Streamlit's WebKit rerun behavior.

External `show=False`, conditional unmount, and page navigation close without
publishing a false decision. They still release the layer and restore styles,
attributes, listeners, focus guards, portals, and the top-layer host.
