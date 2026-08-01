# ADR-002: V2 modal overlay strategy

Status: **Partially superseded by ADR-007**

Date: 2026-07-30

Applies to: Dialog, Alert Dialog, Sheet, Drawer, Toast, and any future
viewport-wide or modal overlay in `streamlit_shadcn_ui.v2`.

## Context

ADR-001 solves non-modal anchored overlays. A modal has a materially different
contract: the backdrop must cover the intended viewport, the Streamlit
background must become inert, focus must remain trapped, page scrolling must
lock without jumping, and every global effect must compose across independent
component roots.

Making only one component ShadowRoot inert is not equivalent to making the
Streamlit document background inert. A visually full-screen popup is also not
proof of correct modal semantics.

Wave 1 contains no modal component, so choosing an unproven global-effects
model would add risk without contributing to its acceptance goal.

[ADR-007](./007-v2-alert-dialog-modal-effects.md) supplies the required
implementation decision and browser evidence for Alert Dialog. The deferral
continues to apply to Dialog, Sheet, Drawer, Toast, and any other modal or
viewport family until its own accepted successor explicitly covers it.

## Options considered

1. Base UI modal content and backdrop inside the instance ShadowRoot.
2. Native `<dialog>.showModal()` inside the instance ShadowRoot.
3. Native Popover/top-layer content where its semantics are appropriate.
4. A shared document overlay host with an owned ShadowRoot and explicit
   accessibility/theme bridge.
5. Defer modal families until a dedicated fixture proves the complete
   lifecycle.

Options 1–4 can all draw in the browser top layer, but none is accepted merely
for visual coverage. Each must also prove document-wide inertness, focus,
scroll, nesting, reference counting, and exact restoration across independent
Streamlit component roots.

## Decision

Choose option 5 for Waves 0 and 1: **defer every modal and viewport-overlay
family**.

Before any such family enters production, a successor implementation decision
must run all ADR-001 placements and prove:

- viewport backdrop coverage above competing fixed/sticky content;
- actual pointer and keyboard inertness for the Streamlit background;
- Tab and Shift+Tab trapping, Escape policy, initial focus, and focus return;
- scroll locking with no layout jump;
- one modal, nested modals, and two independent modal instances;
- reference-counted document effects;
- exact snapshot and restoration of existing body styles, `inert`, and
  `aria-hidden`;
- rerun, conditional unmount, page navigation, and cleanup while open;
- no orphan backdrop, listener, focus guard, scroll lock, or observer.

If Base UI effects do not compose across independent roots, a versioned
`ModalEffectsCoordinator` must own snapshots and reference counts. It may
restore a prior document value only when the final owner releases it.

Drawer remains additionally blocked until a stable Base UI release contains
the relevant Shadow DOM gesture fix and the local Chromium/WebKit gesture
suite passes. Toast requires its own viewport-host decision because it is not
semantically interchangeable with a modal.

## Consequences

- Dialog, Alert Dialog, Sheet, Drawer, and Toast are not Wave 1 exports.
- ADR-001's native Popover host must not be copied blindly into a modal.
- Wave 1 can be accepted without claiming modal support.
- A future modal implementation is a new evidence-producing gate, not a minor
  component addition.
