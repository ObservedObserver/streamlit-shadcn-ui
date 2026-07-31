# Components V2 full migration tracker

Status: **Stable catalog implementation complete; opt-in release feedback pending**

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
| `input` | 3 | Accepted | persistent string; commit on blur / Enter |
| `textarea` | 3 | Accepted | persistent string; commit on blur / Ctrl/Cmd+Enter |
| `accordion` | 3 | Accepted | controlled persistent open-item array |
| `collapsible` | 3 | Accepted | controlled persistent open boolean |
| `input_otp` | 3 | Accepted | persistent string; commit on completion / blur |
| `pagination` | 3 | Accepted | persistent 1-based page |
| `radio_group` | 3 | Accepted | persistent value |
| `scroll_area` | 3 | Accepted | stateless bounded content helper |
| `slider` | 3 | Accepted | persistent numeric array; commit after interaction |
| `switch` | 3 | Accepted | persistent boolean |
| `tabs` | 3 | Accepted | persistent selected tab |
| `toggle` | 3 | Accepted | persistent boolean |
| `toggle_group` | 3 | Accepted | persistent bounded unique values |
| `calendar` | 3 | Accepted | persistent ISO single date |
| `popover` | 4 | Accepted | stateless anchored non-modal overlay |
| `hover_card` | 4 | Accepted | stateless hover/focus non-modal overlay; text content |
| `date_picker` | 4 | Accepted | persistent ISO date or ordered range; range commits on Apply; supported in forms |
| `alert_dialog` | 5 | Accepted | rising-edge modal request; transient `None` / `bool` decision; rejected in forms |

Wave 5 evidence is recorded in the
[acceptance record](./v2-wave5-acceptance.md).

## Wave 6 compatibility disposition

- The [compatibility matrix](./v2-compatibility-matrix.md) covers all
  thirty-three V1 root exports and all thirty-five V2 exports.
- Thirty-two stable V1 component roles have V2 implementations. V1
  `checkbox` groups and context-managed `card` usage need application-level
  adapters.
- Experimental `element` composition remains compatibility-only.
- Raw `st.session_state[key]` is a private V2 protocol envelope; the public
  contracts are return values and callbacks.
- `streamlit_shadcn_ui.v1` is an exact explicit rollback namespace.
- The package root stays on V1, the global runtime floors stay unchanged, and
  V2 stays opt-in until one published feedback cycle and the remaining
  default-cutover gates pass.

The cutover and rollback decision is
[ADR-008](./adr/008-v2-cutover-and-session-state.md). The repository is
technically ready for an opt-in release candidate; an unpublished local run
does not satisfy the real-world feedback requirement. Final regression,
performance, and distribution evidence is recorded in the
[Wave 6 release-readiness record](./v2-wave6-release-readiness.md).

## Compatibility-only or undocumented V1 surfaces

The V1 package also exposes low-level helpers such as `select_trigger`,
`select_options`, `dropdown_menu_trigger`, `dropdown_menu_content`,
`date_picker_trigger`, `date_picker_content`, `popover_trigger`,
`popover_content`, `hover_card_trigger`, `hover_card_content`, `dialog_layer`,
and the experimental `element` composition API. They are implementation
details of the iframe architecture, not direct one-for-one V2 migration
targets.

Wave 6 assigns no V2 adapter to these helpers. README-only names with no stable
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
