# ADR-012: Add a progressive Python API for shadcn charts

Status: Accepted after maintainer-agent review

Date: 2026-09-07

## Context

shadcn Chart is a styled Recharts integration. Its checked-in source owns the
responsive container, theme-scoped series colors, tooltip, legend, and the CSS
selectors that make Recharts match the rest of shadcn. It is not a complete
chart grammar.

Exposing Recharts props, React callbacks, CSS classes, or JavaScript formatters
through Python would make the public API hard to learn and would create a
second frontend API to maintain. The useful Python boundary is smaller: accept
record data, select fields, choose one chart family, and apply the standard
shadcn composition.

The current package has one JavaScript entry and one stylesheet. Every
component uses an isolated ShadowRoot, and generated shadcn source comes from
the vendored `base-nova` snapshot. Chart support must keep those contracts.

## Proposed public API

Add six discoverable convenience functions:

```python
ui.line_chart(data, x=None, y=None, *, title=None, description=None,
              show_legend=None, show_tooltip=True, key=None,
              width="stretch")

ui.area_chart(data, x=None, y=None, *, stacked=False, title=None,
              description=None, show_legend=None, show_tooltip=True,
              key=None, width="stretch")

ui.bar_chart(data, x=None, y=None, *, stacked=False, horizontal=False,
             title=None, description=None, show_legend=None,
             show_tooltip=True, key=None, width="stretch")

ui.pie_chart(data, names=None, values=None, *, donut=False, title=None,
             description=None, show_legend=None, show_tooltip=True,
             key=None, width="stretch")

ui.radar_chart(data, x=None, y=None, *, title=None, description=None,
               show_legend=None, show_tooltip=True, key=None,
               width="stretch")

ui.radial_chart(data, names=None, values=None, *, title=None,
                description=None, show_legend=None, show_tooltip=True,
                key=None, width="stretch")
```

`data` accepts an iterable of mappings or an object with
`to_dict("records")`, including a pandas DataFrame without adding pandas as a
dependency.

For cartesian and radar charts, `y` accepts a field name, an ordered iterable
of field names, or an ordered mapping of field names to display labels. When
`x` is omitted, the first field becomes the category field. When `y` is
omitted, the remaining numeric fields become series.

For pie and radial charts, `names` defaults to the first field. `values` may be
omitted only when the remaining data has exactly one numeric field. This avoids
silently choosing the wrong measure.

`show_legend=None` means automatic: show a legend for multiple series and for
multi-segment pie or radial charts. Explicit `True` and `False` override that
choice. Tooltips are enabled by default.

`width` accepts `"stretch"` or a positive pixel width. The native responsive
container needs a definite available width, so `"content"` is not supported.
Legends retain shadcn's single-row layout. Narrow charts with long series names
should use short display labels or hide the legend.

The first release deliberately omits arbitrary colors, height, axis props,
tick or value formatters, event callbacks, mixed chart types, secondary axes,
and raw Recharts configuration. Those can be added later as typed Python
options after a concrete use case appears.

## Data contract

All six functions normalize input to one stateless protocol kind named
`chart`. The envelope contains only validated JSON data:

```json
{
  "protocolVersion": 1,
  "kind": "chart",
  "props": {
    "chartType": "line",
    "data": [
      {"category": "January", "series-0": 186, "series-1": 80}
    ],
    "series": [
      {"key": "series-0", "label": "Desktop"},
      {"key": "series-1", "label": "Mobile"}
    ],
    "title": "Visitors",
    "description": "January through June",
    "showLegend": true,
    "showTooltip": true,
    "stacked": false,
    "horizontal": false,
    "donut": false
  }
}
```

Python replaces user field names with `series-0` through `series-4`. Pie and
radial segments use `segment-0` through `segment-4`. Only those generated keys
reach Chart's CSS-variable construction. User labels remain React text and
never become CSS selectors or declarations.

The boundary consumes at most 1,001 records before enforcing a 1,000-row
limit. It rejects empty data, duplicate DataFrame columns, missing selected
fields, booleans as measures, infinities, numbers outside JavaScript's safe
range, and more than five series or segments. `None` and numeric NaN become
`null` gaps in line, area, and bar charts. Inference examines all records and
ignores nonnumeric metadata columns. Explicit selection rejects invalid values.
Dates and datetimes in the category field become ISO text. Numeric categories
are categorical labels, not a continuous numeric axis.

Radar needs at least three distinct categories and complete non-negative
values. Pie and radial require unique category labels, complete non-negative
values, and a positive total. Radial displays relative magnitudes using
Recharts' automatic angular scale, not percentages or progress against a goal.
Data order is preserved; the wrapper never aggregates or sorts records.

## Frontend composition

Vendor Chart from the existing pinned upstream commit and add the exact
`recharts@3.8.0` dependency. The live registry has changed since the snapshot.
A reproducible chart capture script must read the pinned Base UI chart template
and pinned nova stylesheet, resolve their two `cn-chart` style markers, and
record both source hashes. Generate `src/components/ui/chart.tsx` through the
existing provenance pipeline. Do not recapture unrelated registry items.

