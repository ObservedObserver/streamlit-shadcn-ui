from __future__ import annotations

from typing import Iterable, Optional, Union

from .._protocol import validate_collection_size, validate_text
from ._common import mount_stateless, optional_text


def scroll_area(
    title: Optional[str] = None,
    items: Optional[Iterable[str]] = None,
    *,
    key: str,
    height: int = 240,
    width: Union[str, int] = "stretch",
) -> None:
    """Render a stateless shadcn Scroll Area."""

    title = optional_text(title, "title")
    normalized_items = [
        validate_text(str(item), "item") for item in (items or [])
    ]
    validate_collection_size(normalized_items, "items")
    if (
        isinstance(height, bool)
        or not isinstance(height, int)
        or not 80 <= height <= 10_000
    ):
        raise ValueError("height must be between 80 and 10,000.")
    mount_stateless(
        key=key,
        kind="scroll_area",
        props={
            "title": title,
            "items": normalized_items,
            "height": height,
        },
        width=width,
    )
