from __future__ import annotations

import datetime
import re
from typing import Callable, Optional, Union

from ._common import mount_stateful


_ISO_DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def _date_value(
    value: Optional[Union[str, datetime.date]],
    field: str,
) -> Optional[str]:
    if value is None:
        return None
    if isinstance(value, datetime.datetime):
        value = value.date()
    if isinstance(value, datetime.date):
        return value.isoformat()
    if not isinstance(value, str) or not _ISO_DATE.fullmatch(value):
        raise ValueError("%s must be an ISO date (YYYY-MM-DD)." % field)
    try:
        datetime.date.fromisoformat(value)
    except ValueError as error:
        raise ValueError(
            "%s must be a valid ISO date (YYYY-MM-DD)." % field
        ) from error
    return value


def _valid_date_candidate(
    candidate: object,
    minimum: Optional[str],
    maximum: Optional[str],
) -> bool:
    if candidate is None:
        return True
    if not isinstance(candidate, str):
        return False
    try:
        normalized = _date_value(candidate, "calendar value")
    except ValueError:
        return False
    return (
        normalized is not None
        and (minimum is None or normalized >= minimum)
        and (maximum is None or normalized <= maximum)
    )


def calendar(
    *,
    key: str,
    value: Optional[Union[str, datetime.date]] = None,
    label: str = "Calendar",
    min_date: Optional[Union[str, datetime.date]] = None,
    max_date: Optional[Union[str, datetime.date]] = None,
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> Optional[str]:
    """Render a persistent single-date shadcn Calendar."""

    from .._protocol import validate_text

    initial = _date_value(value, "value")
    minimum = _date_value(min_date, "min_date")
    maximum = _date_value(max_date, "max_date")
    label = validate_text(label, "label")
    if minimum is not None and maximum is not None and minimum > maximum:
        raise ValueError("min_date must not be later than max_date.")
    if initial is not None and (
        (minimum is not None and initial < minimum)
        or (maximum is not None and initial > maximum)
    ):
        raise ValueError("value must be within the calendar bounds.")

    result = mount_stateful(
        key=key,
        kind="calendar",
        default_value=initial,
        is_valid_value=lambda candidate: _valid_date_candidate(
            candidate,
            minimum,
            maximum,
        ),
        props={
            "label": label,
            "minDate": minimum,
            "maxDate": maximum,
            "disabled": bool(disabled),
        },
        width=width,
        on_change=on_change,
    )
    return result
