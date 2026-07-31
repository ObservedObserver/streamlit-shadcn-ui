# V1 to V2 compatibility matrix

Status: **Final for the opt-in V2 release candidate**

Date: 2026-07-30

This document covers every name exported by the released package root and
every name exported by `streamlit_shadcn_ui.v2`. The machine-readable coverage
source is [v2-compatibility-matrix.json](./v2-compatibility-matrix.json), and a
test prevents either namespace from drifting away from it.

V2 is a conceptual catalog migration, not a source-compatible namespace swap.
All V2 keys are required and keyword-only. Unbounded `class_name` and `**kwargs`
escape hatches were removed; supported variants, dimensions, labels, disabled
states, bounds, and callbacks are explicit and runtime-validated.

## Compatibility labels

- **Migrated**: V2 has the same product role, with deliberate API edits.
- **Adapter required**: the same name exists, but the V1 usage model cannot be
  represented by one V2 call.
- **Compatibility only**: the V1 surface remains available through the package
  root and `streamlit_shadcn_ui.v1`; V2 does not claim parity.

## Interactive and overlay components

| V1 export | V2 argument migration | V2 return / state | Callback and form policy | Visual and interaction change |
|---|---|---|---|---|
| `select` | Keep `label`, `options`; make `key=` explicit; use `value=` or `index=` for the initial choice; optional `placeholder`, `disabled`, `width` | Persistent `str \| None` | `on_change`; supported in forms | **Migrated.** Generated shadcn Select backed by Base UI; one isolated ShadowRoot, native top-layer popup, zero iframe instead of V1 trigger + popup iframes |
| `dropdown_menu` | Order changes from `items, label` to `label, items`; `menu_label`, `disabled`, `width` are explicit | Transient selected item `str \| None`, replacing the V1 internal content-state dictionary | `on_select`; rejected in forms | **Migrated.** Generated shadcn/Base UI non-modal menu in the instance ShadowRoot; no popup iframe or document mutation |
| `button` | Keep `text`, `variant`; remove `class_name` and arbitrary `**kwargs`; add `disabled`, `width` | One-rerun `bool` click trigger | `on_click`; rejected in forms | **Migrated.** Generated shadcn Button; no iframe |
| `breadcrumb` | Keep item mappings; remove `class_name`; add accessible `label`, `width` | Validated transient `{text, href, index}` or `None` | `on_select`; rejected in forms | **Migrated.** Native links and current-page semantics; safe URLs; no iframe |
| `alert_dialog` | Core arguments remain; `key=` is required; add `width` | Rising-edge request returns `None`, `True` for confirm, or `False` for cancel/Escape | `on_decision`; rejected in forms | **Migrated.** Generated shadcn/Base UI modal in a ShadowRoot top layer with focus trap, inert background, stack coordination, and exact cleanup; no modal iframe |
| `date_picker` | Keep `label`, `mode`, `default_value`; add `placeholder`, bounds, `disabled`, `width` | Persistent ISO date `str \| None`, or an ordered two-item ISO list in range mode | `on_change`; supported in forms | **Migrated.** One shadcn Popover + Calendar host replaces trigger/content iframes; range changes commit only on Apply |
| `popover` | Keep `label`, text `content`; add `disabled`, `width` | Stateless; returns `None` instead of an internal open-state dictionary | No Python event; form-safe | **Migrated.** Non-modal Base UI popup in the same ShadowRoot top layer |
| `hover_card` | Keep `label`, `content`; only safe `content_type="text"` is accepted; add `disabled`, `width` | Stateless `None` | No Python event; form-safe | **Migrated.** Pointer and focus behavior from generated shadcn/Base UI; arbitrary rendered HTML is intentionally not accepted |

## Stateful controls

