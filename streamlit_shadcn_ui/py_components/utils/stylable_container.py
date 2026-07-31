"""Python 3.7-compatible bridge for ``streamlit_extras.stylable_container``.

Release 0.1.19 declared Python 3.7 support while its unconditional
``streamlit_extras>=0.3.5`` dependency requires Python 3.8. Modern runtimes
continue to call the dependency's implementation unchanged. Python 3.7 uses
the equivalent small implementation below so the released V1 namespace stays
importable without silently raising the package-wide Python floor.
"""

import sys
from typing import List, Union

import streamlit as st

if sys.version_info >= (3, 8):
    from streamlit_extras.stylable_container import (
        stylable_container as stylable_container,
    )
else:

    def stylable_container(
        key: str,
        css_styles: Union[str, List[str]],
    ):
        if isinstance(css_styles, str):
            normalized_styles = [css_styles]
        else:
            normalized_styles = list(css_styles)

        normalized_styles.append(
            """
> div:first-child {
    margin-bottom: -1rem;
}
"""
        )
        style_text = "<style>\n"
        for style in normalized_styles:
            style_text += """
div[data-testid="stVerticalBlock"]:has(> div.element-container > div.stMarkdown > div[data-testid="stMarkdownContainer"] > p > span.%s) %s
""" % (
                key,
                style,
            )
        style_text += """
</style>
<span class="%s"></span>
""" % key

        container = st.container()
        container.markdown(style_text, unsafe_allow_html=True)
        return container
