from __future__ import annotations

import ast
import re
import unittest
from pathlib import Path

import streamlit_shadcn_ui as public_api
from streamlit.testing.v1 import AppTest


_ROOT = Path(__file__).resolve().parents[2]
_UI_APP_PATHS = [
    *sorted((_ROOT / "site_pages").glob("*.py")),
    *sorted((_ROOT / "pages").glob("*.py")),
]
_MOUNT_PATHS = [_ROOT / "Home.py", *_UI_APP_PATHS]
_DOC_PATHS = sorted((_ROOT / "docs" / "components").glob("*.md"))
_PYTHON_FENCE = re.compile(r"```(?:py|python)\n(.*?)```", re.DOTALL)

_LEGACY_PATTERNS = (
    "streamlit_shadcn_ui.v1",
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
    def test_homepage_keeps_stable_search_metadata(self) -> None:
        source = (_ROOT / "site_pages" / "Homepage.py").read_text(
            encoding="utf-8"
        )
        self.assertIn('SEO_TITLE = "Streamlit Shadcn UI"', source)
        self.assertIn(
            '"A Streamlit component library for building beautiful apps easily. "',
            source,
        )
        self.assertIn(
            '"Bring the power of shadcn/ui to your Streamlit apps."',
            source,
        )
        self.assertIn("page_title=SEO_TITLE", source)
        self.assertIn("st.text(SEO_DESCRIPTION)", source)

    def test_homepage_full_width_starts_with_a_collapsed_sidebar(self) -> None:
        source = (_ROOT / "site_pages" / "Homepage.py").read_text(
            encoding="utf-8"
        )
        self.assertIn('initial_sidebar_state="collapsed"', source)
        self.assertIn('[data-testid="stMainBlockContainer"]', source)
        self.assertIn("padding-inline: 0;", source)
        self.assertNotIn("inline-size: 100vw", source)
        self.assertNotIn("calc(50% - 50vw)", source)

    def test_homepage_showcase_uses_only_public_ui_apis(self) -> None:
        source = (_ROOT / "site_pages" / "Homepage.py").read_text(
            encoding="utf-8"
        )
        tree = ast.parse(source)
        used_apis = {
            node.func.attr
            for node in ast.walk(tree)
            if isinstance(node, ast.Call)
            and isinstance(node.func, ast.Attribute)
            and isinstance(node.func.value, ast.Name)
            and node.func.value.id == "ui"
        }

        self.assertTrue(used_apis)
        self.assertTrue(used_apis <= set(public_api.__all__))
        self.assertNotRegex(source, r"\bui\._")
        self.assertNotIn("homepage_showcase", source)
        self.assertIn('Public API: {calls}', source)

    def test_router_registers_every_documentation_page(self) -> None:
        router_source = (_ROOT / "Home.py").read_text(encoding="utf-8")
        for path in _UI_APP_PATHS:
            with self.subTest(path=path.relative_to(_ROOT)):
                route = path.relative_to(_ROOT).as_posix()
                self.assertIn(f'"{route}"', router_source)

    def test_canonical_app_sources_use_the_1_0_root_namespace(self) -> None:
        for path in _UI_APP_PATHS:
            with self.subTest(path=path.relative_to(_ROOT)):
                source = path.read_text(encoding="utf-8")
                self.assertIn("import streamlit_shadcn_ui as ui", source)
                self.assertNotIn("streamlit_shadcn_ui.v2", source)
                for pattern in _LEGACY_PATTERNS:
                    self.assertNotIn(pattern, source)

    def test_component_docs_use_current_v2_examples(self) -> None:
        self.assertEqual(len(_DOC_PATHS), 36)
        for path in _DOC_PATHS:
            with self.subTest(path=path.relative_to(_ROOT)):
                source = path.read_text(encoding="utf-8")
                self.assertIn("import streamlit_shadcn_ui as ui", source)
                self.assertNotIn("streamlit_shadcn_ui.v2", source)
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
        for path in _MOUNT_PATHS:
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
