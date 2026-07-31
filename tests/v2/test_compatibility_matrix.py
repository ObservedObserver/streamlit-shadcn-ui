from __future__ import annotations

import ast
import json
import unittest
from pathlib import Path

import streamlit_shadcn_ui as package
import streamlit_shadcn_ui.v1 as legacy
import streamlit_shadcn_ui.v2 as public_api


_ROOT = Path(__file__).resolve().parents[2]
_MATRIX_PATH = _ROOT / "docs" / "v2-compatibility-matrix.json"
_V1_INIT = _ROOT / "streamlit_shadcn_ui" / "py_components" / "__init__.py"


def _v1_root_exports() -> set:
    tree = ast.parse(_V1_INIT.read_text(encoding="utf-8"))
    return {
        alias.asname or alias.name
        for node in tree.body
        if isinstance(node, ast.ImportFrom)
        for alias in node.names
    }


class CompatibilityMatrixTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.matrix = json.loads(_MATRIX_PATH.read_text(encoding="utf-8"))

    def test_matrix_covers_every_v1_root_export(self) -> None:
        documented = set(self.matrix["v1PublicExports"])
        self.assertEqual(documented, _v1_root_exports())
        self.assertEqual(documented, set(legacy.__all__))

    def test_matrix_covers_every_v2_export(self) -> None:
        mapped = {
            entry["v2"]
            for entry in self.matrix["v1PublicExports"].values()
            if entry["v2"] is not None
        }
        additions = set(self.matrix["v2Additions"])
        self.assertEqual(mapped | additions, set(public_api.__all__))

    def test_dispositions_are_closed_and_have_real_targets(self) -> None:
        allowed = {
            "adapter_required",
            "compatibility_only",
            "migrated",
        }
        for name, entry in self.matrix["v1PublicExports"].items():
            self.assertIn(entry["disposition"], allowed, name)
            if entry["disposition"] == "compatibility_only":
                self.assertIsNone(entry["v2"], name)
            else:
                self.assertTrue(
                    callable(getattr(public_api, entry["v2"], None)),
                    name,
                )

    def test_explicit_v1_namespace_is_an_exact_rollback_alias(self) -> None:
        for name in legacy.__all__:
            self.assertIs(getattr(legacy, name), getattr(package, name))

    def test_module_only_names_exist_but_are_not_claimed_as_public(self) -> None:
        function_names = set()
        component_root = _V1_INIT.parent
        for source_path in component_root.glob("*.py"):
            tree = ast.parse(source_path.read_text(encoding="utf-8"))
            function_names.update(
                node.name
                for node in tree.body
                if isinstance(node, ast.FunctionDef)
            )

        module_only = set(self.matrix["v1ModuleOnlySurfaces"])
        self.assertTrue(module_only <= function_names)
        self.assertTrue(module_only.isdisjoint(_v1_root_exports()))

    def test_raw_session_state_is_explicitly_private(self) -> None:
        self.assertEqual(
            self.matrix["sessionStatePolicy"],
            "private_protocol_envelope",
        )


if __name__ == "__main__":
    unittest.main()
