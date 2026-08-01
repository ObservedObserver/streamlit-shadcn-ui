from __future__ import annotations

from typing import Callable, Iterable, Optional, TypeVar, Union

from .._protocol import validate_text
from ._common import (
    boolean,
    mount_stateful,
    normalize_choices,
    token_for_value,
)


T = TypeVar("T")


def radio_group(
    label: str,
    options: Iterable[T],
    *,
    value: Optional[T] = None,
    index: Optional[int] = 0,
    format_func: Callable[[T], str] = str,
    key: Optional[str] = None,
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> Optional[T]:
    """Render a persistent shadcn Radio Group."""

    choices, values_by_token = normalize_choices(options, format_func)
    if value is not None:
        initial = token_for_value(
            value,
            choices,
            values_by_token,
            "value",
        )
    elif index is None or not choices:
        initial = None
    else:
        if isinstance(index, bool) or not isinstance(index, int):
            raise TypeError("index must be an integer or None.")
        if index < 0 or index >= len(choices):
            raise IndexError("index is outside the available option range.")
        initial = choices[index]["value"]
    label = validate_text(label, "label")

    token = mount_stateful(
        key=key,
        kind="radio_group",
        default_value=initial,
        is_valid_value=lambda candidate: (
            candidate is None or candidate in values_by_token
        ),
        props={
            "label": label,
            "options": choices,
            "disabled": boolean(disabled, "disabled"),
        },
        width=width,
        on_change=on_change,
    )
    return None if token is None else values_by_token[token]
