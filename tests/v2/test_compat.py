from __future__ import annotations

import ast
import subprocess
import sys
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

from streamlit_shadcn_ui.v2 import _streamlit_compat


class RuntimeCompatibilityTests(unittest.TestCase):
    def test_v2_refuses_python_older_than_310_before_importing_streamlit(
        self,
    ) -> None:
        fake_sys = SimpleNamespace(version_info=(3, 7, 17))
        with patch.object(_streamlit_compat, "sys", fake_sys):
            with self.assertRaisesRegex(RuntimeError, "Python >= 3.10"):
                _streamlit_compat.require_v2_runtime()

    def test_trigger_components_fail_closed_inside_forms(self) -> None:
        fake_streamlit = SimpleNamespace(_main=object())
        with patch.object(
            _streamlit_compat,
            "require_v2_runtime",
            return_value=fake_streamlit,
        ), patch(
            "streamlit.elements.lib.form_utils.is_in_form",
            return_value=True,
        ):
            with self.assertRaisesRegex(RuntimeError, "cannot be used inside"):
                _streamlit_compat.fail_if_trigger_in_form("button")

    def test_trigger_components_are_allowed_outside_forms(self) -> None:
        fake_streamlit = SimpleNamespace(_main=object())
        with patch.object(
            _streamlit_compat,
            "require_v2_runtime",
            return_value=fake_streamlit,
        ), patch(
            "streamlit.elements.lib.form_utils.is_in_form",
            return_value=False,
        ):
            _streamlit_compat.fail_if_trigger_in_form("dropdown_menu")

    def test_package_sources_parse_with_python_310_grammar(self) -> None:
        package_root = (
            Path(__file__).resolve().parents[2] / "streamlit_shadcn_ui"
        )
        failures = []
        for source_path in sorted(package_root.rglob("*.py")):
            try:
                ast.parse(
                    source_path.read_text(encoding="utf-8"),
                    filename=str(source_path),
                    feature_version=(3, 10),
                )
            except SyntaxError as error:
                failures.append("%s: %s" % (source_path, error))

        self.assertEqual(failures, [])

    def test_package_root_loads_v2_without_legacy_modules(self) -> None:
        process = subprocess.run(
            [
                sys.executable,
                "-c",
                (
                    "import sys, streamlit_shadcn_ui as package; "
                    "import streamlit_shadcn_ui.v2 as v2; "
                    "assert package.button is v2.button; "
                    "assert 'streamlit_shadcn_ui.v1' not in sys.modules; "
                    "assert not any(name.startswith("
                    "'streamlit_shadcn_ui.py_components') "
                    "for name in sys.modules)"
                ),
            ],
            capture_output=True,
            check=False,
            text=True,
        )
        self.assertEqual(process.returncode, 0, process.stderr)


if __name__ == "__main__":
    unittest.main()
