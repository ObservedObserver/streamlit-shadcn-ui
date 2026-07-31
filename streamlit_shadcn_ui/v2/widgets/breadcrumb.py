from __future__ import annotations

from typing import Any, Callable, Iterable, Mapping, Optional, Union

from .._component import get_result_value, noop_callback
from .._protocol import (
    validate_collection_size,
    validate_text,
)
from .._streamlit_compat import fail_if_trigger_in_form
from ..types import BreadcrumbItem, BreadcrumbSelection
from ._common import boolean, mount_trigger


def breadcrumb(
    items: Iterable[Union[BreadcrumbItem, Mapping[str, Any]]],
    *,
    key: Optional[str] = None,
    label: str = "Breadcrumb",
    on_select: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> Optional[BreadcrumbSelection]:
    """Render an interactive shadcn Breadcrumb action trigger."""

    fail_if_trigger_in_form("breadcrumb")
    normalized_items = []
    for item in items:
        if isinstance(item, BreadcrumbItem):
            item = {
                "text": item.text,
                "href": item.href,
                "current": item.current,
            }
        elif not isinstance(item, Mapping):
            raise TypeError(
                "Each breadcrumb item must be a BreadcrumbItem or mapping."
            )
        normalized_items.append(
            {
                "text": validate_text(str(item.get("text", "")), "text"),
                "href": (
                    None
                    if item.get("href") is None
                    else validate_text(str(item["href"]), "href")
                ),
                "current": boolean(
                    item.get("current", False),
                    "breadcrumb current flag",
                ),
            }
        )
    validate_collection_size(normalized_items, "breadcrumb items")
    if sum(1 for item in normalized_items if item["current"]) > 1:
        raise ValueError(
            "Breadcrumb can contain at most one current item."
        )
    result = mount_trigger(
        key=key,
        kind="breadcrumb",
        props={
            "label": validate_text(label, "label"),
            "items": normalized_items,
        },
        width=width,
        callbacks={"on_action_change": on_select or noop_callback},
    )
    action = get_result_value(result, "action")
    if not isinstance(action, Mapping):
        return None
    index = action.get("index")
    if (
        not isinstance(index, int)
        or isinstance(index, bool)
        or index < 0
        or index >= len(normalized_items)
        or normalized_items[index]["current"]
        or action.get("text") != normalized_items[index]["text"]
        or action.get("href") != normalized_items[index]["href"]
    ):
        return None
    return BreadcrumbSelection(
        text=normalized_items[index]["text"],
        href=normalized_items[index]["href"],
        index=index,
    )
