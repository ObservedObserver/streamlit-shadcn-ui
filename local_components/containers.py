from streamlit_extras.stylable_container import stylable_container

def card_container(key=None):
    return stylable_container(key=key, css_styles=[
    """
    {
        --tw-ring-offset-shadow: 0 0 #0000;
        --tw-ring-shadow: 0 0 #0000;
        --tw-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);
        border-radius: 8px; /* Rounded corners */
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); /* Shadow effect */
        transition: 0.3s; /* Smooth transition for hover effect */
        padding: 1.5em; /* Inner spacing */
        border: 1px solid #e5e7eb;
        box-sizing: border-box;
        overflow: hidden; /* Enable scroll on small screens */
        box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);
    }
    """,
    """
        > div:not(:first-child) {
            width: 100%;
            min-width: 1px;
            overflow: hidden;
        }
        """,
        """
        > div:first-child {
            display: none;
        }
        """,
        """
        > div:not(:first-child) > iframe {
            display: inline-block;
            width: 100%; /* Adjusting for padding */
            min-width: 1px;
            border: none;
                        overflow: hidden;

        }
        """,
        """
        > div:not(:first-child) canvas {
            display: inline-block;
            width: 100% !important; /* Adjusting for padding */
            min-width: 1px;
            border: none;
                        overflow: hidden;

        }
        """
    ])

def buttons_container(unit_width: str, key=None):
    return stylable_container(key=key, css_styles=[
    """
    {
        display: flex;
        flex-direction: row;
        item-align: center;
        justify-content: flex-start;
    }
    """,
    f"""
    > div:not(:first-child) {{
        width: {unit_width} !important;
        min-width: 1px;
        display: inline;
    }}
    """,
    f"""
    > div:first-child {{
        display: none;
    }}
    """,
    f"""
    > div:not(:first-child) > iframe {{
        display: inline-block;
        width: auto !important;
        min-width: 1px;
        border: none;
    }}
    """
    ])

def float_container(direction: str="left", key=None):
    return stylable_container(key=key, css_styles=[
    f"""
    {{
        float: {direction};
    }}
    """,
    f"""
    > div:not(:first-child) {{
        float: {direction};
        min-width: 1px;
        display: inline;
    }}
    """,
    f"""
    > div:first-child {{
        display: none;
    }}
    """,
    f"""
    > div:not(:first-child) > iframe {{
        display: inline-block;
        width: auto !important;
        min-width: 1px;
        border: none;
    }}
    """
    ])