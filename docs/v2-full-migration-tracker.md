# Components V2 full migration tracker

Status: **Canonical V2 examples complete; V1 deletion and root cutover pending**

Date: 2026-07-31

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
| `accordion` | 3 | Accepted | single value or controlled open-item list |
| `collapsible` | 3 | Accepted | controlled persistent open boolean |
| `input_otp` | 3 | Accepted | persistent string; commit on completion / blur |
| `pagination` | 3 | Accepted | persistent 1-based page |
| `radio_group` | 3 | Accepted | persistent original Python option value |
| `scroll_area` | 3 | Accepted | stateless bounded content helper |
| `slider` | 3 | Accepted | persistent number or range tuple; commit after interaction |
| `switch` | 3 | Accepted | persistent boolean |
| `tabs` | 3 | Accepted | persistent original Python tab value |
| `toggle` | 3 | Accepted | persistent boolean |
| `toggle_group` | 3 | Accepted | persistent bounded unique values |
| `calendar` | 3 | Accepted | persistent `datetime.date` |
| `popover` | 4 | Accepted | stateless anchored non-modal overlay |
| `hover_card` | 4 | Accepted | stateless hover/focus non-modal overlay; text content |
| `date_picker` | 4 | Accepted | persistent `datetime.date` or ordered date tuple; range commits on Apply; supported in forms |
| `alert_dialog` | 5 | Accepted | rising-edge modal request; transient `None` / `bool` decision; rejected in forms |

Wave 5 evidence is recorded in the
[acceptance record](./v2-wave5-acceptance.md).

## Wave 6 compatibility disposition

- The [compatibility matrix](./v2-compatibility-matrix.md) covers all
  thirty-three V1 root exports, all thirty-five V2 widget functions, and the
  seven typed V2 descriptors.
- Thirty-two stable V1 component roles have V2 implementations. V1
  `checkbox` groups and context-managed `card` usage need application-level
  adapters.
- Experimental `element` composition remains compatibility-only.
- Public keys are optional and resolve to private Streamlit-safe mount keys;
  return values and callbacks are the public state contract.
- `Home.py`, all component pages, and all thirty-five embedded component API
  documents now use the explicit V2 namespace and contain no `element()` or
  legacy argument forms.
- `streamlit_shadcn_ui.v1` remains temporarily available only until the
  dedicated V1 cleanup phase.
- The accepted release target is a V2-only `1.0.0`; the root switch, global
  runtime floor increase, and version bump happen after V1 deletion.

The cutover and rollback decision is
[ADR-010](./adr/010-v2-1.0-single-track-cutover.md). The repository is not yet
ready to publish 1.0 because V1 cleanup and the public root collapse remain.
Final regression, performance, and distribution evidence is recorded in the
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
