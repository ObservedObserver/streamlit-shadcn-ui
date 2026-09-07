import { cleanup, render } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { ChartView } from "./chart"
import type { ChartEnvelope, ChartType } from "@/protocol/schema"

beforeEach(() => {
  // jsdom has no layout. Supply only container geometry; render real Recharts.
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    width: 480,
    height: 270,
    top: 0,
    left: 0,
    right: 480,
    bottom: 270,
    x: 0,
    y: 0,
    toJSON: () => ({})
  })
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
describe("native chart composition", () => {
  it.each<ChartType>(["line", "area", "bar", "pie", "radar", "radial"])(
    "renders %s with generated Card and Chart",
    (chartType) => {
      const segmented = chartType === "pie" || chartType === "radial"
      const envelope: ChartEnvelope = {
        protocolVersion: 1,
        kind: "chart",
        props: {
          chartType,
          data: segmented
            ? [{ category: "segment-0", value: 10 }]
            : ["Jan", "Feb", "Mar"].map((category) => ({
                category,
                "series-0": 10
              })),
          series: [
            { key: segmented ? "segment-0" : "series-0", label: "<Desktop>" }
          ],
          title: "Visitors",
          description: "A real chart",
          showLegend: true,
          showTooltip: true,
          stacked: false,
          horizontal: false,
          donut: false
        }
      }
      const { container, getByText } = render(<ChartView envelope={envelope} />)
      expect(getByText("Visitors")).toBeTruthy()
      expect(container.querySelector('[data-slot="card"]')).toBeTruthy()
      expect(
        container
          .querySelector('[data-slot="chart"]')
          ?.classList.contains("aspect-video")
      ).toBe(true)
      expect(container.querySelector("svg.recharts-surface")).toBeTruthy()
      expect(container.querySelector("style")?.textContent).toContain(
        "var(--chart-1)"
      )
      expect(container.querySelector("style")?.textContent).not.toContain(
        "Desktop"
      )
      expect(
        container.querySelector('[data-slot="card"]')?.getAttribute("style")
      ).toBeNull()
    }
  )
})
