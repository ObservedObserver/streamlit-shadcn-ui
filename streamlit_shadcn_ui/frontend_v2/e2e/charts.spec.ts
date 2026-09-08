import { expect, test, type Locator, type Page } from "@playwright/test"
import axe from "axe-core"

const charts = (page: Page) => page.getByTestId("ssui-v2-chart")
const named = (page: Page, title: string) =>
  charts(page).filter({ has: page.getByText(title, { exact: true }) })

async function expectChartPalette(page: Page, palette: string[]) {
  for (const card of await charts(page).all()) {
    await expect
      .poll(async () =>
        card.evaluate((element, colors) => {
          const probe = document.createElement("span")
          element.append(probe)
          const resolve = (color: string) => {
            probe.style.color = color
            return getComputedStyle(probe).color
          }
          const expected = colors.map(resolve)
          const tokens = colors.map((_, i) => resolve(`var(--chart-${i + 1})`))
          probe.remove()
          const type = element.getAttribute("data-chart-type")!
          const missingValues =
            element.querySelector('[data-slot="card-title"]')?.textContent ===
            "Missing values"
          const count = missingValues
            ? 1
            : type === "pie" || type === "radial"
              ? 3
              : 2
          const selectors: Record<string, string> = {
            line: ".recharts-line-curve",
            area: ".recharts-area-area",
            bar: ".recharts-bar-rectangle path",
            pie: ".recharts-pie-sector path",
            radar: ".recharts-radar-polygon path",
            radial: "path.recharts-radial-bar-sector"
          }
          const marks = [...element.querySelectorAll(selectors[type]!)].map(
            (mark) =>
              getComputedStyle(mark).getPropertyValue(
                type === "line" ? "stroke" : "fill"
              )
          )
          const legend = [
            ...element.querySelectorAll(".recharts-legend-wrapper .shrink-0")
          ].map((swatch) => getComputedStyle(swatch).backgroundColor)
          const unique = [...new Set(marks)]
          return {
            tokensMatch: JSON.stringify(tokens) === JSON.stringify(expected),
            marksMatch:
              unique.length === count &&
              unique.every((color, i) => color === expected[i]),
            legendMatches:
              legend.length === (missingValues ? 0 : count) &&
              legend.every((color, i) => color === expected[i])
          }
        }, palette)
      )
      .toEqual({ tokensMatch: true, marksMatch: true, legendMatches: true })
  }
}

async function open(page: Page) {
  await page.goto("/")
  await expect(
    page.getByRole("heading", { name: "Chart acceptance" })
  ).toBeVisible()
  await expect(charts(page)).toHaveCount(10)
  await expect(page.locator("iframe")).toHaveCount(0)
}

async function hoverMark(page: Page, card: Locator) {
  await card.scrollIntoViewIfNeeded()
  const type = await card.getAttribute("data-chart-type")
  if (type === "pie" || type === "radial") {
    const mark = card
      .locator(
        type === "pie"
          ? ".recharts-pie-sector path"
          : "path.recharts-radial-bar-sector"
      )
      .first()
    await expect(mark).toBeVisible()
    let previousPath: string | null = null
    await expect
      .poll(
        async () => {
          const currentPath = await mark.getAttribute("d")
          const stable = currentPath !== null && currentPath === previousPath
          previousPath = currentPath
          return stable
        },
        { intervals: [100, 200, 300] }
      )
      .toBe(true)
    // Locate an actual filled point, including donut holes and narrow arcs.
    const point = await mark.evaluate((element) => {
      const path = element as SVGGeometryElement
      const box = path.getBBox()
      const matrix = path.getScreenCTM()!
      for (let y = 1; y < 20; y++)
        for (let x = 1; x < 20; x++) {
          const p = new DOMPoint(
            box.x + (box.width * x) / 20,
            box.y + (box.height * y) / 20
          )
          if (path.isPointInFill(p)) {
            const screen = p.matrixTransform(matrix)
            return { x: screen.x, y: screen.y }
          }
        }
      throw new Error("No filled chart point")
    })
    await page.mouse.move(point.x, point.y)
  } else {
    const svg = card.locator("svg.recharts-surface")
    const box = await svg.boundingBox()
    await svg.hover({
      position: {
        x: type === "radar" ? box!.width / 2 : type === "bar" ? 100 : 20,
        y: 50
      }
    })
  }
  await expect(card.locator(".recharts-tooltip-wrapper")).toBeVisible()
  await expect(card.locator(".recharts-tooltip-wrapper")).toContainText(
    /Desktop|Mobile|sales/
  )
}

