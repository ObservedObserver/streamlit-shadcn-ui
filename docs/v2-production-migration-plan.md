# Production migration plan: Streamlit Components V2 with shadcn and Base UI

Status: **Final — reviewer consensus reached**

Date: 2026-07-30

Owners: streamlit-shadcn-ui maintainers

Decision scope: the `streamlit_shadcn_ui.v2` implementation. The implementation
architecture remains authoritative; its original opt-in release strategy is
superseded by the V2-only 1.0 cutover in
[ADR-010](./adr/010-v2-1.0-single-track-cutover.md).

## 1. Executive decision

The production V2 stack is:

1. Streamlit Components V2 for the host, lifecycle, and Python/JavaScript
   protocol.
2. Checked-in source generated from a reproducible shadcn Base UI registry
   snapshot for the component layer.
3. Base UI for behavior, positioning, focus, and accessibility primitives.
4. React 19 and Tailwind CSS 4 in a dependency graph that is physically
   independent from the legacy V1 frontend.
5. Shadow DOM isolation (`isolate_styles=True`) as a release invariant.

```text
Python public API
  -> versioned V2 protocol adapter
    -> Streamlit host/lifecycle adapter
      -> platform-neutral overlay and theme providers
        -> owned shadcn component source
          -> Base UI primitives
```

The direct-Base-UI POC is retained only as a diagnostic fixture. Production
components must preserve the real shadcn composition and import path. For
example, the production Select call graph must be:

```text
v2.select
  -> components/streamlit/select.tsx
    -> components/ui/select.tsx       # vendored shadcn source
      -> @base-ui/react/select
```

An import-graph test will prevent a future adapter from silently replacing the
shadcn component with handwritten Base UI markup.

## 2. Product strategy and stop point

This migration is POC-first:

- Wave 0 builds and proves the platform contract.
- Wave 1 delivers a reviewable app containing Select, Dropdown Menu, Checkbox,
  and Button.
- Select is the primary blocker because it replaces the V1 double-iframe
  workaround.
- After Wave 1, implementation stops for maintainer confirmation. No broad
  component migration starts until the POC is explicitly accepted.

The first POC is successful only if the real generated shadcn Base UI Select:

- uses no iframe;
- uses no popup mounted directly in `document.body`;
- works in all required Streamlit placements;
- survives unrelated Streamlit reruns without closing, leaking, or reverting
  to an older value;
- passes keyboard, pointer, focus, accessibility, and theme checks.

## 3. Goals and non-goals

### Goals

- Remove the iframe and double-iframe architecture.
- Keep shadcn as the recognizable, mechanically upgradable UI source.
- Solve ShadowRoot portal, CSS, event-retargeting, focus, and cleanup behavior
  once in a shared platform layer.
- Preserve a narrow separation between Streamlit protocol code and shadcn
  component code.
- Make builds reproducible without reading the live shadcn registry.
- Keep V1 installable and runnable during the opt-in migration.
- Gate each risky overlay family with real-browser evidence.

### Non-goals

- Rewriting every component in one release.
- Treating Tailwind or Shadow DOM as a security boundary.
- Disabling `isolate_styles` to make global CSS work.
- Portaling an unstyled popup directly to `document.body`.
- Assuming that a high `z-index` can escape clipping or a parent stacking
  context.
- Shipping an unreleased Base UI patch without an owner, expiry, and rollback.
- Promising V1 argument parity before the Wave 6 compatibility review.

## 4. Evidence and constraints

### 4.1 Proven by the current diagnostic POC

On Streamlit 1.60.0, `@streamlit/component-v2-lib` 0.2.0, and Base UI
1.6.0, the existing POC proves:

- Streamlit supplies a `ShadowRoot` as `parentElement`;
- a Base UI Select or Menu portal can target that root;
- mouse, keyboard, Escape, outside press, scroll, and basic reruns work;
- Select, Input, and Checkbox state can persist across reruns;
- Button and Menu can emit transient triggers;
- the acceptance page can contain zero iframes.

It does not prove the generated shadcn layer, full placement matrix, modal
behavior, packaging, cache behavior, or production lifecycle contract.

### 4.2 Current upstream facts

- Current shadcn Base UI components including Select create primitive portals
  internally without a container.
- Base UI's Portal accepts either an `HTMLElement` or a `ShadowRoot`.
- Base UI issue #4332 fixed same-ShadowRoot outside-press behavior.
- Base UI issue #2867 remains open for a dialog/backdrop report; its published
  reproduction appears iframe-specific and must be reproduced locally before
  it influences the design.
- Base UI issue #5359 fixed Drawer gestures in Shadow DOM after Base UI 1.6.0.
  Drawer remains blocked until that fix is in a stable release and passes the
  local Chromium/WebKit gesture suite.
- [Streamlit 1.60 serves non-HTML V2 assets with
  `Cache-Control: public`][streamlit-asset-cache], so content-hashed entry
  filenames are required to avoid stale assets.
- [Streamlit 1.60 silently ignores `setTriggerValue` inside `st.form` and logs
  a warning][streamlit-trigger-form]. Trigger-based V2 controls therefore
  cannot claim form support.

### 4.3 Verified renderer lifecycle contract

For the pinned Streamlit 1.60 frontend:

