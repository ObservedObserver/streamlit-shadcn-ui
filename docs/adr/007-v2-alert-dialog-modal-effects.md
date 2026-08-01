# ADR-007: V2 Alert Dialog and cross-root modal effects

Status: **Accepted for Wave 5**

Date: 2026-07-30

Supersedes the implementation deferral in
[ADR-002](./002-v2-modal-overlay.md) for Alert Dialog only.

## Context

The stable V1 `alert_dialog` used a fixed Streamlit container plus a second
component iframe. It could draw a modal-like surface, but that structure did
not prove document-wide background inertness, focus trapping, scroll
restoration, or cleanup across independent components.

V2 renders each component in its own ShadowRoot. The generated shadcn Alert
Dialog uses Base UI 1.6.0 for its modal behavior. A single Base UI Alert Dialog
already provides the correct alert semantics, accessible title and
description, initial focus, Tab trapping, Escape handling, backdrop, scroll
lock, `aria-hidden` management, and focus restoration.

Two Base UI modal focus managers opened concurrently in unrelated React and
ShadowRoot trees are not a valid stack: each manager can hide the other
component branch from assistive technology. Base UI also blocks ordinary
pointer and sequential-keyboard access to the background, but does not apply
native `inert` to the surrounding Streamlit light DOM. On WebKit, Streamlit's
Python rerun can focus the main container before the controlled dialog opens,
so Base UI alone no longer knows which Streamlit button launched it. Finally,
Base UI can restore the values of body overflow styles while leaving an empty
`style=""` attribute when no style attribute existed before.

## Decision

### shadcn and Base UI remain the component kernel

Registry snapshot revision 5 captures all thirty-one Wave 1–5 shadcn
`base-nova` payloads at upstream commit:

`705ce5961080264830471ddd885c01b907706068`

Wave 5 adds the generated shadcn Alert Dialog source. Its behavior primitive
is `@base-ui/react/alert-dialog`; the product adapter does not recreate a
dialog, focus trap, backdrop, or button system. The standard generator
adaptation sends its Portal to the instance-owned overlay root. The existing
native Popover host places that root in the browser top layer while every
popup node and stylesheet remains in the component ShadowRoot.

The dependency pins remain at the current upstream releases used by the
snapshot: shadcn 4.16.0 and Base UI 1.6.0. No upgrade is required for Alert
Dialog.

### One active Base UI modal owner

A document-global, versioned `ModalLayerCoordinator` maintains a stack of
independent V2 modal requests. Only the newest owner renders its Base UI root
open. An earlier owner remains queued, with no portal or global Base UI
effects, and resumes when the top owner releases.

This makes independent Streamlit component roots behave as one deterministic
modal stack. It also avoids two unrelated focus managers applying
`aria-hidden` to each other's branches. The coordinator is shared through a
versioned global key so duplicate instances of the same packaged runtime use
one stack.

### Coordinator-owned cross-root effects

For the active modal only, the coordinator:

- applies native `inert` to light-DOM sibling branches outside the active
  component path;
- snapshots every pre-existing `inert` attribute and restores its exact
  presence and value;
- snapshots the original `<html>` and `<body>` style attributes before the
  first owner;
- restores those exact attributes after the final owner and Base UI's
  asynchronous scroll-lock cleanup release;
- tracks the last real pointer or Enter/Space activation while no modal is
  open, so WebKit can return focus to a Streamlit launcher across a Python
  rerun;
- reference-counts and removes the interaction listeners when the final Alert
  Dialog adapter unmounts.

Base UI continues to own focus trapping, alert semantics, backdrop behavior,
`aria-hidden`, scroll locking, Escape, animations, and focus movement inside
the popup. The coordinator supplies only the document and cross-root behavior
that no isolated Base UI instance can safely own.

### Alert Dialog interaction policy

The cancel button receives initial focus. Confirm resolves `True`; Cancel and
Escape resolve `False`. Backdrop press does not dismiss an Alert Dialog.
Closing, an external `show=False`, rerun, conditional unmount, and navigation
all release the modal layer and restore document effects.

`show` is a rising-edge request. A continuously true value cannot reopen a
resolved dialog. The caller must render `show=False` before a later true value
creates a new request.

## Evidence gates

Alert Dialog is accepted only when Chromium, Firefox, and WebKit prove:

- zero iframe and zero direct-body popup;
- same-ShadowRoot portal ownership and native top-layer coverage above a
  competing maximum-z-index fixed element;
- native background `inert`, Base UI `aria-hidden`, pointer blocking, Tab and
  Shift+Tab trapping, Escape, initial focus, and launch-focus restoration;
- no page-scroll movement from wheel or Page Down while open;
- one modal, two independent roots, suspension, and resumption;
- rerun, external close, conditional unmount, and final-owner cleanup;
- exact restoration of existing inert and document style attributes;
- no orphan portal, backdrop, focus guard, scroll lock, listener, or top-layer
  host;
- no serious or critical axe finding and no browser diagnostic.

## Consequences

- The stable V1 Alert Dialog no longer needs either iframe.
- The modal layer coordinator is infrastructure, not a second component
  library.
- Dialog and Sheet have no stable released V1 Python wrapper and remain
  new-product candidates.
- Toast still requires its own viewport-host ADR.
- Drawer remains deferred until its independent gesture and Shadow DOM gate is
  approved; this ADR does not claim Drawer support.
