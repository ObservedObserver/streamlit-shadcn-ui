from __future__ import annotations

import re
import unittest
from pathlib import Path

from streamlit.testing.v1 import AppTest


_ROOT = Path(__file__).resolve().parents[2]
_APP_PATHS = [_ROOT / "Home.py", *sorted((_ROOT / "pages").glob("*.py"))]
_DOC_PATHS = sorted((_ROOT / "docs" / "components").glob("*.md"))
_PYTHON_FENCE = re.compile(r"```(?:py|python)\n(.*?)```", re.DOTALL)

_LEGACY_PATTERNS = (
    "import streamlit_shadcn_ui as ui",
    "from streamlit_shadcn_ui import",
    "ui.element(",
    "with ui.card(",
    ".render()",
    "class_name=",
    "className=",
    "maxHeight=",
    "totalPages=",
    "initialPage=",
    "siblingCount=",
    "fistItem=",
    "tags=",
    'mode="multiple"',
    "progress(data=",
)


class DocumentationExampleTests(unittest.TestCase):
    def test_canonical_app_sources_use_only_the_v2_namespace(self) -> None:
        for path in _APP_PATHS:
            with self.subTest(path=path.relative_to(_ROOT)):
                source = path.read_text(encoding="utf-8")
                self.assertIn("import streamlit_shadcn_ui.v2 as ui", source)
                for pattern in _LEGACY_PATTERNS:
                    self.assertNotIn(pattern, source)

    def test_component_docs_use_current_v2_examples(self) -> None:
        self.assertEqual(len(_DOC_PATHS), 35)
        for path in _DOC_PATHS:
            with self.subTest(path=path.relative_to(_ROOT)):
                source = path.read_text(encoding="utf-8")
                self.assertIn("import streamlit_shadcn_ui.v2 as ui", source)
                for pattern in _LEGACY_PATTERNS:
                    self.assertNotIn(pattern, source)

    def test_component_documentation_code_blocks_compile(self) -> None:
        for path in _DOC_PATHS:
            with self.subTest(path=path.relative_to(_ROOT)):
                source = path.read_text(encoding="utf-8")
                snippets = _PYTHON_FENCE.findall(source)
                self.assertTrue(snippets)
                for index, snippet in enumerate(snippets):
                    compile(
                        snippet,
                        "%s:block-%d"
                        % (path.relative_to(_ROOT), index + 1),
                        "exec",
                    )

    def test_canonical_apps_mount_without_python_exceptions(self) -> None:
        for path in _APP_PATHS:
            with self.subTest(path=path.relative_to(_ROOT)):
                app = AppTest.from_file(
                    str(path),
                    default_timeout=30,
                ).run()
                self.assertEqual(
                    [exception.message for exception in app.exception],
                    [],
                )


if __name__ == "__main__":
    unittest.main()
