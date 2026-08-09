from __future__ import annotations

import importlib
import inspect
import unittest
from types import SimpleNamespace
from unittest.mock import patch

import streamlit_shadcn_ui as ui


elements_module = importlib.import_module(
    "streamlit_shadcn_ui.v2.elements"
)


def prepared_state(node_defaults):
    return {
        "kind": "elements",
        "value": {
            "nodes": {
                node_id: {
                    "kind": spec["kind"],
                    "value": spec["value"],
                    "clientRevision": 0,
                    "serverRevision": 0,
                    "changeSequence": 0,
                }
                for node_id, spec in node_defaults.items()
            },
            "sequence": 0,
        },
        "clientRevision": 0,
        "serverRevision": 0,
    }


class ElementsBuilderTests(unittest.TestCase):
    def test_public_elements_surface_is_frozen_for_1_1(self) -> None:
        root_parameters = inspect.signature(ui.elements).parameters
        self.assertEqual(list(root_parameters), ["key", "width"])
        self.assertIs(
            root_parameters["key"].kind,
            inspect.Parameter.KEYWORD_ONLY,
        )
        self.assertIs(
            root_parameters["key"].default,
            inspect.Parameter.empty,
        )
        self.assertEqual(root_parameters["width"].default, "stretch")

        public_methods = {
            name
            for name, method in inspect.getmembers(
                ui.ElementsBuilder,
                predicate=inspect.isfunction,
            )
            if not name.startswith("_")
        }
        self.assertEqual(
            public_methods,
            {
                "badge",
                "button",
                "card",
                "card_content",
                "card_footer",
                "card_header",
                "checkbox",
                "code",
                "grid",
                "heading",
                "image",
                "input",
                "link_button",
                "progress",
                "radio_group",
                "select",
                "separator",
                "slider",
                "stack",
                "switch",
                "text",
                "textarea",
            },
        )

    def test_nested_tree_mounts_once_and_populates_handles(self) -> None:
        captured = {}

        def prepare(**kwargs):
            state = prepared_state(kwargs["node_defaults"])
            state["value"]["nodes"]["profile/email"]["value"] = (
                "grace@example.com"
            )
            state["value"]["nodes"]["profile/alerts"]["value"] = False
            return state

        with patch.object(
            elements_module,
            "prepare_elements_state",
            side_effect=prepare,
        ), patch.object(
            elements_module,
            "fail_if_trigger_in_form",
        ), patch.object(
            elements_module,
            "mount",
            side_effect=lambda **kwargs: captured.update(kwargs) or {},
        ) as mounted:
            with ui.elements(key="settings") as el:
                with el.card(key="profile"):
                    with el.card_header():
                        el.heading("Profile")
                        el.text("Manage account settings", variant="muted")
                    with el.card_content():
                        with el.stack(gap="sm"):
                            email = el.input(
                                "Email",
                                key="email",
                                value="ada@example.com",
                            )
                            alerts = el.checkbox(
                                "Security alerts",
                                key="alerts",
                                value=True,
                            )
                    with el.card_footer():
                        save = el.button("Save", key="save", stretch=True)

        mounted.assert_called_once()
        self.assertEqual(email.value, "grace@example.com")
        self.assertIs(alerts.value, False)
        self.assertIs(save.clicked, False)
        self.assertEqual(captured["data"]["kind"], "elements")
        card = captured["data"]["props"]["nodes"][0]
        self.assertEqual(card["type"], "card")
        self.assertEqual(
            [child["type"] for child in card["children"]],
            ["card_header", "card_content", "card_footer"],
        )
        self.assertEqual(
            set(captured["callbacks"]),
            {"on_state_change", "on_events_change"},
        )

    def test_stateful_and_action_nodes_require_stable_keys(self) -> None:
        with self.assertRaisesRegex(TypeError, "required keyword-only"):
            with ui.elements(key="missing-input-key") as el:
                el.input("Name")
        with self.assertRaisesRegex(TypeError, "required keyword-only"):
            with ui.elements(key="missing-button-key") as el:
                el.button("Save")

    def test_duplicate_sibling_keys_fail_before_mount(self) -> None:
        builder = ui.elements(key="duplicates")
        with self.assertRaisesRegex(ValueError, "Duplicate sibling"):
            with builder as el:
                el.text("First", key="same")
                el.text("Second", key="same")

    def test_card_rejects_unstructured_direct_children(self) -> None:
        with self.assertRaisesRegex(RuntimeError, "Direct children of card"):
            with ui.elements(key="invalid-card") as el:
                with el.card(key="card"):
                    el.text("Content must be in a card slot")

    def test_choice_handles_decode_original_python_values(self) -> None:
        captured = {}

        def prepare(**kwargs):
            return prepared_state(kwargs["node_defaults"])

        with patch.object(
            elements_module,
            "prepare_elements_state",
            side_effect=prepare,
        ), patch.object(
            elements_module,
            "mount",
            side_effect=lambda **kwargs: captured.update(kwargs) or {},
        ):
            with ui.elements(key="choices") as el:
                choice = el.select(
                    "Account",
                    [{"id": 1}, {"id": 2}],
                    key="account",
                    format_func=lambda item: "Account %d" % item["id"],
                )

        self.assertEqual(choice.value, {"id": 1})
        self.assertEqual(
            captured["data"]["props"]["nodes"][0]["type"],
            "select",
        )


