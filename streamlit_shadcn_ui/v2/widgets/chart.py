from __future__ import annotations

import math
from datetime import date, datetime
from itertools import islice
from numbers import Integral, Real
from typing import Any, Iterable, Mapping, Optional, Union

from .._protocol import validate_text
from ._common import boolean, mount_stateless, optional_text

Series = Optional[Union[str, Iterable[str], Mapping[str, str]]]
Width = Union[str, int]
_MAX_ROWS = 1000
_MAX_SERIES = 5
_MAX_NUMBER = 2**53 - 1


def line_chart(
    data: Any,
    x: Optional[str] = None,
    y: Series = None,
    *,
    title: Optional[str] = None,
    description: Optional[str] = None,
    show_legend: Optional[bool] = None,
    show_tooltip: bool = True,
    key: Optional[str] = None,
    width: Width = "stretch",
) -> None:
    """Render a shadcn line chart. None and NaN measures leave gaps."""
    _chart(
        "line", data, x, y, title, description, show_legend, show_tooltip, key, width
    )


def area_chart(
    data: Any,
    x: Optional[str] = None,
    y: Series = None,
    *,
    stacked: bool = False,
    title: Optional[str] = None,
    description: Optional[str] = None,
    show_legend: Optional[bool] = None,
    show_tooltip: bool = True,
    key: Optional[str] = None,
    width: Width = "stretch",
) -> None:
    """Render a shadcn area chart, optionally stacking selected series."""
    _chart(
        "area",
        data,
        x,
        y,
        title,
        description,
        show_legend,
        show_tooltip,
        key,
        width,
        stacked=stacked,
    )


def bar_chart(
    data: Any,
    x: Optional[str] = None,
    y: Series = None,
    *,
    stacked: bool = False,
    horizontal: bool = False,
    title: Optional[str] = None,
    description: Optional[str] = None,
    show_legend: Optional[bool] = None,
    show_tooltip: bool = True,
    key: Optional[str] = None,
    width: Width = "stretch",
) -> None:
    """Render shadcn bars, optionally stacked or horizontal."""
    _chart(
        "bar",
        data,
        x,
        y,
        title,
        description,
        show_legend,
        show_tooltip,
        key,
        width,
        stacked=stacked,
        horizontal=horizontal,
    )


def pie_chart(
    data: Any,
    names: Optional[str] = None,
    values: Optional[str] = None,
    *,
    donut: bool = False,
    title: Optional[str] = None,
    description: Optional[str] = None,
    show_legend: Optional[bool] = None,
    show_tooltip: bool = True,
    key: Optional[str] = None,
    width: Width = "stretch",
) -> None:
    """Render a shadcn pie or donut with up to five non-negative segments."""
    _chart(
        "pie",
        data,
        names,
        values,
        title,
        description,
        show_legend,
        show_tooltip,
        key,
        width,
        donut=donut,
    )


def radar_chart(
    data: Any,
    x: Optional[str] = None,
    y: Series = None,
    *,
    title: Optional[str] = None,
    description: Optional[str] = None,
    show_legend: Optional[bool] = None,
    show_tooltip: bool = True,
    key: Optional[str] = None,
    width: Width = "stretch",
) -> None:
    """Render shadcn radar series over at least three distinct categories."""
    _chart(
        "radar", data, x, y, title, description, show_legend, show_tooltip, key, width
    )


def radial_chart(
    data: Any,
    names: Optional[str] = None,
    values: Optional[str] = None,
    *,
    title: Optional[str] = None,
    description: Optional[str] = None,
    show_legend: Optional[bool] = None,
    show_tooltip: bool = True,
    key: Optional[str] = None,
    width: Width = "stretch",
) -> None:
    """Render relative magnitudes as shadcn radial bars, not goal percentages."""
    _chart(
        "radial",
        data,
        names,
        values,
        title,
        description,
        show_legend,
        show_tooltip,
        key,
        width,
    )


def _records(data: Any) -> list[Mapping[str, Any]]:
    if hasattr(data, "to_dict"):
        columns = getattr(data, "columns", None)
        if columns is not None and len(set(columns)) != len(columns):
            raise ValueError("Chart DataFrame columns must be unique.")
        if hasattr(data, "__len__") and len(data) > _MAX_ROWS:
            raise ValueError("Charts support at most 1,000 rows.")
        data = data.to_dict("records")
    if isinstance(data, (Mapping, str, bytes)):
        raise TypeError(
            "Chart data must be an iterable of row mappings or a DataFrame."
        )
    try:
        rows = list(islice(iter(data), _MAX_ROWS + 1))
    except TypeError as exc:
        raise TypeError(
            "Chart data must be an iterable of row mappings or a DataFrame."
        ) from exc
    if not rows or len(rows) > _MAX_ROWS:
        raise ValueError("Charts require between 1 and 1,000 rows.")
    for row in rows:
        if not isinstance(row, Mapping):
            raise TypeError("Each chart row must be a mapping.")
        for field in row:
            _field(field)
    return rows


def _field(value: str) -> str:
    value = validate_text(value, "chart field")
    if not value:
        raise ValueError("Chart field names must not be empty.")
    return value


