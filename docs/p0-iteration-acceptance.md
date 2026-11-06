# P0 component iteration acceptance

Date: 2026-11-06

Scope: Elements containers, Item, Sheet, and Data Table. Each component group has its own pull request. Existing untracked research notes are excluded from implementation commits.

## Baseline

The starting source declares version 1.4.0 and pins shadcn 4.16.0 with the base-nova preset. Before implementation, the root coordinator verified:

- 96 Python unittest tests passed.
- 128 frontend unit tests passed.
- Generated-source, import graph, Shadow CSS, TypeScript, production build and distribution checks passed.
- Existing P0 browser suite passed all 12 tests across Chromium, Firefox and WebKit.

New Item and Sheet sources must come from the pinned upstream commit and Nova stylesheet. Generated-source checks are accompanied by adapter inspection and browser checks of dimensions and interaction states.

## Integration gate

Each branch must pass focused tests, independent review, and browser acceptance before merging. Later branches must incorporate the updated main branch, resolve source conflicts, regenerate the distribution, and rerun affected checks. A clean branch build before integration is not sufficient.

The final integrated package must pass Python and frontend suites, generated-source/CSS/build checks, and the four new browser suites. Its wheel must contain the rebuilt frontend and expose the new Python APIs.

## Documentation delivery

Main-repository component docs and example pages ship with their implementation. The separate documentation application currently pins the published PyPI package 1.4.0. New API examples must not be deployed against that package. Documentation promotion must use the version that actually publishes these components and be verified separately from GitHub merges. This iteration does not itself publish a PyPI release.

## Review notes

- Initial Sheet capture metadata named an unrelated dependency; this was sent back for correction before approval.
- Item image composition requires a native image slot so the existing AspectRatio adapter cannot introduce rounding or sizing overrides.
- Scroll Area dimensions belong to the surrounding layout; no new className or style overrides should be added to the generated control.

## Data Table branch verification

The Data Table branch incorporated main after Sheet, containers and Item merged.
On 2026-11-06 its implementation agent verified:

- All 110 Python tests passed, including the compatibility catalog and 49 documentation examples.
- All 147 frontend tests passed, followed by generated-source, import graph, Shadow CSS, TypeScript, production build and distribution checks.
- All 15 Data Table browser cases passed across Chromium, Firefox and WebKit. They cover sorting, search, pagination, visibility, selection acknowledgement on page two, selection pruning, one-shot actions, keyboard menus and a narrow viewport.
- The actual records example opens a Sheet from a row action and saves an edited name back to the table in all three engines.
- Directly rendered pinned Input, Button, Checkbox and Table controls matched the adapter's dimensions and computed styles. Button hover, focus and disabled states matched too. No control style overrides were added.

The browser reference fixture uses the same ShadowRoot as the adapter. Its row
count matches the table page so collapsed table borders are compared in the
same context. The narrow-viewport screenshot is saved under
`output/playwright/data-table-automated/`.

Data Table is limited to 1,000 local records and remains a standalone widget.
Elements embedding, remote pagination and spreadsheet-style cell editing are
outside this iteration. The editable-record example composes the existing
Sheet and Field controls.

Installed-package verification, final pull request identities and overall
integration results are recorded separately by the coordinator.