One Streamlit adapter imports the generated Chart and Card components. It
selects the corresponding Recharts primitives for line, area, bar, pie, radar,
or radial data. The composition follows the upstream examples:

- cartesian charts use the standard grid and axis treatment;
- line, area, and bar marks use the documented shadcn example defaults;
- pie, radar, and radial charts use the corresponding Recharts primitives;
- tooltip and legend content always come from `ChartTooltipContent` and
  `ChartLegendContent`;
- every Recharts chart enables its accessibility layer where supported.

The adapter does not pass `className` or `style` to generated shadcn
components. `ChartContainer` therefore keeps its generated `aspect-video`
layout. Cards use their generated default layout. Recharts mark props such as
stroke, fill, radius, and stacking follow the upstream chart examples and use
only `var(--chart-1)` through `var(--chart-5)` via Chart config.

Title and description are optional, but the chart always renders inside the
generated Card composition. This gives the quick Python API the same complete
presentation used by shadcn chart examples without exposing React layout.

## Source and package contracts

The registry payload, hash, primitive provenance, and upstream source check
must be recorded before generation. Existing generated components and theme
tokens stay unchanged.

Recharts remains in the single JavaScript entry for this release. The release
verifier currently requires exactly one JavaScript file and one stylesheet, so
code splitting would change package and component-route assumptions. Record
raw and deterministic gzip growth before accepting that tradeoff. If the
increase is too large, a separate lazy-family architecture needs its own ADR
and installed-package tests.

## Documentation

Add one Charts page with a minimal DataFrame example followed by one example
for each family. The page must explain field inference, the five-color limit,
automatic legends, missing-value behavior, and the intentionally small option
set. Add the six functions to the public API list and compatibility matrix.

Do not add Charts to the Elements builder in this change. A nested chart would
make one Elements envelope substantially larger and needs separate sizing and
rerender analysis.

## Acceptance gates

### Python

- exact public signatures and root exports;
- iterable mappings and DataFrame-like normalization;
- inferred and explicit fields, ordered label mappings, and `null` gaps;
- type-specific option validation and polar non-negative values;
- row, series, segment, text, and envelope bounds;
- documentation code compilation and Streamlit `AppTest` mounting.

### Frontend

- fail-closed parsing for every chart family and malformed envelopes;
- one renderer test per family, including marks, tooltip, legend, stacking,
  horizontal bars, and donut radius, with real Recharts rendering in browsers;
- import-graph proof that the adapter uses generated Chart and Card source and
  never imports a chart styling layer of its own;
- generated-source, Shadow CSS, TypeScript, unit, and production-build checks.

### Browser

- render all six families in Chromium, Firefox, and WebKit without iframes,
  console warnings, page errors, or leaked document styles;
- verify light and dark themes, responsive width, a 390 px viewport, and 200%
  zoom;
- exercise every tooltip and check legend labels;
- run axe against each chart ShadowRoot and inspect keyboard and screen-reader
  semantics;
- compare every family with the pinned shadcn example composition and record
  screenshots;
- measure the JavaScript size delta and rerender behavior.

## Implementation order

1. Review this API and its exclusions before changing runtime code.
2. Capture and generate the pinned Chart source, then add Recharts.
3. Implement Python normalization and fail-closed protocol parsing.
4. Add the single adapter and six public functions.
5. Add unit tests before documentation and browser fixtures.
6. Run each acceptance layer. Create an independent GPT-5.6 Sol agent task
   for real browser acceptance and a separate sub-agent for code review.
7. Fix every accepted finding, rerun the full gates, and create one semantic
   feature commit and pull request without the unrelated local research files.

## Review decisions and iteration target

Six functions make signatures and IDE discovery useful without exposing a
generic Recharts dictionary. Keep the default Card wrapper and five-color
limit. These are explicit first-release constraints, documented with actionable
errors. Keep one JS entry if its gzip growth stays below 200 KiB, and record
actual size and browser behavior before shipping. Use React best-practice
checks on the adapter, especially rerenders and dependency size.

This iteration delivers the six exported functions, source provenance, bounded
Python and frontend validation, a runnable Charts documentation page, unit and
three-browser regression coverage, independent Sol browser acceptance, and an
independent code review with no unresolved accepted findings. Finish with a
semantic feature commit and PR. Publishing PyPI and updating live documentation
are separate release work.

## Approved chart palette adjustment

On 2026-09-07, the user explicitly requested colorful shadcn chart colors
instead of the existing grayscale palette. Use the five light and five dark
`--chart-*` values from [shadcn's theming documentation](https://ui.shadcn.com/docs/theming).
This exception is limited to chart colors. The base-nova preset, generated
components, all other theme tokens, and Python API remain unchanged. Keep
the existing native Chart config mapping and test both theme palettes.
