from .utils import declare_component
import pandas as pd

_component_func = declare_component("table")

def table(data: pd.DataFrame, columns=None, maxHeight: int = None, key=None):
    if columns is None:
        columns = [{"dataKey": col, "title": col} for col in list(data.columns)]
    props = {"data": data.to_dict("records"), "columns": columns, "maxHeight": maxHeight}
    component_value = _component_func(comp="table", props=props, key=key)
    return component_value
