from __future__ import annotations

from typing import Optional, Union

from ._common import enum_value, mount_stateless

_ORIENTATIONS = {"horizontal", "vertical"}


def separator(
    *,
    key: Optional[str] = None,
    orientation: str = "horizontal",
    width: Union[str, int] = "stretch",
) -> None:
    """Render a decorative shadcn Base UI Separator."""

    mount_stateless(
        key=key,
        kind="separator",
        props={
            "orientation": enum_value(
                orientation,
                _ORIENTATIONS,
                "orientation",
            )
        },
        width=width,
    )
