from __future__ import annotations

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

from .._component import mount, noop_callback
from .._protocol import (
    PROTOCOL_VERSION,
    metadata_cell,
    prepare_state,
    register_kind,
    validate_collection_size,
    validate_envelope,
    validate_text,
)

_CSS_DIMENSION = re.compile(
    r"^(?:0|\d+(?:\.\d+)?(?:px|rem|em|%|vw|vh))$"
)
_SAFE_URL_SCHEMES = {"http", "https", "mailto"}
_SAFE_IMAGE_SCHEMES = {"http", "https"}


def optional_text(value: Optional[str], field: str) -> Optional[str]:
    if value is None:
        return None
    return validate_text(value, field)


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
    field: str = "options",
) -> List[Dict[str, Any]]:
    choices = []
    seen = set()
    for option in values:
        if isinstance(option, Mapping):
            if "value" not in option:
                raise ValueError("%s mappings require a value." % field)
            raw_value = option.get("value")
            raw_label = option.get("label", raw_value)
            disabled = option.get("disabled", False)
            if not isinstance(disabled, bool):
                raise TypeError("%s disabled flags must be booleans." % field)
        else:
            raw_value = option
            raw_label = option
            disabled = False
        value = validate_text(str(raw_value), "%s value" % field)
        label = validate_text(str(raw_label), "%s label" % field)
        if value in seen:
            raise ValueError("%s values must be unique." % field)
        seen.add(value)
        choices.append(
            {
                "label": label,
                "value": value,
                "disabled": disabled,
            }
        )
    validate_collection_size(choices, field)
    return choices


def mount_stateless(
    *,
    key: str,
    kind: str,
    props: Mapping[str, Any],
    width: Union[str, int],
) -> None:
    register_kind(key, kind)
    envelope = validate_envelope(
        {
            "protocolVersion": PROTOCOL_VERSION,
            "kind": kind,
            "props": dict(props),
        }
    )
    mount(
        key=key,
        data=envelope,
        default={"meta": metadata_cell(kind)},
        width=width,
    )


def mount_stateful(
    *,
    key: str,
    kind: str,
    default_value: Any,
    is_valid_value: Callable[[Any], bool],
    props: Mapping[str, Any],
    width: Union[str, int],
    on_change: Optional[Callable[[], None]] = None,
) -> Any:
    state = prepare_state(
        key=key,
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
        key=key,
        data=envelope,
        default={
            "meta": metadata_cell(kind),
            "state": state,
        },
        width=width,
        callbacks={"on_state_change": on_change or noop_callback},
    )
    return state["value"]