test("all families render native marks, legends, tooltips and isolated styles", async ({
  page
}, info) => {
  const errors: string[] = []
  page.on("pageerror", (e) => errors.push(e.message))
  page.on("console", (m) => {
    if (
      ["error", "warning"].includes(m.type()) &&
      !m.text().includes("scroll-linked positioning")
    )
      errors.push(m.text())
  })
  await open(page)
  const expected = [
    ["Line", ".recharts-line-curve"],
    ["Area", ".recharts-area-area"],
    ["Bar", ".recharts-bar-rectangle"],
    ["Horizontal stacked bar", ".recharts-bar-rectangle"],
    ["Pie", ".recharts-pie-sector"],
    ["Donut", ".recharts-pie-sector"],
    ["Radar", ".recharts-radar-polygon"],
    ["Radial", ".recharts-radial-bar-sector"],
    ["Stacked area", ".recharts-area-area"],
    ["Missing values", ".recharts-line-curve"]
  ]
  for (const [title, selector] of expected) {
    const card = named(page, title)
    await card.scrollIntoViewIfNeeded()
    await expect(card.locator(selector).first()).toBeVisible()
    if (title !== "Missing values") {
      await expect(card.locator(".recharts-legend-wrapper")).toContainText(
        "Desktop"
      )
      await expect(card.locator(".recharts-legend-wrapper")).toContainText(
        "Mobile"
      )
    }
    await expect(card.locator('[data-slot="chart"]')).toHaveClass(
      /aspect-video/
    )
    expect(await card.getAttribute("style")).toBeNull()
    await hoverMark(page, card)
    if (title === "Missing values")
      await expect(card.locator(".recharts-tooltip-wrapper")).toContainText(
        "series-0"
      )
    await card.screenshot({
      path: info.outputPath(`${title.replaceAll(" ", "-")}.png`)
    })
  }
  expect(
    await page.evaluate(
      () => document.querySelectorAll("[data-ssui-component]").length
    )
  ).toBe(0)
  expect(errors).toEqual([])
  const bars = await named(page, "Horizontal stacked bar")
    .locator(".recharts-bar-rectangle path")
    .evaluateAll((elements) =>
      elements.map((e) => {
        const { x, y, width, height } = (e as SVGGraphicsElement).getBBox()
        return { x, y, width, height }
      })
    )
  expect(bars).toHaveLength(12)
  expect(bars[0]!.y).toBeCloseTo(bars[6]!.y, 1)
  expect(bars[0]!.height).toBeCloseTo(bars[6]!.height, 1)
  expect(bars[0]!.x + bars[0]!.width).toBeCloseTo(bars[6]!.x, 1)
  expect(bars[0]!.y).toBeLessThan(bars[1]!.y)
  for (const [title, filled] of [
    ["Pie", true],
    ["Donut", false]
  ] as const) {
    const centerFilled = await named(page, title)
      .locator(".recharts-pie-sector path")
      .evaluateAll((elements) => {
        const paths = elements as SVGGeometryElement[]
        const boxes = paths.map((p) => p.getBBox())
        const left = Math.min(...boxes.map((b) => b.x))
        const right = Math.max(...boxes.map((b) => b.x + b.width))
        const top = Math.min(...boxes.map((b) => b.y))
        const bottom = Math.max(...boxes.map((b) => b.y + b.height))
        const point = new DOMPoint(
          (left + right) / 2 + 1,
          (top + bottom) / 2 + 1
        )
        return paths.some((p) => p.isPointInFill(point))
      })
    expect(centerFilled).toBe(filled)
  }
  for (const [title, stacked] of [
    ["Area", false],
    ["Stacked area", true]
  ] as const) {
    const bottoms = await named(page, title)
      .locator(".recharts-area-area")
      .evaluateAll((elements) =>
        elements.map((e) => {
          const box = (e as SVGGraphicsElement).getBBox()
          return box.y + box.height
        })
      )
    expect(bottoms).toHaveLength(2)
    if (stacked) expect(bottoms[0]! - bottoms[1]!).toBeGreaterThan(1)
    else expect(bottoms[0]).toBeCloseTo(bottoms[1]!, 1)
  }
})

