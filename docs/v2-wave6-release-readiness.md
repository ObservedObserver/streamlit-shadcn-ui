# V2 Wave 6 release readiness

Status: **Complete for the V2-only 1.0 source and distribution candidate**

Date: 2026-07-31

Wave 6 closes the repository-side migration of the stable component catalog
and the V2-only 1.0 cutover. Publication remains a separate maintainer action.

## Outcome

- The 1.0 package root exports thirty-five public helpers across thirty-four rendered component
  kinds.
- All thirty-two stable high-level V1 component roles have a V2
  implementation.
- The V1 Python implementation, React workspace, iframe assets, and `v1`
  compatibility namespace are absent from the source and release archives.
- V1 Checkbox groups and context-managed Card usage require application-level
  migration. Experimental `element` composition is removed.
- Raw V2 `st.session_state` cells are private protocol envelopes.
- The package root is the canonical V2 API; the direct `.v2` import remains an
  alias to the same objects.
- The global floors are Python 3.10 and Streamlit 1.60.

The detailed contract is the
[compatibility matrix](./v2-compatibility-matrix.md), and the decision is
[ADR-008](./adr/008-v2-cutover-and-session-state.md). The corrected visual
ownership boundary is
[ADR-009](./adr/009-v2-shadcn-owned-visual-theme.md): V2 uses the standard
shadcn Nova/neutral palette and radius, while Streamlit supplies only the
light/dark environment, direction, and language.

## Release inventory

| Layer | Verified release |
|---|---:|
| Python package candidate | 1.0.0 |
| Streamlit | 1.60.0 |
| Components V2 library | 0.2.0 |
| shadcn CLI | 4.16.0 |
| shadcn/ui registry commit | `705ce5961080264830471ddd885c01b907706068` |
| Base UI | 1.6.0 |
| React / React DOM | 19.2.8 |
| Tailwind CSS | 4.3.3 |
| Playwright | 1.62.0 |
| Chromium | 151.0.7922.34 |
| Firefox | 153.0 |
| WebKit | 26.5 |

The PyPI and npm registries were checked on 2026-07-31. Streamlit,
`@streamlit/component-v2-lib`, shadcn, and `@base-ui/react` were already at
their latest published versions, so no speculative dependency update was
needed for this candidate.

## Final automated evidence

| Gate | Result |
|---|---:|
| Python API, documentation, compatibility, and release tests | 58 passed |
| Frontend Vitest | 63 passed |
| Generated shadcn source and import graph | Passed |
| Strict TypeScript and production build | Passed |
| Shadow CSS and CSP ownership | Passed |
| Wave 1–5 Chromium/Firefox/WebKit suites | 81 passed, 12 intended skips |
| CSS instance performance suite | 1 passed, 2 intended browser skips |
| Direct Base UI performance comparison | 1 passed, 2 intended browser skips |
| Same-origin asset-hash upgrade suite | 1 passed, 2 intended browser skips |
| Clean wheel archive verification | Passed |
| Clean sdist archive verification | Passed |
| Installed wheel catalog smoke | Passed |
| Installed sdist catalog smoke | Passed |

The browser total covers all accepted wave suites against the final bundle:

| Wave | Passed | Intended skips |
|---|---:|---:|
| Wave 1 — Select and POC controls | 20 | 4 |
| Wave 2 — display catalog | 10 | 2 |
| Wave 3 — stateful/form catalog | 13 | 2 |
| Wave 4 — anchored overlays | 19 | 2 |
| Wave 5 — Alert Dialog modal | 19 | 2 |

All skips are declared visual or Chromium-only reliability/performance checks;
no product assertion was skipped after a failure.

The cache-upgrade suite keeps one Chromium page and browser context alive,
restarts Streamlit on the same origin and port with two content-derived entry
hashes, and proves that the second navigation loads the new JavaScript and
inline CSS markers. The old entry is absent from the current resource timing
buffer, and both entry responses retain Streamlit's `Cache-Control: public`
contract. Firefox and WebKit deliberately skip this one redundant
transport-level check; their component behavior remains covered by every
wave's functional suite.

## Performance baseline

### Generated shadcn versus direct Base UI POC

The archived pre-production Select was rebuilt into a temporary directory with
the same frozen V2 toolchain and run beside a minimal production Select on
Streamlit 1.60. Three isolated Chromium contexts measured time from navigation
to the accessible combobox; the table reports their median. The rerender
measurement uses the same 100-iteration Streamlit fragment loop for both
renderers.

| Renderer | Initial samples | Median ready | 100 rerenders | Per rerender |
|---|---:|---:|---:|---:|
| Archived direct Base UI POC | 925.91 / 298.81 / 297.19 ms | 298.81 ms | 1,317.93 ms | 13.18 ms |
| Generated shadcn + Base UI | 911.49 / 305.97 / 302.64 ms | 305.97 ms | 1,294.10 ms | 12.94 ms |

