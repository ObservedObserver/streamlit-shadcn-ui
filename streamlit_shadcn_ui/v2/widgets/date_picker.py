from __future__ import annotations

import datetime
from typing import Callable, List, Optional, Sequence, Union

from ._common import boolean, enum_value, mount_stateful, optional_text
from .calendar import _date_value, _valid_date_candidate
from .._protocol import validate_text


DateInput = Union[str, datetime.date]
DatePickerInput = Optional[Union[DateInput, Sequence[DateInput]]]
DatePickerWireValue = Optional[Union[str, List[str]]]
DatePickerValue = Optional[
    Union[datetime.date, tuple]
]


def _normalize_value(
    value: DatePickerInput,
    mode: str,
) -> DatePickerWireValue:
    if mode == "single":
        if isinstance(value, Sequence) and not isinstance(value, str):
            raise TypeError(
                "value must be one date when selection_mode is 'single'."
            )
        return _date_value(value, "default_value")

    if value is None:
        return None
    if isinstance(value, str) or not isinstance(value, Sequence):
        raise TypeError(
            "value must contain two dates when selection_mode is 'range'."
        )
    if len(value) != 2:
        raise ValueError(
            "value must contain exactly two dates in range mode."
        )
    start = _date_value(value[0], "default_value start")
    end = _date_value(value[1], "default_value end")
    if start is None or end is None:
        raise ValueError("Range dates cannot be None.")
    if start > end:
        raise ValueError("Range start must not be later than range end.")
    return [start, end]


def _valid_value(
    candidate: object,
    mode: str,
    minimum: Optional[str],
    maximum: Optional[str],
) -> bool:
    if candidate is None:
        return True
    if mode == "single":
        return _valid_date_candidate(candidate, minimum, maximum)
    if (
        not isinstance(candidate, list)
        or len(candidate) != 2
        or not all(
            _valid_date_candidate(item, minimum, maximum)
            for item in candidate
        )
    ):
        return False
    return candidate[0] <= candidate[1]


def date_picker(
    label: str = "Date",
    value: DatePickerInput = None,
    *,
    selection_mode: str = "single",
    key: Optional[str] = None,
    placeholder: str = "Pick a date",
    min_date: Optional[DateInput] = None,
    max_date: Optional[DateInput] = None,
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> DatePickerValue:
    """Render a persistent single-date or range shadcn Date Picker."""

    normalized_mode = enum_value(
        selection_mode,
        {"single", "range"},
        "selection_mode",
    )
    initial = _normalize_value(value, normalized_mode)
    minimum = _date_value(min_date, "min_date")
    maximum = _date_value(max_date, "max_date")
    normalized_label = optional_text(label, "label")
    normalized_placeholder = validate_text(placeholder, "placeholder")

    if minimum is not None and maximum is not None and minimum > maximum:
        raise ValueError("min_date must not be later than max_date.")
    if not _valid_value(initial, normalized_mode, minimum, maximum):
        raise ValueError("value must be within the date picker bounds.")

    result = mount_stateful(
        key=key,
        kind="date_picker",
        default_value=initial,
        is_valid_value=lambda candidate: _valid_value(
            candidate,
            normalized_mode,
            minimum,
            maximum,
        ),
        props={
            "label": normalized_label,
            "mode": normalized_mode,
            "placeholder": normalized_placeholder,
            "minDate": minimum,
            "maxDate": maximum,
            "disabled": boolean(disabled, "disabled"),
        },
        width=width,
        on_change=on_change,
    )
    if result is None:
        return None
    if normalized_mode == "single":
        return datetime.date.fromisoformat(result)
    return tuple(datetime.date.fromisoformat(item) for item in result)
