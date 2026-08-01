from __future__ import annotations

from typing import Optional, Union

from ._common import enum_value, mount_stateless, safe_image_src
from .._protocol import validate_text

_SIZES = {"sm", "default", "lg"}


def avatar(
    src: Optional[str] = None,
    fallback: str = "?",
    *,
    key: Optional[str] = None,
    alt: Optional[str] = None,
    size: str = "default",
    width: Union[str, int] = "content",
) -> None:
    """Render a shadcn Base UI Avatar with a deterministic fallback."""

    normalized_fallback = validate_text(fallback, "fallback")
    normalized_alt = (
        normalized_fallback
        if alt is None
        else validate_text(alt, "alt")
    )
    mount_stateless(
        key=key,
        kind="avatar",
        props={
            "src": None if src is None else safe_image_src(src),
            "fallback": normalized_fallback,
            "alt": normalized_alt,
            "size": enum_value(size, _SIZES, "size"),
        },
        width=width,
    )
