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
    try:
        invalid_value = not is_valid_value(incoming_value)
    except (TypeError, ValueError, OverflowError):
        invalid_value = True

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


def prepare_elements_state(
    *,
    key: str,
    node_defaults: Mapping[str, Mapping[str, Any]],
    validators: Mapping[str, Callable[[Any], bool]],
) -> Dict[str, Any]:
    """Reconcile a keyed element tree without resetting unaffected nodes."""

    kind = "elements"
    entry = register_kind(key, kind)
    incoming = _read_state_cell(key, kind)
    fingerprints = {
        node_id: _fingerprint(spec.get("value"))
        for node_id, spec in node_defaults.items()
    }
    node_kinds = {
        node_id: str(spec.get("kind"))
        for node_id, spec in node_defaults.items()
    }
    previous_fingerprints = entry.get("elements_default_fingerprints")
    previous_kinds = entry.get("elements_node_kinds")
    previous_server_revisions = entry.get("elements_server_revisions")
    server_revisions = {
        node_id: (
            int(previous_server_revisions.get(node_id, 0))
            if isinstance(previous_server_revisions, Mapping)
            and _valid_revision(previous_server_revisions.get(node_id, 0))
            else 0
        )
        for node_id in node_defaults
    }

    if isinstance(previous_kinds, Mapping):
        for node_id, node_kind in node_kinds.items():
            previous_kind = previous_kinds.get(node_id)
            if previous_kind is not None and previous_kind != node_kind:
                raise RuntimeError(
                    "Element key %r changed kind from %r to %r. "
                    "Use a new key for the replacement node."
                    % (node_id, previous_kind, node_kind)
                )

    pending = entry.get("pending_reset")
    if (
        isinstance(pending, Mapping)
        and isinstance(previous_fingerprints, Mapping)
        and dict(previous_fingerprints) != fingerprints
    ):
        pending = None
        entry["pending_reset"] = None

    if isinstance(pending, Mapping) and incoming is not None:
        pending_server_revision = pending.get("serverRevision")
        pending_client_revision = pending.get("clientRevision")
        if (
            _valid_revision(pending_server_revision)
            and _valid_revision(pending_client_revision)
            and incoming["serverRevision"] < pending_server_revision
        ):
            entry["elements_default_fingerprints"] = fingerprints
            entry["elements_node_kinds"] = node_kinds
            entry["elements_server_revisions"] = server_revisions
            return dict(pending)
        if (
            incoming["serverRevision"] == pending_server_revision
            and incoming["clientRevision"] >= pending_client_revision
        ):
            entry["pending_reset"] = None
        else:
            entry["elements_default_fingerprints"] = fingerprints
            entry["elements_node_kinds"] = node_kinds
            entry["elements_server_revisions"] = server_revisions
            return dict(pending)

    authoritative_revision = int(entry.get("server_revision", 0))

    incoming_value = incoming.get("value") if incoming is not None else None
    value_is_valid = (
        isinstance(incoming_value, Mapping)
        and isinstance(incoming_value.get("nodes"), Mapping)
        and _valid_revision(incoming_value.get("sequence"))
    )
    incoming_nodes = (
        dict(incoming_value["nodes"]) if value_is_valid else {}
    )
    sequence = (
        int(incoming_value["sequence"]) if value_is_valid else 0
    )
    reconciled_nodes: Dict[str, Any] = {}

    for node_id, spec in node_defaults.items():
        node_kind = node_kinds[node_id]
        default_value = spec.get("value")
        validator = validators[node_id]
        candidate = incoming_nodes.get(node_id)
        default_changed = (
            isinstance(previous_fingerprints, Mapping)
            and node_id in previous_fingerprints
            and previous_fingerprints[node_id] != fingerprints[node_id]
        )
        candidate_is_valid = False
        if isinstance(candidate, Mapping):
            try:
                candidate_is_valid = (
                    candidate.get("kind") == node_kind
                    and _valid_revision(candidate.get("clientRevision"))
                    and _valid_revision(candidate.get("serverRevision"))
                    and _valid_revision(candidate.get("changeSequence"))
                    and bool(validator(candidate.get("value")))
                )
            except (TypeError, ValueError, OverflowError):
                candidate_is_valid = False

        if candidate_is_valid and not default_changed:
            reconciled_nodes[node_id] = {
                "kind": node_kind,
                "value": candidate.get("value"),
                "clientRevision": int(candidate["clientRevision"]),
                "serverRevision": server_revisions[node_id],
                "changeSequence": int(candidate["changeSequence"]),
            }
            sequence = max(
                sequence,
                int(candidate["changeSequence"]),
            )
            continue

        candidate_client_revision = (
            int(candidate.get("clientRevision", 0))
            if isinstance(candidate, Mapping)
            and _valid_revision(candidate.get("clientRevision"))
            else 0
        )
        candidate_change_sequence = (
            int(candidate.get("changeSequence", sequence))
            if isinstance(candidate, Mapping)
            and _valid_revision(candidate.get("changeSequence"))
            else sequence
        )
        if default_changed or node_id in incoming_nodes:
            server_revisions[node_id] += 1
        reconciled_nodes[node_id] = {
            "kind": node_kind,
            "value": default_value,
            "clientRevision": candidate_client_revision,
            "serverRevision": server_revisions[node_id],
            "changeSequence": candidate_change_sequence,
        }

    reconciled_value = {
        "nodes": reconciled_nodes,
        "sequence": sequence,
    }
    incoming_client_revision = (
        int(incoming["clientRevision"]) if incoming is not None else 0
    )
    changed = incoming is not None and (
        not value_is_valid or incoming_value != reconciled_value
    )
    if changed:
        authoritative_revision += 1
        entry["server_revision"] = authoritative_revision

    state = {
        "kind": kind,
        "value": reconciled_value,
        "clientRevision": incoming_client_revision,
        "serverRevision": authoritative_revision,
    }
    if changed:
        entry["pending_reset"] = dict(state)
    entry["elements_default_fingerprints"] = fingerprints
    entry["elements_node_kinds"] = node_kinds
    entry["elements_server_revisions"] = server_revisions
    return state


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
