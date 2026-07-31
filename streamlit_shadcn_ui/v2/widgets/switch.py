from __future__ import annotations

from typing import Callable, Optional, Union

from .._protocol import validate_text
from ._common import mount_stateful


def switch(
    default_checked: bool = False,
    label: Optional[str] = None,
    *,
    key: str,
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> bool:
    """Render a persistent shadcn Switch."""

    label_value = validate_text(label or "Switch", "label")
    value = mount_stateful(
        key=key,
        kind="switch",
        default_value=bool(default_checked),
        is_valid_value=lambda candidate: isinstance(candidate, bool),
        props={
            "label": label_value,
            "disabled": bool(disabled),
        },
        width=width,
        on_change=on_change,
    )
    return bool(value)
