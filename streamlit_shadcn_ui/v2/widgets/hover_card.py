from __future__ import annotations

from typing import Union

from ._common import enum_value, mount_stateless
from .._protocol import validate_text


def hover_card(
    label: str,
    content: str,
    content_type: str = "text",
    *,
    key: str,
    disabled: bool = False,
    width: Union[str, int] = "content",
) -> None:
    """Render a non-modal shadcn Hover Card with safe text content."""

    enum_value(content_type, {"text"}, "content_type")
    mount_stateless(
        key=key,
        kind="hover_card",
        props={
            "label": validate_text(label, "label"),
            "content": validate_text(content, "content"),
            "disabled": bool(disabled),
        },
        width=width,
    )
