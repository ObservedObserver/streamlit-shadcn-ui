# ADR-001: V2 anchored overlay host

Status: **Accepted for Wave 1**

Date: 2026-07-30

Applies to: non-modal anchored overlays in
`streamlit_shadcn_ui.v2`, beginning with Select and Dropdown Menu.

## Context

Streamlit Components V2 mounts each isolated component in its own ShadowRoot.
Keeping a popup in that ShadowRoot is necessary for local CSS, theme tokens,
React events, accessible relationships, and deterministic cleanup. It is not,
by itself, sufficient to escape clipping or a stacking context created by a
Streamlit ancestor.

V1 Select worked around the old iframe boundary with a second iframe for its
popup. Wave 1 must remove both iframe layers without moving an unstyled popup
into `document.body`.

## Decision

Every component instance owns two sibling elements in the same Streamlit
ShadowRoot:

```html
<div data-ssui-v2-app-root></div>
<div data-ssui-v2-overlay-root popover="manual"></div>
```

The checked-in shadcn Select and Dropdown Menu source passes the instance
overlay root to its Base UI Portal. Base UI Positioner uses
`positionMethod="fixed"`. The platform provider opens the overlay root with
the native Popover API while an anchored popup is open and hides it when the
last popup closes.

The resulting ownership is:

```text
Streamlit component ShadowRoot
  ├─ app root
  │   └─ shadcn trigger
  └─ overlay root (native top layer)
      └─ Base UI Portal
          └─ fixed Positioner
              └─ shadcn popup
```

The Popover API places the overlay root in the browser top layer, so it is not
clipped by light-DOM Streamlit ancestors and does not compete through arbitrary
`z-index` values. The popup node, stylesheet, theme scope, IDs, and React tree
remain in the component's original ShadowRoot.

Select and Dropdown Menu explicitly set `modal={false}`. Opening them may not
change document scroll locking, body styles, `inert`, or `aria-hidden`.

The implementation fails closed when:

- the overlay provider or either declared root is missing;
- the overlay root is disconnected or belongs to a different root;
- the native Popover API is unavailable;
- a generated shadcn portal bypasses the platform provider.

Cleanup disconnects the observer, hides an open top-layer root, unmounts the
React root, clears portal children, restores the exact prior host theme
attributes/styles, and removes the instance from the lifecycle WeakMap.

## CSS registration amendment

Streamlit 1.60 turns a path-backed component stylesheet into a runtime
`<link>` inside every ShadowRoot. That conflicts with the approved no-runtime-
link invariant and adds a network stylesheet per instance.

The release still contains exactly one content-hashed compiled CSS asset.
Python resolves exactly one `style-*.css`, reads it once through a bounded
cache, and registers the verified text as raw component CSS. Streamlit then
creates one inline `<style>` in each instance ShadowRoot:

- no stylesheet is copied to `document.head`;
- no component `<link>` exists in the document or a ShadowRoot;
- all app and popup CSS remains instance-local;
- zero or multiple packaged CSS matches fail before component registration.

This adaptation is versioned in the shadcn provenance record.

## Alternatives considered

### Absolute or fixed positioning without a top-layer host

Rejected. `fixed` improves viewport-relative placement but cannot reliably
escape a clipping ancestor or every independent stacking context. The bounded
`st.container(height=...)` fixture demonstrates why position strategy alone is
not a complete contract.

### Larger `z-index`

Rejected. A descendant cannot use `z-index` to escape ancestor clipping or an
unfavorable ancestor stacking context.

### Shared light-DOM overlay host

Rejected for Wave 1. It would require a second ShadowRoot, per-instance theme
replication, cross-root accessibility ownership, version isolation, and a more
complex cleanup registry. The native top-layer solution passes while retaining
same-instance ownership.

### Defer Select and Menu

Rejected because the selected native top-layer design passes the Wave 1
matrix and directly removes the V1 double-iframe mechanism.

## Evidence

The real production call graph is statically enforced:

```text
Python V2 wrapper
  -> Streamlit adapter
    -> checked-in shadcn component source
      -> @base-ui/react primitive
```

Offline regeneration from the vendored registry and an import-graph test both
fail if the shadcn layer is bypassed.

Playwright runs the real Streamlit acceptance app in Chromium, Firefox, and
WebKit. It covers:

- main page, sidebar, all three columns, tabs, expanders, nested containers,
  and bounded-height containers;
- page and nearest-container scrolling while Select is open;
- viewport edges, long labels, long lists, and a competing fixed high layer;
- pointer, keyboard, Escape, outside press, focus return, RTL, touch-style
  input, 200% text scaling, and 200%-zoom-equivalent viewport metrics;
- light, dark, and custom theme scopes;
- multiple instances, reruns, conditional unmount, and multipage navigation;
- exact ShadowRoot ownership, top-layer state, zero iframe, zero body popup,
  and zero document mutation assertions.

Firefox emits one known browser diagnostic for fixed anchored positioning:
`This site appears to use a scroll-linked positioning effect`. The test filters
only that exact warning; every other console warning or error fails.

Automated axe checks report no serious or critical violation in the open
component ShadowRoots or Streamlit main content. Color contrast is validated
through the theme token and visual snapshot suite rather than axe's
cross-ShadowRoot contrast rule.

## Consequences

- Wave 1 Select and Dropdown Menu are approved on this host.
- Supported V2 browsers must implement Shadow DOM and the native Popover API.
- Anchored overlay families in later waves reuse this host and rerun the full
  matrix; they may not introduce component-specific portal shortcuts.
- This ADR does not approve modal, viewport-wide, or gesture-modal overlays.

