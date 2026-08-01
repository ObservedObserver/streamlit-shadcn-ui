from __future__ import annotations

from typing import Optional, Union

from ._common import boolean, mount_stateless, optional_text
from .._protocol import validate_text


def popover(
    label: str = "Open",
    content: Optional[str] = None,
    *,
    key: Optional[str] = None,
    disabled: bool = False,
    width: Union[str, int] = "content",
) -> None:
    """Render a non-modal shadcn Popover in the component ShadowRoot."""

    mount_stateless(
        key=key,
        kind="popover",
        props={
            "label": validate_text(label, "label"),
            "content": optional_text(content, "content"),
            "disabled": boolean(disabled, "disabled"),
        },
        width=width,
    )
