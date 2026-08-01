from __future__ import annotations

from typing import Any, Iterable, List, Mapping, Optional, Union

from ._common import mount_stateless, optional_text, table_cell
from .._protocol import validate_collection_size, validate_text
from ..types import TableColumn

_ALIGNMENTS = {"left", "center", "right"}


def table(
    data: Any,
    columns: Optional[
        Iterable[Union[TableColumn, Mapping[str, Any]]]
    ] = None,
    *,
    key: Optional[str] = None,
    caption: Optional[str] = None,
    max_height: Optional[int] = None,
    width: Union[str, int] = "stretch",
) -> None:
    """Render bounded record data with the shadcn Table primitives."""

    records = _records(data)
    normalized_columns = _columns(records, columns)
    validate_collection_size(normalized_columns, "table columns")
    validate_collection_size(records, "table rows")
    rows = [
        [
            table_cell(record.get(column["key"]))
            for column in normalized_columns
        ]
        for record in records
    ]
    normalized_height = _max_height(max_height)
    mount_stateless(
        key=key,
        kind="table",
        props={
            "columns": normalized_columns,
            "rows": rows,
            "caption": optional_text(caption, "caption"),
            "maxHeight": normalized_height,
        },
        width=width,
    )


def _records(data: Any) -> List[Mapping[str, Any]]:
    if hasattr(data, "to_dict"):
        data = data.to_dict("records")
    if isinstance(data, Mapping) or isinstance(data, (str, bytes)):
        raise TypeError("table data must be an iterable of row mappings.")
    try:
        records = list(data)
    except TypeError as exc:
        raise TypeError(
            "table data must be an iterable of row mappings."
        ) from exc
    if any(not isinstance(row, Mapping) for row in records):
        raise TypeError("Each table row must be a mapping.")
    return records


def _columns(
    records: List[Mapping[str, Any]],
    columns: Optional[
        Iterable[Union[TableColumn, Mapping[str, Any]]]
    ],
) -> List[Mapping[str, str]]:
    if columns is None:
        keys = list(records[0].keys()) if records else []
        return [
            {
                "key": validate_text(str(key), "column key"),
                "label": validate_text(str(key), "column label"),
                "align": "left",
            }
            for key in keys
        ]

    normalized = []
    seen = set()
    for column in columns:
        if isinstance(column, TableColumn):
            column = {
                "key": column.key,
                "label": column.label,
                "align": column.align,
            }
        elif not isinstance(column, Mapping):
            raise TypeError(
                "Each table column must be a TableColumn or mapping."
            )
        key = validate_text(
            str(column.get("key", column.get("dataKey", ""))),
            "column key",
        )
        if key in seen:
            raise ValueError("Table column keys must be unique.")
        seen.add(key)
        raw_label = column.get("label")
        label = validate_text(
            key if raw_label is None else str(raw_label),
            "column label",
        )
        align = validate_text(str(column.get("align", "left")), "align")
        if align not in _ALIGNMENTS:
            raise ValueError("Column align must be left, center, or right.")
        normalized.append({"key": key, "label": label, "align": align})
    return normalized


def _max_height(value: Optional[int]) -> Optional[int]:
    if value is None:
        return None
    if (
        isinstance(value, bool)
        or not isinstance(value, int)
        or value < 80
        or value > 10_000
    ):
        raise ValueError("max_height must be an integer from 80 to 10,000.")
    return value
