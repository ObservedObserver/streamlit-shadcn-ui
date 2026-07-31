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
common_module = importlib.import_module(
    "streamlit_shadcn_ui.v2.widgets._common"
)
breadcrumb_module = importlib.import_module(
    "streamlit_shadcn_ui.v2.widgets.breadcrumb"
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

    def test_namespace_exports_wave1_and_wave2_widgets(
        self,
    ) -> None:
        self.assertEqual(
            public_api.__all__,
            [
                "alert",
                "aspect_ratio",
                "avatar",
                "badge",
                "badges",
                "breadcrumb",
                "button",
                "card",
                "checkbox",
                "dropdown_menu",
                "link_button",
                "metric_card",
                "progress",
                "select",
                "separator",
                "skeleton",
                "table",
            ],
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

    def test_wave2_stateless_widgets_emit_metadata_envelopes(self) -> None:
        captured = []

        def mount(**kwargs):
            captured.append(kwargs)

        with patch.object(common_module, "mount", side_effect=mount):
            public_api.alert("Heads up", key="alert")
            public_api.aspect_ratio(
                "https://example.com/image.png",
                "Example",
                key="ratio",
            )
            public_api.avatar(
                fallback="OO",
                key="avatar",
            )
            public_api.badges(
                [("Stable", "default"), ("Risk", "destructive")],
                key="badges",
            )
            public_api.card(
                "Card",
                "Content",
                "Description",
                key="card",
            )
            public_api.metric_card(
                "Revenue",
                "$42",
                "+5%",
                key="metric",
            )
            public_api.link_button(
                "Docs",
                "https://example.com/docs",
                key="link",
            )
            public_api.progress(
                42,
                key="progress",
                label="Upload",
                show_value=True,
            )
            public_api.separator(key="separator")
            public_api.skeleton(
                key="skeleton",
                width_px="10rem",
                height_px=24,
            )
            public_api.table(
                [{"name": "Ada", "score": 10}],
                key="table",
                caption="Scores",
            )

        expected_kinds = [
            "alert",
            "aspect_ratio",
            "avatar",
            "badge",
            "card",
            "metric_card",
            "link_button",
            "progress",
            "separator",
            "skeleton",
            "table",
        ]
        self.assertEqual(
            [call["data"]["kind"] for call in captured],
            expected_kinds,
        )
        for call, kind in zip(captured, expected_kinds):
            self.assertEqual(
                call["default"],
                {"meta": {"protocolVersion": 1, "kind": kind}},
            )

    def test_breadcrumb_returns_only_a_valid_transient_action(self) -> None:
        items = [
            {"text": "Home", "href": "/"},
            {"text": "Current", "isCurrentPage": True},
        ]
        with patch.object(
            breadcrumb_module,
            "fail_if_trigger_in_form",
        ), patch.object(
            breadcrumb_module,
            "register_kind",
        ), patch.object(
            breadcrumb_module,
            "mount",
            return_value={
                "action": {"text": "Home", "href": "/", "index": 0}
            },
        ):
            self.assertEqual(
                public_api.breadcrumb(items, key="crumbs"),
                {"text": "Home", "href": "/", "index": 0},
            )

        with patch.object(
            breadcrumb_module,
            "fail_if_trigger_in_form",
        ), patch.object(
            breadcrumb_module,
            "register_kind",
        ), patch.object(
            breadcrumb_module,
            "mount",
            return_value={
                "action": {
                    "text": "forged",
                    "href": "/",
                    "index": 0,
                }
            },
        ):
            self.assertIsNone(
                public_api.breadcrumb(items, key="other-crumbs")
            )

    def test_wave2_boundaries_fail_closed(self) -> None:
        with self.assertRaisesRegex(ValueError, "http"):
            public_api.link_button(
                "Unsafe",
                "javascript:alert(1)",
                key="unsafe-link",
            )
        with self.assertRaisesRegex(ValueError, "image data URL"):
            public_api.avatar(
                "javascript:alert(1)",
                key="unsafe-avatar",
            )
        with self.assertRaisesRegex(ValueError, "image data URL"):
            public_api.aspect_ratio(
                "file:///tmp/private.png",
                "Unsafe image",
                key="unsafe-aspect-ratio",
            )
        with self.assertRaisesRegex(ValueError, "0 to 100"):
            public_api.progress(101, key="invalid-progress")
        with self.assertRaisesRegex(ValueError, "units"):
            public_api.skeleton(
                key="invalid-skeleton",
                width_px="calc(100% - 1rem)",
            )
        with self.assertRaisesRegex(ValueError, "unique"):
            public_api.table(
                [{"name": "Ada"}],
                [
                    {"key": "name"},
                    {"key": "name"},
                ],
                key="duplicate-columns",
            )


if __name__ == "__main__":
    unittest.main()
