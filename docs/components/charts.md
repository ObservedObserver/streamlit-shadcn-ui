Use `line_chart`, `area_chart`, `bar_chart`, `pie_chart`, `radar_chart`, and
`radial_chart` with records or a pandas DataFrame. Each renders a shadcn Card
containing the chart, with native shadcn colors, tooltips, and legends.

Charts use the five-color palette from [shadcn's theming documentation](https://ui.shadcn.com/docs/theming),
with separate light and dark colors. Other components keep the library's
neutral theme. Series and segments receive colors in their input order.

```python
import pandas as pd
import streamlit_shadcn_ui as ui

visitors = pd.DataFrame([
    {"month": "Jan", "desktop": 186, "mobile": 80},
    {"month": "Feb", "desktop": 305, "mobile": 200},
    {"month": "Mar", "desktop": 237, "mobile": 120},
])
ui.line_chart(visitors, title="Visitors")
```

The first field is the category by default. Line, area, bar, and radar charts
infer numeric series from the other fields. Choose fields explicitly with
`x="month", y="desktop"`, `y=["desktop", "mobile"]`, or
`y={"desktop": "Desktop", "mobile": "Mobile"}` for display labels and order.
Numeric and date categories render as text on a categorical axis. Records keep
their input order; these functions do not sort or aggregate.
Column names must be nonempty strings. Categories must be nonempty strings,
finite numbers, or valid dates; missing categories are rejected.
Use short display labels in narrow columns. The native legend uses a single
row; `y={"long_field_name": "Short label"}` or `show_legend=False` can help
when a chart has several long series names.

Pie and radial charts accept `names="device", values="visitors"`. If omitted,
`names` uses the first field and `values` requires exactly one remaining
numeric field. Aggregate duplicate names before plotting. Radial bars compare
relative magnitudes using an automatic scale; they do not represent progress
against a target.

| Option | Available on | Default |
| --- | --- | --- |
| `title`, `description` | All charts | No header text |
| `show_legend` | All charts | `None`, show for multiple series or segments |
| `show_tooltip` | All charts | `True` |
| `stacked` | Area, bar | `False` |
| `horizontal` | Bar | `False` |
| `donut` | Pie | `False` |
| `key` | All charts | Automatic; use a stable key for data updates |
| `width` | All charts | `"stretch"`, or a positive pixel width |

Charts support up to 1,000 rows and five series. Pie and radial support up to
five segments, matching the pinned shadcn palette. Filter or aggregate larger
datasets before plotting. Text is limited to 16 KiB per field and the component
payload to 2 MiB. Empty data and invalid fields raise Python errors before
mounting. Boolean measures, infinity, and magnitudes above `2**53 - 1` are invalid.

Line, area, and bar charts treat `None` and numeric NaN as missing values. Each
selected series needs at least one number. Radar requires at least three unique
categories with complete non-negative values. Pie and radial also require
complete non-negative values and at least one positive value.

The API uses the generated chart container's responsive aspect ratio. There
are no height, CSS, color, formatter, click callback, or raw Recharts options.
All functions return `None`. For access to every value without hovering,
render the same records with `ui.table`. Charts are standalone components and
are not currently available inside `ui.elements`.
