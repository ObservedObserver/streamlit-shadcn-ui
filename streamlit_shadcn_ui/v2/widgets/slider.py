from __future__ import annotations

import math
from typing import Callable, Iterable, List, Optional, Union

from .._protocol import validate_text
from ._common import mount_stateful


def slider(
    default_value: Optional[Iterable[float]] = None,
    min_value: float = 0,
    max_value: float = 100,
    step: float = 1,
    label: Optional[str] = None,
    *,
    key: str,
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> List[float]:
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
    raw_initial = list(
        default_value if default_value is not None else [minimum]
    )
    if any(
        isinstance(value, bool) or not isinstance(value, (int, float))
        for value in raw_initial
    ):
        raise TypeError("default_value entries must be numbers.")
    initial: List[float] = [float(value) for value in raw_initial]
    if len(initial) not in (1, 2):
        raise ValueError("default_value must contain one or two values.")
    if any(
        not math.isfinite(value) or value < minimum or value > maximum
        for value in initial
    ):
        raise ValueError("default_value must be within the slider range.")
    if len(initial) == 2 and initial[0] > initial[1]:
        raise ValueError("Slider range values must be ascending.")
    label_value = validate_text(label or "Slider", "label")

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
            "disabled": bool(disabled),
        },
        width=width,
        on_change=on_change,
    )
    return [float(item) for item in value]
