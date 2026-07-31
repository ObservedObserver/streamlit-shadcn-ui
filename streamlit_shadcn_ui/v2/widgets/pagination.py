from __future__ import annotations

from typing import Callable, Optional, Union

from .._protocol import validate_text
from ._common import boolean, mount_stateful


def pagination(
    total_pages: int,
    *,
    page: int = 1,
    key: Optional[str] = None,
    sibling_count: int = 1,
    label: str = "Pagination",
    disabled: bool = False,
    on_change: Optional[Callable[[], None]] = None,
    width: Union[str, int] = "stretch",
) -> int:
    """Render controlled shadcn Pagination controls."""

    if (
        isinstance(total_pages, bool)
        or not isinstance(total_pages, int)
        or not 1 <= total_pages <= 10_000
    ):
        raise ValueError("total_pages must be between 1 and 10,000.")
    if (
        isinstance(page, bool)
        or not isinstance(page, int)
        or not 1 <= page <= total_pages
    ):
        raise ValueError("page must be within total_pages.")
    if (
        isinstance(sibling_count, bool)
        or not isinstance(sibling_count, int)
        or not 0 <= sibling_count <= 10
    ):
        raise ValueError("sibling_count must be between 0 and 10.")
    label = validate_text(label, "label")

    value = mount_stateful(
        key=key,
        kind="pagination",
        default_value=page,
        is_valid_value=lambda candidate: (
            isinstance(candidate, int)
            and not isinstance(candidate, bool)
            and 1 <= candidate <= total_pages
        ),
        props={
            "label": label,
            "totalPages": total_pages,
            "siblingCount": sibling_count,
            "disabled": boolean(disabled, "disabled"),
        },
        width=width,
        on_change=on_change,
    )
    return int(value)
