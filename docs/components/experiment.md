This is a component for testing and experimenting with new features.

It allows you to use any component like using in a React Framework.

What you can benefit it from:
+ You can build nested components, all `streamlit-shadhcn-ui` component can combine together.
+ It allows you to write html and tailwindcss directly in python, without any extra work.

**This component is still in experimental stage, it may change in the future.** Now I only refactor several components to work in this mode. If you have any idea or suggestion, please open an issue.

### Basic Usage

Using `with` statement to create a component
```python
with ui.card(key="base_ele_card_l1"):
    with ui.card(key="base_ele_card_l2"):
        ui.element("input", key="nst2_input", label="Value")
        ui.element("button", key="nst2_btn", text="Nest Submmit", variant="outline")

    ui.element("button", key="nst_btn", text="Hello World")
```

Using without `with` statement, remember to call `render` method to render the component.
```python
st.header("Nest Element 2")
card = ui.element("card", key="base_ele_2")
card2 = ui.element("card", key="base_ele2_2")
card2.add_child(ui.element("input", key="nst2_input_2", label="Value"))
card2.add_child(ui.element("button", key="nst2_btn_2", text="Nest Submmit", variant="outline"))
card.add_child(card2)
card.add_child(ui.element("button", key="nst_btn_2", text="Hello World"))
card.render()
```

Certainly! Here's a revised version of your text, adjusted for clarity and a more native tone. Minimal changes have been made to preserve the original meaning and technical context:


### Using tailwind and style

Currently, only the `element` function allows for styling components with either `style` or `className` (using Tailwind). This feature is still experimental, but I plan to complete most of the work this week. For example:

```py
import streamlit_shadcn_ui as UI

with ui.card(key="card1"):
    ui.element("span", children=["Email"], className="text-gray-400 text-sm font-medium m-1", key="label1")
    ui.element("input", key="email_input", placeholder="Your email")

    ui.element("span", children=["User Name"], className="text-gray-400 text-sm font-medium m-1", key="label2")
    ui.element("input", key="username_input", placeholder="Create a User Name")
    ui.element("button", text="Submit", key="button", className="m-1")
```

One concern I have is preventing the frontend application from becoming too bulky. Each iframe incorporating its own complete bundle of Tailwind code could lead to excessively large files. Full Tailwind integration offers a great development experience, but at the cost of increased bundle size, which is particularly significant since a Streamlit app typically contains many iframe-based components.

To address this, I am considering offering two initial options: including the complete Tailwind style by default, but also providing a 'lite-mode' with limited Tailwind for those who prefer a leaner approach.

Another task to complete before making `element` a formal feature involves the handling of `element` values. When using nested elements, they share the same iframe and Streamlit values in the session state. Therefore, I need to slightly refactor the current value type to include the component key, allowing all components to share a single Streamlit value.