- the exported JavaScript renderer is invoked again for data and theme updates;
- `parentElement` and the frontend `key` remain stable for a keyed instance;
- the renderer cleanup is called for actual unmount, not for each rerun.

This behavior is treated as a versioned host contract, not an assumption.
Browser contract tests run against the minimum and latest supported Streamlit
versions and block upgrades if it changes.

## 5. Repository, dependency, and packaging architecture

### 5.1 Physical layout

The V2 Node project must not live under the existing `components/packages/*`
Yarn workspace. It receives its own lockfile and toolchain:

```text
streamlit_shadcn_ui/
  __init__.py
  pyproject.toml                         # packaged Streamlit component manifest
  v2/
    __init__.py
    _component.py
    _protocol.py
    _streamlit_compat.py
    widgets/
  frontend_v2/                          # not part of legacy Yarn workspace
    .node-version
    package.json
    pnpm-lock.yaml
    components.json
    provenance/
      shadcn-base-ui.json
      registry/
    scripts/
      normalize-shadow-css.mjs
      adapt-portals.mjs
      verify-generated-source.mjs
    src/
      entry.tsx
      protocol/
        schema.ts
        reconciliation.ts
      platform/
        streamlit-renderer.tsx
        component-shell.tsx
        overlay-container.tsx
        modal-effects.ts
        error-boundary.tsx
        shadow.css
      components/
        ui/                             # generated shadcn source
        streamlit/                      # thin protocol adapters
      test/
    dist/                               # clean, generated release assets
```

The V1 Yarn workspace, lockfile, React 18, Tailwind 3, Radix dependencies, and
dist directory remain untouched during Waves 0 and 1.

### 5.2 Toolchain isolation

The initial intended pins, observed on 2026-07-30, are:

| Dependency | Exact baseline |
|---|---:|
| Node | 22.20.0 |
| pnpm | 11.18.0 |
| React / React DOM | 19.2.8 |
| Vite | 8.2.0 |
| TypeScript | 7.0.2 |
| Tailwind CSS / `@tailwindcss/vite` | 4.3.3 |
| shadcn CLI | 4.16.0 |
| `@base-ui/react` | 1.6.0 |
| `@streamlit/component-v2-lib` | 0.2.0 |

The lockfile, `.node-version`, `packageManager`, and exact dependencies are
committed. `pnpm install --frozen-lockfile` is the only release install path.
React is bundled into the V2 runtime; it is not externalized to Streamlit or
the V1 bundle.

The first Wave 0 task runs the frozen install and empty build before platform
code is written. Wave 0 may reject one of these pins for a demonstrated
incompatibility, but changing a pin requires an ADR entry, updated provenance,
and a complete test run. “Latest” is never represented by a caret range.

### 5.3 Streamlit version policy

- Experimental V2 requires Python 3.10 or newer and Streamlit 1.60 or newer at
  runtime, matching Streamlit's supported runtime.
- During Waves 0 and 1, the root distribution retains the released V1
  declarations `requires-python>=3.7` and `streamlit>=0.63`.
- A `components-v2` optional dependency extra adds `streamlit>=1.60`. The
  initially proposed bare `v2` name was replaced after a real Python 3.7
  installer exposed a legacy marker-parser failure; see ADR-003.
- Importing or calling `streamlit_shadcn_ui.v2` on an older Streamlit version
  raises one actionable error before component registration.
- V2 Python modules must remain parseable by Python 3.7 even though their
  runtime guard refuses execution there. The top-level package must not import
  V2 eagerly.
- Package-wide Python or Streamlit floors are raised only at the Wave 6 semver
  cutover.

This keeps V1 as a real rollback path instead of making the V2 host requirement
an accidental breaking change for all users.

### 5.4 Distribution contract

The packaged `streamlit_shadcn_ui/pyproject.toml` declares one component:

```toml
[project]
name = "streamlit-shadcn-ui"
version = "<generated from root project version>"

[[tool.streamlit.component.components]]
name = "v2"
asset_dir = "frontend_v2/dist"
```

The root project version is the source of truth. The release task generates or
verifies the nested manifest version. Root `package-data` and `MANIFEST.in`
both include:

- the nested component manifest;
- `frontend_v2/dist/**/*`.

Vite emits:

- exactly one `entry-<content-hash>.js`;
- exactly one `style-<content-hash>.css`;
- optional content-hashed JavaScript chunks.

Python registers JavaScript with the one-result glob `entry-*.js`. It resolves
exactly one `style-*.css`, reads the verified asset once, and registers its
text as raw component CSS. Streamlit 1.60 otherwise emits a path-backed CSS
asset as a runtime `<link>` in every ShadowRoot, which violates the approved
no-runtime-link gate. Zero or multiple CSS matches fail closed. The release
still contains exactly one content-hashed CSS asset, and ADR-001 records this
evidence-driven registration amendment. The registration also owns the fixed
HTML template:

```python
html = (
    '<div data-ssui-v2-app-root></div>'
    '<div data-ssui-v2-overlay-root popover="manual"></div>'
)
```

`cssCodeSplit` is disabled because a lazy CSS chunk would be inserted into the
document rather than each component ShadowRoot. JavaScript chunks may be lazy
and must resolve with relative URLs under Streamlit's V2 asset route.

