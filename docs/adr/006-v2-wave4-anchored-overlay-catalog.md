# ADR-006: Wave 4 anchored overlay catalog

Status: **Accepted for Wave 4**

Date: 2026-07-30

## Context

Wave 4 migrates the remaining stable V1 anchored-overlay APIs: Popover,
Hover Card, and Date Picker. Their V1 implementations split the trigger and
popup across two iframe components and synchronized coordinates and open state
through Python session state.

The production V2 architecture must use owned shadcn source, keep every popup
in its component ShadowRoot, escape Streamlit clipping, and introduce no
document-level modal effects. Date Picker must also publish one valid,
revisioned date value rather than rerun Python for intermediate calendar
gestures.

## Decision

### Atomic shadcn snapshot

Registry snapshot revision 4 captures all thirty Wave 1–4 shadcn
`base-nova` payloads at upstream commit:

`705ce5961080264830471ddd885c01b907706068`

Wave 4 adds Popover and Hover Card. Both generated sources use Base UI
primitives and receive the same AST portal and fixed-positioner adaptations as
Select and Dropdown Menu. Date Picker is a product adapter composed from the
owned generated shadcn Popover, Calendar, and Button sources; it is not a
handwritten replacement for those components.

The shadcn CLI, Base UI, React, Tailwind, and runtime dependency pins remain
unchanged.

### One non-modal overlay architecture

Popover and Date Picker explicitly pass `modal={false}`. Hover Card uses Base
UI Preview Card's non-modal interaction model. Every generated portal targets
the instance-owned overlay root from ADR-001 and every positioner uses fixed
positioning. The existing native Popover top-layer host provides clipping and
stacking escape while popup DOM, styles, IDs, events, and cleanup remain in the
original Streamlit ShadowRoot.

Opening any Wave 4 overlay may not mutate body styles, scroll locking,
`inert`, or `aria-hidden`. Missing providers, disconnected containers, wrong
root ownership, or unavailable native Popover support continue to fail
closed.

### Date Picker state

Single-date state is an ISO `YYYY-MM-DD` string or `None`. Range state is
either `None` or an ordered two-string array. Both shapes use the shared
revision cell and are independently validated in Python and TypeScript.

- A single-date click commits immediately and closes.
- Range calendar gestures update a React-only draft.
- `Apply` atomically commits a complete range and closes.
- `Cancel` discards the draft.
- `Clear` commits `None`.

The explicit range action avoids publishing React Day Picker's intermediate
selection and matches the deliberate V1 Pick/Cancel workflow. Date Picker uses
the state channel and is supported in `st.form`.

### Safe informational content

Popover and Hover Card render bounded text through React escaping. V1 Hover
Card's `content_type="html"` path used `dangerouslySetInnerHTML` without a
sanitization contract. V2 rejects that mode instead of carrying the injection
surface into the production namespace.

## Gates

Wave 4 is accepted only when:

- all thirty registry payloads verify and regenerate offline;
- the adapter-to-shadcn-to-Base-UI import graph passes;
- TypeScript, Vitest, Python protocol, CSS, and production build checks pass;
- Chromium, Firefox, and WebKit pass pointer, keyboard/focus, Escape, outside
  press, range draft, form, clipping, ownership, and cleanup tests;
- every open popup stays below its own ShadowRoot overlay root and no popup is
  mounted in `document.body`;
- axe reports no serious or critical issue;
- wheel and sdist contain exactly one V2 JavaScript entry and stylesheet and
  each installed artifact renders without Node.

## Consequences

- The stable V1 anchored-overlay catalog no longer requires either iframe of
  the old trigger/content pair.
- Tooltip, Combobox, Autocomplete, and Context Menu remain new-product
  candidates because the released Python package has no stable public wrapper
  for them.
- Rich HTML hover content requires a future explicit sanitizer and trust
  model; it is not a compatibility default.
- Modal components remain outside ADR-001 and still require the Wave 5
  successor to ADR-002.
