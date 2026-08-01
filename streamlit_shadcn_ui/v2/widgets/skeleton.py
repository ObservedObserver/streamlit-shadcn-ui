from __future__ import annotations

from typing import Optional, Union

from ._common import css_dimension, enum_value, mount_stateless

_SHAPES = {"rectangle", "circle"}


def skeleton(
    *,
    skeleton_width: Union[int, float, str] = "100%",
    skeleton_height: Union[int, float, str] = 20,
    key: Optional[str] = None,
    shape: str = "rectangle",
    width: Union[str, int] = "stretch",
) -> None:
    """Render a decorative shadcn Skeleton placeholder."""

    mount_stateless(
        key=key,
        kind="skeleton",
        props={
            "width": css_dimension(skeleton_width, "skeleton_width"),
            "height": css_dimension(skeleton_height, "skeleton_height"),
            "shape": enum_value(shape, _SHAPES, "shape"),
        },
        width=width,
    )