class ElementsCallbackTests(unittest.TestCase):
    def test_value_callbacks_receive_typed_events_in_change_order(self) -> None:
        received = []
        fake_streamlit = SimpleNamespace(
            session_state={
                "tree": {
                    "state": {
                        "kind": "elements",
                        "value": {
                            "nodes": {
                                "second": {
                                    "kind": "checkbox",
                                    "value": False,
                                    "clientRevision": 1,
                                    "serverRevision": 0,
                                    "changeSequence": 2,
                                },
                                "first": {
                                    "kind": "input",
                                    "value": "Grace",
                                    "clientRevision": 1,
                                    "serverRevision": 0,
                                    "changeSequence": 1,
                                },
                            }
                        },
                    }
                }
            }
        )
        with patch.object(
            elements_module,
            "require_v2_runtime",
            return_value=fake_streamlit,
        ):
            elements_module._dispatch_state_changes(
                "tree",
                "settings",
                {"first": 0, "second": 0},
                {
                    "first": received.append,
                    "second": received.append,
                },
                {"first": "input", "second": "checkbox"},
                {
                    "first": lambda value: isinstance(value, str),
                    "second": lambda value: isinstance(value, bool),
                },
                {"first": str, "second": bool},
            )

        self.assertEqual(
            [(event.node_id, event.value) for event in received],
            [("first", "Grace"), ("second", False)],
        )

    def test_value_callbacks_ignore_invalid_client_values(self) -> None:
        received = []
        fake_streamlit = SimpleNamespace(
            session_state={
                "tree": {
                    "state": {
                        "kind": "elements",
                        "value": {
                            "nodes": {
                                "choice": {
                                    "kind": "select",
                                    "value": "forged",
                                    "clientRevision": 1,
                                    "serverRevision": 0,
                                    "changeSequence": 1,
                                }
                            }
                        },
                    }
                }
            }
        )
        with patch.object(
            elements_module,
            "require_v2_runtime",
            return_value=fake_streamlit,
        ):
            elements_module._dispatch_state_changes(
                "tree",
                "settings",
                {"choice": 0},
                {"choice": received.append},
                {"choice": "select"},
                {"choice": lambda value: value == "valid"},
                {"choice": str},
            )

        self.assertEqual(received, [])

    def test_action_batches_keep_order_and_support_zero_arg_callbacks(self) -> None:
        received = []
        fake_streamlit = SimpleNamespace(
            session_state={
                "tree": {
                    "events": [
                        {
                            "nodeId": "first",
                            "type": "click",
                            "payload": True,
                            "sequence": 4,
                        },
                        {
                            "nodeId": "second",
                            "type": "click",
                            "payload": True,
                            "sequence": 5,
                        },
                    ]
                }
            }
        )

        with patch.object(
            elements_module,
            "require_v2_runtime",
            return_value=fake_streamlit,
        ):
            elements_module._dispatch_events(
                "tree",
                "actions",
                {
                    ("first", "click"): lambda event: received.append(
                        event.node_id
                    ),
                    ("second", "click"): lambda: received.append("second"),
                },
            )

        self.assertEqual(received, ["first", "second"])


if __name__ == "__main__":
    unittest.main()
