from __future__ import annotations

import unittest
from pathlib import Path

from streamlit.testing.v1 import AppTest


class AcceptanceAppSmokeTests(unittest.TestCase):
    def test_wave1_app_mounts_without_python_exceptions(self) -> None:
        app_path = Path(__file__).resolve().parents[2] / "V2_POC.py"
        app = AppTest.from_file(str(app_path), default_timeout=20).run()

        self.assertEqual(
            [exception.message for exception in app.exception],
            [],
        )

    def test_wave2_app_mounts_without_python_exceptions(self) -> None:
        app_path = Path(__file__).resolve().parents[2] / "V2_WAVE2.py"
        app = AppTest.from_file(str(app_path), default_timeout=20).run()

        self.assertEqual(
            [exception.message for exception in app.exception],
            [],
        )

    def test_wave3_app_mounts_without_python_exceptions(self) -> None:
        app_path = Path(__file__).resolve().parents[2] / "V2_WAVE3.py"
        app = AppTest.from_file(str(app_path), default_timeout=20).run()

        self.assertEqual(
            [exception.message for exception in app.exception],
            [],
        )


if __name__ == "__main__":
    unittest.main()
