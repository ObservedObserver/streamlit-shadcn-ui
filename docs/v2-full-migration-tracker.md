# Components V2 full migration tracker

Status: **In progress**

Date: 2026-07-30

The source of truth for architecture and gates is the
[production migration plan](./v2-production-migration-plan.md). This tracker
maps the released V1 Python catalog to the opt-in V2 namespace. “Implemented”
means source and unit coverage exist; “accepted” additionally means the wave's
real Streamlit browser and packaging gates are green.

| Public component | Wave | V2 status | State / event policy |
|---|---:|---|---|
| `select` | 1 | Accepted | revisioned persistent value; supported in forms |
| `dropdown_menu` | 1 | Accepted | transient action; rejected in forms |
| `checkbox` | 1 | Accepted | revisioned persistent boolean; supported in forms |
| `button` | 1 | Accepted | transient click; rejected in forms |
| `alert` | 2 | Accepted | stateless |
| `avatar` | 2 | Accepted | stateless, safe image source |
| `badges` / `badge` | 2 | Accepted | stateless |
| `breadcrumb` | 2 | Accepted | transient validated action; rejected in forms |
| `card` | 2 | Accepted | stateless |
| `metric_card` | 2 | Accepted | stateless |
| `aspect_ratio` | 2 | Accepted | stateless, safe image source |
| `progress` | 2 | Accepted | stateless bounded value |
| `separator` | 2 | Accepted | stateless |
| `skeleton` | 2 | Accepted | stateless, restricted dimensions |
| `table` | 2 | Accepted | stateless bounded primitive cells |
| `link_button` | 2 | Accepted | native link semantics, safe URL |
| `input` | 3 | Planned | persistent value; commit policy required |
| `textarea` | 3 | Planned | persistent value; commit policy required |
| `accordion` | 3 | Planned | controlled persistent open items |
| `collapsible` | 3 | Planned | controlled persistent open state |
| `input_otp` | 3 | Planned | persistent value; commit policy required |
| `pagination` | 3 | Planned | persistent page |
| `radio_group` | 3 | Planned | persistent value |
| `scroll_area` | 3 | Planned | stateless content helper |
| `slider` | 3 | Planned | persistent numeric value |
| `switch` | 3 | Planned | persistent boolean |
| `tabs` | 3 | Planned | persistent selected tab |
| `toggle` | 3 | Planned | persistent boolean |
| `toggle_group` | 3 | Planned | persistent bounded values |
| `calendar` | 3 | Planned | persistent date/range value |
| `popover` | 4 | Planned | anchored non-modal overlay |
| `hover_card` | 4 | Planned | anchored non-modal overlay |
| `date_picker` | 4 | Planned | persistent date/range plus anchored overlay |
| `alert_dialog` | 5 | Planned | modal transient decision; rejected in forms |

## Compatibility-only or undocumented V1 surfaces

The V1 package also exposes low-level helpers such as `select_trigger`,
`select_options`, `dropdown_menu_trigger`, `dropdown_menu_content`,
`date_picker_trigger`, `date_picker_content`, `popover_trigger`,
`popover_content`, `hover_card_trigger`, `hover_card_content`, `dialog_layer`,
and the experimental `element` composition API. They are implementation
details of the iframe architecture, not direct one-for-one V2 migration
targets.

Wave 6 will publish the final argument, return value, callback, session-state,
and visual compatibility table and decide whether any low-level name receives
an explicit adapter or a documented removal. README-only names with no stable
V1 Python wrapper—Carousel, Command, Dialog, Resizable, and Toast—are treated
as new-product candidates rather than silently claimed parity.

## Cross-wave invariants

- Production adapters import owned generated shadcn source; behavior primitives
  remain Base UI.
- Every component uses Streamlit Components V2 with
  `isolate_styles=True`; no component iframe is allowed.
- Payloads are size-bounded and runtime-validated in Python and TypeScript.
- Trigger controls fail before mounting inside `st.form`.
- Stateful controls use one atomic revision cell and define invalidation.
- All enabled navigation and image URLs are scheme-validated.
- Every registry expansion is an atomic vendored snapshot revision.
