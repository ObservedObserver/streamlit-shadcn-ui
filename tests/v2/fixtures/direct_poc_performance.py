"""Real Streamlit comparison fixture for shadcn and the archived Base UI POC."""

import os
from pathlib import Path

import streamlit as st
from streamlit.components.v2.get_bidi_component_manager import (
    get_bidi_component_manager,
)
from streamlit.components.v2.manifest_scanner import (
    ComponentConfig,
    ComponentManifest,
)

import streamlit_shadcn_ui.v2 as ui


MODE = os.environ.get("SSUI_V2_PERFORMANCE_MODE", "shadcn")
if MODE not in {"direct-base-ui", "shadcn"}:
    raise RuntimeError("Unsupported SSUI_V2_PERFORMANCE_MODE.")


def direct_base_ui_component():
    asset_value = os.environ.get("SSUI_V2_DIRECT_POC_ASSET_DIR")
    if not asset_value:
        raise RuntimeError(
            "SSUI_V2_DIRECT_POC_ASSET_DIR is required for direct Base UI."
        )
    asset_root = Path(asset_value).resolve()
    get_bidi_component_manager().register_from_manifest(
        ComponentManifest(
            name="streamlit-shadcn-ui",
            version="direct-poc-performance",
            components=[
                ComponentConfig(
                    name="direct-poc-performance",
                    asset_dir=asset_root.name,
                ),
            ],
        ),
        asset_root.parent,
    )
    stylesheets = sorted(asset_root.glob("style-*.css"))
    if len(stylesheets) != 1:
        raise RuntimeError("Direct POC benchmark requires one stylesheet.")
    return st.components.v2.component(
        "streamlit-shadcn-ui.direct-poc-performance",
        html='<div data-st-shadcn-v2-root></div>',
        css=stylesheets[0].read_text(encoding="utf-8"),
        js="entry-*.js",
        isolate_styles=True,
    )


DIRECT_COMPONENT = (
    direct_base_ui_component() if MODE == "direct-base-ui" else None
)


@st.fragment
def rerender_fixture():
    completed = st.session_state.get("performance_rerenders_completed", 0)
    disabled = bool(completed % 2)

    if DIRECT_COMPONENT is None:
        value = ui.select(
            "Benchmark Select",
            ["Alpha", "Beta", "Gamma"],
            key="performance_shadcn_select",
            value="Alpha",
            disabled=disabled,
        )
    else:
        result = DIRECT_COMPONENT(
            key="performance_direct_select",
            data={
                "component": "select",
                "disabled": disabled,
                "label": "Benchmark Select",
                "options": [
                    {"label": "Alpha", "value": "Alpha"},
                    {"label": "Beta", "value": "Beta"},
                    {"label": "Gamma", "value": "Gamma"},
                ],
                "placeholder": "Select an option",
                "value": "Alpha",
            },
            default={"value": "Alpha"},
            on_value_change=lambda: None,
        )
        value = getattr(result, "value", "Alpha")

    if st.button(
        "Run 100 comparison rerenders",
        key="performance_run_100_rerenders",
    ):
        st.session_state["performance_rerenders_remaining"] = 100
        st.session_state["performance_rerenders_completed"] = 0

    st.write(
        "Comparison rerenders completed:",
        st.session_state.get("performance_rerenders_completed", 0),
    )
    st.write("Comparison value:", value)

    remaining = st.session_state.get("performance_rerenders_remaining", 0)
    if remaining > 0:
        st.session_state["performance_rerenders_remaining"] = remaining - 1
        st.session_state["performance_rerenders_completed"] = (
            st.session_state.get("performance_rerenders_completed", 0) + 1
        )
        st.rerun(scope="fragment")


st.set_page_config(page_title="V2 direct POC performance comparison")
st.title("V2 direct POC performance comparison")
st.caption("Renderer: %s" % MODE)
rerender_fixture()
