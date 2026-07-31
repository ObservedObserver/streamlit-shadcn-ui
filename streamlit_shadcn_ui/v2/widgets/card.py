from __future__ import annotations

from typing import Optional, Union

from ._common import enum_value, mount_stateless, optional_text

_SIZES = {"default", "sm"}


def card(
    title: Optional[str] = None,
    content: Optional[str] = None,
    description: Optional[str] = None,
    *,
    key: str,
    size: str = "default",
    width: Union[str, int] = "stretch",
) -> None:
    """Render a stateless shadcn Card."""

    _mount_card(
        kind="card",
        title=title,
        content=content,
        description=description,
        key=key,
        size=size,
        width=width,
    )


def metric_card(
    title: Optional[str] = None,
    content: Optional[str] = None,
    description: Optional[str] = None,
    *,
    key: str,
    size: str = "default",
    width: Union[str, int] = "stretch",
) -> None:
    """Render a metric-oriented shadcn Card."""

    _mount_card(
        kind="metric_card",
        title=title,
        content=content,
        description=description,
        key=key,
        size=size,
        width=width,
    )


def _mount_card(
    *,
    kind: str,
    title: Optional[str],
    content: Optional[str],
    description: Optional[str],
    key: str,
    size: str,
    width: Union[str, int],
) -> None:
    mount_stateless(
        key=key,
        kind=kind,
        props={
            "title": optional_text(title, "title"),
            "content": optional_text(content, "content"),
            "description": optional_text(
                description,
                "description",
            ),
            "size": enum_value(size, _SIZES, "size"),
        },
        width=width,
    )
