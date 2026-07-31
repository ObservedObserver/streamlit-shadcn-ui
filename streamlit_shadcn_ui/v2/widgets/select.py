from __future__ import annotations

from typing import (
    Any,
    Callable,
    Iterable,
    Optional,
    TypeVar,
    Union,
)

from .._protocol import validate_text
from ._common import (
    boolean,
    mount_stateful,
    normalize_choices,
    token_for_value,
)


T = TypeVar("T")


def select(
    label: str,
    options: Iterable[T],
    *,
    value: Optional[T] = None,
    index: Optional[int] = 0,
    format_func: Callable[[T], str] = str,
    key: Optional[str] = None,
    placeholder: str = "Select an option",
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> Optional[T]:
    """Render a shadcn Base UI Select in a Streamlit V2 ShadowRoot."""

    label = validate_text(label, "label")
    placeholder = validate_text(placeholder, "placeholder")
    choices, values_by_token = normalize_choices(
        options,
        format_func,
    )
    initial_token = _resolve_initial_token(
        choices,
        values_by_token,
        value=value,
        index=index,
    )
    allowed_tokens = set(values_by_token)
    token = mount_stateful(
        key=key,
        kind="select",
        default_value=initial_token,
        is_valid_value=lambda candidate: (
            candidate is None or candidate in allowed_tokens
        ),
        props={
            "disabled": boolean(disabled, "disabled"),
            "label": label,
            "options": choices,
            "placeholder": placeholder,
        },
        width=width,
        on_change=on_change,
    )
    return None if token is None else values_by_token[token]


def _resolve_initial_token(
    choices: list,
    values_by_token: dict,
    *,
    value: Any,
    index: Optional[int],
) -> Optional[str]:
    if value is not None:
        return token_for_value(
            value,
            choices,
            values_by_token,
            "value",
        )
    if index is None or not choices:
        return None
    if isinstance(index, bool) or not isinstance(index, int):
        raise TypeError("index must be an integer or None.")
    if index < 0 or index >= len(choices):
        raise IndexError("Select index is outside the available option range.")
    return choices[index]["value"]
