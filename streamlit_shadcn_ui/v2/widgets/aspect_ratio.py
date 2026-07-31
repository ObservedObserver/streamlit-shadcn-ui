from __future__ import annotations

import math
from typing import Optional, Union

from ._common import mount_stateless, safe_image_src
from .._protocol import validate_text


def aspect_ratio(
    src: str,
    alt: str,
    *,
    key: Optional[str] = None,
    ratio: float = 16 / 9,
    width: Union[str, int] = "stretch",
) -> None:
    """Render an image inside a shadcn Aspect Ratio container."""

    if (
        isinstance(ratio, bool)
        or not isinstance(ratio, (int, float))
        or not math.isfinite(float(ratio))
        or float(ratio) <= 0
        or float(ratio) > 100
    ):
        raise ValueError("ratio must be a finite number between 0 and 100.")
    mount_stateless(
        key=key,
        kind="aspect_ratio",
        props={
            "src": safe_image_src(src),
            "alt": validate_text(alt, "alt"),
            "ratio": float(ratio),
        },
        width=width,
    )
