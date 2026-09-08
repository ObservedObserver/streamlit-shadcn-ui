from __future__ import annotations

import importlib
import inspect
import itertools
import unittest
from datetime import date
from unittest.mock import patch

import pandas as pd
import streamlit_shadcn_ui as ui
from streamlit_shadcn_ui.v2 import _protocol

common = importlib.import_module("streamlit_shadcn_ui.v2.widgets._common")
FAMILIES = ("line", "area", "bar", "pie", "radar", "radial")
DATA = [
    {"month": m, "desktop": n, "mobile": n / 2}
    for m, n in [("Jan", 100), ("Feb", 200), ("Mar", 300)]
]


class ChartTests(unittest.TestCase):
    def setUp(self):
        self.runtime = type("Runtime", (), {"session_state": {}})()
        self.mounted = {}
        for target, name, kwargs in [
            (_protocol, "require_v2_runtime", {"return_value": self.runtime}),
            (common, "mount", {"side_effect": lambda **kw: self.mounted.update(kw)}),
        ]:
            patcher = patch.object(target, name, **kwargs)
            patcher.start()
            self.addCleanup(patcher.stop)

    def test_all_public_families_mount_stateless_chart_envelopes(self):
        for family in FAMILIES:
            with self.subTest(family=family):
                fn = getattr(ui, family + "_chart")
                self.assertIsNone(fn(DATA, "month", "desktop", key=family))
                envelope = self.mounted["data"]
                self.assertEqual(envelope["kind"], "chart")
                self.assertEqual(envelope["props"]["chartType"], family)
                self.assertNotIn("state", envelope)
                self.assertEqual(self.mounted["width"], "stretch")
                parameters = list(inspect.signature(fn).parameters.values())
                self.assertEqual(
                    [p.name for p in parameters[:3]],
                    ["data", "names", "values"]
                    if family in {"pie", "radial"}
                    else ["data", "x", "y"],
                )
                self.assertTrue(
                    all(
                        p.kind == inspect.Parameter.KEYWORD_ONLY for p in parameters[3:]
                    )
                )
                self.assertIsNone(inspect.signature(fn).parameters["key"].default)

    def test_dataframe_inference_labels_dates_and_gaps(self):
        frame = pd.DataFrame(
            [
                {"date": date(2026, 1, 1), "sales": 1, "refunds": None, "note": "a"},
                {"date": date(2026, 1, 2), "sales": 2, "refunds": 0, "note": "b"},
            ]
        )
        ui.line_chart(frame)
        props = self.mounted["data"]["props"]
        self.assertEqual(
            props["series"],
            [
                {"key": "series-0", "label": "sales"},
                {"key": "series-1", "label": "refunds"},
            ],
        )
        self.assertEqual(
            props["data"][0],
            {"category": "2026-01-01", "series-0": 1, "series-1": None},
        )
        self.assertTrue(props["showLegend"])
        ui.bar_chart(
            frame, y={"refunds": "Returns", "sales": "Revenue"}, show_legend=False
        )
        self.assertEqual(self.mounted["data"]["props"]["series"][0]["label"], "Returns")
        self.assertFalse(self.mounted["data"]["props"]["showLegend"])
        ui.line_chart(
            pd.DataFrame({"x": ["a", "b"], "y": pd.array([1, None], dtype="Int64")})
        )
        self.assertIsNone(self.mounted["data"]["props"]["data"][1]["series-0"])

    def test_field_names_never_enter_css_and_input_is_not_mutated(self):
        field = "evil; } body { color:red } /*"
        data = [{"x": "<script>alert(1)</script>", field: 4}]
        ui.line_chart(data)
        props = self.mounted["data"]["props"]
        self.assertEqual(props["series"], [{"key": "series-0", "label": field}])
        self.assertEqual(list(data[0]), ["x", field])
        self.assertEqual(list(props["data"][0]), ["category", "series-0"])

    def test_variants_and_segment_order(self):
        ui.bar_chart(DATA, stacked=True, horizontal=True)
        self.assertTrue(self.mounted["data"]["props"]["stacked"])
        self.assertTrue(self.mounted["data"]["props"]["horizontal"])
        ui.area_chart(DATA, stacked=True, show_tooltip=False)
        self.assertFalse(self.mounted["data"]["props"]["showTooltip"])
        ui.pie_chart(DATA, values="desktop", donut=True)
        props = self.mounted["data"]["props"]
        self.assertEqual(props["series"][0], {"key": "segment-0", "label": "Jan"})
        self.assertEqual(props["data"][0], {"category": "segment-0", "value": 100})
        self.assertTrue(props["donut"])

    def test_invalid_data_fails_before_mount(self):
        cases = [
            ([], {}),
            ("wrong", {}),
            ({"x": 1}, {}),
            ([1], {}),
            ([{}], {}),
            ([{"x": "a", "y": 1}, {"x": "b"}], {"y": "y"}),
            ([{"x": "a", "y": True}], {"y": "y"}),
            ([{"x": "a", "y": "1"}], {"y": "y"}),
            ([{"x": "a", "y": float("inf")}], {}),
            ([{"x": "a", "y": 10**1000}], {}),
            ([{"x": "a", "y": 2**53}], {}),
            ([{"x": "a", "y": None}], {"y": "y"}),
            ([{"x": None, "y": 1}], {}),
            (DATA, {"y": ["desktop", "desktop"]}),
            (DATA, {"y": "month"}),
            (DATA, {"x": "missing"}),
            (DATA, {"y": {"desktop": ""}}),
            (pd.DataFrame([[1, 2]], columns=["x", "x"]), {}),
            (pd.DataFrame([[1, 2]], columns=[0, 1]), {}),
            (DATA, {"title": "a" * 16385}),
            (DATA, {"show_tooltip": "yes"}),
            (DATA, {"show_legend": 1}),
            (DATA, {"width": "content"}),
            (DATA, {"width": True}),
            (DATA, {"width": 0}),
            (pd.DataFrame({"x": [pd.NaT], "y": [1]}), {}),
        ]
        for data, kwargs in cases:
            with self.subTest(kwargs=kwargs, data_type=type(data).__name__):
                with self.assertRaises((TypeError, ValueError)):
                    ui.line_chart(data, **kwargs)
                self.assertEqual(self.mounted, {})

    def test_limits_consume_bounded_iterators_and_enforce_envelope_size(self):
        consumed = []

        def rows():
            for i in itertools.count():
                consumed.append(i)
                yield {"x": str(i), "y": i}

        with self.assertRaises(ValueError):
            ui.line_chart(rows())
        self.assertEqual(len(consumed), 1001)
        with self.assertRaises(ValueError):
            ui.line_chart([{"x": "a", **{str(i): i for i in range(6)}}])
        with self.assertRaisesRegex(ValueError, "2 MiB"):
            ui.line_chart([{"x": "a" * 16000, "y": i} for i in range(150)])
        ui.line_chart([{"x": str(i), "y": i} for i in range(1000)])
        self.assertEqual(len(self.mounted["data"]["props"]["data"]), 1000)

    def test_polar_validation(self):
        for family in ("pie", "radial"):
            fn = getattr(ui, family + "_chart")
            for data in [[{"x": "a", "y": n}] for n in [None, -1, float("nan"), 0]]:
                with self.assertRaises((TypeError, ValueError)):
                    fn(data)
            for data, kwargs in [
                (DATA, {}),
                (DATA, {"values": ["desktop"]}),
                ([{"x": "a", "y": 1}, {"x": "a", "y": 2}], {}),
                ([{"x": str(i), "y": 1} for i in range(6)], {}),
            ]:
                with self.assertRaises((TypeError, ValueError)):
                    fn(data, **kwargs)
        for data in [
            DATA[:2],
            [DATA[0]] * 3,
            [{**row, "desktop": -1} for row in DATA],
            [{**row, "desktop": None} for row in DATA],
        ]:
            with self.assertRaises(ValueError):
                ui.radar_chart(data, y="desktop")


if __name__ == "__main__":
    unittest.main()
