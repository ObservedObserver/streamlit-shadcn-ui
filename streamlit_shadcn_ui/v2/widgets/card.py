from __future__ import annotations

from typing import Any, Optional, Union

from ._common import enum_value, mount_stateless, optional_text

_SIZES = {"default", "sm"}
_METRIC_VARIANTS = {"default", "dashboard"}


def card(
    title: Optional[str] = None,
    content: Optional[str] = None,
    description: Optional[str] = None,
    *,
    footer: Optional[str] = None,
    key: Optional[str] = None,
    size: str = "default",
    width: Union[str, int] = "stretch",
) -> None:
    """Render a stateless shadcn Card."""

    mount_stateless(
        key=key,
        kind="card",
        props={
            "title": optional_text(title, "title"),
            "content": optional_text(content, "content"),
            "description": optional_text(description, "description"),
            "footer": optional_text(footer, "footer"),
            "size": enum_value(size, _SIZES, "size"),
        },
        width=width,
    )


def metric_card(
    label: str,
    value: Any,
    *,
    description: Optional[str] = None,
    delta: Optional[str] = None,
    variant: str = "default",
    key: Optional[str] = None,
    size: str = "default",
    width: Union[str, int] = "stretch",
) -> None:
    """Render a metric Card with a stable or opt-in dashboard layout."""

    mount_stateless(
        key=key,
        kind="metric_card",
        props={
            "label": optional_text(label, "label"),
            "value": optional_text(str(value), "value"),
            "description": optional_text(description, "description"),
            "delta": optional_text(delta, "delta"),
            "variant": enum_value(
                variant,
                _METRIC_VARIANTS,
                "variant",
            ),
            "size": enum_value(size, _SIZES, "size"),
        },
        width=width,
    )
