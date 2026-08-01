# ADR-005: Wave 3 registry expansion and runtime style ownership

Status: **Accepted for Wave 3**

Date: 2026-07-30

## Context

Wave 3 adds fourteen inline and form-oriented components. The generated
shadcn sources require ten Base UI behavior primitives and four React
compositions. Calendar and Input OTP also introduce upstream runtime
dependencies that were not present in Waves 1 and 2.

The first real-browser run exposed an additional ShadowRoot ownership detail:
Base UI Scroll Area renders a runtime `<style>` element containing its
`.base-ui-disable-scrollbar` rule. Select can render the same rule when its
popup needs scroll arrows. Functionally this stayed inside the correct
ShadowRoot, but it violated the release invariant that each component instance
receives one versioned stylesheet and no library-owned runtime style element.

## Decision

### Atomic registry snapshot

Snapshot revision 3 captures all twenty-eight Wave 1–3 shadcn `base-nova`
registry payloads at the same upstream commit:

`705ce5961080264830471ddd885c01b907706068`

The fourteen new payloads are Accordion, Calendar, Collapsible, Input,
Input OTP, Pagination, Radio Group, Scroll Area, Slider, Switch, Tabs,
Textarea, Toggle, and Toggle Group.

The capture process reads every payload twice, records its SHA-256 digest and
primitive family, and regenerates the complete checked-in `components/ui`
directory offline. Registry-to-registry imports such as Calendar → Button and
Toggle Group → Toggle are deterministically rewritten to the owned
`@/components/ui/*` path.

### Exact runtime dependencies

Wave 3 adds these exact pins:

- `date-fns` 4.4.0;
- `input-otp` 1.4.2;
- `react-day-picker` 10.0.1.

The Node, pnpm, React, Streamlit component library, Base UI, Tailwind, shadcn
CLI, and TypeScript pins remain unchanged.

### One stylesheet per ShadowRoot

The shared `ComponentShell` wraps every adapter in Base UI's `CSPProvider`
with `disableStyleElements` enabled. The required
`.base-ui-disable-scrollbar` rules now live in the versioned Shadow CSS.

This policy is platform-owned rather than patched into generated shadcn
source. It applies consistently to current and future Base UI components,
works with strict CSP, and keeps every Streamlit instance at:

- one raw, content-hashed component stylesheet;
- zero runtime `<link>` elements;
- zero library-injected `<style>` elements;
- no document-head style mutation.

## Gates

Revision 3 is accepted only when:

- all twenty-eight payload hashes and generated sources verify offline;
- every Streamlit adapter imports its generated shadcn source and never
  imports Base UI directly;
- TypeScript, Vitest, Python protocol, Python 3.7 grammar, and release checks
  pass;
- the Wave 3 real Streamlit suite passes in Chromium, Firefox, and WebKit;
- axe reports no serious or critical issue in all nineteen Wave 3
  ShadowRoots;
- Waves 1 and 2 pass their complete regression suites;
- wheel and sdist contain byte-identical V2 assets and run the installed
  smoke app without Node.

## Consequences

- The release artifact grows because Calendar includes React Day Picker and
  date utilities; bundle size remains recorded as a gate rather than hidden.
- Base UI components that depend on inline style helpers must have the
  equivalent rule in `shadow.css` before entering the catalog.
- Future registry expansions remain atomic even when the shadcn upstream
  commit is unchanged.
- The public adapter layer remains shadcn-based; this decision does not turn
  Wave 3 into handwritten Base UI components.
