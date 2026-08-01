# ADR-008: V2 cutover, session state, and rollback

Status: **Superseded by [ADR-010](./010-v2-1.0-single-track-cutover.md)**

Date: 2026-07-30

## Context

Waves 1–5 migrate the stable component catalog to Streamlit Components V2
with checked-in shadcn source, Base UI behavior primitives, and Shadow DOM
isolation. Wave 6 must decide whether the package root can switch to V2,
whether V2 must mimic the V1 `st.session_state` layout, and how an application
can roll back after a future cutover.

The compatibility matrix found two usage models without one-call parity:

- V1 Checkbox accepts a group and returns an ID-to-boolean mapping, while V2
  intentionally exposes one scalar Checkbox per call.
- V1 Card can participate in the experimental `element` context tree, while
  V2 Card is an isolated display component.

The V1 `element` tree serializer and its low-level trigger/content helpers are
iframe-architecture implementation surfaces, not stable V2 building blocks.
The opt-in implementation is technically accepted, but no published opt-in
release cycle and real-world feedback window has occurred yet.

## Decision

### Keep V2 opt-in

`streamlit_shadcn_ui.v2` remains the only V2 entry point for the next
published release cycle. The package root continues to expose V1. This branch
does not claim that an unpublished local test run satisfies the Wave 6
real-world feedback gate.

No call silently falls back from V2 to V1. An application chooses its
architecture in its import statement.

### Add an explicit V1 rollback namespace

`streamlit_shadcn_ui.v1` is an exact alias of the existing root catalog. It
does not import V2 and does not change the legacy distribution assets. It is
available before a future default switch so applications can adopt an
unambiguous rollback import now.

After any future root-default switch, the `v1` namespace and packaged V1
assets must remain supported for at least two published releases. The
checksum-pinned historical V1 artifact remains the last-resort package
rollback.

### Keep raw component session state private

V2 does not mirror V1's raw `st.session_state[key]` structures. That cell is a
Streamlit Components V2 protocol envelope, not an application value. Public
state is the Python return value; public events are the documented
no-argument callbacks.

The protocol envelope may change only with a protocol-version migration, but
its internal fields are not a supported application API. The private runtime
registry, including immutable key-to-kind bindings and reset revisions, is
also not public.

### Do not raise global runtime floors yet

The distribution retains `requires-python >= 3.7` and `streamlit >= 0.63` for
the V1 root. The `components-v2` extra and runtime guard keep the V2 floors at
Python 3.10 and Streamlit 1.60.

A package-wide floor increase or root namespace swap is a breaking change. In
the current pre-1.0 series it requires at least a `0.2.0` release; after 1.0 it
requires a new major version. No version bump is made by this ADR.

### Close the default-cutover gate only with release evidence

V2 may become the root default only after all of these conditions pass:

1. at least one opt-in package release has completed a documented real-user
   feedback window;
2. every V1 root export has either source-compatible behavior, a maintained
   adapter, or an explicitly approved breaking disposition;
3. Checkbox group migration and Card/`element` composition are resolved or
   accepted as breaking changes in the release proposal;
4. the compatibility manifest, minimum/latest Streamlit tests, all browser
   suites, clean wheel/sdist installs, accessibility checks, and V1 rollback
   suite are green for the exact release artifact;
5. release notes state the runtime floors, raw-session-state policy, migration
   recipes, and two-release rollback window;
6. a maintainer explicitly approves the semantic breaking release.

## Consequences

- The stable V2 implementation can ship for opt-in use without pretending to
  be drop-in compatible.
- Existing root imports and V1 environments remain unchanged.
- Applications that inspect or mutate V1 component dictionaries must migrate
  to return values rather than receive a fragile emulation layer.
- The repository can complete its technical migration while keeping the
  externally dependent release-feedback gate visible.
- Carrying V1 assets costs package size for the rollback window, but avoids an
  irreversible cutover.

## Rejected alternatives

### Switch the root immediately

Rejected because the required published feedback cycle has not happened and
two public usage models still require application-level adaptation.

### Mirror a scalar into `st.session_state[key]`

Rejected because Streamlit owns that key for the V2 component result.
Overwriting it would corrupt metadata, trigger, and revision reconciliation.

### Add automatic V2-to-V1 fallback

Rejected because iframe and Shadow DOM components have different state,
callback, overlay, and accessibility semantics. A silent fallback would make
failures nondeterministic.

### Port the low-level iframe helpers

Rejected because V2 intentionally eliminates separate trigger and popup
components. Reintroducing those helpers would preserve the architecture being
removed.
