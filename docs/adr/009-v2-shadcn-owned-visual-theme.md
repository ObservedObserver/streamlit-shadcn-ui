# ADR-009: V2 keeps the shadcn-owned visual theme

Status: **Accepted; maintainer visual re-validation open**

Date: 2026-07-31

## Context

The V2 renderer already used checked-in shadcn `base-nova` component source
backed by Base UI. However, its ShadowRoot stylesheet replaced shadcn's
semantic colors, radius, and font with inherited Streamlit variables. The
component tree and interaction kernel were genuine shadcn/Base UI, but the
global token substitution made the rendered catalog look like Streamlit.

That is the wrong product boundary. A primary reason for this library is to
offer the shadcn visual language inside Streamlit, not to make shadcn source
indistinguishable from Streamlit widgets.

## Decision

### shadcn owns the default visual identity

V2 uses the exact light and dark semantic tokens and `0.625rem` radius from
the pinned shadcn CLI 4.16.0 Nova/neutral preset. The generated component
class strings remain unchanged. The Shadow CSS contract test records every
light and dark token and fails on any drift.

Production Shadow CSS may not reference a Streamlit color, radius, or font
variable. In particular, `--st-primary-color`, `--st-text-color`,
`--st-border-color`, `--st-base-radius`, and `--st-font` do not feed shadcn
semantic tokens.

### Streamlit supplies environment, not branding

The host bridge reads Streamlit's background only to choose the standard
shadcn light or dark palette. It also synchronizes `color-scheme`, document
direction, and language for native controls and accessibility. A custom
Streamlit primary color or radius cannot recolor or reshape the component.

Future custom themes, if added, must be an explicit shadcn theme API rather
than an implicit Streamlit-token override.

### Keep fonts compatible with the single-asset ShadowRoot contract

The official Nova starter imports the Geist variable webfont. V2 instead uses
a host-resolved `Geist Variable`, `Geist`, and system sans-serif stack. The
current release contract permits one JavaScript asset and one stylesheet,
injects the stylesheet text into every ShadowRoot, and rejects `@import` and
unresolved relative assets. Embedding a font in that stylesheet would repeat
the font bytes per component instance.

This packaging adaptation avoids Streamlit's Source Sans identity while
preserving the official typography preference when Geist is available. A
future shared-font asset requires a separate packaging and performance
decision.

### Do not conceal visual overrides in component adapters

Platform CSS remains limited to ShadowRoot ownership, overlay bounds,
scrollbar behavior, box sizing, error presentation, and reduced motion.
Visual variants continue to come from generated shadcn source. A static gate
rejects Streamlit-token references and the former computed-primary override.

## Accessibility note

The exact upstream neutral preset produces two combinations in the display
catalog that axe reports below WCAG AA: muted foreground on muted background
at approximately 4.34:1 and the generated destructive Badge at approximately
4.0:1. Changing those colors would no longer be the exact standard preset.

Automated tests continue to fail on semantic, keyboard, focus, ARIA, and all
other serious or critical violations. Color contrast for these exact upstream
visual combinations is recorded separately instead of being silently
darkened. An accessibility-adjusted palette may be added later only as an
explicit theme, not as an undocumented default-style patch.

## Consequences

- V2 components retain recognizable shadcn styling inside the Streamlit
  shell.
- Streamlit light/dark changes remain coherent without taking ownership of
  shadcn branding.
- Existing applications that expected Streamlit primary colors or radii in V2
  receive an intentional visual correction before the opt-in release.
- Visual snapshots for Waves 1–5 are regenerated from the official palette.
- The historical Streamlit-token mapping in the migration plan and earlier
  acceptance records is superseded by this decision.

## Rejected alternatives

### Keep the Streamlit token bridge

Rejected because it defeats the library's shadcn visual proposition even
though the underlying generated source remains genuine.

### Patch each component until it resembles shadcn

Rejected because generated shadcn classes already define the desired result.
Per-component corrections would create an unmaintainable second design
system.

### Inline the Geist font in every ShadowRoot

Rejected for the current release because it duplicates font bytes for every
component host and materially changes the accepted CSS-per-instance budget.
