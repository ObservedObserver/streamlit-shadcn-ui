"""Streamlit app used by the content-hash browser upgrade contract."""

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
from streamlit_shadcn_ui.v2 import _component


asset_dir = os.environ.get("SSUI_V2_TEST_ASSET_DIR")
if not asset_dir:
    raise RuntimeError("SSUI_V2_TEST_ASSET_DIR is required.")

asset_root = Path(asset_dir).resolve()
get_bidi_component_manager().register_from_manifest(
    ComponentManifest(
        name="streamlit-shadcn-ui",
        version="asset-upgrade-test",
        components=[
            ComponentConfig(name="v2", asset_dir=asset_root.name),
        ],
    ),
    asset_root.parent,
)

_component._ASSET_DIR = asset_root
_component._load_css_asset.cache_clear()
_component._MOUNT = None

st.title("Streamlit Shadcn UI V2 asset upgrade")
ui.button("Upgrade fixture", key="asset_upgrade_button")
