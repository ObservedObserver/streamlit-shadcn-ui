from __future__ import annotations

from typing import Callable, Optional, Union

from .._protocol import validate_text
from ._common import boolean, enum_value, mount_stateful, utf16_length


def input(
    label: str,
    value: str = "",
    *,
    key: Optional[str] = None,
    type: str = "text",
    placeholder: Optional[str] = None,
    disabled: bool = False,
    max_length: Optional[int] = None,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> str:
    """Render a persistent shadcn text Input."""

    value = validate_text(value, "value")
    label = validate_text(label, "label")
    input_type = enum_value(
        type,
        {"text", "email", "password", "search", "tel", "url"},
        "type",
    )
    placeholder_value = validate_text(
        placeholder or "",
        "placeholder",
    )
    if max_length is not None:
        if (
            isinstance(max_length, bool)
            or not isinstance(max_length, int)
            or not 1 <= max_length <= 16 * 1024
        ):
            raise ValueError("max_length must be between 1 and 16,384.")
        if utf16_length(value) > max_length:
            raise ValueError("value exceeds max_length.")

    value = mount_stateful(
        key=key,
        kind="input",
        default_value=value,
        is_valid_value=lambda candidate: (
            isinstance(candidate, str)
            and len(candidate.encode("utf-8")) <= 16 * 1024
            and (
                max_length is None
                or utf16_length(candidate) <= max_length
            )
        ),
        props={
            "label": label,
            "placeholder": placeholder_value,
            "type": input_type,
            "disabled": boolean(disabled, "disabled"),
            "maxLength": max_length,
        },
        width=width,
        on_change=on_change,
    )
    return str(value)
