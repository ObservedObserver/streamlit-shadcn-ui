import importlib
import unittest
from unittest.mock import patch

import streamlit_shadcn_ui as ui
from test_elements import prepared_state

module = importlib.import_module("streamlit_shadcn_ui.v2.elements")


class ContainerTests(unittest.TestCase):
    def test_nested_slots_preserve_keyed_child_identity_on_reorder(self):
        snapshots = []
        for order in (("a", "b"), ("b", "a")):
            with patch.object(
                module,
                "prepare_elements_state",
                side_effect=lambda **kw: prepared_state(kw["node_defaults"]),
            ), patch.object(
                module, "mount", side_effect=lambda **kw: snapshots.append(kw) or {}
            ):
                with ui.elements(key="containers") as el:
                    with el.tabs(key="tabs"):
                        for value in order:
                            with el.tab(value, value.upper()):
                                with el.accordion(
                                    key="sections", default_value=["details"]
                                ):
                                    with el.accordion_item("details", "Details"):
                                        with el.collapsible("More", key="more"):
                                            with el.scroll_area(height=180):
                                                el.input("Name", key="name")
        identities = [set(s["data"]["state"]["value"]["nodes"]) for s in snapshots]
        self.assertEqual(identities[0], identities[1])
        self.assertEqual(
            identities[0],
            {"tabs/a/sections/details/more/name", "tabs/b/sections/details/more/name"},
        )

    def test_invalid_composition_and_defaults_fail_before_mount(self):
        cases = [
            lambda el: el.tab("a", "A"),
            lambda el: el.accordion_item("a", "A"),
            lambda el: el.scroll_area(height=True),
            lambda el: el.accordion(key="a", default_value="a"),
            lambda el: el.accordion(key="a", default_value=["a", "b"]),
        ]
        for action in cases:
            with self.subTest(action=action), patch.object(module, "mount") as mount:
                with self.assertRaises((ValueError, TypeError, RuntimeError)):
                    with ui.elements(key="invalid") as el:
                        action(el)
                mount.assert_not_called()
        with self.assertRaisesRegex(ValueError, "existing item"):
            with ui.elements(key="invalid-default") as el:
                with el.tabs(key="tabs", default_value="missing"):
                    with el.tab("a", "A"):
                        el.text("A")
        with self.assertRaisesRegex(RuntimeError, "only tab"):
            with ui.elements(key="invalid-child") as el:
                with el.tabs(key="tabs"):
                    el.text("Invalid child")
