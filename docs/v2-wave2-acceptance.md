# V2 Wave 2 acceptance record

Theme note: ADR-009 supersedes this wave's original Streamlit-derived color
mapping. The component and interaction acceptance remains valid; current V2
uses the exact shadcn Nova/neutral visual tokens.

Status: **Automated technical gates passed**

Date: 2026-07-30

Scope: the low-risk display catalog in the opt-in
`streamlit_shadcn_ui.v2` namespace.

## Delivered catalog

Wave 2 adds:

- Alert, Avatar, Badge / Badges, Breadcrumb;
- Card and Metric Card;
- Aspect Ratio, Progress, Separator, Skeleton, and Table;
- Link Button.

Together with Wave 1, the namespace exports seventeen public helpers. Every
instance uses the shared Streamlit Components V2 renderer, an open isolated
ShadowRoot, and checked-in shadcn `base-nova` source. Base UI supplies behavior
where the upstream shadcn component has a behavior primitive; Alert, Card,
Skeleton, Table, and similar display compositions remain ordinary React as
declared by the registry.

## Protocol and security decisions

- Display envelopes are stateless and contain no callback channel.
- Breadcrumb is the sole Wave 2 trigger. It fails before mounting in a form
  and returns an action only when its index, text, and href exactly match a
  declared item.
- Link Button validates `http`, `https`, `mailto`, and explicit relative URLs
  in both Python and the frontend. Its enabled DOM is a semantic `<a>` styled
  with the generated shadcn `buttonVariants`; Base UI Button is retained only
  for the genuinely disabled button state.
- Avatar and Aspect Ratio accept only `http`, `https`, root-relative, or
  `data:image/` sources in both protocol layers.
- Skeleton dimensions use a restricted numeric/unit grammar; arbitrary CSS
  expressions are rejected.
- Table accepts bounded columns, rows, and primitive cells; columns are unique
  and rows must be rectangular.
- Text is rendered as React text, never injected HTML.

## Registry provenance

[ADR-004](./adr/004-v2-registry-snapshot-expansion.md) expands the atomic
vendored snapshot to fourteen registry items at shadcn upstream commit
`705ce5961080264830471ddd885c01b907706068`. Capture reads every payload twice,
records its digest and primitive family, and makes offline generation derive
the expected source set from the manifest.

## Automated evidence

Static and unit gates:

| Gate | Result |
|---|---:|
| Frontend Vitest | 35 passed |
| Python V2 tests | 31 passed |
| Generated source / provenance | Passed |
| shadcn → Base UI import graph | Passed |
| Shadow CSS normalization | Passed |
| TypeScript strict build | Passed |

Real Streamlit Playwright gates:

| Result | Count |
|---|---:|
| Passed | 10 |
| Failed | 0 |
| Intended visual-only skips | 2 |

The functional, lifecycle, and accessibility cases run in Chromium, Firefox,
and WebKit. Visual snapshots run once in Chromium.

The browser suite proves:

- twenty Wave 2 instances create twenty independent ShadowRoots;
- every root owns exactly one app root, one overlay root, and one inline
  stylesheet;
- no iframe and no component DOM in `document.body`;
- all catalog roles and accessible names are present;
- Breadcrumb reaches Python, then survives an unrelated Streamlit slider
  rerun;
- Progress updates from the rerun value;
- an explicit dark Streamlit host selects the standard shadcn dark tokens and
  remains instance-local;
- Link Button remains a native anchor with `noopener noreferrer`;
- no page error, console warning, or console error;
- axe reports no serious or critical semantic issue in component roots or the
  Streamlit main-content scope.

The required post-snapshot Wave 1 regression also passed: 21 cases passed and
the six Chromium-only performance, visual, and 100-rerender cases were skipped
as designed on Firefox/WebKit. Select and Dropdown Menu therefore retain the
accepted ADR-001 behavior after the registry and theme-token changes.

The original implementation darkened muted and destructive colors to satisfy
axe. ADR-009 reverses that visual override because the product default is now
the exact upstream shadcn preset. That preset's muted-on-muted combination is
approximately 4.34:1 and its generated destructive Badge is approximately
4.0:1. Tests keep all non-color serious/critical checks enabled and record
this standard-palette exception explicitly rather than hiding it in modified
tokens.

## Bundle

| Asset | Raw | Deterministic gzip |
|---|---:|---:|
| `entry-DG7I4RcX.js` | 599,384 B | 154,676 B |
| `style-DmLwQyOm.css` | 65,602 B | 10,443 B |

The release verifier records full SHA-256 digests and requires exactly one
hashed JavaScript and one hashed CSS file. The historical V1 rollback artifact
remains byte-identical.

Fresh wheel and sdist installs each ran the sixteen-component installed smoke
app from a temporary directory with Node removed from `PATH`. Both archives
rendered the complete semantic catalog without an iframe or Streamlit
exception.

## Reproduce

Build and run the acceptance app:

```sh
./scripts/wave2_v2.sh
```

Run the Wave 2 browser suite:

```sh
cd streamlit_shadcn_ui/frontend_v2
pnpm run test:e2e:wave2
```

Evidence entry points:

- [acceptance app](../V2_WAVE2.py);
- [browser suite](../streamlit_shadcn_ui/frontend_v2/e2e/wave2.spec.ts);
- [migration tracker](./v2-full-migration-tracker.md);
- [registry ADR](./adr/004-v2-registry-snapshot-expansion.md).

## Remaining work

Wave 2 does not claim full V1 parity. Stateful/text controls are Wave 3,
anchored overlays are Wave 4, modal/viewport overlays are Wave 5, and public
compatibility/cutover is Wave 6.
