import { describe, expect, it } from "vitest"
import { parseEnvelope, type ChartEnvelope, type ChartType } from "./schema"

export function chartEnvelope(chartType: ChartType = "line"): ChartEnvelope {
  const segmented = chartType === "pie" || chartType === "radial"
  return {
    protocolVersion: 1,
    kind: "chart",
    props: {
      chartType,
      data: segmented
        ? [
            { category: "segment-0", value: 10 },
            { category: "segment-1", value: 20 }
          ]
        : ["Jan", "Feb", "Mar"].map((category, i) => ({
            category,
            "series-0": i + 1,
            "series-1": i + 2
          })),
      series: [0, 1].map((i) => ({
        key: `${segmented ? "segment" : "series"}-${i}`,
        label: ["Desktop", "Mobile"][i]!
      })),
      title: "Visitors",
      description: null,
      showLegend: true,
      showTooltip: true,
      stacked: false,
      horizontal: false,
      donut: false
    }
  }
}

describe("chart protocol", () => {
  it.each([
    { chartType: ["line"] },
    { chartType: {} },
    { chartType: null },
    { chartType: 1 }
  ])("rejects non-string chart types", ({ chartType }) => {
    const envelope = chartEnvelope()
    expect(
      parseEnvelope({ ...envelope, props: { ...envelope.props, chartType } }).ok
    ).toBe(false)
  })
  it.each<ChartType>(["line", "area", "bar", "pie", "radar", "radial"])(
    "accepts %s and copies only validated values",
    (type) => {
      const envelope = chartEnvelope(type)
      expect(parseEnvelope(envelope)).toEqual({ ok: true, envelope })
    }
  )

  it.each([
    (p: ChartEnvelope["props"]) => {
      p.series[0]!.key = "x; color:red"
    },
    (p) => {
      p.series[0]!.label = ""
    },
    (p) => {
      p.data = []
    },
    (p) => {
      p.series = []
    },
    (p) => {
      p.series = [...p.series, ...p.series, ...p.series]
    },
    (p) => {
      p.data = Array(1001).fill(p.data[0]!)
    },
    (p) => {
      p.data[0]!["series-0"] = Infinity
    },
    (p) => {
      p.data[0]!["series-0"] = NaN
    },
    (p) => {
      p.data[0]!["series-0"] = 2 ** 53
    },
    (p) => {
      p.data[0]!["series-0"] = "1"
    },
    (p) => {
      delete p.data[0]!["series-0"]
    },
    (p) => {
      p.data[0]!.fill = "red"
    },
    (p) => {
      p.data[0]!.category = ""
    },
    (p) => {
      p.title = "x".repeat(16385)
    },
    (p) => {
      p.stacked = true
    },
    (p) => {
      p.horizontal = true
    },
    (p) => {
      p.donut = true
    },
    (p) => {
      p.data.forEach((row) => {
        row["series-0"] = null
      })
    }
  ])("rejects malformed charts", (mutate) => {
    const envelope = chartEnvelope()
    mutate(envelope.props)
    expect(parseEnvelope(envelope).ok).toBe(false)
  })

  it("allows cartesian gaps and rejects incomplete or ambiguous polar data", () => {
    const line = chartEnvelope()
    line.props.data[1]!["series-0"] = null
    expect(parseEnvelope(line).ok).toBe(true)
    for (const type of ["pie", "radial", "radar"] as const) {
      for (const invalid of [null, -1]) {
        const envelope = chartEnvelope(type)
        envelope.props.data[0]![type === "radar" ? "series-0" : "value"] =
          invalid
        expect(parseEnvelope(envelope).ok).toBe(false)
      }
    }
    const pie = chartEnvelope("pie")
    pie.props.series[1]!.label = pie.props.series[0]!.label
    expect(parseEnvelope(pie).ok).toBe(false)
    pie.props.series[1]!.label = "Mobile"
    pie.props.data.forEach((row) => {
      row.value = 0
    })
    expect(parseEnvelope(pie).ok).toBe(false)
  })
})
