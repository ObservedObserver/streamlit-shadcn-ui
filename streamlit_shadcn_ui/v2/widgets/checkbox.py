from __future__ import annotations

from typing import Callable, Optional, Union

from .._protocol import validate_text
from ._common import boolean, mount_stateful


def checkbox(
    label: str,
    value: bool = False,
    *,
    key: Optional[str] = None,
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> bool:
    """Render a persistent shadcn Base UI Checkbox."""

    label = validate_text(label, "label")
    state = mount_stateful(
        key=key,
        kind="checkbox",
        default_value=boolean(value, "value"),
        is_valid_value=lambda candidate: isinstance(candidate, bool),
        props={
            "disabled": boolean(disabled, "disabled"),
            "label": label,
        },
        width=width,
        on_change=on_change,
    )
    return bool(state)
