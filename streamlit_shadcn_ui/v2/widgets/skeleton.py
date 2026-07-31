from __future__ import annotations

from typing import Union

from ._common import css_dimension, enum_value, mount_stateless

_SHAPES = {"rectangle", "circle"}


def skeleton(
    *,
    key: str,
    width_px: Union[int, float, str] = "100%",
    height_px: Union[int, float, str] = 20,
    shape: str = "rectangle",
    width: Union[str, int] = "stretch",
) -> None:
    """Render a decorative shadcn Skeleton placeholder."""

    mount_stateless(
        key=key,
        kind="skeleton",
        props={
            "width": css_dimension(width_px, "width_px"),
            "height": css_dimension(height_px, "height_px"),
            "shape": enum_value(shape, _SHAPES, "shape"),
        },
        width=width,
    )
