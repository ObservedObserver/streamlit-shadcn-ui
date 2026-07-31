from __future__ import annotations

import math
from typing import Callable, List, Optional, Sequence, Union

from .._protocol import validate_text
from ._common import boolean, mount_stateful


Number = Union[int, float]


def slider(
    label: str,
    min_value: Number = 0,
    max_value: Number = 100,
    value: Optional[Union[Number, Sequence[Number]]] = None,
    step: Number = 1,
    *,
    key: Optional[str] = None,
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> Union[Number, tuple]:
    """Render a persistent single-value or range shadcn Slider."""

    raw_numbers = [min_value, max_value, step]
    if any(
        isinstance(value, bool) or not isinstance(value, (int, float))
        for value in raw_numbers
    ):
        raise TypeError("Slider bounds and step must be numbers.")
    numbers = [float(value) for value in raw_numbers]
    if any(not math.isfinite(value) for value in numbers):
        raise ValueError("Slider bounds and step must be finite.")
    minimum, maximum, step_value = numbers
    if maximum <= minimum:
        raise ValueError("max_value must be greater than min_value.")
    if step_value <= 0 or step_value > maximum - minimum:
        raise ValueError("step must be positive and within the slider range.")
    is_range = value is not None and not isinstance(value, (int, float))
    if value is None:
        raw_initial = [min_value]
    elif isinstance(value, (int, float)) and not isinstance(value, bool):
        raw_initial = [value]
    else:
        if isinstance(value, (str, bytes)):
            raise TypeError("value must be a number or a two-item sequence.")
        try:
            raw_initial = list(value)
        except TypeError as error:
            raise TypeError(
                "value must be a number or a two-item sequence."
            ) from error
    if any(
        isinstance(value, bool) or not isinstance(value, (int, float))
        for value in raw_initial
    ):
        raise TypeError("value entries must be numbers.")
    initial: List[float] = [float(value) for value in raw_initial]
    if len(initial) != (2 if is_range else 1):
        raise ValueError("A range value must contain exactly two values.")
    if any(
        not math.isfinite(value) or value < minimum or value > maximum
        for value in initial
    ):
        raise ValueError("value must be within the slider range.")
    if len(initial) == 2 and initial[0] > initial[1]:
        raise ValueError("Slider range values must be ascending.")
    label_value = validate_text(label, "label")
    preserve_int = all(
        isinstance(item, int) and not isinstance(item, bool)
        for item in [min_value, max_value, step, *raw_initial]
    )

    def valid(candidate: object) -> bool:
        return (
            isinstance(candidate, list)
            and len(candidate) in (1, 2)
            and all(
                isinstance(item, (int, float))
                and not isinstance(item, bool)
                and math.isfinite(float(item))
                and minimum <= float(item) <= maximum
                for item in candidate
            )
            and (
                len(candidate) == 1
                or float(candidate[0]) <= float(candidate[1])
            )
        )

    value = mount_stateful(
        key=key,
        kind="slider",
        default_value=initial,
        is_valid_value=valid,
        props={
            "label": label_value,
            "min": minimum,
            "max": maximum,
            "step": step_value,
            "disabled": boolean(disabled, "disabled"),
        },
        width=width,
        on_change=on_change,
    )
    normalized = [float(item) for item in value]
    if preserve_int:
        converted = [int(item) for item in normalized]
    else:
        converted = normalized
    if is_range:
        return tuple(converted)
    return converted[0]
