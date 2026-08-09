from __future__ import annotations

import unittest
from unittest.mock import patch

from streamlit_shadcn_ui.v2 import _protocol


class _FakeStreamlit:
    def __init__(self) -> None:
        self.session_state = {}


class ProtocolStateTests(unittest.TestCase):
    def setUp(self) -> None:
        self.st = _FakeStreamlit()
        self.runtime_patch = patch.object(
            _protocol,
            "require_v2_runtime",
            return_value=self.st,
        )
        self.runtime_patch.start()
        self.addCleanup(self.runtime_patch.stop)

    def test_key_is_immutably_bound_to_component_kind(self) -> None:
        _protocol.register_kind("shared", "select")

        with self.assertRaisesRegex(RuntimeError, "cannot be reused"):
            _protocol.register_kind("shared", "checkbox")

    def test_persisted_metadata_must_match_protocol_and_kind(self) -> None:
        self.st.session_state["choice"] = {
            "meta": {
                "protocolVersion": _protocol.PROTOCOL_VERSION,
                "kind": "checkbox",
            }
        }

        with self.assertRaisesRegex(RuntimeError, "metadata"):
            _protocol.register_kind("choice", "select")

    def test_client_cannot_spoof_server_revision(self) -> None:
        _protocol.prepare_state(
            key="choice",
            kind="select",
            default_value="alpha",
            is_valid_value=lambda value: value in {"alpha", "beta"},
        )
        self.st.session_state["choice"] = {
            "state": {
                "kind": "select",
                "value": "beta",
                "clientRevision": 4,
                "serverRevision": 999,
            }
        }

        state = _protocol.prepare_state(
            key="choice",
            kind="select",
            default_value="alpha",
            is_valid_value=lambda value: value in {"alpha", "beta"},
        )

        self.assertEqual(state["value"], "beta")
        self.assertEqual(state["clientRevision"], 4)
        self.assertEqual(state["serverRevision"], 0)

    def test_server_reset_is_repeated_until_exact_acknowledgement(self) -> None:
        validator = lambda value: value in {"alpha", "beta", "gamma"}
        _protocol.prepare_state(
            key="choice",
            kind="select",
            default_value="alpha",
            is_valid_value=validator,
        )
        self.st.session_state["choice"] = {
            "state": {
                "kind": "select",
                "value": "beta",
                "clientRevision": 7,
                "serverRevision": 0,
            }
        }

        reset = _protocol.prepare_state(
            key="choice",
            kind="select",
            default_value="gamma",
            is_valid_value=validator,
        )
        self.assertEqual(
            reset,
            {
                "kind": "select",
                "value": "gamma",
                "clientRevision": 7,
                "serverRevision": 1,
            },
        )

        stale = _protocol.prepare_state(
            key="choice",
            kind="select",
            default_value="gamma",
            is_valid_value=validator,
        )
        self.assertEqual(stale, reset)

        self.st.session_state["choice"]["state"] = dict(reset)
        acknowledged = _protocol.prepare_state(
            key="choice",
            kind="select",
            default_value="gamma",
            is_valid_value=validator,
        )
        self.assertEqual(acknowledged, reset)
        entry = self.st.session_state[_protocol._RUNTIME_KEY]["choice"]
        self.assertIsNone(entry["pending_reset"])

    def test_invalid_persisted_value_forces_a_server_reset(self) -> None:
        _protocol.prepare_state(
            key="choice",
            kind="select",
            default_value="alpha",
            is_valid_value=lambda value: value == "alpha",
        )
        self.st.session_state["choice"] = {
            "state": {
                "kind": "select",
                "value": "removed",
                "clientRevision": 2,
                "serverRevision": 0,
            }
        }

        state = _protocol.prepare_state(
            key="choice",
            kind="select",
            default_value="alpha",
            is_valid_value=lambda value: value == "alpha",
        )

        self.assertEqual(state["value"], "alpha")
        self.assertEqual(state["serverRevision"], 1)

    def test_unhashable_persisted_value_is_invalid_not_an_exception(
        self,
    ) -> None:
        _protocol.prepare_state(
            key="choice",
            kind="select",
            default_value="alpha",
            is_valid_value=lambda value: value in {"alpha", "beta"},
        )
        self.st.session_state["choice"] = {
            "state": {
                "kind": "select",
                "value": {"forged": True},
                "clientRevision": 2,
                "serverRevision": 0,
            }
        }

        state = _protocol.prepare_state(
            key="choice",
            kind="select",
            default_value="alpha",
            is_valid_value=lambda value: value in {"alpha", "beta"},
        )

        self.assertEqual(state["value"], "alpha")
        self.assertEqual(state["serverRevision"], 1)

    def test_malformed_state_fails_closed(self) -> None:
        self.st.session_state["choice"] = {
            "state": {
                "kind": "select",
                "value": "alpha",
                "clientRevision": True,
                "serverRevision": 0,
            }
        }

        with self.assertRaisesRegex(RuntimeError, "malformed"):
            _protocol.prepare_state(
                key="choice",
                kind="select",
                default_value="alpha",
                is_valid_value=lambda value: True,
            )

    def test_elements_preserve_keyed_nodes_across_reordering(self) -> None:
        defaults = {
            "card/name": {"kind": "input", "value": "Ada"},
            "card/enabled": {"kind": "checkbox", "value": True},
        }
        validators = {
            "card/name": lambda value: isinstance(value, str),
            "card/enabled": lambda value: isinstance(value, bool),
        }
        _protocol.prepare_elements_state(
            key="tree",
            node_defaults=defaults,
            validators=validators,
        )
        self.st.session_state["tree"] = {
            "state": {
                "kind": "elements",
                "value": {
                    "nodes": {
                        "card/name": {
                            "kind": "input",
                            "value": "Grace",
                            "clientRevision": 1,
                            "serverRevision": 0,
                            "changeSequence": 1,
                        },
                        "card/enabled": {
                            "kind": "checkbox",
                            "value": False,
                            "clientRevision": 1,
                            "serverRevision": 0,
                            "changeSequence": 2,
                        },
                    },
                    "sequence": 2,
                },
                "clientRevision": 2,
                "serverRevision": 0,
            }
        }

        reordered = _protocol.prepare_elements_state(
            key="tree",
            node_defaults={
                "card/enabled": defaults["card/enabled"],
                "card/name": defaults["card/name"],
            },
            validators=validators,
        )

        self.assertEqual(
            reordered["value"]["nodes"]["card/name"]["value"],
            "Grace",
        )
        self.assertIs(
            reordered["value"]["nodes"]["card/enabled"]["value"],
            False,
        )
        self.assertEqual(reordered["serverRevision"], 0)

    def test_elements_client_cannot_spoof_node_server_revision(self) -> None:
        defaults = {"name": {"kind": "input", "value": "Ada"}}
        validators = {"name": lambda value: isinstance(value, str)}
        _protocol.prepare_elements_state(
            key="tree",
            node_defaults=defaults,
            validators=validators,
        )
        self.st.session_state["tree"] = {
            "state": {
                "kind": "elements",
                "value": {
                    "nodes": {
                        "name": {
                            "kind": "input",
                            "value": "Grace",
                            "clientRevision": 1,
                            "serverRevision": 999,
                            "changeSequence": 1,
                        }
                    },
                    "sequence": 1,
                },
                "clientRevision": 1,
                "serverRevision": 0,
            }
        }

        state = _protocol.prepare_elements_state(
            key="tree",
            node_defaults=defaults,
            validators=validators,
        )

        self.assertEqual(
            state["value"]["nodes"]["name"]["serverRevision"],
            0,
        )
        self.assertEqual(state["serverRevision"], 1)

    def test_elements_reset_only_the_node_whose_default_changed(self) -> None:
        validators = {
            "name": lambda value: isinstance(value, str),
            "enabled": lambda value: isinstance(value, bool),
        }
        _protocol.prepare_elements_state(
            key="tree",
            node_defaults={
                "name": {"kind": "input", "value": "Ada"},
                "enabled": {"kind": "checkbox", "value": True},
            },
            validators=validators,
        )
        self.st.session_state["tree"] = {
            "state": {
                "kind": "elements",
                "value": {
                    "nodes": {
                        "name": {
                            "kind": "input",
                            "value": "Grace",
                            "clientRevision": 2,
                            "serverRevision": 0,
                            "changeSequence": 2,
                        },
                        "enabled": {
                            "kind": "checkbox",
                            "value": False,
                            "clientRevision": 1,
                            "serverRevision": 0,
                            "changeSequence": 1,
                        },
                    },
                    "sequence": 2,
                },
                "clientRevision": 3,
                "serverRevision": 0,
            }
        }

        reset = _protocol.prepare_elements_state(
            key="tree",
            node_defaults={
                "name": {"kind": "input", "value": "Lin"},
                "enabled": {"kind": "checkbox", "value": True},
            },
            validators=validators,
        )

        self.assertEqual(reset["value"]["nodes"]["name"]["value"], "Lin")
        self.assertIs(
            reset["value"]["nodes"]["enabled"]["value"],
            False,
        )
        self.assertEqual(
            reset["value"]["nodes"]["name"]["serverRevision"],
            1,
        )
        self.assertEqual(reset["serverRevision"], 1)

    def test_elements_prune_removed_node_state(self) -> None:
        validator = {"name": lambda value: isinstance(value, str)}
        _protocol.prepare_elements_state(
            key="tree",
            node_defaults={"name": {"kind": "input", "value": "Ada"}},
            validators=validator,
        )
        self.st.session_state["tree"] = {
            "state": {
                "kind": "elements",
                "value": {
                    "nodes": {
                        "name": {
                            "kind": "input",
                            "value": "Grace",
                            "clientRevision": 1,
                            "serverRevision": 0,
                            "changeSequence": 1,
                        },
                        "removed": {
                            "kind": "checkbox",
                            "value": True,
                            "clientRevision": 1,
                            "serverRevision": 0,
                            "changeSequence": 2,
                        },
                    },
                    "sequence": 2,
                },
                "clientRevision": 2,
                "serverRevision": 0,
            }
        }

        state = _protocol.prepare_elements_state(
            key="tree",
            node_defaults={"name": {"kind": "input", "value": "Ada"}},
            validators=validator,
        )

        self.assertEqual(set(state["value"]["nodes"]), {"name"})
        self.assertEqual(state["serverRevision"], 1)


class ProtocolBoundaryTests(unittest.TestCase):
    def test_text_limit_counts_utf8_bytes(self) -> None:
        accepted = "界" * (_protocol.MAX_TEXT_BYTES // 3)
        self.assertEqual(_protocol.validate_text(accepted, "label"), accepted)

        with self.assertRaisesRegex(ValueError, "16 KiB"):
            _protocol.validate_text(accepted + "界", "label")

    def test_collection_limit(self) -> None:
        _protocol.validate_collection_size(
            [None] * _protocol.MAX_OPTIONS,
            "options",
        )
        with self.assertRaisesRegex(ValueError, "10,000"):
            _protocol.validate_collection_size(
                [None] * (_protocol.MAX_OPTIONS + 1),
                "options",
            )

    def test_envelope_limit(self) -> None:
        with self.assertRaisesRegex(ValueError, "2 MiB"):
            _protocol.validate_envelope(
                {"padding": "x" * _protocol.MAX_ENVELOPE_BYTES}
            )


if __name__ == "__main__":
    unittest.main()
