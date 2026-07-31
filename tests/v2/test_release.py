from __future__ import annotations

import json
import subprocess
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]


class ReleaseContractTests(unittest.TestCase):
    def test_checked_in_release_assets_pass_fail_closed_verifier(self) -> None:
        process = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "verify_release.py")],
            cwd=ROOT,
            capture_output=True,
            check=False,
            text=True,
        )
        self.assertEqual(process.returncode, 0, process.stderr)
        summary = json.loads(process.stdout)
        self.assertEqual(summary["version"], "1.0.0")
        self.assertEqual(
            summary["architecture"],
            "streamlit-components-v2",
        )
        self.assertNotIn("v1Files", summary)
        self.assertTrue(summary["v2"]["entry"]["name"].startswith("entry-"))
        self.assertTrue(
            summary["v2"]["stylesheet"]["name"].startswith("style-")
        )


if __name__ == "__main__":
    unittest.main()