The shadcn median-ready ratio is 1.024 and its per-rerender ratio is 0.982.
This local benchmark does not assign meaning to sub-millisecond noise; it
proves that the owned shadcn composition boundary introduces no material
regression relative to the direct Base UI diagnostic. The direct fixture and
its build output remain excluded from release archives.

### CSS per instance

The CSS-per-instance fixture includes the twenty-one normal Wave 1 hosts plus
the requested benchmark instances:

| Requested instances | Total hosts | Ready time | Style bytes per host | Component asset requests |
|---:|---:|---:|---:|---:|
| 1 | 22 | 1,030 ms | 111,120 | 1 |
| 10 | 31 | 518 ms | 111,120 | 1 |
| 50 | 71 | 907 ms | 111,120 | 1 |
| 100 | 121 | 1,610 ms | 111,120 | 1 |

Every host had exactly one inline ShadowRoot stylesheet. Runtime component
stylesheet links in ShadowRoots and `document.head` remained zero.

The 100-rerun Chromium fixture completed in 1,844 ms, or 18.44 ms per rerun.
Component host, ShadowRoot node, stylesheet, overlay-child, and open-top-layer
counts stayed stable.

## Distribution evidence

The final source build is reproducible: two consecutive Vite builds emitted
the same content hash, and `verify_v2_release_source.sh` confirmed that the
checked-in dist is clean after the build.

| Asset | Raw | Deterministic gzip | SHA-256 |
|---|---:|---:|---|
| `entry-CTom8dO1.js` | 925,393 B | 229,121 B | `62a59e055065e2bd1675d01dde874cdcd020d7a28f6b359550a004096630d60c` |
| `style--8f7rCKt.css` | 107,192 B | 15,183 B | `21bde0fab99f25a75e92ee3f40ac7d2adf242bf2e63bd48d0d26a7da917210a8` |

Both archives contain:

- the V2-only `streamlit_shadcn_ui` package root and `.v2` implementation;
- one V2 JavaScript entry and one V2 stylesheet;
- no frontend development source, source map, or `node_modules`;
- no V1 source, legacy React workspace, or iframe assets.

Fresh wheel and sdist environments run Streamlit 1.60 with Node absent from the
server `PATH`. The installed catalog renders thirty-four independent component
hosts and thirty-four component kinds with zero iframe and valid ShadowRoots.

The 1.0 metadata uses the SPDX license expression supported by the raised
setuptools build floor.

## Interactive accessibility evidence

Safari 26.5 on macOS passed the final-bundle interactive checks on
2026-07-31:

- at real browser-chrome 200% zoom, Select remained visible and usable, its
  popup was not clipped, and Escape closed it;
- with VoiceOver enabled, Select exposed its name, value, expanded state,
  list, and selected option;
- Alert Dialog exposed only its modal subtree while open, including its title,
  description, cancel action, confirm action, and focus boundaries;
- activating Cancel restored the background navigation tree and produced the
  expected false decision.

Safari was restored to Actual Size and VoiceOver was confirmed off afterward.
The Windows-only NVDA/Firefox check has not run in this workspace. ADR-010
records it as useful follow-up coverage rather than a blocking 1.0 gate.

The exact standard shadcn neutral palette includes muted-on-muted and
destructive-Badge combinations that axe measures at approximately 4.34:1 and
4.0:1. ADR-009 records this upstream visual baseline. Semantic, focus,
keyboard, ARIA, and other serious/critical checks remain fail-closed; the
standard palette is not silently darkened to make the report green.

## Reproduce the final repository gates

Use the frozen Node 22.20.0 and pnpm 11.18.0 toolchain:

```sh
./scripts/verify_v2_release_source.sh
python3 -m pytest tests/v2 -q

cd streamlit_shadcn_ui/frontend_v2
pnpm run test:e2e:asset-upgrade
pnpm run test:e2e:performance-comparison
```

The two browser suites own temporary Streamlit ports and directories, clean
them up on completion, and do not modify the production bundle.

## 1.0 release gate

[ADR-010](./adr/010-v2-1.0-single-track-cutover.md) supersedes the opt-in and
two-release rollback policy that this record originally evaluated. The
maintainer has approved a breaking V2-only `1.0.0` target.

Repository-side 1.0 conditions 1–5 are complete: canonical documentation uses
the package root, V1-only artifacts are removed, floors and migration notes are
updated, exact archives pass release verification, and metadata is `1.0.0`.
Publishing still requires an explicit maintainer action and credentials.

The Windows NVDA/Firefox smoke remains a documented follow-up rather than a
blocking 1.0 condition. No release credentials or publication action are
inferred by the migration work itself.
