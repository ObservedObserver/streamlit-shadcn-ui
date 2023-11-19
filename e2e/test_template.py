from pathlib import Path

import pytest

from playwright.sync_api import Page, expect

from e2e_utils import StreamlitRunner

ROOT_DIRECTORY = Path(__file__).parent.parent.absolute()
BASIC_EXAMPLE_FILE = ROOT_DIRECTORY / "my_component" / "example.py"

@pytest.fixture(autouse=True, scope="module")
def streamlit_app():
    with StreamlitRunner(BASIC_EXAMPLE_FILE) as runner:
        yield runner


@pytest.fixture(autouse=True, scope="function")
def go_to_app(page: Page, streamlit_app: StreamlitRunner):
    page.goto(streamlit_app.server_url)
    # Wait for app to load
    page.get_by_role("img", name="Running...").is_hidden()


def test_should_render_template(page: Page):
    frame_0 = page.frame_locator(
        'iframe[title="my_component\\.my_component"]'
    ).nth(0)
    frame_1 = page.frame_locator(
        'iframe[title="my_component\\.my_component"]'
    ).nth(1)

    st_markdown_0 = page.get_by_role('paragraph').nth(0)
    st_markdown_1 = page.get_by_role('paragraph').nth(1)

    expect(st_markdown_0).to_contain_text("You've clicked 0 times!")

    frame_0.get_by_role("button", name="Click me!").click()

    expect(st_markdown_0).to_contain_text("You've clicked 1 times!")
    expect(st_markdown_1).to_contain_text("You've clicked 0 times!")

    frame_1.get_by_role("button", name="Click me!").click()
    frame_1.get_by_role("button", name="Click me!").click()

    expect(st_markdown_0).to_contain_text("You've clicked 1 times!")
    expect(st_markdown_1).to_contain_text("You've clicked 2 times!")

    page.get_by_label("Enter a name").click()
    page.get_by_label("Enter a name").fill("World")
    page.get_by_label("Enter a name").press("Enter")

    expect(frame_1.get_by_text("Hello, World!")).to_be_visible()

    frame_1.get_by_role("button", name="Click me!").click()

    expect(st_markdown_0).to_contain_text("You've clicked 1 times!")
    expect(st_markdown_1).to_contain_text("You've clicked 3 times!")


def test_should_change_iframe_height(page: Page):
    frame = page.frame_locator('iframe[title="my_component\\.my_component"]').nth(1)

    expect(frame.get_by_text("Hello, Streamlit!")).to_be_visible()

    locator = page.locator('iframe[title="my_component\\.my_component"]').nth(1)

    init_frame_height = locator.bounding_box()['height']
    assert init_frame_height != 0

    page.get_by_label("Enter a name").click()

    page.get_by_label("Enter a name").fill(35 * "Streamlit ")
    page.get_by_label("Enter a name").press("Enter")

    expect(frame.get_by_text("Streamlit Streamlit Streamlit")).to_be_visible()

    frame_height = locator.bounding_box()['height']
    assert frame_height > init_frame_height

    page.set_viewport_size({"width": 150, "height": 150})

    expect(frame.get_by_text("Streamlit Streamlit Streamlit")).not_to_be_in_viewport()

    frame_height_after_viewport_change = locator.bounding_box()['height']
    assert frame_height_after_viewport_change > frame_height
