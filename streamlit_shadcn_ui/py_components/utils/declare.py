
import os
import streamlit.components.v1 as components

# import streamlit_shadcn_ui.config as config
# TODO: streamlit seems to run declare first, so the config setting is not working
__RELEASE = True

def declare_component(component_name: str, url="http://localhost:5173", release=__RELEASE):

    if not release:
        _component_func = components.declare_component(
            # We give the component a simple, descriptive name ("my_component"
            # does not fit this bill, so please choose something better for your
            # own component :)
            component_name,
            # Pass `url` here to tell Streamlit that the component will be served
            # by the local dev server that you run via `npm run start`.
            # (This is useful while your component is in development.)
            url=url,
        )
    else:
        # When we're distributing a production version of the component, we'll
        # replace the `url` param with `path`, and point it to the component's
        # build directory:
        parent_dir = os.path.dirname(os.path.abspath(__file__))
        build_dir = os.path.join(parent_dir, "../../components/packages/frontend/dist")
        _component_func = components.declare_component(component_name, path=build_dir)

    return _component_func