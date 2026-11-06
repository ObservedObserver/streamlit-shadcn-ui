from __future__ import annotations

from dataclasses import dataclass
import math
from typing import Any, Callable, Iterable, Mapping, Optional, Union

from .._component import get_result_value, mount, noop_callback, private_component_key
from .._protocol import (
    metadata_cell,
    prepare_state,
    register_kind,
    validate_envelope,
    validate_text,
)
from .._streamlit_compat import fail_if_trigger_in_form
from ._common import boolean, enum_value

RowId = Union[str, int]


@dataclass(frozen=True)
class DataTableAction:
    row_id: RowId
    action_id: str


@dataclass(frozen=True)
class DataTableResult:
    selected_ids: list[RowId]
    action: Optional[DataTableAction] = None


def _id_token(value: Any) -> str:
    if isinstance(value, bool) or not isinstance(value, (str, int)):
        raise TypeError("Row IDs must be strings or integers, not booleans.")
    token = ("i:" if isinstance(value, int) else "s:") + str(value)
    if token == "s:":
        raise ValueError("Row IDs must not be empty.")
    return validate_text(token, "row ID")


def _cell(value: Any) -> Any:
    if value is None or isinstance(value, bool):
        return value
    if isinstance(value, str):
        return validate_text(value, "table cell")
    if isinstance(value, (int, float)):
        if abs(value) > 9_007_199_254_740_991 or not math.isfinite(value):
            raise ValueError(
                "Numeric cells must be finite and within JavaScript's safe range; use text for larger values."
            )
        return value
    raise TypeError("Cells must be text, finite numbers, booleans, or None.")


def _selection(value: Any) -> bool:
    return (
        isinstance(value, list)
        and len(value) <= 1000
        and all(isinstance(item, str) for item in value)
        and len(value) == len(set(value))
    )


def _action(
    raw: Any, ids: Mapping[str, RowId], actions: list[dict]
) -> Optional[DataTableAction]:
    if not isinstance(raw, Mapping):
        return None
    row, action = raw.get("rowId"), raw.get("actionId")
    if not isinstance(row, str) or row not in ids or not isinstance(action, str):
        return None
    if not any(item["id"] == action and not item["disabled"] for item in actions):
        return None
    return DataTableAction(ids[row], action)


