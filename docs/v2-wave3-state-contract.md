# V2 Wave 3 state and form contract

Status: **Accepted**

Date: 2026-07-30

Wave 3 contains only persistent state cells or stateless content. It adds no
transient trigger channel, so every interactive Wave 3 control is supported
inside `st.form`.

## Commit policy

| Component | Local interaction policy | Published state |
|---|---|---|
| Input | Draft locally; commit on blur or Enter | string |
| Textarea | Draft locally; commit on blur or Ctrl/Cmd+Enter | string |
| Input OTP | Draft locally; commit when complete or on blur | string |
| Slider | Update locally while dragging; commit on Base UI `onValueCommitted` | one- or two-number array |
| Accordion | Commit each open/close change | unique open-value array |
| Collapsible | Commit each open/close change | boolean |
| Pagination | Commit each page action | 1-based integer |
| Radio Group | Commit each selection | string or `None` |
| Switch | Commit each checked change | boolean |
| Tabs | Commit each tab activation | string |
| Toggle | Commit each press | boolean |
| Toggle Group | Commit each group change | unique value array |
| Calendar | Commit each single-date selection | ISO `YYYY-MM-DD` or `None` |
| Scroll Area | No state channel | stateless |

Draft policies prevent a Streamlit rerun on every keystroke or pointer move.
The visible draft stays controlled in React and reconciles to the
authoritative Python value after an acknowledged server reset.

## Revision and invalidation rules

Every stateful component uses one atomic cell:

```json
{
  "kind": "slider",
  "value": [20, 80],
  "clientRevision": 4,
  "serverRevision": 1
}
```

- The client increments `clientRevision` only when the value changes.
- Equal primitive values and shallow-equal arrays do not publish a redundant
  revision.
- Python owns `serverRevision`.
- A changed Python default or a persisted value that no longer satisfies the
  current bounds/options causes a server reset.
- The reset is repeated until the client acknowledges the exact value and
  client revision.
- Reusing one key for another component kind fails before mounting.

Options, text, dates, numbers, item counts, and serialized envelopes are
validated independently in Python and TypeScript. Invalid persisted state is
reset; malformed metadata or revision cells fail closed with an actionable
key error.

## Form semantics

State controls use Streamlit's V2 state callback channel. Inside `st.form`,
draft changes remain unsubmitted until the native form submit action. The
Wave 3 browser fixture proves Input, Radio Group, and Slider together in one
form in Chromium, Firefox, and WebKit.

Button-like transient controls from earlier or later waves remain a separate
policy: Streamlit 1.60 ignores V2 trigger values inside forms, so those
controls fail before mounting there.
