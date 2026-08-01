from __future__ import annotations

from typing import Callable, Iterable, Optional, TypeVar, Union

from .._component import get_result_value, noop_callback
from .._protocol import (
    validate_text,
)
from .._streamlit_compat import fail_if_trigger_in_form
from ._common import boolean, mount_trigger, normalize_menu_items


T = TypeVar("T")


def dropdown_menu(
    label: str,
    items: Iterable[T],
    *,
    format_func: Callable[[T], str] = str,
    key: Optional[str] = None,
    menu_label: Optional[str] = None,
    disabled: bool = False,
    on_select: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "content",
) -> Optional[T]:
    """Render a non-modal shadcn Base UI action menu."""

    fail_if_trigger_in_form("dropdown_menu")
    label = validate_text(label, "label")
    normalized_menu_label = (
        None if menu_label is None else validate_text(menu_label, "menu_label")
    )
    normalized_items, values_by_token = normalize_menu_items(
        items,
        format_func,
    )
    result = mount_trigger(
        key=key,
        kind="dropdown_menu",
        props={
            "disabled": boolean(disabled, "disabled"),
            "items": normalized_items,
            "label": label,
            "menuLabel": normalized_menu_label,
        },
        width=width,
        callbacks={"on_action_change": on_select or noop_callback},
    )
    action = get_result_value(result, "action")
    return values_by_token.get(action)
