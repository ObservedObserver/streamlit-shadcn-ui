# V2 Wave 4 state and overlay contract

Status: **Accepted**

Date: 2026-07-30

## Interaction and state policy

| Component | Local interaction policy | Published state |
|---|---|---|
| Popover | Local open/close only; click, Escape, and outside press | stateless |
| Hover Card | Local delayed hover/focus open and close | stateless |
| Date Picker (`single`) | Commit the selected date and close | ISO date or `None` |
| Date Picker (`range`) | Draft locally; commit only with `Apply`; `Cancel` discards | ordered two-date array or `None` |

`Clear` commits `None` in both Date Picker modes. Equal values do not create a
new client revision. A changed Python default, mode, or bound invalidates
persisted state through the shared server-revision reset protocol.

Dates are parsed as local calendar days and serialized as `YYYY-MM-DD`; no UTC
conversion can move a selection to the preceding or following date. Python and
TypeScript both reject impossible dates, descending ranges, mode/shape
mismatches, and values outside `min_date` or `max_date`.

## Form policy

Popover and Hover Card have no Streamlit event channel, so their local
interaction is harmless inside a form. Date Picker uses the V2 state channel
and is supported in `st.form`. A selected date remains client state until the
native form submit publishes it to the Python script.

Wave 4 adds no transient trigger control.

## Overlay policy

All three components use ADR-001:

```text
Streamlit component ShadowRoot
  ├─ app root
  │   └─ generated shadcn trigger
  └─ overlay root (native top layer)
      └─ generated shadcn/Base UI Portal
          └─ fixed Positioner
              └─ popup
```

The popup may not fall back to `document.body`. Opening it may not change body
overflow, padding, pointer events, `inert`, or `aria-hidden`. Popover and Date
Picker are explicitly non-modal. Hover Card uses Preview Card semantics and
opens from both pointer hover and keyboard focus.

Each popup receives an accessible name. Informational content is text-only and
React-escaped; V1's unsanitized HTML Hover Card mode is intentionally rejected.
