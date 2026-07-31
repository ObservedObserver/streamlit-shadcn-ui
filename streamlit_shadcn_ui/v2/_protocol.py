from __future__ import annotations

import json
from typing import Any, Callable, Dict, Mapping, Optional

from ._streamlit_compat import require_v2_runtime

PROTOCOL_VERSION = 1
MAX_OPTIONS = 10_000
MAX_TEXT_BYTES = 16 * 1024
MAX_ENVELOPE_BYTES = 2 * 1024 * 1024

_RUNTIME_KEY = "__streamlit_shadcn_ui_v2_runtime_v1__"


def _runtime_registry() -> Dict[str, Dict[str, Any]]:
    st = require_v2_runtime()
    registry = st.session_state.get(_RUNTIME_KEY)
    if not isinstance(registry, dict):
        registry = {}
        st.session_state[_RUNTIME_KEY] = registry
    return registry


def _entry_for(key: str, kind: str) -> Dict[str, Any]:
    registry = _runtime_registry()
    entry = registry.get(key)
    if entry is None:
        entry = {
            "kind": kind,
            "server_revision": 0,
            "default_fingerprint": None,
            "pending_reset": None,
        }
        registry[key] = entry
    elif entry.get("kind") != kind:
        raise RuntimeError(
            "V2 component key %r is already bound to kind %r; "
            "it cannot be reused for kind %r in the same Streamlit session. "
            "Use a new key." % (key, entry.get("kind"), kind)
        )
    return entry


def metadata_cell(kind: str) -> Dict[str, Any]:
    return {
        "protocolVersion": PROTOCOL_VERSION,
        "kind": kind,
    }


def result_value(result: Any, field: str, default: Any = None) -> Any:
    if result is None:
        return default
    if isinstance(result, Mapping):
        return result.get(field, default)
    return getattr(result, field, default)


def validate_persisted_metadata(key: str, kind: str) -> None:
    st = require_v2_runtime()
    result = st.session_state.get(key)
    persisted = result_value(result, "meta")
    if persisted is None:
        return
    if (
        not isinstance(persisted, Mapping)
        or persisted.get("protocolVersion") != PROTOCOL_VERSION
        or persisted.get("kind") != kind
    ):
        raise RuntimeError(
            "Persisted V2 metadata for key %r does not match kind %r. "
            "Use a new component key." % (key, kind)
        )


def register_kind(key: str, kind: str) -> Dict[str, Any]:
    entry = _entry_for(key, kind)
    validate_persisted_metadata(key, kind)
    return entry


def _valid_revision(value: Any) -> bool:
    return isinstance(value, int) and not isinstance(value, bool) and value >= 0


def _read_state_cell(key: str, kind: str) -> Optional[Dict[str, Any]]:
    st = require_v2_runtime()
    result = st.session_state.get(key)
    cell = result_value(result, "state")
    if cell is None:
        return None
    if (
        not isinstance(cell, Mapping)
        or cell.get("kind") != kind
        or not _valid_revision(cell.get("clientRevision"))
        or not _valid_revision(cell.get("serverRevision"))
    ):
        raise RuntimeError(
            "Persisted V2 state for key %r is malformed or belongs to another "
            "component kind. Use a new key." % key
        )
    return dict(cell)


def _fingerprint(value: Any) -> str:
    return json.dumps(
        value,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    )


def prepare_state(
    *,
    key: str,
    kind: str,
    default_value: Any,
    is_valid_value: Callable[[Any], bool],
) -> Dict[str, Any]:
    entry = register_kind(key, kind)
    incoming = _read_state_cell(key, kind)
    default_fingerprint = _fingerprint(default_value)
    authoritative_revision = int(entry.get("server_revision", 0))

    if incoming is None:
        entry["default_fingerprint"] = default_fingerprint
        return {
            "kind": kind,
            "value": default_value,
            "clientRevision": 0,
            "serverRevision": authoritative_revision,
        }

    incoming_client_revision = int(incoming["clientRevision"])
    incoming_value = incoming.get("value")
    pending = entry.get("pending_reset")

    if isinstance(pending, Mapping):
        if (
            incoming_value == pending.get("value")
            and incoming_client_revision == pending.get("clientRevision")
        ):
            entry["pending_reset"] = None
        else:
            return {
                "kind": kind,
                "value": pending.get("value"),
                "clientRevision": int(pending.get("clientRevision", 0)),
                "serverRevision": authoritative_revision,
            }

    default_changed = (
        entry.get("default_fingerprint") is not None
        and entry.get("default_fingerprint") != default_fingerprint
    )
    invalid_value = not is_valid_value(incoming_value)

    if default_changed or invalid_value:
        authoritative_revision += 1
        entry["server_revision"] = authoritative_revision
        entry["default_fingerprint"] = default_fingerprint
        reset = {
            "value": default_value,
            "clientRevision": incoming_client_revision,
        }
        entry["pending_reset"] = reset
        return {
            "kind": kind,
            "value": default_value,
            "clientRevision": incoming_client_revision,
            "serverRevision": authoritative_revision,
        }

    entry["default_fingerprint"] = default_fingerprint
    return {
        "kind": kind,
        "value": incoming_value,
        "clientRevision": incoming_client_revision,
        "serverRevision": authoritative_revision,
    }


def validate_text(value: str, field: str) -> str:
    if not isinstance(value, str):
        raise TypeError("%s must be a string." % field)
    if len(value.encode("utf-8")) > MAX_TEXT_BYTES:
        raise ValueError("%s exceeds the 16 KiB V2 limit." % field)
    return value


def validate_collection_size(values: list, field: str) -> None:
    if len(values) > MAX_OPTIONS:
        raise ValueError("%s exceeds the 10,000-item V2 limit." % field)


def validate_envelope(envelope: Mapping[str, Any]) -> Dict[str, Any]:
    serialized = json.dumps(
        envelope,
        ensure_ascii=False,
        separators=(",", ":"),
    ).encode("utf-8")
    if len(serialized) > MAX_ENVELOPE_BYTES:
        raise ValueError("Serialized V2 component data exceeds the 2 MiB limit.")
    return dict(envelope)