Release builds use `emptyOutDir=true` for the validated V2 dist path. A release
test builds both wheel and sdist from a clean git archive, installs each without
Node present, and runs the packaged acceptance app. CI records the V1 dist
checksum before and after every Wave 0/1 build. A separate legacy job installs
the same artifact on Python 3.7 with the released V1 dependency floor, imports
only the V1 namespace, and runs a V1 smoke app. If the historical dependency
set is no longer resolvable, fixing its constraints or separating the V2
distribution is a Wave 0 packaging blocker; silently raising the floor is not
an allowed workaround.

The legacy job is intentionally scheduled first because release 0.1.19 declares
Python 3.7 while its `streamlit_extras>=0.3.5` dependency declares Python 3.8.
Wave 0 must either repair that pre-existing metadata/dependency contradiction
without changing V1 behavior, or package V2 separately until a semver cutover.
The plan does not treat an already-inconsistent declaration as evidence that
the old environment actually works.

Wave 0 resolved this with a Python 3.7-compatible V1 style bridge, a
conditional `streamlit_extras` dependency, the `components-v2` extra, and a
repaired frozen V1 source graph. The pre-Wave V1 dist remains a separately
checksum-pinned rollback artifact; ADR-003 records the distinction between
historical artifact fidelity and current source buildability.

## 6. Reproducible shadcn ownership

### 6.1 Registry snapshot

Pinning only the CLI is insufficient because the CLI reads a mutable registry.
The repository therefore checks in:

- the exact registry JSON payload for every generated component and dependency;
- shadcn CLI version and npm integrity;
- shadcn/ui repository commit;
- registry base, style, item names, retrieval date, and SHA-256 hashes;
- Base UI and Tailwind versions;
- the portal adaptation and Shadow CSS normalization versions.

The first snapshot targets shadcn CLI 4.16.0 and shadcn/ui commit
`b28e5b4d9e90b72a222fff7eb70043a52856012d`, observed on 2026-07-30.
The payload hashes captured in the repository, not the moving branch name, are
authoritative.

Generation must work from the checked-in payload without network access.
CI regenerates into a temporary directory, applies the versioned transforms,
and requires a clean diff.

### 6.2 Generated-source boundary

`components/ui` is owned shadcn source:

- it may import Base UI and platform-neutral utilities;
- it may not import Streamlit;
- portal changes are produced by the portal codemod;
- Shadow CSS changes are produced by the CSS normalizer;
- product-specific behavior belongs in `components/streamlit`;
- exceptional manual changes require a small checked-in patch with rationale
  and an upstream comparison test.

The portal utility is neutral:

```tsx
const container = useOverlayContainer()

return (
  <SelectPrimitive.Portal container={container}>
    ...
  </SelectPrimitive.Portal>
)
```

The shadcn component does not know what a Streamlit `parentElement` is.

## 7. Shadow DOM architecture contract

No overlay family enters the migration queue until its relevant contract tests
pass in a real Streamlit app.

### 7.1 Per-instance DOM ownership

Each isolated Streamlit component ShadowRoot contains two stable siblings:

```html
<div data-ssui-v2-app-root></div>
<div data-ssui-v2-overlay-root></div>
```

- React mounts into `app-root`.
- Anchored overlays portal into `overlay-root`.
- `ComponentShell` supplies `overlay-root` through
  `OverlayContainerProvider`.
- Theme variables inherited by the ShadowRoot reach both siblings.
- Cleanup owns and clears both roots.

Inside Streamlit, an overlay may not fall back to the Base UI default. Opening
fails with a bounded diagnostic if:

- the provider is missing;
- the container is disconnected;
- `container.getRootNode()` is not the instance `parentElement`;
- a generated portal bypasses the provider.

Storybook and isolated shadcn tests may deliberately use the primitive default.
The production Streamlit entry may not.

An AST-aware rule enumerates every primitive Portal in Select, Menu and
submenus, Context Menu, Popover, Tooltip, Hover Card, Dialog, Alert Dialog,
Sheet, Drawer, Combobox, and future generated items. A text replacement is not
an acceptable enforcement mechanism.

### 7.2 Overlay behavior policy

| Family | Examples | Base policy | Document-level effects |
|---|---|---|---|
| Anchored selection/action | Select, Dropdown Menu, Context Menu, Combobox | `modal={false}` | Forbidden |
| Anchored informational | Popover, Hover Card, Tooltip | Non-modal | Forbidden |
| Modal | Dialog, Alert Dialog, Sheet | `modal={true}` | Required and audited |
| Gesture modal | Drawer | Deferred pending stable Base UI fix | Required and audited |
| Viewport notification | Toast | Separate Wave 5 ADR | To be decided |

In this table, “document-level effects” means scroll locking, body-style
mutation, or changes to `inert`/`aria-hidden`. It does not pre-reject a
top-layer positioning mechanism or an accepted isolated overlay host.

Select and Dropdown Menu explicitly pass `modal={false}` in the Streamlit
adapter even when a Base UI or shadcn default changes. Tests assert that opening
them does not mutate body scroll styles, `inert`, or `aria-hidden` state.

### 7.3 Anchored Overlay ADR — Wave 0 release blocker

