from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Generic, Literal, Optional, TypeVar, Union


T = TypeVar("T")

Key = Optional[str]
Width = Union[Literal["content", "stretch"], int]
ButtonVariant = Literal[
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
]
ButtonSize = Literal[
    "default",
    "xs",
    "sm",
    "lg",
    "icon",
    "icon-xs",
    "icon-sm",
    "icon-lg",
]
SelectionMode = Literal["single", "multiple"]


@dataclass(frozen=True)
class Choice(Generic[T]):
    """A typed choice with a custom label and disabled state."""

    value: T
    label: Optional[str] = None
    disabled: bool = False


@dataclass(frozen=True)
class MenuItem(Generic[T]):
    """A typed Dropdown Menu action."""

    value: T
    label: Optional[str] = None
    disabled: bool = False
    variant: Literal["default", "destructive"] = "default"


@dataclass(frozen=True)
class BadgeItem:
    """One Badge in a badge group."""

    text: str
    variant: ButtonVariant = "default"


@dataclass(frozen=True)
class AccordionItem:
    """One precomposed Accordion item."""

    value: str
    label: str
    content: str
    disabled: bool = False


@dataclass(frozen=True)
class BreadcrumbItem:
    """One Breadcrumb entry."""

    text: str
    href: Optional[str] = None
    current: bool = False


@dataclass(frozen=True)
class BreadcrumbSelection:
    """The transient Breadcrumb entry selected by the user."""

    text: str
    href: Optional[str]
    index: int


@dataclass(frozen=True)
class TableColumn:
    """A typed shadcn Table column."""

    key: str
    label: Optional[str] = None
    align: Literal["left", "center", "right"] = "left"


PythonValue = Any


__all__ = [
    "AccordionItem",
    "BadgeItem",
    "BreadcrumbItem",
    "BreadcrumbSelection",
    "ButtonSize",
    "ButtonVariant",
    "Choice",
    "Key",
    "MenuItem",
    "PythonValue",
    "SelectionMode",
    "TableColumn",
    "Width",
]
