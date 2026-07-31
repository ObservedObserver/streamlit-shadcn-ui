# V2 Wave 5 acceptance record

Status: **Automated technical gates passed**

Date: 2026-07-30

Scope: the stable V1 modal surface in the opt-in
`streamlit_shadcn_ui.v2` namespace.

## Delivered catalog

Wave 5 adds `alert_dialog`, bringing V2 to thirty-five public helpers across
thirty-four rendered component kinds.

The registry snapshot is revision 5 and contains thirty-one checked-in shadcn
sources. It records shadcn CLI 4.16.0, Base UI 1.6.0, and shadcn/ui commit
`705ce5961080264830471ddd885c01b907706068`. The generated Alert Dialog source
imports Base UI through the same owned shadcn boundary as the accepted
catalog.

[ADR-007](./adr/007-v2-alert-dialog-modal-effects.md) and the
[modal contract](./v2-wave5-modal-contract.md) define the request, focus,
stacking, inert, scroll-lock, and cleanup behavior.

## Automated evidence

Static and unit gates:

| Gate | Result |
|---|---:|
| Frontend Vitest | 63 passed |
| Python V2 tests | 42 passed |
| Generated source / provenance | Passed |
| shadcn to Base UI import graph | Passed |
| Shadow CSS / CSP ownership | Passed |
| TypeScript strict build | Passed |

Real Streamlit Playwright gates:

| Result | Count |
|---|---:|
| Passed | 19 |
| Failed | 0 |
| Intended non-Chromium visual skips | 2 |

Chromium, Firefox, and WebKit prove:

- five fixtures create five independent component ShadowRoots;
- every popup and backdrop stays inside its instance-owned ShadowRoot;
- the native top-layer host renders above a maximum-z-index competitor;
- pointer, Enter, Space, Tab, Shift+Tab, Escape, Confirm, and Cancel work;
- background content is natively inert and forced focus cannot escape;
- nested Streamlit scrolling and wheel behavior remain usable;
- launch focus returns after ordinary interaction and Streamlit reruns,
  including WebKit;
- two independent modal roots suspend and resume in strict stack order;
- external close, conditional unmount, navigation, and sidebar placement
  release all effects without publishing a false decision;
- document `html` and `body` style attributes restore byte-for-byte after the
  final modal closes;
- Base UI alert semantics, focus guards, `aria-hidden`, scroll lock,
  backdrop, and animations remain active;
- no iframe, direct-body popup, page error, console warning, console error, or
  serious/critical axe violation occurs.

The Chromium visual contract is stored at
`frontend_v2/e2e/wave5.spec.ts-snapshots/wave5-alert-dialog-chromium-darwin.png`.

## VoiceOver and Safari

On 2026-07-31 the final bundle passed an interactive Safari 26.5 smoke with
macOS VoiceOver enabled. Opening the primary Alert Dialog reduced the
VoiceOver navigation tree to the modal subtree and exposed:

- the `Ship the V2 migration?` heading;
- the focus-trap description;
- the `Keep reviewing` and `Ship it` actions;
- named focus boundaries around the modal content.

Activating `Keep reviewing` restored the background tree, made the
`Open primary dialog` trigger available again, and produced the expected
`Primary decision: False` result. VoiceOver was confirmed off after the
session. NVDA/Firefox remains a separate Windows-only promotion check.

## Distribution evidence

Wheel and sdist were built from a clean git archive. The release verifier
confirmed:

- exactly one content-hashed JavaScript entry and one stylesheet;
- the nested Streamlit component manifest points to the V2 dist directory;
- no development source, `node_modules`, source map, or stale asset is
  packaged;
- every pinned V1 rollback byte is unchanged.

Each artifact was installed into a new Python environment. The Streamlit
server then ran with Node absent from `PATH`. The installed-catalog Playwright
smoke found thirty-four independent hosts and thirty-four component kinds,
including Select, Date Picker, and Alert Dialog, with zero iframe and zero
browser diagnostic.

## Bundle

| Asset | Raw | Deterministic gzip | SHA-256 |
|---|---:|---:|---|
| `entry-CUDaOqbm.js` | 924,315 B | 229,028 B | `838fb0d993e8d3725237254d5b8b0fa616ed925bd9e9ddbbdd065540adcbf008` |
| `style-D0zcpX2B.css` | 103,173 B | 14,572 B | `30819796ca62efb94c052d5911a30f857f8f26ee0492b6c0d1718902497b4ca3` |

The Wave 5 dependency audit found that the pinned shadcn CLI 4.16.0, Base UI
1.6.0, and Streamlit 1.60.0 were already the current versions, so no runtime
pin changed.

## Reproduce

Build and run the acceptance app:

```sh
./scripts/wave5_v2.sh
```

Run its browser suite:

```sh
cd streamlit_shadcn_ui/frontend_v2
pnpm run test:e2e:wave5
```

Evidence entry points:

- [acceptance app](../V2_WAVE5.py);
- [browser suite](../streamlit_shadcn_ui/frontend_v2/e2e/wave5.spec.ts);
- [modal contract](./v2-wave5-modal-contract.md);
- [migration tracker](./v2-full-migration-tracker.md).

## Remaining gate

The stable component implementation is complete. Wave 6 owns the public
compatibility decision, explicit rollback namespace, and release-cycle
feedback gate.