Same-ShadowRoot portal ownership solves CSS, theme, ARIA locality, React event
propagation, and cleanup. It does not escape clipping or a light-DOM ancestor
stacking context.

Wave 0 creates `ADR-001 Anchored overlay host` and runs every Select/Menu
scenario with Base UI Positioner's supported `absolute` and `fixed`
`positionMethod` strategies. The matrix includes:

- main page and sidebar;
- left, middle, and right columns;
- tabs and collapsed/expanded expanders;
- nested containers and `st.container(height=...)`;
- page and container scrolling while open;
- trigger near each viewport edge;
- long lists and long labels;
- competing sticky/fixed Streamlit elements;
- mobile viewport, RTL, and browser zoom at 200%;
- Chromium, Firefox, and WebKit.

The ADR selects the smallest strategy that passes the complete matrix:

1. same-instance `overlay-root` with the winning Base UI Positioner settings;
2. a native Popover API/top-layer adapter that keeps the node and stylesheet in
   the same ShadowRoot;
3. a shared light-DOM host with its own ShadowRoot, stylesheet, per-instance
   theme scope, and explicit accessibility bridge;
4. defer the affected overlay.

There is no “increase z-index” escape hatch. A shared host is accepted only if
ID relationships, accessible ownership, theme propagation, cleanup,
multi-instance behavior, and multiple installed package versions all pass.
Select cannot leave Wave 0 until ADR-001 has an accepted result for all
required placements.

ADR-001 selected option 2: an instance-owned native Popover top-layer root
with Base UI fixed positioning. It retains popup DOM and CSS in the original
ShadowRoot while escaping ancestor clipping and stacking contexts.

### 7.4 Modal Overlay ADR — required before modal migration

Wave 0 also creates `ADR-002 Modal overlay and top layer`. It compares:

1. Base UI modal content in the instance ShadowRoot;
2. a native `<dialog>.showModal()` top-layer adapter inside that ShadowRoot;
3. a native Popover/top-layer solution where semantics are appropriate;
4. a shared document overlay host with its own ShadowRoot and stylesheet;
5. deferral.

The fixture runs in every placement from ADR-001 and with competing sticky and
fixed content. It must prove:

- the visual backdrop covers the intended viewport;
- the Streamlit document background is actually inert to pointer and keyboard
  input, not merely the component subtree;
- Tab and Shift+Tab remain trapped;
- Escape, backdrop policy, initial focus, and focus return are correct;
- page scroll is locked without jumping;
- one, nested, and two independent modal instances have correct refcounts;
- closing, conditional unmount, page navigation, and rerun during open restore
  the exact prior body styles and `inert`/`aria-hidden` attributes;
- no orphan backdrop, listener, scroll lock, or focus guard remains.

The required behavior is independent of implementation. If Base UI's own
document effects do not safely compose across independent React roots, a
versioned `ModalEffectsCoordinator` owns reference counting and restoration.
It records previous values and restores them only when the final owner closes.
A modal implementation is deferred if neither Base UI nor the coordinator can
meet the contract.

No Dialog, Alert Dialog, Sheet, Drawer, or Toast reaches production before its
ADR is accepted. Issue #2867 must be reproduced against the real non-iframe V2
host before a modal is promoted; an iframe-only failure does not block the
non-iframe architecture.

ADR-002 accepts explicit deferral for Waves 0–1. No modal family is approved
until the full global inert, focus, scroll, cleanup, and refcount fixture
passes.

### 7.5 Event retargeting

Tests use real `composedPath()` behavior and cover:

- inside and outside pointer presses in the same ShadowRoot;
- a press elsewhere in the Streamlit document;
- trigger press while open;
- nested menus and submenu transitions;
- Escape and focus restoration;
- Tab and Shift+Tab;
- touch and pointer gestures;
- backdrop dismissal;
- two open-capable component instances;
- a rerun and a component unmount while an interaction is active.

Base UI must remain on a release containing #4332. Upgrades include a review of
all Shadow DOM issues opened or fixed since the pinned version.

### 7.6 Shadow CSS build pipeline

The ShadowRoot stylesheet is a build artifact with four explicit stages:

1. Generate/copy shadcn CSS inputs from the vendored registry payload.
2. Normalize document selectors using a PostCSS AST transform:
   - token `:root` becomes `:host`;
   - reset rules targeting `html` become `:host`;
   - `body` declarations become `[data-ssui-v2-app-root]` or an explicit
     platform layer;
   - external `.dark` selectors are removed or mapped to an internal host
     attribute only when a component actually requires them.
3. Compile the pinned Tailwind 4 source.
4. Run a second PostCSS AST pass over the compiled output, then audit it:
   - normalize any `:root`, `html`, or `:root, :host` selectors regenerated by
     Tailwind Preflight or `@theme` into the owned `:host`/app-root scope;
   - Tailwind-private custom properties and their `@property` registrations get
     a versioned `--ssui-v2-<css-schema>-*` prefix;
   - because browsers do not apply ShadowRoot-local `@property` initial values
     consistently, Tailwind's compiled compatibility defaults are promoted
     out of their feature-query guard into the lowest `properties` cascade
     layer; this preserves typed computed defaults such as `<length>` zero as
     `0px` for ring, shadow, transform, and border utilities;
   - emitted keyframe names and animation references get the same namespace;
   - layer ordering is deterministic;
   - unscoped `:root`, `html`, `body`, document IDs, `@import`, and external
     theme selectors fail the build.

