# Changelog

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
