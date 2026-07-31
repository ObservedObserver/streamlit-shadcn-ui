from __future__ import annotations

from typing import Any, Callable, Iterable, List, Optional, Union

from .._protocol import validate_text
from ._common import enum_value, mount_stateful, normalize_choices


def toggle_group(
    default_values: Optional[Iterable[str]] = None,
    *,
    key: str,
    options: Optional[Iterable[Any]] = None,
    label: str = "Text formatting",
    multiple: bool = True,
    orientation: str = "horizontal",
    variant: str = "outline",
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> List[str]:
    """Render a persistent shadcn Toggle Group."""

    choices = normalize_choices(
        options
        if options is not None
        else ["bold", "italic", "underline"]
    )
    if not choices:
        raise ValueError("Toggle Group requires at least one option.")
    values = {option["value"] for option in choices}
    initial = [
        validate_text(str(value), "default_values")
        for value in (default_values or [])
    ]
    if len(initial) != len(set(initial)):
        raise ValueError("default_values must be unique.")
    if any(value not in values for value in initial):
        raise ValueError("default_values must be present in options.")
    if not multiple and len(initial) > 1:
        raise ValueError(
            "A single Toggle Group accepts at most one default value."
        )
    label = validate_text(label, "label")
    orientation = enum_value(
        orientation,
        {"horizontal", "vertical"},
        "orientation",
    )
    variant = enum_value(
        variant,
        {"default", "outline"},
        "variant",
    )

    value = mount_stateful(
        key=key,
        kind="toggle_group",
        default_value=initial,
        is_valid_value=lambda candidate: (
            isinstance(candidate, list)
            and len(candidate) == len(set(candidate))
            and all(item in values for item in candidate)
            and (multiple or len(candidate) <= 1)
        ),
        props={
            "label": label,
            "options": choices,
            "multiple": bool(multiple),
            "orientation": orientation,
            "variant": variant,
            "disabled": bool(disabled),
        },
        width=width,
        on_change=on_change,
    )
    return list(value)