| V1 export | V2 argument migration | V2 return / state | Callback and form policy | Visual and interaction change |
|---|---|---|---|---|
| `checkbox` | V1 `mode/options` groups become one `checkbox(label, default_checked=...)` call per option | Persistent scalar `bool`, not V1's ID-to-boolean mapping | `on_change`; supported in forms | **Adapter required.** Generated shadcn/Base UI Checkbox; group layout belongs to the Streamlit app |
| `input` | Keep `default_value`, `type`, `placeholder`; add `label`, `disabled`, `max_length`, `width` | Persistent `str`; commits on blur or Enter | `on_change`; supported in forms | **Migrated.** Generated shadcn Input; no iframe |
| `textarea` | Keep `default_value`, `placeholder`; replace arbitrary `**kwargs` with `label`, `rows`, `disabled`, `max_length`, `width` | Persistent `str`; commits on blur or Ctrl/Cmd+Enter | `on_change`; supported in forms | **Migrated.** Generated shadcn Textarea; no iframe |
| `input_otp` | Keep `default_value`, `max_length`; add `label`, `pattern`, `disabled`, `width` | Persistent `str`; commits on completion or blur | `on_change`; supported in forms | **Migrated.** Generated shadcn Input OTP source |
| `accordion` | Item mappings remain; remove `class_name`; add stable item values, `default_values`, `multiple`, `disabled`, `label`, `width` | Persistent list of open item values | `on_change`; supported in forms | **Migrated.** Controlled generated shadcn/Base UI Accordion |
| `collapsible` | Rename V1 typo `fistItem` to `first_item`; remove `class_name`; add `default_open`, `disabled`, `width` | Persistent `bool` open state | `on_change`; supported in forms | **Migrated.** Controlled generated shadcn/Base UI Collapsible |
| `pagination` | Rename `totalPages`, `initialPage`, `siblingCount` to snake case; add `label`, `disabled`, `width` | Persistent 1-based `int` | `on_change`; supported in forms | **Migrated.** Generated shadcn pagination composition |
| `radio_group` | Keep `options`, `default_value`; add `label`, `disabled`, `width` | Persistent selected `str \| None` | `on_change`; supported in forms | **Migrated.** Generated shadcn/Base UI Radio Group |
| `slider` | Core numeric arguments remain; add `disabled`, `width`; values are normalized to an array | Persistent `list[float]`; commits after interaction | `on_change`; supported in forms | **Migrated.** Generated shadcn/Base UI single/range Slider |
| `switch` | Keep `default_checked`, `label`; add `disabled`, `width` | Persistent `bool` | `on_change`; supported in forms | **Migrated.** Generated shadcn/Base UI Switch |
| `tabs` | Keep `options`, `default_value`; replace arbitrary `**kwargs` with `label`, `orientation`, `variant`, `disabled`, `width` | Persistent selected tab value | `on_change`; supported in forms | **Migrated.** Controlled generated shadcn/Base UI Tabs |
| `toggle` | Keep `default_checked`, `icon`; add `label`, `variant`, `disabled`, `width` | Persistent `bool` | `on_change`; supported in forms | **Migrated.** Generated shadcn/Base UI Toggle |
| `toggle_group` | Keep `default_values`; add explicit `options`, `label`, `multiple`, `orientation`, `variant`, `disabled`, `width` | Persistent unique `list[str]` | `on_change`; supported in forms | **Migrated.** Generated shadcn/Base UI Toggle Group |
| `calendar` | V1 had no public value controls; V2 adds `value`, `label`, date bounds, `disabled`, `width` | Persistent ISO date `str \| None` | `on_change`; supported in forms | **Migrated.** Controlled generated shadcn Calendar |

## Display components

