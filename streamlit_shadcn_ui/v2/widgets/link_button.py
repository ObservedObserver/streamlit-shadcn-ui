from __future__ import annotations

from typing import Union

from ._common import enum_value, mount_stateless, safe_url
from .._protocol import validate_text

_VARIANTS = {
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
}
_TARGETS = {"_blank", "_self"}


def link_button(
    text: str,
    url: str,
    *,
    key: str,
    variant: str = "default",
    disabled: bool = False,
    target: str = "_blank",
    width: Union[str, int] = "content",
) -> None:
    """Render a shadcn Button composed as a safe link."""

    mount_stateless(
        key=key,
        kind="link_button",
        props={
            "text": validate_text(text, "text"),
            "url": safe_url(url),
            "variant": enum_value(variant, _VARIANTS, "variant"),
            "disabled": bool(disabled),
            "target": enum_value(target, _TARGETS, "target"),
        },
        width=width,
    )
