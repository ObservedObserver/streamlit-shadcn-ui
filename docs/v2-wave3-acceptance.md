# V2 Wave 3 acceptance record

Status: **Automated technical gates passed**

Date: 2026-07-30

Scope: inline state, disclosure, navigation, date, and form controls in the
opt-in `streamlit_shadcn_ui.v2` namespace.

## Delivered catalog

Wave 3 adds fourteen public helpers:

- Input, Textarea, and Input OTP;
- Accordion and Collapsible;
- Pagination and Radio Group;
- Scroll Area and Slider;
- Switch, Tabs, Toggle, and Toggle Group;
- Calendar.

Together with Waves 1 and 2, the V2 namespace exports thirty-one helpers.
Ten Wave 3 shadcn sources use Base UI behavior primitives. Calendar, Input
OTP, Pagination, and Textarea are React compositions from the same pinned
shadcn registry; their transitive shadcn Button/Toggle dependencies also use
the owned generated source.

## State and Shadow DOM decisions

The complete commit, revision, reset, and form policy is frozen in the
[Wave 3 state contract](./v2-wave3-state-contract.md).

[ADR-005](./adr/005-v2-wave3-registry-and-runtime-styles.md) expands the
atomic vendored snapshot to twenty-eight items and moves Base UI's
scrollbar-hiding rule into the versioned Shadow CSS. The platform
`CSPProvider` disables library-owned runtime style elements, leaving exactly
one stylesheet and no runtime link in every component ShadowRoot.

## Automated evidence

Static and unit gates:

| Gate | Result |
|---|---:|
| Frontend Vitest | 50 passed |
| Python V2 tests | 35 passed |
| Generated source / provenance | Passed |
| shadcn → Base UI import graph | Passed |
| Shadow CSS / CSP ownership | Passed |
| TypeScript strict build | Passed |

Real Streamlit Playwright gates:

| Result | Count |
|---|---:|
| Passed | 13 |
| Failed | 0 |
| Intended Chromium-only visual skips | 2 |

The functional, form, state, accessibility, and isolation cases run in
Chromium, Firefox, and WebKit. Visual snapshots run once in Chromium.

The browser suite proves:

- nineteen Wave 3 instances create nineteen independent ShadowRoots;
- every root owns one app root, one overlay root, and one versioned
  stylesheet;
- no iframe, runtime stylesheet link, library-injected style element, or
  component DOM exists in `document.body`;
- Input, Textarea, and OTP drafts commit at their documented boundaries and
  persist through unrelated reruns;
- Slider publishes only a committed interaction;
- all disclosure, pagination, choice, toggle, tab, and date values reach
  Python and survive reruns;
- Input, Radio Group, and Slider submit together through `st.form`;
- Calendar applies ISO/local-date conversion without UTC day drift;
- Scroll Area uses the vendored CSS rule and remains scrollable;
- no page error, console warning, or console error occurs;
- axe reports no serious or critical issue in component roots or the
  Streamlit main-content scope.

The required post-CSP regressions also passed:

- Wave 1: 20 passed and 4 intentional Chromium-only skips;
- Wave 2: 10 passed and 2 intentional Chromium-only visual skips.

Select, Dropdown Menu, and all prior display components therefore retain their
accepted behavior after the shared style-ownership change.

Fresh wheel and sdist installs each ran the thirty-instance installed smoke
app from a temporary directory with Node removed from `PATH`. Both rendered
all thirty distinct component kinds without an iframe, console error,
Streamlit exception, or missing release asset. The archive verifier confirmed
byte-identical V1 rollback and V2 assets.

## Bundle

| Asset | Raw | Deterministic gzip |
|---|---:|---:|
| `entry-Bs3nNBFc.js` | 866,971 B | 216,017 B |
| `style-h32zhzin.css` | 99,179 B | 14,055 B |

The increase is primarily the accepted Calendar dependency graph
(`react-day-picker` and `date-fns`) and is recorded explicitly for later
chunking work. Release verification still requires exactly one content-hashed
JavaScript entry and one content-hashed stylesheet.

## Reproduce

Build and run the acceptance app:

```sh
./scripts/wave3_v2.sh
```

Run the Wave 3 browser suite:

```sh
cd streamlit_shadcn_ui/frontend_v2
pnpm run test:e2e:wave3
```

Evidence entry points:

- [acceptance app](../V2_WAVE3.py);
- [browser suite](../streamlit_shadcn_ui/frontend_v2/e2e/wave3.spec.ts);
- [state contract](./v2-wave3-state-contract.md);
- [migration tracker](./v2-full-migration-tracker.md);
- [registry and CSP ADR](./adr/005-v2-wave3-registry-and-runtime-styles.md).

## Remaining work

Wave 4 owns anchored overlays beyond Select and Dropdown Menu. Wave 5 owns
modal and viewport overlays. Wave 6 owns the final V1 compatibility table,
cutover decision, and semver policy.