| V1 export | V2 argument migration | V2 return / state | Callback and form policy | Visual change |
|---|---|---|---|---|
| `alert` | Keep title/description; replace `class_name` with validated `variant`, `width` | Stateless `None` | None | **Migrated.** Generated shadcn Alert; no iframe |
| `avatar` | `src` is optional; keep `fallback`; add `alt`, `size`, `width` | Stateless `None` | None | **Migrated.** Generated shadcn/Base UI Avatar with safe image sources |
| `badges` | Keep `(text, variant)` pairs or mappings; remove `class_name`; add `width` | Explicitly stateless `None` | None | **Migrated.** Generated shadcn Badge source |
| `aspect_ratio` | `src` and `alt` are required; `ratio` defaults to 16:9; replace `class_name` with `width` | Stateless `None` | None | **Migrated.** Generated shadcn/Base UI Aspect Ratio with safe image sources |
| `card` | Core text remains; add `size`, `width` | Stateless `None`; it is not a Python context manager | None | **Adapter required** only for V1 `with ui.card(...)` composition. Plain display cards are migrated to generated shadcn Card source |
| `metric_card` | Core text remains; add `size`, `width` | Stateless `None` | None | **Migrated.** Dedicated metric presentation over generated shadcn Card source |
| `link_button` | Keep text/URL/variant; remove `class_name`; add `disabled`, `target`, `width` | Stateless `None` | Native navigation only | **Migrated.** Native anchor semantics with scheme validation and `noopener noreferrer` |
| `progress` | Rename `data` to `value`; replace `class_name` with `label`, `show_value`, `width` | Stateless `None` | None | **Migrated.** Generated shadcn/Base UI Progress |
| `scroll_area` | Rename `tags` to `items`; replace `class_name` with bounded `height`, `width` | Stateless `None` | None | **Migrated.** Generated shadcn/Base UI Scroll Area |
| `table` | DataFrame or record iterables remain; V1 `{dataKey,title}` and V2 `{key,label}` columns are both accepted; rename `maxHeight` to `max_height`; add `caption`, `width` | Stateless `None` | None | **Migrated.** Generated shadcn Table with bounded primitive cells |

V2 also adds three names that the V1 package root never exported:
`badge`, `separator`, and `skeleton`.

## Compatibility-only surfaces

`element` and the V1 `with ui.card(...)` composition protocol remain
compatibility-only. V2 intentionally renders one independently isolated
Streamlit component per call, so it does not reproduce the V1 experimental
tree serializer.

The following module-level helpers were implementation details of the
multi-iframe architecture and receive no V2 adapters:

`select_trigger`, `select_options`, `dropdown_menu_trigger`,
`dropdown_menu_content`, `date_picker_trigger`, `date_picker_content`,
`popover_trigger`, `popover_content`, `hover_card_trigger`,
`hover_card_content`, `dialog_layer`, `option_choosen_handler`, and
`date_choosen_handler`.

Carousel, Command, Dialog, Resizable, and Toast appeared in README catalog
text but have no stable V1 root wrapper. They are future product candidates,
not missing V2 parity claims.

## Session state decision

V2 does **not** promise structural parity for `st.session_state[key]`.
Streamlit Components V2 owns that cell, which contains a versioned metadata,
state, or trigger envelope. The package also owns one private session registry
for server revisions, default invalidation, modal requests, and immutable
`key -> component kind` binding.

Application code must:

1. read the function return value;
2. use the documented no-argument callback when needed;
3. treat `st.session_state[key]` and
   `__streamlit_shadcn_ui_v2_runtime_v1__` as private;
4. never reuse a key for a different V2 component kind, including across
   pages in one Streamlit session.

Mirroring V1's inconsistent raw dictionaries would expose transport state,
allow forged revisions, and make rerun reconciliation unsafe. A future public
state API, if needed, must use a separate user-owned key and a new ADR.

## Common migrations

```python
# V1
import streamlit_shadcn_ui as ui
fruit = ui.select("Fruit", ["Apple", "Banana"], key="fruit")

# V2
import streamlit_shadcn_ui.v2 as ui
fruit = ui.select(
    "Fruit",
    ["Apple", "Banana"],
    key="fruit",
    index=0,
)
```

```python
# V1 grouped checkbox
values = ui.checkbox(mode="multiple", options=options, key="filters")

# V2 scalar checkboxes
values = {
    option["id"]: ui.checkbox(
        option["label"],
        key="filters_%s" % option["id"],
        default_checked=option["default_checked"],
    )
    for option in options
}
```

```python
# V1 compatibility / rollback remains explicit
import streamlit_shadcn_ui.v1 as ui
```