def _measure(value: Any, *, gaps: bool) -> Optional[Union[int, float]]:
    if value is None:
        if gaps:
            return None
        raise ValueError("This chart requires complete numeric values.")
    if isinstance(value, bool) or not isinstance(value, Real):
        raise TypeError("Chart measures must be real numbers, not booleans or strings.")
    # Check magnitude before conversion so huge integers cannot overflow float().
    if abs(value) > _MAX_NUMBER:
        raise ValueError(
            "Chart measures must be finite and within JavaScript's safe numeric range."
        )
    number = int(value) if isinstance(value, Integral) else float(value)
    if math.isnan(number) and gaps:
        return None
    if not math.isfinite(number):
        raise ValueError("This chart requires finite numeric values.")
    return number


def _category(value: Any) -> str:
    if isinstance(value, (datetime, date)):
        value = value.isoformat()
        if value == "NaT":
            raise ValueError("Chart categories must contain valid dates, not NaT.")
    elif isinstance(value, Real) and not isinstance(value, bool):
        value = str(_measure(value, gaps=False))
    value = validate_text(value, "chart category")
    if not value:
        raise ValueError("Chart categories must not be empty.")
    return value


def _series(
    rows: list[Mapping[str, Any]], category: str, y: Series
) -> list[tuple[str, str]]:
    if y is None:
        fields = []
        for field in rows[0]:
            if field == category:
                continue
            values = [row.get(field) for row in rows]
            # Nonnumeric fields are metadata. Selected fields still receive full
            # validation below, including infinity and missing-key checks.
            if all(
                v is None or isinstance(v, Real) and not isinstance(v, bool)
                for v in values
            ):
                if any(v is not None and v == v for v in values):
                    fields.append((field, field))
    elif isinstance(y, str):
        fields = [(y, y)]
    elif isinstance(y, Mapping):
        fields = list(islice(y.items(), _MAX_SERIES + 1))
    else:
        fields = [(field, field) for field in islice(iter(y), _MAX_SERIES + 1)]
    if not 1 <= len(fields) <= _MAX_SERIES:
        raise ValueError(
            "Select between one and five numeric chart series using y or values."
        )
    seen = set()
    for field, label in fields:
        _field(field)
        validate_text(label, "series label")
        if not label or field == category or field in seen:
            raise ValueError(
                "Chart series must be distinct from each other and the category field, with nonempty labels."
            )
        if any(field not in row for row in rows):
            raise ValueError("Selected chart field %r is missing from a row." % field)
        seen.add(field)
    return fields


def _chart(
    chart_type: str,
    data: Any,
    x: Optional[str],
    y: Series,
    title: Optional[str],
    description: Optional[str],
    show_legend: Optional[bool],
    show_tooltip: bool,
    key: Optional[str],
    width: Width,
    *,
    stacked: bool = False,
    horizontal: bool = False,
    donut: bool = False,
) -> None:
    segmented = chart_type in {"pie", "radial"}
    if width != "stretch" and (
        isinstance(width, bool) or not isinstance(width, int) or width <= 0
    ):
        raise ValueError('Chart width must be "stretch" or a positive integer.')
    if segmented and y is not None and not isinstance(y, str):
        raise TypeError("values must name one numeric field.")
    rows = _records(data)
    category = _field(x if x is not None else next(iter(rows[0]), ""))
    if any(category not in row for row in rows):
        raise ValueError("The chart category field is missing from a row.")
    labels = [_category(row[category]) for row in rows]
    fields = _series(rows, category, y)
    if segmented and len(fields) != 1:
        raise ValueError("Choose exactly one numeric field with values.")
    if segmented and len(rows) > _MAX_SERIES:
        raise ValueError(
            "Pie and radial charts support at most five segments. Aggregate the data first."
        )
    polar = segmented or chart_type == "radar"
    if polar and len(set(labels)) != len(labels):
        raise ValueError(
            "Polar chart categories must be unique. Aggregate duplicate categories first."
        )
    if chart_type == "radar" and len(rows) < 3:
        raise ValueError("Radar charts require at least three categories.")
    numbers = [
        [_measure(row[field], gaps=not polar) for field, _ in fields] for row in rows
    ]
    if polar and any(v < 0 for row in numbers for v in row):
        raise ValueError("Polar chart values must be non-negative.")
    if segmented and not any(row[0] > 0 for row in numbers):
        raise ValueError("Pie and radial charts require a positive total.")
    if any(all(row[i] is None for row in numbers) for i in range(len(fields))):
        raise ValueError("Each chart series needs at least one numeric value.")
    if segmented:
        series = [
            {"key": "segment-%d" % i, "label": label} for i, label in enumerate(labels)
        ]
        normalized = [
            {"category": series[i]["key"], "value": row[0]}
            for i, row in enumerate(numbers)
        ]
    else:
        series = [
            {"key": "series-%d" % i, "label": label}
            for i, (_, label) in enumerate(fields)
        ]
        normalized = [
            {
                "category": labels[i],
                **{s["key"]: value for s, value in zip(series, row)},
            }
            for i, row in enumerate(numbers)
        ]
    mount_stateless(
        key=key,
        kind="chart",
        width=width,
        props={
            "chartType": chart_type,
            "data": normalized,
            "series": series,
            "title": optional_text(title, "title"),
            "description": optional_text(description, "description"),
            "showLegend": len(series) > 1
            if show_legend is None
            else boolean(show_legend, "show_legend"),
            "showTooltip": boolean(show_tooltip, "show_tooltip"),
            "stacked": boolean(stacked, "stacked"),
            "horizontal": boolean(horizontal, "horizontal"),
            "donut": boolean(donut, "donut"),
        },
    )
