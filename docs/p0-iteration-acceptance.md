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

## Delivery and independent review

| P0 group | Pull request | Delivered scope |
| --- | --- | --- |
| Sheet | [#58](https://github.com/ObservedObserver/streamlit-shadcn-ui/pull/58) | Four sides, title/description, footer, closing and shared modal behavior |
| Elements containers | [#59](https://github.com/ObservedObserver/streamlit-shadcn-ui/pull/59) | Tabs, Accordion, Collapsible and Scroll Area child trees |
| Item | [#60](https://github.com/ObservedObserver/streamlit-shadcn-ui/pull/60) | Item slots, groups, Avatar and native image media |
| Data Table | [#61](https://github.com/ObservedObserver/streamlit-shadcn-ui/pull/61) | Local record management and a Sheet edit/save example |

Each group received implementation review and browser acceptance before its
merge. Cross-review identified and resolved stale child state, inappropriate
media wrappers, column identity, pagination acknowledgement and row-ID parser
issues. The coordinator independently reran all 110 Python tests on the final
integrated branch. Frontend checks passed 147 tests. There are no automated PR
status checks configured; these results are local verification, not GitHub CI.

## Installed-package verification

The coordinator built a wheel and sdist from runtime commit `aa12bd8`. Later
changes only updated tests and documentation. Both archives passed
`scripts/verify_release.py --require-clean-dist`, including agreement with the
tracked frontend assets. The package still declares version 1.4.0: these are
local development artifacts, not the existing PyPI 1.4.0 release.

The wheel was installed into an isolated environment. Apps ran outside the
repository and imported the package from that environment's `site-packages`,
not the source checkout. All four suites passed in Chromium, Firefox and WebKit:

| Suite | Passing browser cases |
| --- | ---: |
| Sheet | 21 |
| Elements containers | 6 |
| Item | 3 |
| Data Table, including record editing | 15 |
| Total | 45 |

The verified host combination was Python 3.14.2, Streamlit 1.60.0, Starlette
1.3.1, AnyIO 4.16.0 and Uvicorn 0.54.0. Fresh dependency resolution initially
selected Starlette 1.10.0 and produced intermittent ASGI response errors while
serving component assets. Changing only Starlette to 1.3.1 resolved those errors
and all 45 cases passed. This does not establish compatibility with every
Starlette version below 1.4.

Streamlit 1.60 permits this newer dependency in its [dependency
declaration](https://github.com/streamlit/streamlit/blob/1.60.0/lib/pyproject.toml#L80-L87).
Streamlit 1.61.1 subsequently documents a custom-gzip compatibility problem and
[restricts Starlette to below
1.4](https://github.com/streamlit/streamlit/blob/1.61.1/lib/pyproject.toml#L83-L95).
This iteration leaves library dependency policy unchanged. A release using the
minimum Streamlit version must preserve the tested host constraint; a different
host combination requires fresh acceptance.

## Documented limits

- New Elements Tabs support horizontal orientation only. The pinned generated
  source does not forward vertical orientation consistently to Base UI;
  adapters do not override that source or claim vertical support.
- Sheet preserves the pinned close-icon placement. RTL titles can overlap it;
  use `show_close_button=False` with a footer close button as documented. RTL
  focus and dismissal passed; full mirrored visual support is not claimed.
- Data Table limits and deferred features are listed above and in its API docs.
- Source documentation and a separate documentation-repository draft are
  prepared. PyPI publication and live documentation deployment are outside this
  iteration; neither is reported as completed.
