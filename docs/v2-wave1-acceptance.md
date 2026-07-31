# V2 Wave 1 acceptance record

Status: **Accepted by maintainer; Wave 1 checkpoint complete**

Date: 2026-07-30

Maintainer decision recorded: 2026-07-31

Scope: Select, Dropdown Menu, Checkbox, and Button in the opt-in
`streamlit_shadcn_ui.v2` namespace.

This was the required Wave 1 stop point. After reviewing the running POC, the
maintainer accepted its visual and interaction result and authorized the
remaining migration. Waves 2–6 proceeded under that decision.

## What was delivered

The production POC follows the reviewed stack:

```text
Streamlit Components V2
  -> thin Streamlit protocol adapter
    -> checked-in shadcn Base UI source
      -> @base-ui/react primitives
```

The shadcn source is generated offline from pinned registry payloads and
checked by provenance hashes and an import-graph gate. Select and Dropdown
Menu use a same-ShadowRoot Base UI portal plus a native Popover top-layer host,
so the V1 double-iframe Select architecture is gone.

Wave 1 contains:

- `select`: persistent revisioned state;
- `checkbox`: persistent revisioned state;
- `dropdown_menu`: one-rerun action trigger;
- `button`: one-rerun click trigger.

It deliberately does not contain Input or any modal family.

## Pinned implementation baseline

| Layer | Version |
|---|---:|
| Python package | 0.1.19 |
| Python V2 runtime | >= 3.10 |
| Streamlit | >= 1.60 |
| Node | 22.20.0 |
| pnpm | 11.18.0 |
| React / React DOM | 19.2.8 |
| Vite | 8.2.0 |
| TypeScript | 7.0.2 |
| Tailwind CSS | 4.3.3 |
| shadcn CLI | 4.16.0 |
| Base UI | 1.6.0 |
| Components V2 library | 0.2.0 |
| Playwright | 1.62.0 |

All V2 dependency versions are exact and the pnpm install path is frozen.

## Frozen Python API

Every API requires an explicit keyword-only `key`.

```python
select(
    label,
    options,
    *,
    key,
    value=None,
    index=0,
    placeholder="Select an option",
    disabled=False,
    on_change=None,
    width="stretch",
) -> str | None

dropdown_menu(
    label,
    items,
    *,
    key,
    menu_label=None,
    disabled=False,
    on_select=None,
    width="content",
) -> str | None

checkbox(
    label,
    *,
    key,
    default_checked=False,
    disabled=False,
    on_change=None,
    width="content",
) -> bool

button(
    text,
    *,
    key,
    variant="default",
    disabled=False,
    on_click=None,
    width="content",
) -> bool
```

The public namespace exports exactly those four names.

### Persistent result cell

Select and Checkbox store one atomic state cell:

```json
{
  "meta": {
    "protocolVersion": 1,
    "kind": "select"
  },
  "state": {
    "kind": "select",
    "value": "Banana",
    "clientRevision": 3,
    "serverRevision": 0
  }
}
```

Python owns `serverRevision`; client input cannot forge it. A changed default
or invalidated option increments the authoritative revision, resets the value,
and receives one exact frontend acknowledgement. Older rerun echoes cannot
overwrite a newer optimistic selection.

### Transient result cell

Button and Dropdown Menu keep the persistent metadata cell but emit only a
transient `click` or `action` field for the rerun caused by that interaction.
The wrapper returns `False`/`None` when no current trigger exists.

## Known Wave 1 differences and limits

- V2 is opt-in through
  `pip install "streamlit-shadcn-ui[components-v2]"` and
  `import streamlit_shadcn_ui.v2 as ui`.
- Python 3.10 and Streamlit 1.60 are V2-only floors; the V1 package floor is
  unchanged.
- A component key is permanently associated with one component kind for the
  Streamlit session, including across multipage navigation. Reuse with another
  kind fails before mount.
- Options and menu items are normalized to unique strings. Rich item objects,
  icons, arbitrary React content, and HTML are outside the public POC.
- Select defaults can use `value` or `index`; an invalid value/index fails
  deterministically. Empty Select is disabled and returns `None`.
- Labels and values are bounded to 16 KiB, collections to 10,000 entries, and
  the complete serialized envelope to 2 MiB.