def data_table(
    data: Any,
    columns: Optional[Iterable[Union[str, Mapping[str, Any]]]] = None,
    *,
    key: str,
    row_id: str,
    page_size: int = 10,
    selection_mode: str = "multiple",
    selected_ids: Iterable[RowId] = (),
    actions: Iterable[Mapping[str, Any]] = (),
    on_select: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> DataTableResult:
    """Render a bounded, interactive record table with stable row identities."""
    if not isinstance(key, str) or not key:
        raise ValueError("data_table requires a nonempty key.")
    row_id = validate_text(row_id, "row_id")
    selection_mode = enum_value(
        selection_mode, {"none", "single", "multiple"}, "selection_mode"
    )
    if (
        isinstance(page_size, bool)
        or not isinstance(page_size, int)
        or not 1 <= page_size <= 100
    ):
        raise ValueError("page_size must be an integer from 1 to 100.")
    if on_select is not None and not callable(on_select):
        raise TypeError("on_select must be callable.")
    if hasattr(data, "to_dict"):
        data = data.to_dict("records")
    if isinstance(data, (Mapping, str, bytes)):
        raise TypeError("data must be an iterable of row mappings.")
    records = list(data)
    if len(records) > 1000:
        raise ValueError("Data Table supports up to 1,000 rows.")
    if any(not isinstance(record, Mapping) for record in records):
        raise TypeError("Each row must be a mapping.")
    ids = {}
    for record in records:
        if row_id not in record:
            raise ValueError("Every row must contain row_id.")
        token = _id_token(record[row_id])
        if token in ids:
            raise ValueError("Row IDs must be unique.")
        ids[token] = record[row_id]
    raw_columns = (
        list(columns) if columns is not None else list(records[0]) if records else []
    )
    if len(raw_columns) > 50:
        raise ValueError("Data Table supports up to 50 columns.")
    normalized_columns = []
    for raw in raw_columns:
        if isinstance(raw, str):
            raw = {"key": raw}
        if not isinstance(raw, Mapping):
            raise TypeError("Columns must be field names or mappings.")
        name = validate_text(raw.get("key"), "column key")
        if not name or name in [c["key"] for c in normalized_columns]:
            raise ValueError("Column keys must be nonempty and unique.")
        normalized_columns.append(
            {
                "key": name,
                "label": validate_text(raw.get("label", name), "column label"),
            }
        )
    rows = [
        {
            "id": token,
            "cells": [_cell(record.get(c["key"])) for c in normalized_columns],
        }
        for token, record in zip(ids, records)
    ]
    for i in range(len(normalized_columns)):
        kinds = {
            "boolean"
            if isinstance(row["cells"][i], bool)
            else "number"
            if isinstance(row["cells"][i], (int, float))
            else "text"
            for row in rows
            if row["cells"][i] is not None
        }
        if len(kinds) > 1:
            raise ValueError("Each column must contain one scalar type, plus None.")
    normalized_actions = []
    for raw in actions:
        if not isinstance(raw, Mapping):
            raise TypeError("Actions must be mappings with id and label.")
        action_id = validate_text(raw.get("id"), "action id")
        if not action_id or action_id in [a["id"] for a in normalized_actions]:
            raise ValueError("Action IDs must be nonempty and unique.")
        normalized_actions.append(
            {
                "id": action_id,
                "label": validate_text(raw.get("label", action_id), "action label"),
                "disabled": boolean(raw.get("disabled", False), "action disabled"),
            }
        )
    if len(normalized_actions) > 20:
        raise ValueError("Data Table supports up to 20 actions.")
    if normalized_actions:
        fail_if_trigger_in_form("data_table with row actions")
    defaults = [_id_token(item) for item in selected_ids]
    if len(set(defaults)) != len(defaults) or any(item not in ids for item in defaults):
        raise ValueError("selected_ids must be unique IDs in data.")
    if (selection_mode == "none" and defaults) or (
        selection_mode == "single" and len(defaults) > 1
    ):
        raise ValueError("selected_ids does not match selection_mode.")
    mount_key = private_component_key(key=key, kind="data_table", identity={})
    state = prepare_state(
        key=mount_key,
        kind="data_table",
        default_value=defaults,
        is_valid_value=_selection,
    )
    cleaned = (
        [item for item in state["value"] if item in ids]
        if selection_mode != "none"
        else []
    )
    if selection_mode == "single":
        cleaned = cleaned[:1]
    if cleaned != state["value"]:
        entry = register_kind(mount_key, "data_table")
        revision = max(entry.get("server_revision", 0), state["serverRevision"]) + 1
        entry["server_revision"] = revision
        entry["pending_reset"] = {
            "value": cleaned,
            "clientRevision": state["clientRevision"],
        }
        state = {**state, "value": cleaned, "serverRevision": revision}
    envelope = validate_envelope(
        {
            "protocolVersion": 1,
            "kind": "data_table",
            "state": state,
            "props": {
                "columns": normalized_columns,
                "rows": rows,
                "pageSize": page_size,
                "selectionMode": selection_mode,
                "actions": normalized_actions,
            },
        }
    )
    callbacks = {"on_state_change": on_select or noop_callback}
    if normalized_actions:
        callbacks["on_action_change"] = noop_callback
    result = mount(
        key=mount_key,
        data=envelope,
        default={"meta": metadata_cell("data_table"), "state": state},
        width=width,
        callbacks=callbacks,
    )
    return DataTableResult(
        [ids[item] for item in state["value"]],
        _action(get_result_value(result, "action"), ids, normalized_actions),
    )
