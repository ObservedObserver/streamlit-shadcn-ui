from __future__ import annotations

from typing import Callable, Iterable, List, Optional, Union

from .._protocol import validate_collection_size, validate_text
from ._common import boolean, mount_stateful, optional_text


def collapsible(
    title: str,
    content: Optional[str] = None,
    *,
    items: Optional[Iterable[str]] = None,
    value: bool = False,
    key: Optional[str] = None,
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> bool:
    """Render a controlled shadcn Collapsible."""

    title = validate_text(title, "title")
    content = optional_text(content, "content")
    normalized_items: List[str] = [
        validate_text(str(item), "item") for item in (items or [])
    ]
    validate_collection_size(normalized_items, "items")
    value = mount_stateful(
        key=key,
        kind="collapsible",
        default_value=boolean(value, "value"),
        is_valid_value=lambda candidate: isinstance(candidate, bool),
        props={
            "title": title,
            "firstItem": content,
            "items": normalized_items,
            "disabled": boolean(disabled, "disabled"),
        },
        width=width,
        on_change=on_change,
    )
    return bool(value)