- Select and Checkbox are supported in `st.form`; Button and Dropdown Menu
  fail fast because Streamlit ignores component triggers in forms.
- Select and Menu are explicitly non-modal. Dialog, Alert Dialog, Sheet,
  Drawer, and Toast remain deferred by ADR-002.
- Supported browsers must implement Shadow DOM and the native Popover API.
- V2 never silently falls back to V1.

## Browser and accessibility evidence

The real Streamlit app was exercised with Playwright in Chromium, Firefox, and
WebKit:

| Result | Count |
|---|---:|
| Passed | 21 |
| Failed | 0 |
| Intended single-browser skips | 6 |
| Total project cases | 27 |

The six skips are the performance, visual snapshot, and 100-rerender baselines
on Firefox/WebKit; those run once in Chromium. Every functional, placement,
state, keyboard, focus, accessibility, RTL/mobile, and zoom-equivalent test
runs in all three engines.

Covered placements and interactions include:

- main page, sidebar, left/middle/right columns, tabs, expanders, nested and
  bounded-height containers;
- page and nearest-container scroll while open;
- long lists and labels, viewport edges, disabled and empty states, and a
  competing fixed high layer;
- pointer, outside press, touch-style input, Arrow keys, Enter, Escape, Tab,
  focus return, and open-popup reruns;
- light, dark, custom, sidebar, RTL, 200% text scaling, and
  200%-browser-zoom-equivalent viewport metrics;
- primary-button foreground derived from the Streamlit primary color's
  relative luminance, with exact host-style restoration on cleanup;
- conditional unmount, fragments, multipage navigation, bounded diagnostics,
  and 100 rerenders;
- zero iframe, zero popup in `document.body`, same-ShadowRoot portal
  ownership, and no body style, `inert`, or `aria-hidden` mutation.

Automated axe checks found no serious or critical issue in every component
ShadowRoot or the Streamlit main-content scope. Color contrast is covered by
theme-token assertions and six Chromium visual snapshots:

- Select trigger and open popup;
- light, dark, and custom themes.

Firefox emits one known engine diagnostic for fixed anchored positioning:
`This site appears to use a scroll-linked positioning effect`. Only that exact
message is allowlisted; any other warning or error fails the suite.

### Assistive-technology and browser-chrome sign-off

Automated ARIA, axe, focus, and keyboard gates are green. On 2026-07-31 the
final installed catalog also passed an interactive Safari 26.5 smoke with
macOS VoiceOver enabled:

- Select was exposed as the named `Installed Select` combobox with value
  `Alpha`;
- opening it exposed the expanded state, list, and selected option;
- closing it restored the collapsed value and removed transient focus guards.

The same Safari session passed a real browser-chrome 200% zoom spot check.
Select remained usable, its popup was visible without clipping, and Escape
closed it. Safari was restored to Actual Size and VoiceOver was confirmed off
after the check.

NVDA/Firefox remains an explicit promotion sign-off because NVDA requires a
Windows test environment unavailable in this workspace. It is not represented
by an automated or inferred result.

## ShadowRoot and overlay evidence

ADR-001 accepts:

- one app root and one overlay root per component ShadowRoot;
- checked-in shadcn Portal source targeting that overlay root;
- Base UI fixed positioning;
- native `popover="manual"` top-layer elevation;
- exact ownership assertions and idempotent cleanup.

This is what resolves the original Select problem: the popup can cross a
clipped Streamlit container while its DOM, styles, React events, theme tokens,
and accessible relationships stay inside the component ShadowRoot.

Streamlit 1.60's path-backed CSS registration creates a `<link>` per
ShadowRoot, so Python instead reads the one verified content-hashed CSS asset
and registers its text. Browser assertions prove:

- one inline local stylesheet per component host;
- zero component stylesheet links in ShadowRoots;
- zero component stylesheet links in the document;
- one JavaScript asset request shared by all instances.

## Performance and reliability baselines

### CSS-per-instance

| Requested benchmark instances | Total V2 hosts | Style bytes/host | Total inline style bytes | Ready time |
|---:|---:|---:|---:|---:|
| 1 | 22 | 56,107 | 1,234,354 | 1,010 ms |
| 10 | 31 | 56,107 | 1,739,317 | 400 ms |
| 50 | 71 | 56,107 | 3,983,597 | 551 ms |
| 100 | 121 | 56,107 | 6,788,947 | 750 ms |

