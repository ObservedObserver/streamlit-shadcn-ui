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
                "button_group",
                "button_group_separator",
                "button_group_text",
                "card",
                "card_content",
                "card_footer",
                "card_header",
                "checkbox",
                "code",
                "combobox",
                "dialog",
                "dialog_close_button",
                "dialog_footer",
                "sheet",
                "sheet_close_button",
                "sheet_footer",
                "empty",
                "empty_content",
                "empty_description",
                "empty_header",
                "empty_media",
                "empty_title",
                "field",
                "field_group",
                "field_separator",
                "field_set",
                "grid",
                "heading",
                "image",
                "input",
                "input_group",
                "link_button",
                "number_input",
                "progress",
                "radio_group",
                "select",
                "separator",
                "slider",
                "spinner",
                "stack",
                "switch",
                "text",
                "textarea",
                "tooltip",
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

    def test_p0_components_serialize_one_composed_tree(self) -> None:
        captured = {}

        with patch.object(
            elements_module,
            "prepare_elements_state",
            side_effect=lambda **kwargs: prepared_state(
                kwargs["node_defaults"]
            ),
        ), patch.object(
            elements_module,
            "fail_if_trigger_in_form",
        ), patch.object(
            elements_module,
            "mount",
            side_effect=lambda **kwargs: captured.update(kwargs) or {},
        ):
            with ui.elements(key="p0-tree") as el:
                with el.button_group("Editor actions", key="actions"):
                    run = el.button("Run", key="run", help="Run now")
                    el.button_group_separator()
                    el.button_group_text("or")
                    with el.button_group("More", key="more"):
                        el.button("Queue", key="queue", loading=True)
                with el.tooltip("Open documentation"):
                    el.link_button(
                        "Docs",
                        "https://example.com/docs",
                        key="docs",
                    )
                with el.dialog(
                    "Confirm run",
                    key="confirm",
                    description="Review the pending action.",
                ):
                    el.text("This action is safe to retry.")
                    with el.dialog_footer():
                        el.button("Keep open", key="keep-open")
                        close = el.dialog_close_button(
                            "Close",
                            key="close",
                        )
                with el.empty(key="empty"):
                    with el.empty_header():
                        with el.empty_media(variant="icon"):
                            el.spinner(label="Checking")
                        el.empty_title("No results")
                        el.empty_description("Try another query.")
                    with el.empty_content():
                        el.button("Reset", key="reset")
                with el.field_set(
                    "Profile",
                    description="Public account details.",
                ):
                    with el.field_group():
                        with el.field(
                            "Website",
                            description="Your public URL.",
                        ):
                            website = el.input_group(
                                "Website",
                                "example.com",
                                key="website",
                                prefix="https://",
                                clearable=True,
                            )
                        el.field_separator("Choices")
                        with el.field("Release"):
                            release = el.combobox(
                                "Release",
                                ["Stable", "Canary"],
                                key="release",
                                value="Stable",
                            )

        self.assertFalse(run.clicked)
        self.assertFalse(close.clicked)
        self.assertEqual(website.value, "example.com")
        self.assertEqual(release.value, "Stable")
        roots = captured["data"]["props"]["nodes"]
        self.assertEqual(
            [node["type"] for node in roots],
            ["button_group", "tooltip", "dialog", "empty", "field_set"],
        )
        self.assertEqual(
            [child["type"] for child in roots[0]["children"]],
            [
                "button",
                "button_group_separator",
                "button_group_text",
                "button_group",
            ],
        )

    def test_sheet_composition_serializes_sides_and_actions(self) -> None:
        captured = {}
        with patch.object(elements_module, "prepare_elements_state",
                          side_effect=lambda **kwargs: prepared_state(kwargs["node_defaults"])), \
             patch.object(elements_module, "fail_if_trigger_in_form"), \
             patch.object(elements_module, "mount",
                          side_effect=lambda **kwargs: captured.update(kwargs) or {}):
            with ui.elements(key="sheet-tree") as el:
                for side in ("top", "right", "bottom", "left"):
                    with el.sheet("Details", key=side, side=side):
                        el.input("Name", "Ada", key="name")
                        with el.sheet_footer():
                            el.button("Save", key="save")
                            el.sheet_close_button("Done", key="done")
        roots = captured["data"]["props"]["nodes"]
        self.assertEqual([node["props"]["side"] for node in roots],
                         ["top", "right", "bottom", "left"])
        self.assertEqual(roots[0]["children"][1]["type"], "sheet_footer")
        self.assertEqual(roots[0]["children"][1]["children"][1]["type"],
                         "sheet_close_button")

    def test_sheet_invalid_slots_and_side_fail_before_mount(self) -> None:
        with patch.object(elements_module, "mount") as mount:
            with self.assertRaisesRegex(ValueError, "side"):
                with ui.elements(key="bad-side") as el:
                    el.sheet("Details", side="center")
            with self.assertRaisesRegex(RuntimeError, "sheet_footer"):
                with ui.elements(key="orphan-footer") as el:
                    with el.sheet_footer():
                        pass
            with self.assertRaisesRegex(RuntimeError, "two footers"):
                with ui.elements(key="two-footers") as el:
                    with el.sheet("Details"):
                        with el.sheet_footer():
                            pass
                        with el.sheet_footer():
                            pass
            with self.assertRaisesRegex(RuntimeError, "buttons"):
                with ui.elements(key="bad-footer") as el:
                    with el.sheet("Details"):
                        with el.sheet_footer():
                            el.input("Name", key="name")
            mount.assert_not_called()

    def test_p0_composition_rules_fail_before_mount(self) -> None:
        with self.assertRaisesRegex(RuntimeError, "tooltip"):
            with ui.elements(key="invalid-tooltip") as el:
                with el.tooltip("Invalid"):
                    el.text("Not interactive")

        with self.assertRaisesRegex(RuntimeError, "field"):
            with ui.elements(key="invalid-field") as el:
                with el.field("Missing control"):
                    el.text("Not a control")

        with self.assertRaisesRegex(RuntimeError, "button_group"):
            with ui.elements(key="invalid-button-group") as el:
                with el.button_group("Invalid"):
                    el.text("Not group text")


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
