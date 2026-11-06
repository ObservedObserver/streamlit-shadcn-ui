# Item acceptance

Validated on 2026-11-06 after integrating the Sheet and Elements container changes into the local
1.4.0 source baseline. This change
adds Elements Item composition and Avatar support; it does not publish a new
package or update the live documentation repository.

The Item template and Nova rules come from the upstream commit recorded in
`frontend_v2/provenance/shadcn-base-ui.json`. `scripts/capture-item.mjs`
expands those exact rules and records both source hashes. Generated Item
styles, variants, and sizes are unchanged. The adapter passes typed props and
uses native Item slots. `item_image` avoids the separate Aspect Ratio adapter
and lets ItemMedia supply its image styling.

Validation completed:

- 104 Python tests passed with `python -m unittest discover -s tests/v2`.
- 140 frontend tests passed with `vitest run`.
- TypeScript, generated-source, import graph, Shadow CSS, production build,
  and distribution checks passed.
- All 30 browser checks passed across Chromium, Firefox, and WebKit:
  Item 3/3, Elements containers 6/6, and Sheet 21/21.
- The browser suite renders a direct pinned Item/Avatar/Button reference in
  the same ShadowRoot, then compares computed dimensions, padding, gaps,
  typography, borders, colors, opacity and shadow against the Elements
  adapter. Button hover and focus are compared separately; dark tokens and
  RTL are also checked against the reference.
- A composed Tabs → ItemGroup → Item test preserves list semantics, direct
  action slots and event routing across the merged renderer.
- Action IDs stay attached to the correct member after rerun and reordering.
  Disabled buttons, Avatar fallback after image failure, native thumbnail
  decoding and sizing, list semantics, and the 390px layout are covered.

Run the browser check from `streamlit_shadcn_ui/frontend_v2` with the project
Python environment and a free local port:

```sh
SSUI_V2_PYTHON=/path/to/project/.venv/bin/python \
SSUI_V2_E2E_PORT=8512 pnpm test:e2e:item
```

The test writes desktop and mobile screenshots beneath
`output/playwright/item-automated/`. The reference bundle is test-only and
writes to `output/item-reference/`; it is not part of the published assets.

Item media currently accepts one Avatar or Spinner, or one native thumbnail
with the image variant. Arbitrary native Streamlit content, row selection,
and whole-row click handling are outside this API. Actions use the existing
Elements button event contract.
