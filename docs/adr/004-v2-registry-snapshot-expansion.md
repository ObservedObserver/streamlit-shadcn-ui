# ADR-004: Expand the pinned shadcn Base UI registry snapshot

Status: **Accepted for Wave 2**

Date: 2026-07-30

## Context

Wave 1 vendored four shadcn `base-nova` registry payloads at upstream commit
`b28e5b4d9e90b72a222fff7eb70043a52856012d`. Wave 2 adds ten shadcn sources:
Alert, Aspect Ratio, Avatar, Badge, Breadcrumb, Card, Progress, Separator,
Skeleton, and Table.

The live registry changed after the Wave 1 capture. Extending the old manifest
with payloads fetched on another date would produce a mixed, unreproducible
snapshot. The production migration plan requires every pin change to have an
ADR, updated provenance, offline regeneration, and a complete regression run.

## Decision

Snapshot revision 2 captures all fourteen Wave 1 and Wave 2 registry payloads
at the same shadcn upstream commit:

`705ce5961080264830471ddd885c01b907706068`

The pinned toolchain remains unchanged:

- shadcn CLI 4.16.0, including its recorded npm integrity;
- `base-nova` with the `base` / Base UI primitive family;
- `@base-ui/react` 1.6.0;
- Tailwind CSS 4.3.3.

The capture command now requires an explicit 40-character upstream commit. It
fetches every requested registry payload twice and aborts if the bytes change
between reads. The manifest records each payload URL, SHA-256 digest, and
whether the generated component is Base UI-backed or a stateless React
composition.

Generation and verification derive their complete expected file set from the
manifest. A removed manifest entry therefore removes stale generated source,
while an undeclared checked-in component fails verification.

The existing portal and anchored-positioner adaptations remain deterministic
post-generation transforms. Refreshing the four Wave 1 payloads changed their
raw registry hashes but produced no material change to the adapted Wave 1
component source.

## Gates

Revision 2 is accepted only with:

- two-read capture stability for all fourteen registry items;
- manifest hash verification and offline checked-in source regeneration;
- generated-source, portal ownership, and shadcn-to-Base-UI import-graph
  checks;
- strict TypeScript, unit, Shadow CSS, and production-build checks;
- the complete Wave 1 browser regression suite;
- the Wave 2 Chromium, Firefox, WebKit, accessibility, and visual suite;
- wheel and sdist byte-for-byte asset verification.

## Consequences

- A release build never depends on the live shadcn registry.
- Every checked-in shadcn source has one reviewable upstream payload and
  primitive provenance record.
- Future waves expand one atomic snapshot revision rather than appending
  payloads from unrelated registry states.
- Updating a registry item remains an explicit dependency change even when
  the normalized generated source is unchanged.
