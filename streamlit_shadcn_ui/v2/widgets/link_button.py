from __future__ import annotations

from typing import Optional, Union

from ._common import boolean, enum_value, mount_stateless, safe_url
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
_SIZES = {
    "default",
    "xs",
    "sm",
    "lg",
    "icon",
    "icon-xs",
    "icon-sm",
    "icon-lg",
}


def link_button(
    label: str,
    url: str,
    *,
    key: Optional[str] = None,
    variant: str = "default",
    size: str = "default",
    disabled: bool = False,
    target: str = "_blank",
    width: Union[str, int] = "content",
) -> None:
    """Render a shadcn Button composed as a safe link."""

    mount_stateless(
        key=key,
        kind="link_button",
        props={
            "text": validate_text(label, "label"),
            "url": safe_url(url),
            "variant": enum_value(variant, _VARIANTS, "variant"),
            "size": enum_value(size, _SIZES, "size"),
            "disabled": boolean(disabled, "disabled"),
            "target": enum_value(target, _TARGETS, "target"),
            "stretch": width == "stretch",
        },
        width=width,
    )
