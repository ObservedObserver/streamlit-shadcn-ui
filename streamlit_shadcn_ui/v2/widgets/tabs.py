from __future__ import annotations

from typing import Callable, Iterable, Optional, TypeVar, Union

from .._protocol import validate_text
from ._common import (
    boolean,
    enum_value,
    mount_stateful,
    normalize_choices,
    token_for_value,
)


T = TypeVar("T")


def tabs(
    options: Iterable[T],
    *,
    value: Optional[T] = None,
    format_func: Callable[[T], str] = str,
    key: Optional[str] = None,
    label: str = "Tabs",
    orientation: str = "horizontal",
    variant: str = "default",
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> T:
    """Render controlled shadcn Tabs that return the selected value."""

    choices, values_by_token = normalize_choices(options, format_func)
    if not choices:
        raise ValueError("Tabs require at least one option.")
    if value is None:
        initial = choices[0]["value"]
    else:
        initial = token_for_value(
            value,
            choices,
            values_by_token,
            "value",
        )
    label = validate_text(label, "label")
    orientation = enum_value(
        orientation,
        {"horizontal", "vertical"},
        "orientation",
    )
    variant = enum_value(
        variant,
        {"default", "line"},
        "variant",
    )

    token = mount_stateful(
        key=key,
        kind="tabs",
        default_value=initial,
        is_valid_value=lambda candidate: candidate in values_by_token,
        props={
            "label": label,
            "options": choices,
            "orientation": orientation,
            "variant": variant,
            "disabled": boolean(disabled, "disabled"),
        },
        width=width,
        on_change=on_change,
    )
    return values_by_token[token]
