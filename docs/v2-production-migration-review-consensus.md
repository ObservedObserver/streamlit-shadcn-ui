# V2 production migration review consensus

Status: **APPROVED**

Date: 2026-07-30

Reviewed document:
[V2 production migration plan](./v2-production-migration-plan.md)

Decision scope: architecture readiness to start Wave 0. This approval does not
authorize broad component migration; that remains gated by the Wave 1
maintainer checkpoint.

## 1. Review panel

| Role | Reviewer | Final verdict |
|---|---|---|
| Primary reviewer and arbiter | Claude Code, Fable 5 | **APPROVE** |
| Independent auxiliary reviewer | Codex independent sub-agent | **APPROVE** |
| Auxiliary reviewer | Grok Build | **APPROVE** |

All three reviewers independently concluded that the final plan has no
remaining blocker to starting Wave 0.

## 2. Consensus decision

The project will use:

1. Streamlit Components V2 as the host and protocol layer.
2. Checked-in shadcn source generated from a pinned Base UI registry snapshot
   as the owned component layer.
3. Base UI as the behavior, accessibility, focus, and positioning primitive
   layer.
4. Shadow DOM isolation as a release invariant.
5. A POC-first rollout, with a hard maintainer checkpoint after Wave 1.

The direct Base UI POC remains a diagnostic fixture. Production components may
not bypass the checked-in shadcn component source.

## 3. Review history

### Round 1 — initial architecture review

The panel agreed that the initial direction was sound but not yet executable.
The blocking themes were:

- same-ShadowRoot portals did not by themselves prove that anchored overlays
  would escape clipping;
- modal behavior needed a separate top-layer, focus, inert, scroll-lock, and
  cleanup contract;
- the Streamlit rerun/unmount lifecycle needed to be verified against pinned
  source rather than assumed;
- the registration and keyed-identity model needed to match Streamlit V2's
  actual behavior;
- state reconciliation, trigger behavior, and form behavior were incomplete;
- the frontend workspace was not yet physically isolated from the legacy
  Yarn workspace;
- live shadcn registry reads made regeneration non-reproducible;
- the Tailwind 4 and ShadowRoot CSS pipeline did not fail closed;
- hashed assets, clean wheel/sdist builds, and V1 rollback were not fully
  specified.

These findings produced the explicit Wave 0 platform gates, ADR-001 for
anchored overlays, ADR-002 for modal overlays, the revision-cell protocol, and
the packaging and compatibility contracts in the final plan.

### Round 2 — revised architecture review

Fable 5 and Grok Build approved the revised architecture. The independent
reviewer identified three remaining blockers:

1. Automatic cross-kind key reset was not atomic and had no epoch protocol.
2. Pre-Tailwind selector normalization could not repair selectors regenerated
   by Tailwind itself.
3. The V1 rollback claim did not yet prove the released Python/install
   surface, including the existing Python-floor contradiction introduced by
   `streamlit_extras`.

The panel accepted all three findings as substantive.

### Round 3 — final arbitration

Revision 3 resolved the remaining findings:

- component kind is immutable for a key during Waves 0–1 and a mismatch fails
  before mount; automatic reset is deferred to a future epoch-based ADR;
- compiled Tailwind output receives a second PostCSS AST normalization and
  namespace pass before the final fail-closed audit;
- legacy Python parsing, V1-only import, installation, and smoke behavior are
  tested explicitly, and the packaging-floor contradiction must be repaired
  or V2 must ship as a separate distribution;
- Python owns the authoritative `serverRevision` and overwrites any
  client-supplied value.

Fable 5 accepted the independent reviewer's three findings and confirmed that
the resulting protocol and gates are logically closed. Grok Build and the
independent reviewer separately reached the same conclusion.

## 4. Final dispositions

| Topic | Consensus disposition | Gate |
|---|---|---|
| shadcn authenticity | Production import graph must pass through checked-in shadcn source to Base UI | Static test on every generated upgrade |
| Registry reproducibility | Pin and vendor registry payload, hashes, CLI, and transitive source; prove offline regeneration | Wave 0 and every generated upgrade |
| ShadowRoot ownership | Each instance owns sibling app and overlay roots inside its ShadowRoot | Wave 0 |
| Select and Menu modality | Force non-modal behavior; assert no document inert, scroll lock, or body-mounted popup | Waves 0–1 |
| Anchored overlays | Evaluate same-root positioning and top-layer/isolated-host alternatives using the full Streamlit placement matrix | ADR-001, Wave 0 blocker |
| Modal overlays | Evaluate native dialog/top-layer and isolated-host alternatives with refcounted document effects | ADR-002 before modal migration |
| CSS isolation | Compile, normalize compiled output, namespace, then fail on any unowned selector or global identifier | Wave 0 |
| Component identity | Keep one qualified V2 registration; use explicit Streamlit keys and immutable `key -> kind` metadata | Waves 0–1 |
| Rerun state | Use an atomic versioned state cell with Python-owned server revision and one-shot reset acknowledgement | Wave 0 |
| Forms | Trigger components fail closed in forms; stateful form behavior is verified empirically | Wave 0 |
| Toolchain | Keep `frontend_v2` physically outside the legacy workspace with its own pinned pnpm toolchain | Wave 0 |
| Packaging | Emit content-hashed JS/CSS, require exact-one Streamlit asset matches, and build clean wheel/sdist without Node | Wave 0 |
| V1 rollback | Preserve the released V1 declarations and test the actual legacy surface; never silently raise its floor | Waves 0–1 |
| Rollout | Stop after the Wave 1 Select/Menu/Checkbox/Button POC for maintainer approval | Wave 1 |

## 5. Non-blocking follow-ups

The primary reviewer recorded three useful follow-ups that do not gate Wave 0:

- document that session-scoped kind immutability also applies across Streamlit
  multipage navigation;
- convert the pinned Streamlit source claims for trigger-in-form behavior,
  asset cache headers, keyed identity, and asset globs into executable contract
  tests;
- make Python 3.7 parsing a direct CI assertion rather than relying on pip
  installation or byte-compilation behavior to expose syntax regressions.

These follow-ups belong in Wave 0 and must be tracked, but none changes the
approved architecture.

## 6. Authorization boundary

Reviewer consensus establishes that the architecture is ready to begin Wave 0.
It does not claim that Shadow DOM behavior is already proven in browsers.
ADR-001, ADR-002, CSS sentinels, lifecycle tests, and packaging tests are
evidence-producing implementation gates.

Broad migration remains prohibited until:

1. Wave 0 gates pass.
2. The real generated shadcn Base UI Select passes ADR-001 and the acceptance
   matrix.
3. The Wave 1 POC is presented to the maintainer.
4. The maintainer explicitly accepts the POC.

## 7. Final vote

- Fable 5: **APPROVE — no remaining blocker to starting Wave 0.**
- Independent sub-agent: **APPROVE.**
- Grok Build: **APPROVE — no remaining Wave 0 start blocker.**

Consensus: **the final migration plan is accepted and Wave 0 may begin.**
