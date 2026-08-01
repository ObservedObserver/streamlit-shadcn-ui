# V2 Wave 4 acceptance record

Status: **Automated technical gates passed**

Date: 2026-07-30

Scope: the remaining stable V1 anchored-overlay catalog in the opt-in
`streamlit_shadcn_ui.v2` namespace.

## Delivered catalog

Wave 4 adds three public helpers:

- Popover;
- Hover Card;
- Date Picker in single-date and range modes.

Together with Waves 1–3, V2 exports thirty-four helpers across thirty-three
rendered component kinds.

[ADR-006](./adr/006-v2-wave4-anchored-overlay-catalog.md) expands the atomic
registry snapshot to thirty shadcn sources. Popover and Hover Card are
generated shadcn Base UI components. Date Picker composes the generated
Popover, Calendar, and Button sources.

## Automated evidence

Static and unit gates:

| Gate | Result |
|---|---:|
| Frontend Vitest | 56 passed |
| Python V2 tests | 37 passed |
| Generated source / provenance | Passed |
| shadcn → Base UI import graph | Passed |
| Shadow CSS / CSP ownership | Passed |
| TypeScript strict build | Passed |

Real Streamlit Playwright gates:

| Result | Count |
|---|---:|
| Passed | 19 |
| Failed | 0 |
| Intended Chromium-only visual skips | 2 |

The suite proves:

- seven fixture instances create seven independent ShadowRoots;
- every popup belongs to its instance overlay root and stays in that
  ShadowRoot;
- the native top-layer host lets Popover cross a bounded Streamlit container;
- Popover supports click, Escape, focus return, and outside close;
- Hover Card supports pointer hover and keyboard focus in Chromium, Firefox,
  and WebKit;
- single dates commit immediately, while range gestures remain local until
  `Apply`;
- Date Picker state participates in `st.form`;
- no iframe, direct-body popup, runtime stylesheet link, document style
  mutation, scroll lock, `inert`, or `aria-hidden` mutation occurs;
- no page error, console warning, or console error occurs;
- axe reports no serious or critical violation in open component roots.

The first archive attempt deliberately failed because an old setuptools
`build/lib` directory still contained Wave 3 hashed assets. After moving that
generated directory aside, the clean build and fail-closed archive verifier
confirmed exactly one JavaScript entry and one stylesheet in both artifacts.
Fresh wheel and sdist environments, with Node absent from the server `PATH`,
each rendered all thirty-three component kinds with zero iframe and zero
browser diagnostic.

## Bundle

| Asset | Raw | Deterministic gzip | SHA-256 |
|---|---:|---:|---|
| `entry-CEMdOd1W.js` | 904,061 B | 224,098 B | `95c5316735ce983915edc45d62b92f356f5d48bd3e173df9a91cee84279c289f` |
| `style-TzB4T71y.css` | 99,391 B | 14,090 B | `1127e9a665303a5c142a7328862c244b4be6ff835796366d47baec24a4ab5cf6` |

No runtime dependency pin changed in Wave 4.

## Reproduce

Build and run the acceptance app:

```sh
./scripts/wave4_v2.sh
```

Run its browser suite:

```sh
cd streamlit_shadcn_ui/frontend_v2
pnpm run test:e2e:wave4
```

Evidence entry points:

- [acceptance app](../V2_WAVE4.py);
- [browser suite](../streamlit_shadcn_ui/frontend_v2/e2e/wave4.spec.ts);
- [state and overlay contract](./v2-wave4-state-and-overlay-contract.md);
- [migration tracker](./v2-full-migration-tracker.md).

## Remaining work

Wave 5 owns the stable V1 Alert Dialog and the modal evidence gate. Wave 6
owns the compatibility table, release-cycle feedback gate, cutover decision,
and rollback policy.
