from __future__ import annotations

from typing import Any, Callable, Iterable, Optional, Union

from .._protocol import validate_text
from ._common import mount_stateful, normalize_choices


def radio_group(
    options: Iterable[Any],
    default_value: Optional[str] = None,
    *,
    key: str,
    label: str = "Options",
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> Optional[str]:
    """Render a persistent shadcn Radio Group."""

    choices = normalize_choices(options)
    values = {option["value"] for option in choices}
    if default_value is not None:
        default_value = validate_text(
            str(default_value),
            "default_value",
        )
        if default_value not in values:
            raise ValueError("default_value is not present in options.")
    label = validate_text(label, "label")

    value = mount_stateful(
        key=key,
        kind="radio_group",
        default_value=default_value,
        is_valid_value=lambda candidate: (
            candidate is None or candidate in values
        ),
        props={
            "label": label,
            "options": choices,
            "disabled": bool(disabled),
        },
        width=width,
        on_change=on_change,
    )
    return value
