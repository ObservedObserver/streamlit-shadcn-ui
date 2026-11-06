from __future__ import annotations

import importlib
import unittest
from unittest.mock import patch

import streamlit_shadcn_ui as ui

mod = importlib.import_module("streamlit_shadcn_ui.v2.widgets.data_table")


class DataTableTests(unittest.TestCase):
    def call(self, data, **kwargs):
        captured = {}
        with patch.object(mod, "prepare_state", side_effect=lambda **kw: {
            "kind": "data_table", "value": kw["default_value"],
            "clientRevision": 0, "serverRevision": 0,
        }), patch.object(mod, "mount", side_effect=lambda **kw: captured.update(kw) or {}), \
             patch.object(mod, "fail_if_trigger_in_form"):
            result = ui.data_table(data, key="records", row_id="id", **kwargs)
        return result, captured

    def test_string_and_integer_ids_are_distinct_and_large_ids_roundtrip(self):
        # IDs are opaque tokens, not JavaScript numeric values.
        large = 2**80
        result, captured = self.call([{"id": 1}, {"id": "1"}, {"id": large}],
                                    columns=[], selected_ids=[1, "1", large])
        self.assertEqual(result.selected_ids, [1, "1", large])
        self.assertEqual([r["id"] for r in captured["data"]["props"]["rows"]],
                         ["i:1", "s:1", f"i:{large}"])

    def test_cells_preserve_numeric_sort_values_and_validate(self):
        _, captured = self.call([{"id": "a", "amount": 10}, {"id": "b", "amount": 2}], columns=["amount"])
        self.assertEqual([r["cells"] for r in captured["data"]["props"]["rows"]], [[10], [2]])
        for bad in (float("nan"), float("inf"), 2**1000, {}, []):
            with self.subTest(value=repr(bad)), self.assertRaises((TypeError, ValueError)):
                self.call([{"id": "a", "value": bad}])
        with self.assertRaisesRegex(ValueError, "one scalar type"):
            self.call([{"id": "a", "value": 1}, {"id": "b", "value": "1"}])

    def test_rejects_duplicate_ids_invalid_options_and_limits(self):
        with self.assertRaisesRegex(ValueError, "unique"):
            self.call([{"id": "a"}, {"id": "a"}])
        for kwargs in ({"page_size": True}, {"page_size": 0}, {"selection_mode": "single", "selected_ids": [1, 2]},
                       {"selected_ids": [9]}, {"columns": ["id", "id"]}):
            with self.subTest(kwargs=kwargs), self.assertRaises(ValueError):
                self.call([{"id": 1}, {"id": 2}], **kwargs)
        with self.assertRaises(ValueError):
            self.call([{"id": i} for i in range(1001)])
        with self.assertRaises(TypeError):
            self.call([{"id": True}])

    def test_prunes_removed_selection_without_losing_survivors(self):
        entry = {"server_revision": 0}
        captured = {}
        with patch.object(mod, "prepare_state", return_value={
            "kind": "data_table", "value": ["s:a", "s:deleted"],
            "clientRevision": 3, "serverRevision": 0,
        }), patch.object(mod, "register_kind", return_value=entry), \
             patch.object(mod, "mount", side_effect=lambda **kw: captured.update(kw) or {}):
            result = ui.data_table([{"id": "a"}], key="records", row_id="id")
        self.assertEqual(result.selected_ids, ["a"])
        self.assertEqual(captured["data"]["state"]["serverRevision"], 1)
        self.assertEqual(entry["pending_reset"]["value"], ["s:a"])

    def test_actions_reject_stale_unknown_and_disabled_targets(self):
        actions = [{"id": "edit", "label": "Edit", "disabled": False},
                   {"id": "delete", "label": "Delete", "disabled": True}]
        self.assertEqual(mod._action({"rowId": "s:a", "actionId": "edit"}, {"s:a": "a"}, actions),
                         ui.DataTableAction("a", "edit"))
        for raw in (None, {"rowId": "s:deleted", "actionId": "edit"},
                    {"rowId": "s:a", "actionId": "delete"}, {"rowId": "s:a", "actionId": "missing"}):
            self.assertIsNone(mod._action(raw, {"s:a": "a"}, actions))

    def test_empty_table_mounts_and_actions_fail_closed_in_forms(self):
        result, captured = self.call([])
        self.assertEqual(result, ui.DataTableResult([]))
        self.assertEqual(captured["data"]["props"]["columns"], [])
        with patch.object(mod, "fail_if_trigger_in_form", side_effect=RuntimeError("form")):
            with self.assertRaisesRegex(RuntimeError, "form"):
                ui.data_table([], key="records", row_id="id", actions=[{"id": "edit"}])
