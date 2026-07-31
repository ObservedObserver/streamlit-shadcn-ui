from __future__ import annotations

from typing import Optional, Union

from ._common import enum_value, mount_stateless, optional_text
from .._protocol import validate_text

_VARIANTS = {"default", "destructive"}


def alert(
    title: str,
    description: Optional[str] = None,
    *,
    key: str,
    variant: str = "default",
    width: Union[str, int] = "stretch",
) -> None:
    """Render a stateless shadcn Alert."""

    mount_stateless(
        key=key,
        kind="alert",
        props={
            "title": validate_text(title, "title"),
            "description": optional_text(description, "description"),
            "variant": enum_value(variant, _VARIANTS, "variant"),
        },
        width=width,
    )
