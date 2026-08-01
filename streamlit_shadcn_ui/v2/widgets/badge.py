from __future__ import annotations

from typing import Any, Iterable, Mapping, Optional, Tuple, Union

from ._common import enum_value, mount_stateless
from .._protocol import validate_collection_size, validate_text
from ..types import BadgeItem

_VARIANTS = {
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
}


def badge(
    text: str,
    *,
    key: Optional[str] = None,
    variant: str = "default",
    width: Union[str, int] = "content",
) -> None:
    """Render one shadcn Badge."""

    badges(
        [(text, variant)],
        key=key,
        width=width,
    )


def badges(
    items: Iterable[Any],
    *,
    key: Optional[str] = None,
    width: Union[str, int] = "content",
) -> None:
    """Render a bounded group of shadcn Badges."""

    normalized = []
    for item in items:
        text, variant = _normalize_badge(item)
        normalized.append(
            {
                "text": validate_text(text, "badge text"),
                "variant": enum_value(
                    variant,
                    _VARIANTS,
                    "badge variant",
                ),
            }
        )
    validate_collection_size(normalized, "badges")
    mount_stateless(
        key=key,
        kind="badge",
        props={"badges": normalized},
        width=width,
    )


def _normalize_badge(item: Any) -> Tuple[str, str]:
    if isinstance(item, BadgeItem):
        return item.text, item.variant
    if isinstance(item, Mapping):
        return str(item.get("text", "")), str(
            item.get("variant", "default")
        )
    if isinstance(item, (tuple, list)) and len(item) == 2:
        return str(item[0]), str(item[1])
    raise TypeError(
        "Each badge must be a (text, variant) pair or mapping."
    )
