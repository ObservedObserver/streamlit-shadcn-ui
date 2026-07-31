from __future__ import annotations

import math
from typing import Optional, Union

from ._common import mount_stateless, optional_text


def progress(
    value: float = 0,
    *,
    key: str,
    label: Optional[str] = None,
    show_value: bool = False,
    width: Union[str, int] = "stretch",
) -> None:
    """Render a shadcn Base UI Progress indicator."""

    if (
        isinstance(value, bool)
        or not isinstance(value, (int, float))
        or not math.isfinite(float(value))
        or float(value) < 0
        or float(value) > 100
    ):
        raise ValueError("value must be a finite number from 0 to 100.")
    mount_stateless(
        key=key,
        kind="progress",
        props={
            "value": float(value),
            "label": optional_text(label, "label"),
            "showValue": bool(show_value),
        },
        width=width,
    )
