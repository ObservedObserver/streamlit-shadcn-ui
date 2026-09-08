# Charts acceptance record

Date: 2026-09-07

Scope: ADR-012's six standalone Python chart functions, their native shadcn
composition, the Charts documentation page, and packaged frontend assets.
This change does not publish a PyPI release or deploy the documentation site.

The initial acceptance below used the original grayscale chart tokens. The
user-approved palette follow-up at the end of this record supersedes those
color and stylesheet details.

## Automated checks

| Check | Result |
| --- | --- |
| Python v2 suite | 96 tests passed |
| Frontend unit suite | 128 tests passed |
| TypeScript and production build | Passed |
| Generated-source, import graph, source boundaries, Shadow CSS | Passed |
| Charts Playwright suite | 9 tests passed across Chromium, Firefox, and WebKit |
| Wheel and sdist contents | Passed `scripts/verify_release.py` |
| Installed wheel | Fresh virtual environment, final asset identity and Streamlit AppTest passed |

The browser fixture exercises line, area, bar, pie, radar, and radial charts,
plus stacked area, horizontal stacked bars, donut, and missing-value gaps.
Assertions cover rendered marks, actual stacked/horizontal/donut geometry,
tooltip values, legends, data updates, switches, keyboard navigation, light
and dark themes, 390 px width, and 200% CSS zoom. Axe runs against every chart
ShadowRoot with WCAG 2 A/AA and 2.1 AA rules. These checks are not a substitute
for a full assistive-technology audit. No component errors or warnings were
observed; the suite excludes Firefox's browser-level scroll-linked positioning
notice. Charts remain in ShadowRoots without iframes or document style leaks.

Run from the repository root:

```sh
.venv/bin/python -m unittest discover -s tests/v2
```

Run from `streamlit_shadcn_ui/frontend_v2` with Node 22.20.0 and pnpm 11.18.0:

```sh
pnpm check
SSUI_V2_PYTHON=/absolute/path/to/.venv/bin/python pnpm test:e2e:charts
```

## Review findings resolved

The independent code review found two protocol/rendering defects: non-string
chart types could pass a JavaScript coercion check, and a category named
`series-0` could display a series label in its tooltip. Both have regression
tests and are fixed. Follow-up review accepted the fixes and the added variant
geometry assertions. Width validation also rejects `"content"`, and category
normalization rejects missing dates such as pandas `NaT`.

Browser review also found that the first short category label was hidden in
line and area charts. Restoring the pinned examples' 12 px Cartesian margins
fixed it; the final desktop and 390 px checks show Jan through Jun.

## Independent browser acceptance

Final result: PASS, with no unresolved accepted findings.

A separate GPT-5.6 Sol task used real browser sessions and inspected screenshots
of the running Streamlit fixture and documentation. It checked each family and
variant, actual tooltip labels and values, data updates and visibility switches,
light/dark themes, narrow layouts, zoom, keyboard behavior, and console output.
Final-bundle Chromium, Firefox, and WebKit checks found no component errors.
All ten fixture tooltips worked, including donut/radial filled sectors and the
`series-0` category regression. The documentation's six examples and tooltips
also worked after keyboard navigation from the home page.
The independent axe scans had zero violations, but SVG/OKLCH color-contrast
checks were incomplete; screenshots were inspected against the pinned neutral
palette rather than treating those checks as an automated contrast pass.

A separate five-series check at 390 px used Desktop, Mobile, Tablet, Referral,
and Organic. All five labels remained visible within the 358 px Card; the page
had no horizontal overflow. The native legend itself remains single-row and
does not promise to fit arbitrary long labels.

Direct navigation to `/Charts` produced two Streamlit health/host-config 404s.
The same fresh-session check on the existing `/Card` page reproduced both
requests with the same path structure. Normal navigation from the home page
had no errors. This is an existing documentation-service deep-link behavior,
not a Charts regression; no shared routing changes are included here.

## Native appearance and source provenance

Chart was captured from shadcn commit
`705ce5961080264830471ddd885c01b907706068`, resolving the pinned nova style
markers through `scripts/capture-chart.mjs`. The manifest records hashes of
both upstream inputs and the resulting registry payload. Existing generated
components, theme tokens, and shared CSS source are unchanged.

The adapter composes generated Card and Chart components and does not pass
`className` or `style` to them. Recharts mark, grid, axis, tooltip, and margin
props were checked against the pinned upstream chart examples. The generated
responsive `aspect-video` container, single-row legend, Card dimensions, and
neutral palette are preserved. Long legends in narrow columns require short
display labels or `show_legend=False`, as documented.

## Bundle budget

Comparison uses main commit `b168825` and Python 3.14.2
`gzip.compress(data, compresslevel=9, mtime=0)` for both entries.

| JavaScript entry | Raw bytes | gzip bytes |
| --- | ---: | ---: |
| Main: `entry-CSDAhcc2.js` | 1,066,674 | 259,299 |
| Charts: `entry-awplp12d.js` | 1,674,705 | 398,617 |
| Increase | 608,031 | 139,318 |

The gzip increase is about 136 KiB, below ADR-012's 200 KiB budget. Recharts
3.8.0 remains in the single entry required by the existing packaging contract;
non-chart components therefore also download the larger entry.

Final stylesheet: `style-C_Db7RO2.css`, 120,711 raw bytes and 17,598 gzip bytes.

Final asset SHA-256 values:

```text
entry-awplp12d.js  46cdf5c9f36bb17b4c6b8a379252cca78e3203bb432efc1174d6f42fd5790ddb
style-C_Db7RO2.css 8283ab59e7950b2e29c1f6d63386d98a2aa51ee672a74e1bb71c6858baa7eff4
```

## Color palette follow-up

On 2026-09-07 the user explicitly requested a colorful chart palette. Only the
ten light/dark `--chart-*` values changed, copied from
[shadcn's official theming example](https://ui.shadcn.com/docs/theming).
No generated source, React renderer, dependency, Python API, or other theme
token changed. Both source and compiled CSS were checked for that scope.

| Token | Light | Dark |
| --- | --- | --- |
| `--chart-1` | `oklch(0.646 0.222 41.116)` | `oklch(0.488 0.243 264.376)` |
| `--chart-2` | `oklch(0.6 0.118 184.704)` | `oklch(0.696 0.17 162.48)` |
| `--chart-3` | `oklch(0.398 0.07 227.392)` | `oklch(0.769 0.188 70.08)` |
| `--chart-4` | `oklch(0.828 0.189 84.429)` | `oklch(0.627 0.265 303.9)` |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | `oklch(0.645 0.246 16.439)` |

CSS regression checks still compare every non-chart token with its existing
neutral value. Browser tests additionally check resolved colors on actual
chart marks and legend swatches in both themes, including the expected number
of distinct colors. Radar checks its painted path, not the unpainted group.

Follow-up verification passed: 96 Python tests, 128 frontend unit tests,
source/CSS/build checks, all nine three-browser regressions, wheel/sdist
verification, and an installed-wheel AppTest with the new stylesheet hash.
Independent code review passed after strengthening the color-count assertion.
The existing GPT-5.6 Sol task also returned PASS for six-family light/dark
screenshots, matching mark/legend/tooltip colors, unchanged neutral Card
colors, and zero browser console errors or warnings.

The JavaScript entry is unchanged. The new `style-CpmLPSI0.css` is 120,791 raw
bytes and 17,693 gzip bytes. Its SHA-256 is
`7df2030c51a74451741f63f5e522325c30d93156e3b40c8edfc18ec2c100fc6e`.