The acceptance app already contains 21 non-benchmark hosts. Times are local
headless browser observations, not a service-level objective.

### 100-rerender lifecycle

| Metric | Before | After |
|---|---:|---:|
| Component hosts | 20 | 20 |
| Component Shadow DOM nodes | 223 | 223 |
| Component ShadowRoot stylesheets | 20 | 20 |
| Open top layers | 0 | 0 |
| Overlay children | 0 | 0 |
| Browser heap | 19,442,980 B | 21,376,472 B |

The run took 1,855 ms, or 18.55 ms per rerender. Component-owned Shadow DOM,
styles, overlays, and host count were exactly stable. Browser heap growth was
1,933,492 bytes, below the 16 MiB Wave 1 guard.

### Release bundle

| Asset | Raw | Deterministic gzip |
|---|---:|---:|
| `entry-CtJIL4D_.js` | 566,253 B | 148,113 B |
| `style-DNG7wrqn.css` | 53,352 B | 8,462 B |

The release verifier additionally records full SHA-256 hashes rather than
depending on the shortened Vite filename hash.

## Packaging and V1 rollback evidence

- Root, nested component manifest, and frontend versions match at 0.1.19.
- Wheel and sdist contain exactly one V2 JavaScript and CSS asset and the exact
  pinned V1 rollback bytes.
- No V2 TypeScript, source map, or `node_modules` leaks into release archives.
- Fresh wheel and sdist installs each ran the
  [installed-package smoke app](../tests/v2/fixtures/installed_v2_smoke.py)
  from a temporary directory with Node removed from `PATH`. In both cases the
  real Streamlit server and Chromium session found four component hosts, four
  ShadowRoots, four app/overlay root pairs, one open Select top layer, zero
  iframe, zero Streamlit exception, zero page/console error, and one shared
  content-hashed JavaScript request.
- The root package retains Python >=3.7 and Streamlit >=0.63; only the
  `components-v2` extra adds Streamlit >=1.60.
- The final wheel imported the top-level V1 namespace under stock Python
  3.7.17. The Python 3.7 V1 install also
  rendered a real smoke app with zero Streamlit exception, page error, or
  console error.
- The V1 smoke app contained three expected legacy iframes, including the
  historical double-iframe Select mechanism. Its 11 browser warnings are
  known legacy Streamlit Feature-Policy/iframe diagnostics.

The pre-Wave rollback artifact is checksum-pinned to commit
`63f5120701d06838e47e5c779d55c85c8fd46b2d`. A clean frozen V1 source build is
now functional after restoring five missing direct Radix dependencies, but its
JavaScript bytes differ from the historical artifact. ADR-003 records this
legacy reproducibility debt. The build verifier writes only to a temporary
directory and confirms that the shipped rollback bytes remain untouched.

## Reproduce and review

Run the POC:

```sh
./scripts/poc_v2.sh
```

The page includes all four components, all ADR-001 placements, theme fixtures,
form behavior, reruns, invalidation, lifecycle controls, and the instance-count
benchmark.

Key evidence:

- [acceptance app](../V2_POC.py);
- [lifecycle page](../pages/V2_Lifecycle.py);
- [browser suite](../streamlit_shadcn_ui/frontend_v2/e2e/wave1.spec.ts);
- [performance suite](../streamlit_shadcn_ui/frontend_v2/e2e/performance.spec.ts);
- [ADR-001](./adr/001-v2-anchored-overlay-host.md);
- [ADR-002](./adr/002-v2-modal-overlay.md);
- [ADR-003](./adr/003-v2-packaging-compatibility.md).

## Maintainer checkpoint

Decision: **Accepted**

The maintainer confirmed that the running POC had no outstanding issues and
authorized the remaining migration. This closes the Wave 1 checkpoint.

The accepted criteria were:

1. whether the shadcn + Base UI visual and interaction result is acceptable;
2. whether Select fully replaces the V1 double-iframe experience;
3. whether the frozen Wave 1 Python/result shape is a sound foundation;
4. whether the measured per-instance CSS cost is acceptable for the opt-in
   phase.
