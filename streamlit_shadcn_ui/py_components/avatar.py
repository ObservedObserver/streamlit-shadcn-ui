from .utils import declare_component

_component_func = declare_component("avatar")

def avatar(src: str, fallback: str = None, key = None):
    props = {"src": src, "fallback": fallback}
    # fallback是默认返回值，可以没有
    # component_value存返回值，没有的话返回None
    component_value = _component_func(comp="avatar", props=props, key=key, default=None)# 我要在前端渲染一个组件
    return component_value