The normalized source is checked in or deterministically regenerated, and CI
requires the normalizer to be idempotent. A global regex rewrite is forbidden.

Exactly one compiled CSS asset is registered with Streamlit and injected into
each instance ShadowRoot. Runtime CSS-in-JS, `<link>` injection, or compiled CSS
copied into `document.head` fails the browser suite.

Sentinel fixtures exercise ring, shadow, gradient, transform, animation,
keyframes, `@property`, disabled state, and starting/ending transitions in
Chromium, Firefox, and WebKit.

### 7.7 Theme and sizing policy

ADR-009 supersedes the original Streamlit-token mapping in this section.
shadcn owns the V2 visual identity. The host contains the exact semantic
tokens from the pinned shadcn CLI 4.16.0 Nova/neutral preset:

```css
:host {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --border: oklch(0.922 0 0);
  --radius: 0.625rem;
}
```

The complete light and dark token maps are fail-closed in the Shadow CSS
contract test. Production CSS may not reference Streamlit color, radius, or
font variables. The runtime reads the Streamlit background only to select the
standard shadcn light or dark map, then synchronizes `color-scheme`, direction,
and language. A custom Streamlit primary color, font, border, radius, or base
font size does not restyle V2.

The preferred font stack begins with host-resolved Geist and falls back to
the platform sans-serif. The single-inline-stylesheet ShadowRoot contract does
not duplicate a bundled webfont into every component instance.

Sizing is explicit:

- CSS `rem` continues to mean the browser document root; V2 does not rewrite
  the CSS unit.
- spacing remains stable browser-root `rem` unless a component-specific design
  requirement proves otherwise;
- light, dark, sidebar, and custom Streamlit hosts receive visual snapshots;
  custom host branding changes only the light/dark selection.

### 7.8 Layout and layers

`:host`, app root, and overlay root permit visible overflow, but acceptance does
not assume Streamlit ancestors do. Layer tokens are:

```text
base       0
dropdown   1000
popover    1100
tooltip    1200
modal      2000
toast      2100
```

Arbitrary z-index values are rejected. A DOM assertion verifies that each
visible local overlay's `getRootNode()` is its expected ShadowRoot. A document
assertion verifies zero iframes and zero orphan Base UI popup nodes directly in
`document.body`.

### 7.9 Accessibility

- Every interactive control has an accessible name.
- Trigger, label, description, and popup stay in one ShadowRoot unless an
  accepted ADR proves a cross-root design.
- Focus return is tested after selection, dismissal, rerun, and unmount.
- Modal components require title and description policy, trap, Escape path,
  backdrop semantics, and document-background inertness.
- axe-core runs against the document and every open ShadowRoot.
- Select and any modal family receive VoiceOver/Safari and NVDA/Firefox smoke
  checks before promotion.

## 8. Runtime, identity, and protocol

### 8.1 One qualified runtime registration

The package registers one qualified component and one shared runtime:

```text
streamlit-shadcn-ui.v2
```

