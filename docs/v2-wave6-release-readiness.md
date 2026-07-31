# V2 Wave 6 release readiness

Status: **Technical migration complete; Windows and release-feedback gates open**

Date: 2026-07-30

Wave 6 closes the repository-side migration of the stable component catalog.
It does not claim that local automation is a substitute for publishing an
opt-in release and observing real applications.

## Outcome

- V2 exports thirty-five public helpers across thirty-four rendered component
  kinds.
- All thirty-two stable high-level V1 component roles have a V2
  implementation.
- The thirty-three-name V1 root remains unchanged. The additional `v1`
  namespace is an exact rollback alias.
- V1 Checkbox groups and context-managed Card usage require application-level
  adapters. Experimental `element` composition remains V1-only.
- Raw V2 `st.session_state` cells are private protocol envelopes.
- The package root remains V1; V2 remains an explicit import.
- Python and Streamlit global floors are unchanged. V2 keeps its guarded
  Python 3.10 / Streamlit 1.60 floor.

The detailed contract is the
[compatibility matrix](./v2-compatibility-matrix.md), and the decision is
[ADR-008](./adr/008-v2-cutover-and-session-state.md).

## Release inventory

| Layer | Verified release |
|---|---:|
| Python package candidate | 0.1.19 source; no release bump authorized |
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
| Python V2 and compatibility tests | 48 passed |
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
| Archived direct Base UI POC | 937.47 / 308.29 / 314.69 ms | 314.69 ms | 1,834.22 ms | 18.34 ms |
| Generated shadcn + Base UI | 928.37 / 316.43 / 328.60 ms | 328.60 ms | 1,809.63 ms | 18.10 ms |

The shadcn median-ready ratio is 1.044 and its per-rerender ratio is 0.987.
This local benchmark does not assign meaning to sub-millisecond noise; it
proves that the owned shadcn composition boundary introduces no material
regression relative to the direct Base UI diagnostic. The direct fixture and
its build output remain excluded from release archives.

### CSS per instance

The CSS-per-instance fixture includes the twenty-one normal Wave 1 hosts plus
the requested benchmark instances:

| Requested instances | Total hosts | Ready time | Style bytes per host | Component asset requests |
|---:|---:|---:|---:|---:|
| 1 | 22 | 1,573 ms | 110,197 | 1 |
| 10 | 31 | 555 ms | 110,197 | 1 |
| 50 | 71 | 975 ms | 110,197 | 1 |
| 100 | 121 | 1,675 ms | 110,197 | 1 |

Every host had exactly one inline ShadowRoot stylesheet. Runtime component
stylesheet links in ShadowRoots and `document.head` remained zero.

The 100-rerun Chromium fixture completed in 1,845 ms, or 18.45 ms per rerun.
Component host, ShadowRoot node, stylesheet, overlay-child, and open-top-layer
counts stayed stable.

## Distribution evidence

The final source build is reproducible: two consecutive Vite builds emitted
the same content hash, and `verify_v2_release_source.sh` confirmed that the
checked-in dist is clean after the build.

| Asset | Raw | Deterministic gzip | SHA-256 |
|---|---:|---:|---|
| `entry-CUDaOqbm.js` | 924,315 B | 229,028 B | `838fb0d993e8d3725237254d5b8b0fa616ed925bd9e9ddbbdd065540adcbf008` |
| `style-D0zcpX2B.css` | 103,173 B | 14,572 B | `30819796ca62efb94c052d5911a30f857f8f26ee0492b6c0d1718902497b4ca3` |

Both archives contain:

- the explicit `streamlit_shadcn_ui.v1` rollback namespace;
- the complete `streamlit_shadcn_ui.v2` namespace;
- one V2 JavaScript entry and one V2 stylesheet;
- no frontend development source, source map, or `node_modules`;
- byte-identical pinned V1 assets.

Fresh wheel and sdist environments ran Streamlit 1.60 with Node absent from
the server `PATH`. Each rendered thirty-four independent component hosts and
thirty-four component kinds with zero iframe, zero invalid ShadowRoot, and
zero browser error or warning.

The first truly cold installed-catalog render can exceed ten seconds because
the fixture mounts the entire V1 compatibility import plus thirty-four V2
components at once. The installed smoke therefore gives first render a
sixty-second startup budget while keeping normal component expectations at
ten seconds.

Setuptools reports that the legacy license-table metadata will be deprecated
in 2027. Converting it to the new SPDX string requires a build-backend floor
that no longer supports the promised Python 3.7 V1 rollback. ADR-008 therefore
defers that metadata-only change to the same semantic breaking release that
raises the global runtime floor.

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
The Windows-only NVDA/Firefox check has not run in this workspace and remains
an explicit promotion gate.

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

## External release gate

The next authorized release should remain opt-in and use
`streamlit_shadcn_ui.v2`. Publishing requires a new package version and
release credentials, neither of which is inferred by this migration task.

The opt-in promotion still requires the NVDA/Firefox smoke on Windows. Default
cutover additionally remains blocked until:

1. the opt-in artifact completes a documented real-user feedback window;
2. Checkbox group and Card/`element` dispositions are accepted or adapted;
3. the exact proposed breaking artifact repeats these gates;
4. the maintainer explicitly approves the root switch and global floors.

V1 must remain available through `streamlit_shadcn_ui.v1` for at least two
published releases after any future default cutover.
