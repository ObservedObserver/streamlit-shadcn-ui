from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Any, Callable, Mapping, Optional, Union

from ._streamlit_compat import require_v2_runtime

_COMPONENT_NAME = "streamlit-shadcn-ui.v2"
_COMPONENT_HTML = (
    '<div data-ssui-v2-app-root></div>'
    '<div data-ssui-v2-overlay-root popover="manual"></div>'
)
_ASSET_DIR = Path(__file__).resolve().parents[1] / "frontend_v2" / "dist"
_CSS_ASSET_GLOB = "style-*.css"
_MOUNT = None


def noop_callback() -> None:
    """Register a state or trigger without adding callback behavior."""


def get_result_value(result: Any, field: str, default: Any = None) -> Any:
    if result is None:
        return default
    if isinstance(result, Mapping):
        return result.get(field, default)
    return getattr(result, field, default)


def mount(
    *,
    key: str,
    data: Mapping[str, Any],
    default: Optional[Mapping[str, Any]] = None,
    width: Union[str, int] = "stretch",
    callbacks: Optional[Mapping[str, Callable[[], None]]] = None,
) -> Any:
    renderer = _get_renderer()
    registered_callbacks = dict(callbacks or {})
    if default is not None and "meta" in default:
        registered_callbacks.setdefault("on_meta_change", noop_callback)
    return renderer(
        key=key,
        data=dict(data),
        default=dict(default) if default is not None else None,
        width=width,
        **registered_callbacks,
    )


def _get_renderer() -> Callable[..., Any]:
    global _MOUNT

    if _MOUNT is not None:
        return _MOUNT

    st = require_v2_runtime()
    _MOUNT = st.components.v2.component(
        _COMPONENT_NAME,
        html=_COMPONENT_HTML,
        js="entry-*.js",
        # Streamlit 1.60 renders a path-backed CSS asset as a <link> in each
        # ShadowRoot. Registering the verified build output as raw CSS keeps
        # the release invariant: one local stylesheet, no runtime link or
        # document-head injection.
        css=_load_css_asset(),
        isolate_styles=True,
    )
    return _MOUNT


@lru_cache(maxsize=1)
def _load_css_asset() -> str:
    matches = sorted(_ASSET_DIR.glob(_CSS_ASSET_GLOB))
    if len(matches) != 1:
        raise RuntimeError(
            "The V2 package must contain exactly one style-<hash>.css asset; "
            "found %d." % len(matches)
        )
    return matches[0].read_text(encoding="utf-8")
