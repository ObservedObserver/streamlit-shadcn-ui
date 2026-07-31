from __future__ import annotations

import hashlib
import json
import math
import re
from typing import (
    Any,
    Callable,
    Dict,
    Iterable,
    List,
    Mapping,
    Optional,
    Union,
)
from urllib.parse import urlparse

from .._component import (
    mount,
    noop_callback,
    private_component_key,
)
from .._protocol import (
    PROTOCOL_VERSION,
    metadata_cell,
    prepare_state,
    register_kind,
    validate_collection_size,
    validate_envelope,
    validate_text,
)
from ..types import Choice, MenuItem

_CSS_DIMENSION = re.compile(
    r"^(?:0|\d+(?:\.\d+)?(?:px|rem|em|%|vw|vh))$"
)
_SAFE_URL_SCHEMES = {"http", "https", "mailto"}
_SAFE_IMAGE_SCHEMES = {"http", "https"}


def optional_text(value: Optional[str], field: str) -> Optional[str]:
    if value is None:
        return None
    return validate_text(value, field)


def boolean(value: bool, field: str) -> bool:
    if not isinstance(value, bool):
        raise TypeError("%s must be a boolean." % field)
    return value


def enum_value(value: str, allowed: set, field: str) -> str:
    normalized = validate_text(value, field)
    if normalized not in allowed:
        raise ValueError(
            "%s must be one of: %s."
            % (field, ", ".join(sorted(allowed)))
        )
    return normalized


def css_dimension(
    value: Union[int, float, str],
    field: str,
) -> Union[int, float, str]:
    if isinstance(value, bool):
        raise TypeError("%s must be a CSS dimension or number." % field)
    if isinstance(value, (int, float)):
        if (
            not math.isfinite(float(value))
            or float(value) < 0
            or float(value) > 10_000
        ):
            raise ValueError("%s must be between 0 and 10,000." % field)
        return value
    normalized = validate_text(value, field)
    if not _CSS_DIMENSION.fullmatch(normalized):
        raise ValueError(
            "%s must use px, rem, em, %%, vw, or vh units." % field
        )
    return normalized


def safe_url(value: str, field: str = "url") -> str:
    normalized = validate_text(value, field)
    parsed = urlparse(normalized)
    if parsed.scheme:
        if parsed.scheme.lower() not in _SAFE_URL_SCHEMES:
            raise ValueError(
                "%s must use http, https, mailto, or a relative URL."
                % field
            )
        return normalized
    if normalized.startswith(("/", "#", "?")):
        return normalized
    raise ValueError(
        "%s must use http, https, mailto, or start with /, #, or ?."
        % field
    )


def safe_image_src(value: str, field: str = "src") -> str:
    normalized = validate_text(value, field)
    parsed = urlparse(normalized)
    if parsed.scheme.lower() in _SAFE_IMAGE_SCHEMES:
        return normalized
    if parsed.scheme.lower() == "data" and normalized.startswith(
        "data:image/"
    ):
        return normalized
    if not parsed.scheme and normalized.startswith("/"):
        return normalized
    raise ValueError(
        "%s must use http, https, an image data URL, or start with /."
        % field
    )


def table_cell(value: Any) -> Any:
    if value is None or isinstance(value, (str, bool, int)):
        return value
    if isinstance(value, float):
        return value if math.isfinite(value) else None
    return validate_text(str(value), "table cell")


def utf16_length(value: str) -> int:
    return len(value.encode("utf-16-le", errors="surrogatepass")) // 2


def normalize_choices(
    values: Iterable[Any],
    format_func: Callable[[Any], str] = str,
    field: str = "options",
) -> tuple:
    if not callable(format_func):
        raise TypeError("format_func must be callable.")
    choices = []
    values_by_token = {}
    token_occurrences: Dict[str, int] = {}
    for option in values:
        if isinstance(option, Choice):
            raw_value = option.value
            raw_label = option.label
            disabled = option.disabled
        elif isinstance(option, Mapping) and "value" in option:
            raw_value = option.get("value")
            raw_label = option.get("label")
            disabled = option.get("disabled", False)
        else:
            raw_value = option
            raw_label = None
            disabled = False
        disabled = boolean(disabled, "%s disabled flag" % field)
        label = (
            format_func(raw_value)
            if raw_label is None
            else raw_label
        )
        label = validate_text(label, "%s label" % field)
        if any(
            _python_values_equal(existing, raw_value)
            for existing in values_by_token.values()
        ):
            raise ValueError("%s values must be unique." % field)
        fingerprint = _python_value_fingerprint(raw_value)
        occurrence = token_occurrences.get(fingerprint, 0)
        token_occurrences[fingerprint] = occurrence + 1
        token = "choice-%s-%d" % (fingerprint, occurrence)
        choices.append(
            {
                "label": label,
                "value": token,
                "disabled": disabled,
            }
        )
        values_by_token[token] = raw_value
    validate_collection_size(choices, field)
    return choices, values_by_token


