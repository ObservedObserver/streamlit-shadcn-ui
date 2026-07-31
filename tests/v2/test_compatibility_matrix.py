from __future__ import annotations

import json
import unittest
from pathlib import Path

import streamlit_shadcn_ui as package
import streamlit_shadcn_ui.v2 as public_api


_ROOT = Path(__file__).resolve().parents[2]
_MATRIX_PATH = _ROOT / "docs" / "v2-compatibility-matrix.json"


class CompatibilityMatrixTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.matrix = json.loads(_MATRIX_PATH.read_text(encoding="utf-8"))

    def test_package_root_is_the_v2_catalog(self) -> None:
        self.assertEqual(package.__all__, public_api.__all__)
        for name in public_api.__all__:
            self.assertIs(getattr(package, name), getattr(public_api, name))

    def test_matrix_covers_every_1_0_export(self) -> None:
        mapped = {
            entry["v2"]
            for entry in self.matrix["v1PublicExports"].values()
            if entry["v2"] is not None
        }
        additions = set(self.matrix["v2Additions"])
        self.assertEqual(mapped | additions, set(public_api.__all__))

    def test_migrated_dispositions_have_real_1_0_targets(self) -> None:
        allowed = {
            "adapter_required",
            "migrated",
            "removed",
        }
        for old_name, entry in self.matrix["v1PublicExports"].items():
            self.assertIn(entry["disposition"], allowed, old_name)
            if entry["disposition"] == "removed":
                self.assertIsNone(entry["v2"], old_name)
            else:
                self.assertTrue(
                    callable(getattr(package, entry["v2"], None)),
                    old_name,
                )

    def test_removed_low_level_surfaces_are_not_public(self) -> None:
        module_only = set(self.matrix["v1ModuleOnlySurfaces"])
        self.assertTrue(module_only)
        self.assertTrue(module_only.isdisjoint(package.__all__))
        self.assertNotIn("element", package.__all__)

    def test_protocol_session_state_is_explicitly_private(self) -> None:
        self.assertEqual(
            self.matrix["sessionStatePolicy"],
            "private_protocol_envelope",
        )


if __name__ == "__main__":
    unittest.main()
