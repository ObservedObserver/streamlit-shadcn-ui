# Data Table

`ui.data_table` displays a bounded record set with local sorting, search,
pagination, column visibility, selection and row actions. Use it for record
management. Use `ui.table` for static display and Streamlit's native dataframe
or data editor for large data exploration or spreadsheet-style editing.

```python
import streamlit as st
import streamlit_shadcn_ui as ui

records = [
    {"id": "a", "name": "Alpha", "amount": 100},
    {"id": "b", "name": "Beta", "amount": 20},
]
result = ui.data_table(
    records,
    columns=["name", {"key": "amount", "label": "Amount"}],
    key="records",
    row_id="id",
    page_size=10,
    actions=[{"id": "edit", "label": "Edit"}],
)
st.write(result.selected_ids)
if result.action:
    st.write(result.action.row_id, result.action.action_id)
```

`key` and `row_id` are required. Rows may be an iterable of mappings or a pandas
DataFrame. IDs must be unique nonempty strings or integers; `1` and `"1"` are
distinct. Integer IDs travel as strings internally and retain their Python type,
including values above JavaScript's safe integer range.

Columns are field names or mappings with `key` and optional `label`. Omitted
columns use the first row's keys. Each column must contain only one scalar type,
plus `None`: text, finite numbers, or booleans. Missing fields display as empty
cells. Numeric cells must be within JavaScript's safe range; convert larger
numbers to text. Numeric sorting uses numeric values, not their display strings.
Limits are 1,000 rows, 50 columns, 20 actions, and 1–100 rows per page, plus the
library's text and total-envelope limits.

Search is a case-insensitive substring search across all data columns, including
hidden ones. Search and sort changes return to the first page. Hiding every
column is supported; the Columns menu restores them. Column state follows keys
when definitions are reordered and is cleared for removed columns. Paging,
search, sorting and visibility stay in the browser and do not rerun Python.
They survive ordinary reruns while the mounted component remains; changing its
key or unmounting it resets that local view state.

`selection_mode` is `"multiple"` by default, or `"single"` / `"none"`.
`selected_ids` supplies the initial value; changing that argument resets
selection through the existing revision protocol. Selection changes rerun
Python and optionally call `on_select`, a callback with no arguments.
The header checkbox selects or deselects only rows on the visible page.
Selections survive search, pagination, sorting and reorder. Removing rows
prunes only their IDs and keeps surviving selections. To clear selection, change
`selected_ids` or the component key; passing the same initial default on every
rerun does not overwrite user changes.

Actions are mappings with `id`, optional `label`, and optional `disabled`.
`result.action` is a `DataTableAction(row_id, action_id)` for that trigger run,
or `None`. Unrelated reruns do not replay it. Removed rows, removed actions and
disabled actions are rejected when decoding results. Application code owns
permissions, persistence and actual record mutation. Action-bearing tables
cannot be placed inside `st.form`; state-only selection tables can use its
normal deferred submission behavior.

This is a standalone widget; it cannot yet be embedded inside `ui.elements`.
The implementation uses the pinned shadcn Table, Input, Button, Checkbox and
Dropdown Menu controls unchanged, with TanStack Table v9 behavior. It does not
accept custom control classes, raw JavaScript renderers, remote pagination or
editable cells.