Splitting registration by widget kind does not solve keyed identity in
[Streamlit 1.60's V2 implementation][streamlit-keyed-identity]: every keyed
instance uses element type `bidi_component` with `key_as_main_identity=True`,
which ignores the registered component name. It would also create different
asset URLs for the same bundle.

Instead:

- `key` is required in every experimental V2 public API;
- a key's component kind is immutable for the Streamlit session during Waves 0
  and 1;
- before mounting, Python records and checks `key -> kind` in a private,
  package-namespaced session registry;
- every component, including trigger-only Button and Dropdown Menu, carries a
  persistent internal metadata cell with protocol version and kind;
- a registry or metadata mismatch raises an actionable error before the new
  kind mounts; automatic cross-kind reset is not supported;
- changing component kind requires a new key, so old widget state, trigger
  aggregators, and delayed callbacks can never be reinterpreted by another
  kind;
- two simultaneous controls with the same key keep Streamlit's normal duplicate
  key error;
- tests cover `select -> button -> select`, conditional absence, and delayed
  events and require fail-fast behavior with no callback delivery.

A future automatic-reset API requires its own protocol ADR with a server-owned
kind epoch, atomic widget-state clearing, epoch-tagged state and triggers,
React remounting, and rejection of old-epoch events. It is explicitly outside
the POC.

The frontend uses Streamlit's generated `args.key` as React's
`createRoot(..., {identifierPrefix})` so IDs from `useId()` are stable and
unique across independent roots.

### 8.2 Versioned envelope

Python passes a runtime-validated discriminated envelope:

```ts
type Envelope =
  | {
      protocolVersion: 1
      kind: "select"
      state: StateCell<string | null>
      props: SelectProps
    }
  | {
      protocolVersion: 1
      kind: "button"
      props: ButtonProps
    }

type StateCell<T> = {
  kind: string
  value: T
  clientRevision: number
  serverRevision: number
}
```

Python validates before serialization; the frontend validates at runtime before
rendering. Unknown versions, kinds, or malformed payloads render one bounded
error containing an error code, kind, and protocol version—never option labels
or other user values. A state-cell kind mismatch is a protocol error and fails
closed; it is not an automatic reset.

Initial limits are 10,000 options, 16 KiB per text label/value, and 2 MiB for a
serialized JSON envelope. Wave 1 measures these limits and may lower them before
the public API freezes.

### 8.3 Rerun reconciliation

Persistent controls use one atomic state cell rather than separate value and
revision writes:

1. A user change updates local UI immediately.
2. The frontend increments `clientRevision` and calls `setStateValue` once with
   the complete cell.
3. Python reads the complete received cell through `_protocol.py`, validates
   it, and echoes its acknowledged client revision and normalized value in the
   next `data` envelope. Individual widget wrappers never hand-build partial
   echo cells.
4. The frontend ignores an echo whose acknowledged client revision is older
   than its current optimistic revision.
5. A deliberate Python reset—invalid option, changed default, or explicit
   reset—increments `serverRevision`; the newer server revision always wins.
6. Python owns the authoritative `serverRevision` in private session metadata
   and overwrites, rather than trusts, any client-supplied value.
7. After accepting a newer server reset, the frontend acknowledges that exact
   cell once with `setStateValue` so the normalized value persists; normal
   echoes never produce an acknowledgement loop.

Wave 0 includes a rapid `A -> B -> C` test with delayed/out-of-order rerun
responses, invalidated Select values, changed keys, changed option sets, a
server reset acknowledgement, and conditional unmount. No accepted final value
may regress to an older echo.

Transient actions use `setTriggerValue` and are consumed for one rerun. Trigger
payloads include only the event identifier and bounded value.

### 8.4 Commit and form policy

| Component class | Transport | `st.form` policy |
|---|---|---|
| Select, Checkbox, Switch, Radio, Slider end state | Persistent state cell | Supported; local UI updates, Python sees it on submit |
| Button, Dropdown action, menu action | Trigger | Unsupported; fail fast |
| Text Input / Textarea | Deferred API | Not in Wave 1 |

Streamlit 1.60 ignores triggers inside forms, so the Python wrapper must not
permit silent failure. A small `_streamlit_compat.py` adapter detects the
current form context and raises an actionable error for trigger components.
Because Streamlit exposes no public V2 trigger/form guard, any private hook is
isolated, pinned by version, and covered by minimum/latest tests. If detection
is unavailable on a supported Streamlit release, the adapter fails closed and
marks trigger controls unsupported rather than silently allowing them.

Wave 0 empirically verifies that persistent custom-component state is buffered
and submitted correctly inside `st.form` on the minimum and latest supported
Streamlit versions. The policy table is corrected before Wave 1 if that
contract does not hold.

Text Input moves to the stateful-input wave. Its entry gate is an approved
commit contract; the proposed default is blur or Enter, with an explicit
debounced-change option. The POC's unconditional per-keystroke rerun behavior
is not production behavior.

### 8.5 React lifecycle

The renderer:

- locates the two predeclared roots without replacing `parentElement.innerHTML`;
- stores at most one React root per `parentElement` in a `WeakMap`;
- calls `render` into the existing root on each Streamlit update;
- returns an idempotent cleanup that unmounts once and releases overlay nodes,
  observers, timers, document effects, and global listeners;
- keeps open popup and optimistic state across an unrelated rerun when the
  frontend key is unchanged.

Contract tests cover:

- 100 data/theme rerenders;
- popup open during an unrelated Streamlit widget rerun;
- option changes while open;
- theme change while open;
- `st.empty()` replacement;
- conditional unmount;
- fragment rerun;
- sidebar collapse;
- multipage navigation;
- key changes, plus the Python-side fail-fast path for attempted component-kind
  changes.

After cleanup there must be no React root, portal, listener, observer, timer,
scroll lock, `inert`, or `aria-hidden` mutation owned by the instance.

### 8.6 Security

- Component JavaScript and HTML are trusted package assets, never user input.
- Labels and values render as React text.
- Rich content requires a separate sanitized API and is out of Wave 1.
- No `innerHTML` accepts user content.
- Python and frontend runtime validation enforce types and payload limits.
- Diagnostics never log direct user values or personal data.

## 9. Migration waves

Every wave remains under `streamlit_shadcn_ui.v2`.

### Wave 0 — platform and Shadow DOM laboratory

Deliver:

- independent `frontend_v2` toolchain and lockfile;
- vendored shadcn Base UI registry snapshot and offline regeneration;
- generated shadcn Select, Dropdown Menu, Popover, Tooltip, and Dialog fixtures;
- app root, overlay root, neutral provider, and portal codemod;
- content-hashed Vite packaging and one ShadowRoot CSS asset;
- Tailwind Shadow CSS normalizer and sentinel suite;
- renderer lifecycle, runtime schema, revision protocol, and form guard;
- ADR-001 for anchored overlays;
- ADR-002 for modal/top-layer behavior;
- real Streamlit browser matrix and clean-package smoke test.

Exit gate:

- ADR-001 approves Select/Menu in every required placement;
- modal ADR records an accepted strategy or explicitly defers modal families;
- real generated shadcn Select has no iframe and no direct body portal;
- rapid-rerun, cleanup, CSS, theme, accessibility, and packaging gates pass;
- no unresolved P0/P1 platform finding;
- V1 build output checksum is unchanged.

### Wave 1 — production POC and maintainer checkpoint

Components:

- Select;
- Dropdown Menu;
- Checkbox;
- Button.

The shared demo exposes placement, light/dark/custom/sidebar theme, long-list,
disabled, empty, error, rerun, and form-supported/unsupported fixtures.

Exit gate:

- Select passes the complete browser and accessibility suite;
- Python API and known behavior differences are documented;
- the Wave 1 user-visible result/session-state shape is frozen for the opt-in
  namespace; later parity work may add adapters but may not silently change
  that shape;
- wheel and sdist run from fresh environments without Node;
- bundle, CSS-per-instance, update latency, and memory baselines are recorded;
- maintainer explicitly accepts or rejects the POC.

**Stop after this gate.** A technically green POC is not authorization to
migrate the remaining catalog.

### Wave 2 — low-risk display components

Candidates:

- Alert, Avatar, Badge, Breadcrumb, Card, Metric Card;
- Aspect Ratio, Progress, Separator, Skeleton, Table;
- Link Button and stateless composition helpers.

### Wave 3 — stateful and text-input components

Candidates:

- Input and Textarea after commit-semantics approval;
- Accordion, Collapsible, Input OTP, Pagination;
- Radio Group, Scroll Area, Slider, Switch;
- Tabs, Toggle, Toggle Group, Calendar.

Every component gets an explicit state shape, commit policy, invalidation
policy, and form policy.

### Wave 4 — remaining anchored overlays

Candidates:

- Popover, Hover Card, Tooltip;
- Date Picker, Combobox, Autocomplete;
- Context Menu and remaining Select/Menu variants.

All use the accepted ADR-001 architecture. Component-specific portal shortcuts
are rejected.

### Wave 5 — modal and viewport overlays

Candidates:

- Dialog, Alert Dialog, Sheet;
- Toast under its own viewport-host decision;
- Drawer only after a stable Base UI release contains #5359 and the gesture
  suite passes.

Each family must satisfy ADR-002 or a successor ADR.

### Wave 6 — compatibility and cutover

- Publish a V1/V2 argument, state, callback, and visual compatibility table.
- Decide public `st.session_state[key]` parity for all V2 widgets.
- Run at least one opt-in release cycle with real-world feedback.
- Raise the global Streamlit floor only in a semantic breaking release if
  required.
- Make V2 default only after parity gates pass.
- Keep a documented V1 rollback for at least two releases.

## 10. Test and release gates

### 10.1 Static and unit

- strict TypeScript and Python protocol types;
- runtime envelope validation;
- revision reconciliation and invalidation;
- portal provider resolution and root ownership;
- AST portal rule;
- CSS selector, custom-property, keyframe, and layer audit;
- renderer lifecycle and idempotent cleanup;
- exact shadcn theme contract and one-way color-scheme bridge;
- Python defaults, callbacks, keys, forms, and session state;
- generated-source provenance and offline regeneration;
- shadcn -> Base UI import-graph assertion.

### 10.2 Browser

Playwright runs Chromium, Firefox, and WebKit against a real Streamlit app:

- zero iframe and zero direct-body-popup assertions;
- full ADR-001 placement matrix;
- mouse, keyboard, touch, and composed-path outside press;
- nested popup behavior;
- focus restoration;
- persistent state and transient trigger reset;
- rapid/out-of-order rerun reconciliation;
- multiple instances and component-kind replacement;
- main page, sidebar, columns, tabs, expanders, scroll containers, fragments,
  and multipage navigation;
- standard shadcn light/dark inside default and custom Streamlit hosts, RTL,
  mobile viewport, and 200% zoom;
- no console error, warning, unhandled rejection, root warning, or leaked
  document mutation.

Modal fixtures additionally run the complete ADR-002 matrix.

### 10.3 Accessibility and visuals

- axe-core for document and open ShadowRoots;
- stable visual snapshots for every supported theme and popup state;
- keyboard behavior matching Base UI/shadcn documentation;
- VoiceOver/Safari and NVDA/Firefox smoke checks for Select and modal families.

### 10.4 Packaging and caching

- clean git archive build with frozen lockfile;
- wheel and sdist content inspection;
- one hashed JS and one hashed CSS entry;
- lazy JavaScript URL resolution under Streamlit's component route;
- no lazy CSS or document-head injection;
- fresh install on minimum and latest Streamlit;
- runtime with Node absent;
- upgrade test proving a changed content hash loads new assets;
- V1 artifact checksum unchanged during Waves 0 and 1.

### 10.5 Performance and reliability

- raw and gzip JS/CSS sizes recorded per wave;
- initial render and rerender timings recorded against the direct Base UI POC;
- memory and DOM node counts after 100 reruns;
- CSS injection cost measured at 1, 10, 50, and 100 instances;
- lazy family chunks introduced only when measured growth exceeds the approved
  Wave 1 budget;
- runtime diagnostics are bounded and rate-limited.

## 11. Rollout, observability, and rollback

- V2 remains import-opt-in until Wave 6.
- Each wave publishes an acceptance app and known-differences document.
- Runtime diagnostics contain component kind, protocol version, package
  version, and bounded error code, but never user values.
- A V2 failure never silently falls back to V1 with different semantics.
- A deliberate compatibility adapter may route a call to V1 and must be visible
  in documentation and tests.
- Every release records Streamlit, component-v2-lib, shadcn snapshot, Base UI,
  React, Tailwind, and browser versions.

## 12. Risk register

| Risk | Mitigation | Gate |
|---|---|---|
| shadcn portal defaults to `document.body` | Neutral provider, codemod, AST rule, runtime root assertion | Wave 0 / every generated upgrade |
| Same-root popup is clipped | ADR-001 tests fixed/absolute and top-layer/isolated-host alternatives | Wave 0 |
| Select/Menu causes document inert or scroll effects | Explicit `modal={false}` and body-mutation assertions | Wave 0 / Wave 1 |
| Modal backdrop/focus/scroll leaks across roots | ADR-002 and refcounted effects contract | Wave 0 / Wave 5 |
| Tailwind selectors miss ShadowRoot | AST normalizer and unscoped-selector build failure | Wave 0 |
| `@property` or keyframes collide across package versions | CSS-schema namespacing and cross-engine sentinels | Wave 0 |
| Outside press fails through retargeting | Pin #4332 fix and exercise composed paths | Every overlay upgrade |
| Drawer gestures fail on Base UI 1.6.0 | Defer until stable #5359 release and gesture tests | Wave 5 |
| Rerun reverts a rapid selection | Atomic revision cell and delayed-response tests | Wave 0 / every stateful control |
| A reused key revives state or trigger data from another kind | Session kind registry, metadata cell, and fail-fast kind immutability | Wave 0 / Wave 1 |
| Renderer leaks roots or document effects | Verified host contract and 100-rerun/unmount suite | Wave 0 |
| Trigger silently fails in a form | Python form guard; trigger controls unsupported in forms | Wave 0 |
| Live shadcn registry changes under a pinned CLI | Vendored payload, hashes, offline regeneration | Every generated upgrade |
| Stable asset filename serves stale code | Content-hashed entries and upgrade cache test | Packaging |
| V2 dependency update breaks V1 | Physical Node workspace split and V1 checksum gate | Waves 0–1 |
| V2 Streamlit floor removes V1 rollback | Optional V2 extra and runtime guard until Wave 6 | Packaging |
| Adapter becomes a second design system | Import-graph test and shadcn composition boundary | Every component |

## 13. Definition of architecture-ready

The architecture is ready to implement only when:

1. Fable 5, the primary reviewer, has no unresolved blocking finding.
2. The independent reviewer and Grok Build have no unresolved blocking finding,
   or the consensus record contains an explicit, evidence-backed disposition.
3. Every first-round finding has an owner and a plan section or ADR gate.

The architecture is ready for broad migration only when:

1. Wave 0 proves the Shadow DOM and lifecycle contracts.
2. ADR-001 approves the real generated shadcn Base UI Select.
3. The Wave 1 Select passes browser, accessibility, packaging, and rerun gates.
4. The maintainer explicitly accepts the Wave 1 POC.
5. V1 remains buildable and installable.

## 14. Primary references

- [Streamlit Components V2 component API](https://docs.streamlit.io/develop/api-reference/custom-components/st.components.v2.component)
- [Streamlit V2 registration and `parentElement`](https://docs.streamlit.io/develop/concepts/custom-components/components-v2/register)
- [Streamlit V2 theming and style isolation](https://docs.streamlit.io/develop/concepts/custom-components/components-v2/theming)
- [Streamlit 1.60 renderer lifecycle source][streamlit-renderer-lifecycle]
- [Streamlit 1.60 V2 asset glob contract][streamlit-asset-globs]
- [shadcn Base UI Select](https://ui.shadcn.com/docs/components/base/select)
- [Pinned shadcn Base UI Select source](https://github.com/shadcn-ui/ui/blob/b28e5b4d9e90b72a222fff7eb70043a52856012d/apps/v4/registry/bases/base/ui/select.tsx)
- [Base UI Select](https://base-ui.com/react/components/select)
- [Base UI Dialog](https://base-ui.com/react/components/dialog)
- [Base UI outside-press fix #4332](https://github.com/mui/base-ui/issues/4332)
- [Base UI dialog/backdrop report #2867](https://github.com/mui/base-ui/issues/2867)
- [Base UI Drawer Shadow DOM gesture fix #5359](https://github.com/mui/base-ui/issues/5359)

[streamlit-renderer-lifecycle]: https://github.com/streamlit/streamlit/blob/1.60.0/frontend/lib/src/components/widgets/BidiComponent/hooks/useHandleJsContent.ts#L208-L334
[streamlit-trigger-form]: https://github.com/streamlit/streamlit/blob/1.60.0/frontend/lib/src/components/widgets/BidiComponent/hooks/useHandleJsContent.ts#L106-L121
[streamlit-asset-cache]: https://github.com/streamlit/streamlit/blob/1.60.0/lib/streamlit/web/server/starlette/starlette_routes.py#L850-L907
[streamlit-keyed-identity]: https://github.com/streamlit/streamlit/blob/1.60.0/lib/streamlit/components/v2/bidi_component/main.py#L430-L449
[streamlit-asset-globs]: https://github.com/streamlit/streamlit/blob/1.60.0/lib/streamlit/components/v2/__init__.py#L53-L66