test("data changes, legend and tooltip switches, and keyboard navigation", async ({
  page
}) => {
  await open(page)
  const line = named(page, "Line")
  await expect(
    line.locator(".recharts-cartesian-axis-tick-value").first()
  ).toHaveText("Jan")
  await line.scrollIntoViewIfNeeded()
  await line.locator("svg.recharts-surface").focus()
  await page.keyboard.press("ArrowRight")
  await expect(line.locator(".recharts-tooltip-wrapper")).toBeVisible()
  await page.getByRole("combobox", { name: "Dataset" }).click()
  await page.getByRole("option", { name: "Doubled", exact: true }).click()
  await expect(page.getByText("Current first value: 372")).toBeVisible()
  await hoverMark(page, line)
  await expect(line.locator(".recharts-tooltip-wrapper")).toContainText("372")
  await page.getByText("Show legends", { exact: true }).click()
  await expect(page.locator(".recharts-legend-wrapper")).toHaveCount(0)
  await page.getByText("Show tooltips", { exact: true }).click()
  await expect(page.locator(".recharts-tooltip-wrapper")).toHaveCount(0)
  await page.getByText("Show legends", { exact: true }).click()
  await page.getByText("Show tooltips", { exact: true }).click()
  await expect(charts(page)).toHaveCount(10)
  await hoverMark(page, named(page, "Donut"))
})

test("themes, narrow width, zoom and accessibility", async ({ page }, info) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" })
  await open(page)
  await expectChartPalette(page, [
    "oklch(0.646 0.222 41.116)",
    "oklch(0.6 0.118 184.704)",
    "oklch(0.398 0.07 227.392)",
    "oklch(0.828 0.189 84.429)",
    "oklch(0.769 0.188 70.08)"
  ])
  const line = named(page, "Line")
  const light = await line.evaluate((e) => getComputedStyle(e).backgroundColor)
  await page.emulateMedia({ colorScheme: "dark" })
  await expect
    .poll(() => line.evaluate((e) => getComputedStyle(e).backgroundColor))
    .not.toBe(light)
  await expectChartPalette(page, [
    "oklch(0.488 0.243 264.376)",
    "oklch(0.696 0.17 162.48)",
    "oklch(0.769 0.188 70.08)",
    "oklch(0.627 0.265 303.9)",
    "oklch(0.645 0.246 16.439)"
  ])
  await page.setViewportSize({ width: 390, height: 844 })
  for (const card of await charts(page).all()) {
    await card.scrollIntoViewIfNeeded()
    const overflow = await card.evaluate((e) => {
      const chart = e.querySelector('[data-slot="chart"]')!
      const rect = chart.getBoundingClientRect()
      return {
        width: rect.width,
        height: rect.height,
        overflow: e.scrollWidth - e.clientWidth
      }
    })
    expect(overflow.width).toBeGreaterThan(100)
    expect(overflow.height).toBeGreaterThan(50)
    expect(overflow.overflow).toBeLessThanOrEqual(2)
  }
  await named(page, "Donut").screenshot({
    path: info.outputPath("mobile-dark-donut.png")
  })
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.evaluate(() => {
    document.body.style.zoom = "2"
  })
  await line.scrollIntoViewIfNeeded()
  await expect(line.locator("svg.recharts-surface")).toBeVisible()
  await line.screenshot({ path: info.outputPath("zoom-200.png") })
  await page.evaluate(() => {
    document.body.style.zoom = ""
  })
  await page.addScriptTag({ content: axe.source })
  const violations = await page.evaluate(async () => {
    const hosts = [...document.querySelectorAll("*")].filter((e) =>
      e.shadowRoot?.querySelector('[data-ssui-component="chart"]')
    )
    const result = await (window as unknown as { axe: typeof axe }).axe.run(
      { include: hosts },
      {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] }
      }
    )
    return result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => n.failureSummary)
    }))
  })
  expect(violations).toEqual([])
})
