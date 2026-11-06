import streamlit as st
import streamlit_shadcn_ui as ui

st.title("Item acceptance")
st.session_state.setdefault("item_actions", 0)
st.session_state.setdefault("item_last", "none")


def manage(event):
    st.session_state.item_actions += 1
    st.session_state.item_last = event.node_id


reverse = st.checkbox("Reverse members")
with ui.elements(key="members") as el:
    with el.item_group(key="group"):
        for name in ["Grace", "Ada"] if reverse else ["Ada", "Grace"]:
            with el.item(key=name, variant="outline"):
                with el.item_media():
                    el.avatar(
                        src="data:image/png;base64,AAAA"
                        if name == "Grace"
                        else None,
                        fallback=name[0],
                        alt=name,
                    )
                with el.item_content():
                    el.item_title(name)
                    el.item_description("Workspace member")
                with el.item_actions():
                    el.button(
                        "Manage " + name,
                        key="manage",
                        on_click=manage,
                        disabled=name == "Grace",
                    )
    with el.item(key="image", size="xs", variant="muted"):
        with el.item_media(variant="image"):
            el.item_image(
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGMI7dgNAALOAZmnaGjRAAAAAElFTkSuQmCC",
                alt="Preview",
            )
        with el.item_content():
            el.item_title("Preview file")
            el.item_description("Image media uses the pinned xs size")
st.text(
    f"Actions: {st.session_state.item_actions}; Last: {st.session_state.item_last}"
)
