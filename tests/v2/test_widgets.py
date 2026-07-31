from __future__ import annotations

import importlib
import inspect
import unittest
from types import SimpleNamespace
from unittest.mock import patch

import streamlit_shadcn_ui.v2 as public_api
from streamlit_shadcn_ui.v2 import _protocol


select_module = importlib.import_module(
    "streamlit_shadcn_ui.v2.widgets.select"
)
checkbox_module = importlib.import_module(
    "streamlit_shadcn_ui.v2.widgets.checkbox"
)
button_module = importlib.import_module(
    "streamlit_shadcn_ui.v2.widgets.button"
)
menu_module = importlib.import_module(
    "streamlit_shadcn_ui.v2.widgets.dropdown_menu"
)


class _FakeStreamlit:
    def __init__(self) -> None:
        self.session_state = {}


class PublicApiContractTests(unittest.TestCase):
    def setUp(self) -> None:
        self.streamlit = _FakeStreamlit()
        self.runtime_patch = patch.object(
            _protocol,
            "require_v2_runtime",
            return_value=self.streamlit,
        )
        self.runtime_patch.start()
        self.addCleanup(self.runtime_patch.stop)

    def test_wave1_namespace_exports_only_the_four_approved_widgets(
        self,
    ) -> None:
        self.assertEqual(
            public_api.__all__,
            ["button", "checkbox", "dropdown_menu", "select"],
        )

    def test_public_signatures_are_frozen_for_the_opt_in_poc(self) -> None:
        expected = {
            "button": [
                ("text", inspect.Parameter.empty),
                ("key", inspect.Parameter.empty),
                ("variant", "default"),
                ("disabled", False),
                ("on_click", None),
                ("width", "content"),
            ],
            "checkbox": [
                ("label", inspect.Parameter.empty),
                ("key", inspect.Parameter.empty),
                ("default_checked", False),
                ("disabled", False),
                ("on_change", None),
                ("width", "content"),
            ],
            "dropdown_menu": [
                ("label", inspect.Parameter.empty),
                ("items", inspect.Parameter.empty),
                ("key", inspect.Parameter.empty),
                ("menu_label", None),
                ("disabled", False),
                ("on_select", None),
                ("width", "content"),
            ],
            "select": [
                ("label", inspect.Parameter.empty),
                ("options", inspect.Parameter.empty),
                ("key", inspect.Parameter.empty),
                ("value", None),
                ("index", 0),
                ("placeholder", "Select an option"),
                ("disabled", False),
                ("on_change", None),
                ("width", "stretch"),
            ],
        }
        for name, contract in expected.items():
            parameters = inspect.signature(
                getattr(public_api, name)
            ).parameters.values()
            self.assertEqual(
                [(parameter.name, parameter.default) for parameter in parameters],
                contract,
            )

    def test_select_emits_and_returns_the_revisioned_state_cell(self) -> None:
        captured = {}

        def mount(**kwargs):
            captured.update(kwargs)

        with patch.object(select_module, "mount", side_effect=mount):
            value = public_api.select(
                "Fruit",
                ["Apple", "Banana"],
                key="fruit",
                value="Banana",
                index=None,
            )

        self.assertEqual(value, "Banana")
        self.assertEqual(captured["data"]["kind"], "select")
        self.assertEqual(
            captured["default"]["state"],
            {
                "kind": "select",
                "value": "Banana",
                "clientRevision": 0,
                "serverRevision": 0,
            },
        )
        self.assertEqual(
            captured["default"]["meta"],
            {"protocolVersion": 1, "kind": "select"},
        )
        self.assertEqual(set(captured["callbacks"]), {"on_state_change"})

    def test_checkbox_returns_bool_and_uses_the_same_state_shape(self) -> None:
        captured = {}
        with patch.object(
            checkbox_module,
            "mount",
            side_effect=lambda **kwargs: captured.update(kwargs),
        ):
            checked = public_api.checkbox(
                "Remember",
                key="remember",
                default_checked=True,
            )

        self.assertIs(checked, True)
        self.assertEqual(
            captured["default"]["state"],
            {
                "kind": "checkbox",
                "value": True,
                "clientRevision": 0,
                "serverRevision": 0,
            },
        )

    def test_button_returns_only_the_transient_click_cell(self) -> None:
        captured = {}
        with patch.object(
            button_module,
            "fail_if_trigger_in_form",
        ), patch.object(
            button_module,
            "register_kind",
        ), patch.object(
            button_module,
            "mount",
            side_effect=lambda **kwargs: (
                captured.update(kwargs) or {"click": True}
            ),
        ):
            clicked = public_api.button("Run", key="run")

        self.assertIs(clicked, True)
        self.assertEqual(
            captured["default"],
            {"meta": {"protocolVersion": 1, "kind": "button"}},
        )
        self.assertEqual(set(captured["callbacks"]), {"on_click_change"})

    def test_dropdown_returns_only_a_valid_transient_action(self) -> None:
        with patch.object(
            menu_module,
            "fail_if_trigger_in_form",
        ), patch.object(
            menu_module,
            "register_kind",
        ), patch.object(
            menu_module,
            "mount",
            return_value=SimpleNamespace(action="Archive"),
        ):
            action = public_api.dropdown_menu(
                "Actions",
                ["Archive", "Delete"],
                key="actions",
            )
        self.assertEqual(action, "Archive")

        with patch.object(
            menu_module,
            "fail_if_trigger_in_form",
        ), patch.object(
            menu_module,
            "register_kind",
        ), patch.object(
            menu_module,
            "mount",
            return_value={"action": "forged"},
        ):
            action = public_api.dropdown_menu(
                "Actions",
                ["Archive", "Delete"],
                key="other-actions",
            )
        self.assertIsNone(action)

    def test_select_empty_and_invalid_defaults_fail_deterministically(
        self,
    ) -> None:
        with patch.object(select_module, "mount"):
            self.assertIsNone(
                public_api.select(
                    "Empty",
                    [],
                    key="empty",
                    index=None,
                )
            )
        with self.assertRaisesRegex(ValueError, "not present"):
            public_api.select(
                "Fruit",
                ["Apple"],
                key="invalid",
                value="Banana",
            )
        with self.assertRaisesRegex(ValueError, "must be unique"):
            public_api.select(
                "Fruit",
                ["Apple", "Apple"],
                key="duplicate",
            )


if __name__ == "__main__":
    unittest.main()
