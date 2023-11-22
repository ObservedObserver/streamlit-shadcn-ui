from streamlit import session_state as _state
from streamlit.components.v1 import components as _components

# code reference: https://github.com/victoryhb/streamlit-option-menu/pull/38/files#diff-ff63c53819d031712321e22608d8c121f7f5d6200c0af36afc4cf46ed6579df0
def _patch_register_widget(register_widget):
    def wrapper_register_widget(*args, **kwargs):
        user_key = kwargs.get("user_key", None)
        callbacks = _state.get("_components_callbacks", None)

        # Check if a callback was registered for that user_key.
        if user_key and callbacks and user_key in callbacks:
            callback = callbacks[user_key]

            # Add callback-specific args for the real register_widget function.
            kwargs["on_change_handler"] = callback[0]
            kwargs["args"] = callback[1]
            kwargs["kwargs"] = callback[2]

        # Call the original function with updated kwargs.
        return register_widget(*args, **kwargs)

    return wrapper_register_widget


# Patch function only once.
if not hasattr(_components.register_widget, "__callbacks_patched__"):
    setattr(_components.register_widget, "__callbacks_patched__", True)
    _components.register_widget = _patch_register_widget(_components.register_widget)


def _register_callback(element_key, callback, *callback_args, **callback_kwargs):
    # Initialize callbacks store.
    if "_components_callbacks" not in _state:
        _state._components_callbacks = {}

    # Register a callback for a given element_key.
    _state._components_callbacks[element_key] = (callback, callback_args, callback_kwargs)

def register_callback(key, callback, args, kwargs):
    if callback is None:
        raise ValueError("Callback cannot be None")
    if key is None:
        raise ValueError("Key cannot be None")
    args = args if args is not None else []
    kwargs = kwargs if kwargs is not None else {}
    _register_callback(key, callback, *args, **kwargs)