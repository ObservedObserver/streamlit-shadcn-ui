from __future__ import annotations

from typing import Optional, Union

from ._common import boolean, mount_stateless
from .._protocol import validate_text


def hover_card(
    label: str,
    content: str,
    *,
    key: Optional[str] = None,
    disabled: bool = False,
    width: Union[str, int] = "content",
) -> None:
    """Render a non-modal shadcn Hover Card with safe text content."""

    mount_stateless(
        key=key,
        kind="hover_card",
        props={
            "label": validate_text(label, "label"),
            "content": validate_text(content, "content"),
            "disabled": boolean(disabled, "disabled"),
        },
        width=width,
    )
