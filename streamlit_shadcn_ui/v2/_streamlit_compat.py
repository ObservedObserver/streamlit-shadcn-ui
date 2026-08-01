from __future__ import annotations

import re
import sys
from typing import Any

_MIN_STREAMLIT = (1, 60, 0)


def _version_tuple(value: str) -> tuple:
    parts = [int(part) for part in re.findall(r"\d+", value)[:3]]
    return tuple(parts + [0] * (3 - len(parts)))


def require_v2_runtime() -> Any:
    if sys.version_info < (3, 10):
        raise RuntimeError(
            "streamlit-shadcn-ui requires Python >= 3.10."
        )

    import streamlit as st

    if (
        _version_tuple(getattr(st, "__version__", "0"))
        < _MIN_STREAMLIT
        or not hasattr(st.components, "v2")
    ):
        raise RuntimeError(
            "streamlit-shadcn-ui requires Streamlit >= 1.60. "
            "Upgrade Streamlit before rendering a component."
        )
    return st


def fail_if_trigger_in_form(kind: str) -> None:
    st = require_v2_runtime()
    detector = None
    try:
        from streamlit.elements.lib.form_utils import is_in_form

        detector = is_in_form
    except ImportError:
        try:
            from streamlit.elements.form_utils import is_in_form

            detector = is_in_form
        except ImportError:
            detector = None

    main_delta_generator = getattr(st, "_main", None)
    if detector is None or main_delta_generator is None:
        raise RuntimeError(
            "Unable to verify Streamlit form context for a trigger component. "
            "Trigger components fail closed on this Streamlit release."
        )
    if detector(main_delta_generator):
        raise RuntimeError(
            "V2 %s cannot be used inside st.form because Streamlit ignores "
            "custom-component trigger values in forms." % kind
        )
