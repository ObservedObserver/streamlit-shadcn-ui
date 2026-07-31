from __future__ import annotations

import re
from typing import Callable, Optional, Union

from .._protocol import validate_text
from ._common import boolean, enum_value, mount_stateful


def input_otp(
    label: str = "One-time password",
    value: str = "",
    *,
    max_length: int = 6,
    key: Optional[str] = None,
    pattern: str = "digits",
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> str:
    """Render a persistent shadcn OTP Input."""

    value = validate_text(value, "value")
    label = validate_text(label, "label")
    pattern = enum_value(
        pattern,
        {"digits", "alphanumeric"},
        "pattern",
    )
    if (
        isinstance(max_length, bool)
        or not isinstance(max_length, int)
        or not 1 <= max_length <= 12
    ):
        raise ValueError("max_length must be between 1 and 12.")
    expression = (
        re.compile(r"^\d*$")
        if pattern == "digits"
        else re.compile(r"^[a-zA-Z0-9]*$")
    )
    if len(value) > max_length or not expression.fullmatch(
        value
    ):
        raise ValueError("value does not match the OTP policy.")

    value = mount_stateful(
        key=key,
        kind="input_otp",
        default_value=value,
        is_valid_value=lambda candidate: (
            isinstance(candidate, str)
            and len(candidate.encode("utf-8")) <= 16 * 1024
            and len(candidate) <= max_length
            and expression.fullmatch(candidate) is not None
        ),
        props={
            "label": label,
            "maxLength": max_length,
            "pattern": pattern,
            "disabled": boolean(disabled, "disabled"),
        },
        width=width,
        on_change=on_change,
    )
    return str(value)
