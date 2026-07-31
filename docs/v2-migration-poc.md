# Archived: pre-production Streamlit Components V2 diagnostic POC

Status: **Superseded**

This document describes the recovered direct-Base-UI diagnostic fixture. It is
not the Wave 1 production architecture. The current implementation, evidence,
and decision boundary are recorded in:

- [Wave 1 acceptance record](./v2-wave1-acceptance.md);
- [production migration plan](./v2-production-migration-plan.md);
- [ADR-001: anchored overlay host](./adr/001-v2-anchored-overlay-host.md).

## Recovered failure modes

The earlier V2 experiments were not preserved on another Git branch or in a
commit. Their remaining source, ignored build output, and local Git objects
showed four independent problems:

1. The component manifest used an already-qualified component name. Streamlit
   prefixes the manifest name with the package name, so the registered key did
   not match the key requested by Python and the frontend asset directory could
   not be resolved.
2. The browser bundle still contained a top-level `process.env.NODE_ENV`
   reference. V2 JavaScript executes directly in the app page, where Node's
   `process` global does not exist.
3. The frontend attempted to read component state from a nonexistent
   `args.state` property. Components V2 state must be sent with
   `setStateValue`, persisted by Streamlit, and passed back through Python's
   `data` payload on reruns.
4. The popup primitive portaled into `document.body` while the component CSS
   lived in an isolated Shadow DOM. This separated Select's popup from its
   styles and was the main reason the floating layer remained unreliable.

The previous dependency floor also claimed Streamlit 1.51 compatibility while
passing `isolate_styles` at registration, an API shape that requires Streamlit
1.53 or newer.

## Historical diagnostic architecture

- One manifest entry named `v2` registers the qualified component
  `streamlit-shadcn-ui.v2`.
- One JavaScript and CSS bundle dispatches all POC widgets, avoiding duplicate
  registration and asset payloads.
- Select and Dropdown Menu used `@base-ui/react` directly and passed
  Streamlit's `parentElement` to the Base UI Portal.
- Select, Input, and Checkbox used persistent state values. Button and
  Dropdown Menu used transient trigger values.
- The existing V1 Python and React implementations remain unchanged for
  side-by-side evaluation.

That fixture established useful failure modes, but direct Base UI markup was
never accepted as the production component layer. Wave 1 uses mechanically
generated, checked-in shadcn source whose primitives import Base UI. Input was
removed from Wave 1 until its commit semantics are designed in the stateful
input wave.

## Current acceptance command

```sh
./scripts/poc_v2.sh
```

Open the printed local URL and verify:

- Select opens above surrounding Streamlit content without an iframe or
  `document.body` portal.
- Mouse, keyboard, Escape, and outside-click interactions work.
- Select and Checkbox values survive reruns.
- Dropdown Menu returns a one-rerun selection event.
- Checkbox state persists and Button emits one click event per interaction.
