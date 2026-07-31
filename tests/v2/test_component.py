from __future__ import annotations

import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

from streamlit_shadcn_ui.v2 import _component


class ComponentMountTests(unittest.TestCase):
    def test_private_keys_are_stable_namespaced_and_streamlit_safe(self) -> None:
        first = _component.private_component_key(
            key="public-key",
            kind="select",
            identity={"label": "First"},
        )
        second = _component.private_component_key(
            key="public-key",
            kind="button",
            identity={"label": "Second"},
        )

        self.assertEqual(first, second)
        self.assertTrue(first.startswith("ssui_v2_component_"))
        self.assertNotIn("__", first)
        self.assertNotIn("public-key", first)

    def test_automatic_keys_follow_callsite_kind_and_identity(self) -> None:
        def resolve(kind, identity):
            return _component.private_component_key(
                key=None,
                kind=kind,
                identity=identity,
            )

        first = resolve("select", {"label": "Fruit"})
        self.assertEqual(first, resolve("select", {"label": "Fruit"}))
        self.assertNotEqual(first, resolve("select", {"label": "Color"}))
        self.assertNotEqual(first, resolve("button", {"label": "Fruit"}))

    def test_invalid_public_keys_fail_before_mounting(self) -> None:
        with self.assertRaisesRegex(TypeError, "string or None"):
            _component.private_component_key(
                key=42,
                kind="select",
                identity={},
            )
        with self.assertRaisesRegex(ValueError, "must not be empty"):
            _component.private_component_key(
                key="",
                kind="select",
                identity={},
            )

    def test_metadata_default_registers_its_required_callback(self) -> None:
        captured = {}

        def renderer(**kwargs):
            captured.update(kwargs)
            return {"state": {"value": "alpha"}}

        with patch.object(_component, "_get_renderer", return_value=renderer):
            result = _component.mount(
                key="choice",
                data={"kind": "select"},
                default={
                    "meta": {"protocolVersion": 1, "kind": "select"},
                    "state": {"value": "alpha"},
                },
                callbacks={"on_state_change": _component.noop_callback},
            )

        self.assertEqual(result, {"state": {"value": "alpha"}})
        self.assertIs(captured["on_meta_change"], _component.noop_callback)
        self.assertIs(captured["on_state_change"], _component.noop_callback)

    def test_explicit_metadata_callback_is_not_overwritten(self) -> None:
        explicit = lambda: None
        captured = {}

        def renderer(**kwargs):
            captured.update(kwargs)

        with patch.object(_component, "_get_renderer", return_value=renderer):
            _component.mount(
                key="choice",
                data={},
                default={"meta": {}},
                callbacks={"on_meta_change": explicit},
            )

        self.assertIs(captured["on_meta_change"], explicit)

    def test_renderer_registers_verified_css_as_inline_content(self) -> None:
        captured = {}

        def register(name, **kwargs):
            captured["name"] = name
            captured.update(kwargs)
            return lambda **_kwargs: None

        fake_streamlit = SimpleNamespace(
            components=SimpleNamespace(
                v2=SimpleNamespace(component=register),
            )
        )
        previous_mount = _component._MOUNT
        _component._MOUNT = None
        self.addCleanup(setattr, _component, "_MOUNT", previous_mount)

        with patch.object(
            _component,
            "require_v2_runtime",
            return_value=fake_streamlit,
        ), patch.object(
            _component,
            "_load_css_asset",
            return_value=":host{color:red}",
        ):
            _component._get_renderer()

        self.assertEqual(
            captured,
            {
                "name": "streamlit-shadcn-ui.v2",
                "html": (
                    '<div data-ssui-v2-app-root></div>'
                    '<div data-ssui-v2-overlay-root popover="manual"></div>'
                ),
                "js": "entry-*.js",
                "css": ":host{color:red}",
                "isolate_styles": True,
            },
        )

    def test_css_asset_resolution_fails_closed(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            asset_dir = Path(directory)
            with patch.object(_component, "_ASSET_DIR", asset_dir):
                _component._load_css_asset.cache_clear()
                with self.assertRaisesRegex(RuntimeError, "exactly one"):
                    _component._load_css_asset()

                (asset_dir / "style-first.css").write_text(
                    ":host{}",
                    encoding="utf-8",
                )
                (asset_dir / "style-second.css").write_text(
                    ":host{}",
                    encoding="utf-8",
                )
                _component._load_css_asset.cache_clear()
                with self.assertRaisesRegex(RuntimeError, "found 2"):
                    _component._load_css_asset()

        _component._load_css_asset.cache_clear()


if __name__ == "__main__":
    unittest.main()
