from __future__ import annotations

import importlib
import unittest
from unittest.mock import patch

import streamlit_shadcn_ui as ui
from tests.v2.test_elements import prepared_state

elements = importlib.import_module("streamlit_shadcn_ui.v2.elements")


class ItemTests(unittest.TestCase):
    def capture(self, order):
        captured = {}
        with patch.object(
            elements,
            "prepare_elements_state",
            side_effect=lambda **kw: prepared_state(kw["node_defaults"]),
        ), patch.object(elements, "fail_if_trigger_in_form"), patch.object(
            elements,
            "mount",
            side_effect=lambda **kw: captured.update(kw) or {},
        ):
            with ui.elements(key="members") as el:
                with el.item_group(key="members"):
                    for name in order:
                        with el.item(key=name, variant="outline"):
                            with el.item_media():
                                el.avatar(fallback=name[0], alt=name)
                            with el.item_content():
                                el.item_title(name)
                                el.item_description("Workspace member")
                            with el.item_actions():
                                el.button("Manage", key="manage")
                    el.item_separator()
        return captured["data"]["props"]["nodes"][0]

    def test_typed_slots_and_reordered_action_identity(self):
        first = self.capture(["Ada", "Grace"])
        second = self.capture(["Grace", "Ada"])
        self.assertEqual(
            first["children"][0]["props"],
            {"variant": "outline", "size": "default"},
        )
        self.assertEqual(
            first["children"][0]["children"][2]["children"][0]["id"],
            "members/Ada/manage",
        )
        self.assertEqual(
            second["children"][1]["children"][2]["children"][0]["id"],
            "members/Ada/manage",
        )
        self.assertEqual(
            first["children"][0]["children"][0]["children"][0]["props"],
            {"src": None, "fallback": "A", "alt": "Ada", "size": "default"},
        )

    def test_orphan_slots_and_invalid_content_fail_before_mount(self):
        with patch.object(elements, "mount") as mount:
            for slot in [
                "item_content",
                "item_media",
                "item_actions",
                "item_header",
                "item_footer",
                "item_separator",
            ]:
                with self.subTest(slot=slot), self.assertRaises(RuntimeError):
                    with ui.elements(key="invalid") as el:
                        getattr(el, slot)()
            with self.assertRaisesRegex(RuntimeError, "typed Item slots"):
                with ui.elements(key="invalid") as el:
                    with el.item():
                        el.text("Wrong direct child")
            with self.assertRaisesRegex(RuntimeError, "at most one"):
                with ui.elements(key="invalid") as el:
                    with el.item():
                        with el.item_actions():
                            pass
                        with el.item_actions():
                            pass
            mount.assert_not_called()

    def test_media_rejects_aspect_ratio_wrappers_and_wrong_variants(self):
        for variant in ["default", "image"]:
            with self.subTest(variant=variant), self.assertRaisesRegex(
                RuntimeError, "item_media requires"
            ):
                with ui.elements(key="invalid") as el:
                    with el.item():
                        with el.item_media(variant=variant):
                            el.image(
                                "https://example.com/image.png", alt="Preview"
                            )
        with self.assertRaisesRegex(RuntimeError, "item_media requires"):
            with ui.elements(key="invalid") as el:
                with el.item():
                    with el.item_media(variant="image"):
                        el.avatar(fallback="A")

    def test_variant_size_and_avatar_source_are_validated(self):
        for kwargs in [{"variant": "custom"}, {"size": "lg"}]:
            with self.assertRaises(ValueError):
                with ui.elements(key="invalid") as el:
                    el.item(**kwargs)
        with self.assertRaises(ValueError):
            with ui.elements(key="invalid") as el:
                el.avatar(src="javascript:alert(1)")
