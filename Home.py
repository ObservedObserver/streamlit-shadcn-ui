from __future__ import annotations

import streamlit as st


homepage = st.Page(
    "site_pages/Homepage.py",
    title="Home",
    icon=":material/home:",
    default=True,
)
getting_started = st.Page(
    "site_pages/GettingStarted.py",
    title="Getting Started",
    icon=":material/rocket_launch:",
    url_path="GettingStarted",
)
playground = st.Page(
    "site_pages/Playground.py",
    title="Playground",
    icon=":material/science:",
    url_path="Playground",
)


def legacy_showcase_redirect() -> None:
    """Keep the former showcase URL working without a second homepage."""

    st.switch_page(homepage)


legacy_showcase = st.Page(
    legacy_showcase_redirect,
    title="ShadcnHomepage",
    url_path="ShadcnHomepage",
    visibility="hidden",
)

component_pages = [
    st.Page("pages/Accordion.py", title="Accordion"),
    st.Page("pages/Alert.py", title="Alert"),
    st.Page("pages/AlertDialog.py", title="Alert Dialog"),
    st.Page("pages/AspectRatio.py", title="Aspect Ratio"),
    st.Page("pages/Avatar.py", title="Avatar"),
    st.Page("pages/Badges.py", title="Badges"),
    st.Page("pages/BreadCrumb.py", title="Breadcrumb"),
    st.Page("pages/Button.py", title="Button"),
    st.Page("pages/Calendar.py", title="Calendar"),
    st.Page("pages/Card.py", title="Card"),
    st.Page("pages/Checkbox.py", title="Checkbox"),
    st.Page("pages/Collapsible.py", title="Collapsible"),
    st.Page("pages/DatePicker.py", title="Date Picker"),
    st.Page("pages/DropdownMenu.py", title="Dropdown Menu"),
    st.Page("pages/HoverCard.py", title="Hover Card"),
    st.Page("pages/Input.py", title="Input"),
    st.Page("pages/InputOTP.py", title="Input OTP"),
    st.Page("pages/LinkButton.py", title="Link Button"),
    st.Page("pages/MetricCard.py", title="Metric Card"),
    st.Page("pages/Pagination.py", title="Pagination"),
    st.Page("pages/Popover.py", title="Popover"),
    st.Page("pages/Progress.py", title="Progress"),
    st.Page("pages/RadioGroup.py", title="Radio Group"),
    st.Page("pages/ScrollArea.py", title="Scroll Area"),
    st.Page("pages/Select.py", title="Select"),
    st.Page("pages/Separator.py", title="Separator"),
    st.Page("pages/Skeleton.py", title="Skeleton"),
    st.Page("pages/Slider.py", title="Slider"),
    st.Page("pages/Switch.py", title="Switch"),
    st.Page("pages/Table.py", title="Table"),
    st.Page("pages/Tabs.py", title="Tabs"),
    st.Page("pages/TextArea.py", title="Textarea"),
    st.Page("pages/Toggle.py", title="Toggle"),
    st.Page("pages/ToggleGroup.py", title="Toggle Group"),
]

guide_pages = [
    st.Page("pages/V2_Lifecycle.py", title="V2 Lifecycle"),
    st.Page("pages/Visualization.py", title="Visualization"),
    st.Page("pages/Experiment(Cool).py", title="Component Lab"),
]

use_case_pages = [
    st.Page(
        "pages/Elements.py",
        title="V2 Elements",
        icon=":material/account_tree:",
        url_path="Elements",
    ),
]

navigation = st.navigation(
    {
        "Start": [
            homepage,
            getting_started,
            playground,
            legacy_showcase,
        ],
        "Components": component_pages,
        "Use Cases": use_case_pages,
        "Guides": guide_pages,
    },
    position="sidebar",
    expanded=False,
)
navigation.run()