def normalize_menu_items(
    values: Iterable[Any],
    format_func: Callable[[Any], str] = str,
) -> tuple:
    normalized = []
    raw_choices = []
    for item in values:
        if isinstance(item, MenuItem):
            raw_choices.append(
                Choice(item.value, item.label, item.disabled)
            )
            variant = item.variant
        elif isinstance(item, Mapping) and "value" in item:
            raw_choices.append(
                Choice(
                    item.get("value"),
                    item.get("label"),
                    item.get("disabled", False),
                )
            )
            variant = item.get("variant", "default")
        else:
            raw_choices.append(item)
            variant = "default"
        normalized.append(
            enum_value(
                variant,
                {"default", "destructive"},
                "menu item variant",
            )
        )
    choices, values_by_token = normalize_choices(
        raw_choices,
        format_func,
        "items",
    )
    for choice, variant in zip(choices, normalized):
        choice["variant"] = variant
    return choices, values_by_token


def token_for_value(
    value: Any,
    choices: List[Dict[str, Any]],
    values_by_token: Mapping[str, Any],
    field: str,
) -> str:
    for choice in choices:
        token = choice["value"]
        candidate = values_by_token[token]
        if _python_values_equal(candidate, value):
            return token
    raise ValueError("%s is not present in options." % field)


def _python_values_equal(first: Any, second: Any) -> bool:
    if first is second:
        return True
    try:
        return bool(first == second)
    except Exception:
        return False


def _python_value_fingerprint(value: Any) -> str:
    type_name = "%s.%s" % (
        type(value).__module__,
        type(value).__qualname__,
    )
    try:
        representation = json.dumps(
            value,
            ensure_ascii=False,
            sort_keys=True,
            separators=(",", ":"),
        )
    except (TypeError, ValueError, OverflowError):
        representation = repr(value)
    payload = "%s\0%s" % (type_name, representation)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()[:20]


def mount_stateless(
    *,
    key: Optional[str],
    kind: str,
    props: Mapping[str, Any],
    width: Union[str, int],
) -> None:
    mount_key = private_component_key(
        key=key,
        kind=kind,
        identity={"props": dict(props), "width": width},
    )
    register_kind(mount_key, kind)
    envelope = validate_envelope(
        {
            "protocolVersion": PROTOCOL_VERSION,
            "kind": kind,
            "props": dict(props),
        }
    )
    mount(
        key=mount_key,
        data=envelope,
        default={"meta": metadata_cell(kind)},
        width=width,
    )


def mount_stateful(
    *,
    key: Optional[str],
    kind: str,
    default_value: Any,
    is_valid_value: Callable[[Any], bool],
    props: Mapping[str, Any],
    width: Union[str, int],
    on_change: Optional[Callable[[], None]] = None,
) -> Any:
    mount_key = private_component_key(
        key=key,
        kind=kind,
        identity={
            "default": default_value,
            "props": dict(props),
            "width": width,
        },
    )
    state = prepare_state(
        key=mount_key,
        kind=kind,
        default_value=default_value,
        is_valid_value=is_valid_value,
    )
    envelope = validate_envelope(
        {
            "protocolVersion": PROTOCOL_VERSION,
            "kind": kind,
            "state": state,
            "props": dict(props),
        }
    )
    mount(
        key=mount_key,
        data=envelope,
        default={
            "meta": metadata_cell(kind),
            "state": state,
        },
        width=width,
        callbacks={"on_state_change": on_change or noop_callback},
    )
    return state["value"]


def mount_trigger(
    *,
    key: Optional[str],
    kind: str,
    props: Mapping[str, Any],
    width: Union[str, int],
    callbacks: Mapping[str, Callable[[], None]],
) -> Any:
    mount_key = private_component_key(
        key=key,
        kind=kind,
        identity={"props": dict(props), "width": width},
    )
    register_kind(mount_key, kind)
    envelope = validate_envelope(
        {
            "protocolVersion": PROTOCOL_VERSION,
            "kind": kind,
            "props": dict(props),
        }
    )
    return mount(
        key=mount_key,
        data=envelope,
        default={"meta": metadata_cell(kind)},
        width=width,
        callbacks=callbacks,
    )
