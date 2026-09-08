# Changelog

## 1.4.0 - 2026-09-08

### Added

- Added `ui.line_chart`, `ui.area_chart`, `ui.bar_chart`, `ui.pie_chart`,
  `ui.radar_chart`, and `ui.radial_chart` for records and pandas DataFrames.
- Added stacked area/bar, horizontal bar, and donut variants, with inferred
  numeric series or explicit field selection and display labels.
- Charts compose the pinned shadcn Chart and Card components with native
  tooltips, legends, and responsive sizing. They use the five-color light/dark
  palettes from shadcn's theming documentation; other components stay neutral.
- Added a Charts documentation page with executable examples for all six APIs.

### Behavior

- Charts are stateless and return `None`. Hover interactions stay in the browser.
- Python validates data before mounting, with limits of 1,000 rows and five
  series or segments. Line, area, and bar charts support missing values.
- The Python API does not expose raw JavaScript, CSS, formatters, or callbacks.
  Existing control styles and public API signatures are unchanged.

Full details: [Charts 1.4.0 release notes](docs/releases/1.4.0.md).

## 1.3.0 - 2026-09-01

### Added

- Added searchable single and multiple `ui.combobox` controls that return the
  original Python option values. Filtering stays in the browser until a
  selection, removal, or clear action commits state.
- Added `ui.input_group` with validated text, icon, clear, and copy addons.
  Typing stays local until Enter or blur, and copying does not rerun Python.
- Added Button Group, Dialog, Empty, Field, Spinner, and Tooltip composition to
  Elements. Combobox and Input Group are also available as Elements nodes.
- Added `loading` and `help` to Button, backed by the generated Spinner and
  Tooltip components.
- Added eight documentation pages and a combined P0 acceptance app covering
  standalone, nested, overlay, sidebar, tab, and bounded-container cases.

### Behavior

- Dialog preserves focus trapping and return focus while ordinary footer
  actions can rerun Python without closing the modal.
- Field connects labels, descriptions, and errors to its supported controls.
- Combobox clear, trigger, and chip removal actions have accessible names.
- The adapters preserve the pinned shadcn defaults. They add no cosmetic
  control overrides.

Full details: [P0 component foundations](docs/releases/1.3.0.md).

## 1.2.2 - 2026-08-31

### Fixed

- Number Input no longer passes extra styling classes to shadcn Input or
  Button. Removed the remaining text alignment, numeric typography, and
  touch-action overrides. The default 32 px dimensions restored in 1.2.1
  remain unchanged.

### Documentation

- Added `AGENTS.md` rules requiring explicit user permission before modifying
  or overriding shadcn defaults, including changes in adapters and docs CSS.
- Updated component guidance and documentation release badges for 1.2.2.

Full details: [Default styles and contributor policy](docs/releases/1.2.2.md).

## 1.2.1 - 2026-08-31

### Fixed

- Number Input now inherits the default sizing of the checked-in shadcn Input
  and icon Button. Removed the adapter's 44 px overrides so the control matches
  the library's existing 32 px controls.
- Standalone and Elements inputs share this correction. Numeric behavior,
  public API signatures, and runtime dependencies are unchanged.

Full details: [Number Input sizing fix](docs/releases/1.2.1.md).

## 1.2.0 - 2026-08-31

### Added

- `ui.number_input` and `el.number_input` with direct numeric entry and
  decrement/increment buttons, addressing [#55](https://github.com/ObservedObserver/streamlit-shadcn-ui/issues/55).
- Integer and float return values, optional inclusive bounds, configurable
  steps, disabled state, and callbacks using the existing V2 state protocol.
- Decimal step arithmetic, keyboard controls, and 44 px touch targets.
- A Number Input documentation page with quantity, fractional, negative,
  disabled, and nested Elements examples.

### Behavior

- Typing commits on Enter or blur. Invalid or empty drafts restore the last
  committed value; valid out-of-range input clamps to the configured bounds.
- The new component composes the existing generated shadcn Input and Button.
  Runtime dependencies and the pinned upstream registry snapshot are unchanged.
- Existing public APIs keep their signatures and behavior.

Full details: [Number Input 1.2.0 release notes](docs/releases/1.2.0.md).

## 1.1.0 - 2026-08-09

### Added

- `ui.elements`, a typed Python context API that builds one nested shadcn
  React tree in one Streamlit Components V2 mount.
- Stable keyed identity for inserted, removed, reordered, and reset child
  nodes.
- Aggregate value handles, ordered value callbacks, and batched transient
  action callbacks through `ElementHandle` and `ElementEvent`.
- Typed Card, layout, content, value, and action nodes for the initial
  Elements catalog.
- An independent `Use Cases > V2 Elements` documentation page reproducing
  the shadcn Notification Settings and Transfer Funds cards.

### Changed

- The public package catalog and compatibility matrix now include Elements.
- The documentation router keeps the product homepage as the default route
  and mounts the Elements acceptance case at `/Elements`.

### Known boundaries

- Elements trees contain library-owned React nodes only; native Streamlit
  elements remain outside the component boundary.
- Action nodes are rejected inside `st.form` because Streamlit does not
  currently deliver custom-component trigger values there.
- The first Elements catalog intentionally excludes overlays, arbitrary JSX,
  raw HTML, arbitrary CSS classes, and user-defined React components.

Full details: [Elements 1.1.0 release notes](docs/releases/1.1.0.md).
