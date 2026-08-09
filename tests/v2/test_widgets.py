from __future__ import annotations

import datetime
import importlib
import inspect
import unittest
from types import SimpleNamespace
from unittest.mock import patch

import streamlit_shadcn_ui.v2 as public_api
from streamlit_shadcn_ui.v2 import _protocol


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
alert_dialog_module = importlib.import_module(
    "streamlit_shadcn_ui.v2.widgets.alert_dialog"
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

    def test_namespace_exports_accepted_widgets(
        self,
    ) -> None:
        self.assertEqual(
            public_api.__all__,
            [
                "AccordionItem",
                "BadgeItem",
                "BreadcrumbItem",
                "BreadcrumbSelection",
                "Choice",
                "MenuItem",
                "TableColumn",
                "accordion",
                "alert",
                "alert_dialog",
                "aspect_ratio",
                "avatar",
                "badge",
                "badges",
                "breadcrumb",
                "button",
                "calendar",
                "card",
                "checkbox",
                "collapsible",
                "date_picker",
                "dropdown_menu",
                "hover_card",
                "input",
                "input_otp",
                "link_button",
                "metric_card",
                "pagination",
                "popover",
                "progress",
                "radio_group",
                "scroll_area",
                "select",
                "separator",
                "skeleton",
                "slider",
                "switch",
                "table",
                "tabs",
                "textarea",
                "toggle",
                "toggle_group",
            ],
        )

    def test_public_signatures_are_frozen_for_1_0(self) -> None:
        expected = {
            "button": [
                ("label", inspect.Parameter.empty),
                ("key", None),
                ("variant", "default"),
                ("size", "default"),
                ("disabled", False),
                ("on_click", None),
                ("width", "content"),
            ],
            "checkbox": [
                ("label", inspect.Parameter.empty),
                ("value", False),
                ("key", None),
                ("disabled", False),
                ("on_change", None),
                ("width", "content"),
            ],
            "dropdown_menu": [
                ("label", inspect.Parameter.empty),
                ("items", inspect.Parameter.empty),
                ("format_func", str),
                ("key", None),
                ("menu_label", None),
                ("disabled", False),
                ("on_select", None),
                ("width", "content"),
            ],
            "select": [
                ("label", inspect.Parameter.empty),
                ("options", inspect.Parameter.empty),
                ("value", None),
                ("index", 0),
                ("format_func", str),
                ("key", None),
                ("placeholder", "Select an option"),
                ("disabled", False),
                ("on_change", None),
                ("width", "stretch"),
            ],
            "alert_dialog": [
                ("show", inspect.Parameter.empty),
                ("title", inspect.Parameter.empty),
                ("description", inspect.Parameter.empty),
                ("confirm_label", "Confirm"),
                ("cancel_label", "Cancel"),
                ("key", None),
                ("on_decision", None),
                ("width", "content"),
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

    def test_every_widget_has_an_optional_keyword_only_key(self) -> None:
        for name in public_api.__all__:
            widget = getattr(public_api, name)
            if not inspect.isfunction(widget):
                continue
            with self.subTest(widget=name):
                signature = inspect.signature(widget)
                key = signature.parameters["key"]
                self.assertIsNone(key.default)
                self.assertIs(key.kind, inspect.Parameter.KEYWORD_ONLY)
                self.assertFalse(
                    any(
                        parameter.kind
                        is inspect.Parameter.VAR_KEYWORD
                        for parameter in signature.parameters.values()
                    )
                )

    def test_1_0_vocabulary_removes_transport_or_legacy_names(self) -> None:
        banned = {
            "class_name",
            "default_checked",
            "default_open",
            "default_value",
            "default_values",
            "initial_page",
            "multiple",
        }
        for name in public_api.__all__:
            widget = getattr(public_api, name)
            if inspect.isfunction(widget):
                with self.subTest(widget=name):
                    self.assertTrue(
                        banned.isdisjoint(inspect.signature(widget).parameters)
                    )

    def test_select_emits_and_returns_the_revisioned_state_cell(self) -> None:
        captured = {}

        def mount(**kwargs):
            captured.update(kwargs)

        with patch.object(common_module, "mount", side_effect=mount):
            value = public_api.select(
                "Fruit",
                ["Apple", "Banana"],
                key="fruit",
                value="Banana",
                index=None,
            )

        self.assertEqual(value, "Banana")
        self.assertEqual(captured["data"]["kind"], "select")
        banana_token = captured["data"]["props"]["options"][1]["value"]
        self.assertEqual(captured["default"]["state"]["value"], banana_token)
        self.assertEqual(captured["default"]["state"]["kind"], "select")
        self.assertEqual(
            captured["default"]["meta"],
            {"protocolVersion": 1, "kind": "select"},
        )
        self.assertEqual(set(captured["callbacks"]), {"on_state_change"})

    def test_checkbox_returns_bool_and_uses_the_same_state_shape(self) -> None:
        captured = {}
        with patch.object(
            common_module,
            "mount",
            side_effect=lambda **kwargs: captured.update(kwargs),
        ):
            checked = public_api.checkbox(
                "Remember",
                key="remember",
                value=True,
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
            common_module,
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
            common_module,
            "mount",
            side_effect=lambda **kwargs: SimpleNamespace(
                action=kwargs["data"]["props"]["items"][0]["value"]
            ),
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
            common_module,
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
        with patch.object(common_module, "mount"):
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
        with self.assertRaisesRegex(IndexError, "outside"):
            public_api.select("Fruit", ["Apple"], index=2)
        with self.assertRaisesRegex(ValueError, "must be unique"):
            public_api.select("Fruit", ["Apple", "Apple"])

    def test_choice_widgets_preserve_python_values_and_labels(self) -> None:
        captured = {}
        alpha = {"id": 1, "slug": "alpha"}
        beta = {"id": 2, "slug": "beta"}

        with patch.object(
            common_module,
            "mount",
            side_effect=lambda **kwargs: captured.update(kwargs),
        ):
            selected = public_api.select(
                "Release",
                [
                    public_api.Choice(alpha, "Alpha"),
                    public_api.Choice(beta, "Beta", disabled=True),
                ],
                value=alpha,
            )

        self.assertIs(selected, alpha)
        self.assertEqual(
            [item["label"] for item in captured["data"]["props"]["options"]],
            ["Alpha", "Beta"],
        )
        self.assertTrue(captured["data"]["props"]["options"][1]["disabled"])
        self.assertTrue(captured["key"].startswith("ssui_v2_component_"))

    def test_unkeyed_widgets_do_not_publish_session_state_names(self) -> None:
        captured = {}
        with patch.object(
            common_module,
            "mount",
            side_effect=lambda **kwargs: captured.update(kwargs),
        ):
            self.assertIs(public_api.checkbox("Remember", value=True), True)

        mount_key = captured["key"]
        self.assertTrue(mount_key.startswith("ssui_v2_component_"))
        self.assertNotIn("Remember", mount_key)
        self.assertNotIn("Remember", self.streamlit.session_state)

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
                delta="+5%",
                variant="dashboard",
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
                skeleton_width="10rem",
                skeleton_height=24,
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
        self.assertEqual(
            captured[5]["data"]["props"]["variant"],
            "dashboard",
        )

    def test_metric_card_defaults_to_the_stable_layout(self) -> None:
        captured = {}

        with patch.object(
            common_module,
            "mount",
            side_effect=lambda **kwargs: captured.update(kwargs),
        ):
            public_api.metric_card(
                "Revenue",
                "$42",
                description="Compared with last month",
                key="stable-metric",
            )

        self.assertEqual(
            captured["data"]["props"]["variant"],
            "default",
        )

    def test_breadcrumb_returns_only_a_valid_transient_action(self) -> None:
        items = [
            {"text": "Home", "href": "/"},
            {"text": "Current", "current": True},
        ]
        with patch.object(
            breadcrumb_module,
            "fail_if_trigger_in_form",
        ), patch.object(
            common_module,
            "mount",
            return_value={
                "action": {"text": "Home", "href": "/", "index": 0}
            },
        ):
            self.assertEqual(
                public_api.breadcrumb(items, key="crumbs"),
                public_api.BreadcrumbSelection("Home", "/", 0),
            )

        with patch.object(
            breadcrumb_module,
            "fail_if_trigger_in_form",
        ), patch.object(
            common_module,
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
        with self.assertRaisesRegex(ValueError, "variant"):
            public_api.metric_card(
                "Revenue",
                "$42",
                variant="restyled",
                key="invalid-metric-variant",
            )
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
                skeleton_width="calc(100% - 1rem)",
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

    def test_wave3_widgets_emit_revisioned_or_stateless_envelopes(
        self,
    ) -> None:
        captured = []

        with patch.object(
            common_module,
            "mount",
            side_effect=lambda **kwargs: captured.append(kwargs),
        ):
            values = [
                public_api.input(
                    "Name",
                    "Ada",
                    key="wave3-input",
                ),
                public_api.textarea(
                    "Notes",
                    "Notes",
                    key="wave3-textarea",
                ),
                public_api.accordion(
                    [{"trigger": "Question", "content": "Answer"}],
                    key="wave3-accordion",
                    value=["0"],
                    selection_mode="multiple",
                ),
                public_api.collapsible(
                    "Details",
                    "First",
                    items=["Second"],
                    key="wave3-collapsible",
                    value=True,
                ),
                public_api.input_otp(
                    "OTP",
                    "123",
                    max_length=6,
                    key="wave3-otp",
                ),
                public_api.pagination(
                    key="wave3-pagination",
                    total_pages=20,
                    page=3,
                ),
                public_api.radio_group(
                    "Channel",
                    [
                        {"label": "Alpha", "value": "a"},
                        {"label": "Beta", "value": "b"},
                    ],
                    value="b",
                    key="wave3-radio",
                ),
                public_api.scroll_area(
                    ["one", "two"],
                    title="Tags",
                    key="wave3-scroll",
                ),
                public_api.slider(
                    "Range",
                    0,
                    100,
                    (20, 80),
                    2,
                    key="wave3-slider",
                ),
                public_api.switch(
                    "Enabled",
                    True,
                    key="wave3-switch",
                ),
                public_api.tabs(
                    ["One", "Two"],
                    value="Two",
                    key="wave3-tabs",
                ),
                public_api.toggle(
                    "Italic",
                    True,
                    icon="italic",
                    key="wave3-toggle",
                ),
                public_api.toggle_group(
                    ["bold", "italic"],
                    value=["bold"],
                    key="wave3-toggle-group",
                ),
                public_api.calendar(
                    key="wave3-calendar",
                    value="2026-07-30",
                ),
            ]

        self.assertEqual(
            values,
            [
                "Ada",
                "Notes",
                ["0"],
                True,
                "123",
                3,
                "b",
                None,
                (20, 80),
                True,
                "Two",
                True,
                ["bold"],
                datetime.date(2026, 7, 30),
            ],
        )
        expected_kinds = [
            "input",
            "textarea",
            "accordion",
            "collapsible",
            "input_otp",
            "pagination",
            "radio_group",
            "scroll_area",
            "slider",
            "switch",
            "tabs",
            "toggle",
            "toggle_group",
            "calendar",
        ]
        self.assertEqual(
            [call["data"]["kind"] for call in captured],
            expected_kinds,
        )
        for call, kind in zip(captured, expected_kinds):
            self.assertEqual(
                call["default"]["meta"],
                {"protocolVersion": 1, "kind": kind},
            )
            if kind == "scroll_area":
                self.assertNotIn("state", call["default"])
                self.assertNotIn("callbacks", call)
            else:
                self.assertEqual(
                    set(call["callbacks"]),
                    {"on_state_change"},
                )
                self.assertEqual(
                    call["default"]["state"]["kind"],
                    kind,
                )

    def test_wave3_boundaries_fail_closed(self) -> None:
        with self.assertRaisesRegex(ValueError, "max_length"):
            public_api.input(
                "Name",
                "too long",
                key="bad-input",
                max_length=2,
            )
        with self.assertRaisesRegex(ValueError, "max_length"):
            public_api.input(
                "Name",
                "😀",
                key="utf16-input",
                max_length=1,
            )
        with self.assertRaisesRegex(TypeError, "disabled flag"):
            public_api.radio_group(
                "Channel",
                [{"label": "Same", "value": "same", "disabled": 1}],
                key="bad-radio",
            )
        with self.assertRaisesRegex(ValueError, "exactly two"):
            public_api.slider(
                "Bad range",
                value=[1, 2, 3],
                key="bad-slider",
            )
        with self.assertRaisesRegex(TypeError, "must be numbers"):
            public_api.slider(
                "Boolean slider",
                value=[True],
                key="boolean-slider",
            )
        with self.assertRaisesRegex(ValueError, "present"):
            public_api.tabs(
                ["One"],
                value="Missing",
                key="bad-tabs",
            )
        with self.assertRaisesRegex(ValueError, "calendar bounds"):
            public_api.calendar(
                key="bad-calendar",
                value="2026-01-01",
                min_date="2026-02-01",
            )

    def test_wave4_widgets_emit_stateless_and_revisioned_envelopes(
        self,
    ) -> None:
        captured = []

        with patch.object(
            common_module,
            "mount",
            side_effect=lambda **kwargs: captured.append(kwargs),
        ):
            values = [
                public_api.popover(
                    "Migration details",
                    "One ShadowRoot.",
                    key="wave4-popover",
                ),
                public_api.hover_card(
                    "Architecture",
                    "shadcn plus Base UI",
                    key="wave4-hover-card",
                ),
                public_api.date_picker(
                    "Release date",
                    value="2026-07-30",
                    key="wave4-single-date",
                ),
                public_api.date_picker(
                    "Release window",
                    selection_mode="range",
                    value=["2026-07-30", "2026-08-02"],
                    key="wave4-date-range",
                ),
            ]

        self.assertEqual(
            values,
            [
                None,
                None,
                datetime.date(2026, 7, 30),
                (
                    datetime.date(2026, 7, 30),
                    datetime.date(2026, 8, 2),
                ),
            ],
        )
        self.assertEqual(
            [call["data"]["kind"] for call in captured],
            ["popover", "hover_card", "date_picker", "date_picker"],
        )
        for call in captured[:2]:
            kind = call["data"]["kind"]
            self.assertEqual(
                call["default"],
                {"meta": {"protocolVersion": 1, "kind": kind}},
            )
            self.assertNotIn("callbacks", call)
        for call in captured[2:]:
            self.assertEqual(call["default"]["state"]["kind"], "date_picker")
            self.assertEqual(
                set(call["callbacks"]),
                {"on_state_change"},
            )

    def test_wave4_boundaries_fail_closed(self) -> None:
        with self.assertRaisesRegex(TypeError, "unexpected keyword"):
            public_api.hover_card(
                "Unsafe",
                "<script>alert(1)</script>",
                content_type="html",
                key="unsafe-hover-card",
            )
        with self.assertRaisesRegex(ValueError, "exactly two"):
            public_api.date_picker(
                selection_mode="range",
                value=["2026-07-30"],
                key="short-range",
            )
        with self.assertRaisesRegex(ValueError, "start"):
            public_api.date_picker(
                selection_mode="range",
                value=["2026-08-02", "2026-07-30"],
                key="descending-range",
            )
        with self.assertRaisesRegex(ValueError, "bounds"):
            public_api.date_picker(
                value="2026-07-01",
                min_date="2026-07-15",
                key="bounded-date",
            )

    def test_alert_dialog_uses_edge_requests_and_returns_bool_decisions(
        self,
    ) -> None:
        captured = []
        results = iter([None, {"decision": True}, None, None])

        with patch.object(
            alert_dialog_module,
            "fail_if_trigger_in_form",
        ), patch.object(
            alert_dialog_module,
            "mount",
            side_effect=lambda **kwargs: (
                captured.append(kwargs) or next(results)
            ),
        ):
            self.assertIsNone(
                public_api.alert_dialog(
                    True,
                    "Delete?",
                    "This cannot be undone.",
                    key="wave5-dialog",
                )
            )
            self.assertIs(
                public_api.alert_dialog(
                    True,
                    "Delete?",
                    "This cannot be undone.",
                    key="wave5-dialog",
                ),
                True,
            )
            self.assertIsNone(
                public_api.alert_dialog(
                    True,
                    "Delete?",
                    "This cannot be undone.",
                    key="wave5-dialog",
                )
            )
            self.assertIsNone(
                public_api.alert_dialog(
                    False,
                    "Delete?",
                    "This cannot be undone.",
                    key="wave5-dialog",
                )
            )

        self.assertEqual(
            [
                call["data"]["props"]["openRequestId"]
                for call in captured
            ],
            [1, 1, 1, 1],
        )
        self.assertEqual(
            captured[0]["data"]["props"]["resolvedRequestId"],
            0,
        )
        self.assertEqual(
            captured[2]["data"]["props"]["resolvedRequestId"],
            1,
        )
        self.assertEqual(
            captured[3]["data"]["props"]["resolvedRequestId"],
            1,
        )
        self.assertEqual(
            captured[0]["data"]["props"]["confirmLabel"],
            "Confirm",
        )
        self.assertEqual(
            captured[0]["data"]["props"]["cancelLabel"],
            "Cancel",
        )
        self.assertEqual(
            set(captured[0]["callbacks"]),
            {"on_decision_change"},
        )

    def test_alert_dialog_rearms_only_after_show_is_false(self) -> None:
        captured = []
        with patch.object(
            alert_dialog_module,
            "fail_if_trigger_in_form",
        ), patch.object(
            alert_dialog_module,
            "mount",
            side_effect=lambda **kwargs: captured.append(kwargs),
        ):
            for show in [True, True, False, True]:
                public_api.alert_dialog(
                    show,
                    "Archive?",
                    "Confirm archive.",
                    key="wave5-rearm",
                )

        self.assertEqual(
            [
                call["data"]["props"]["openRequestId"]
                for call in captured
            ],
            [1, 1, 1, 2],
        )

    def test_alert_dialog_rejects_streamlit_forms(self) -> None:
        with patch.object(
            alert_dialog_module,
            "fail_if_trigger_in_form",
            side_effect=RuntimeError("inside form"),
        ), patch.object(alert_dialog_module, "mount") as mount:
            with self.assertRaisesRegex(RuntimeError, "inside form"):
                public_api.alert_dialog(
                    True,
                    "Delete?",
                    "Confirm delete.",
                    key="wave5-form-dialog",
                )
        mount.assert_not_called()


if __name__ == "__main__":
    unittest.main()
