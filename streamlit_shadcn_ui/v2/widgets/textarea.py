from __future__ import annotations

from typing import Callable, Optional, Union

from .._protocol import validate_text
from ._common import boolean, mount_stateful, utf16_length


def textarea(
    label: str,
    value: str = "",
    *,
    key: Optional[str] = None,
    placeholder: Optional[str] = None,
    rows: int = 4,
    disabled: bool = False,
    max_length: Optional[int] = None,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> str:
    """Render a persistent shadcn Textarea."""

    value = validate_text(value, "value")
    label = validate_text(label, "label")
    placeholder_value = validate_text(
        placeholder or "",
        "placeholder",
    )
    if (
        isinstance(rows, bool)
        or not isinstance(rows, int)
        or not 2 <= rows <= 20
    ):
        raise ValueError("rows must be between 2 and 20.")
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
        kind="textarea",
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
            "disabled": boolean(disabled, "disabled"),
            "rows": rows,
            "maxLength": max_length,
        },
        width=width,
        on_change=on_change,
    )
    return str(value)
