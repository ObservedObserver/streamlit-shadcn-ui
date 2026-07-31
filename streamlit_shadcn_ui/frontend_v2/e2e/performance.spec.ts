import { expect, test, type Page } from "@playwright/test"

async function benchmarkState(page: Page) {
  return page.evaluate(() => {
    const hosts = [...document.querySelectorAll<HTMLElement>("*")].filter(
      (element) =>
        element.shadowRoot?.querySelector(
          "[data-ssui-v2-app-root]"
        ) != null
    )
    const styleLengths = hosts.map((host) => {
      const root = host.shadowRoot
      if (!root) {
        return 0
      }
      return [...root.styleSheets].reduce(
        (total, sheet) =>
          total +
          [...sheet.cssRules].reduce(
            (ruleTotal, rule) => ruleTotal + rule.cssText.length,
            0
          ),
        0
      )
    })
    const componentAssets = performance
      .getEntriesByType("resource")
      .map((entry) => entry.name)
      .filter((name) => /entry-|style-/.test(name))
    return {
      componentAssetRequests: [...new Set(componentAssets)].length,
      hostCount: hosts.length,
      maxStyleBytes: Math.max(0, ...styleLengths),
      minStyleBytes: Math.min(...styleLengths),
      documentComponentLinks: document.head.querySelectorAll(
        "link[href*='/bidi-components/streamlit-shadcn-ui.v2/']"
      ).length,
      inlineStyleElements: hosts.reduce(
        (total, host) =>
          total + (host.shadowRoot?.querySelectorAll("style").length ?? 0),
        0
      ),
      shadowComponentLinks: hosts.reduce(
        (total, host) =>
          total +
          (
            host.shadowRoot?.querySelectorAll(
              "link[href*='/bidi-components/streamlit-shadcn-ui.v2/']"
            ).length ?? 0
          ),
        0
      ),
      styleSheets: hosts.reduce(
        (total, host) =>
          total + (host.shadowRoot?.styleSheets.length ?? 0),
        0
      ),
      totalStyleBytes: styleLengths.reduce(
        (total, length) => total + length,
        0
      ),
    }
  })
}

test("records CSS injection and load baselines at 1, 10, 50, and 100 instances", async ({
  browserName,
  page,
}, testInfo) => {
  test.skip(browserName !== "chromium", "performance baseline runs once")
  test.setTimeout(180_000)
  const baseline: Record<string, unknown> = {}

  for (const count of [1, 10, 50, 100]) {
    const startedAt = Date.now()
    await page.goto(`/?instances=${count}`)
    await expect(
      page.getByRole("heading", {
        name: "CSS-per-instance benchmark fixture",
      })
    ).toBeVisible({ timeout: 60_000 })
    await expect(
      page.getByRole("button", {
        name: `Fixture ${count}`,
      })
    ).toBeVisible()
    const state = await benchmarkState(page)
    baseline[String(count)] = {
      ...state,
      readyMs: Date.now() - startedAt,
    }
    expect(state.hostCount).toBeGreaterThanOrEqual(count)
    expect(state.styleSheets).toBe(state.hostCount)
    expect(state.inlineStyleElements).toBe(state.hostCount)
    expect(state.shadowComponentLinks).toBe(0)
    expect(state.documentComponentLinks).toBe(0)
    expect(state.minStyleBytes).toBe(state.maxStyleBytes)
    expect(state.componentAssetRequests).toBe(1)
  }

  console.log(`WAVE1_CSS_BASELINE ${JSON.stringify(baseline)}`)
  await testInfo.attach("wave1-css-instance-baseline.json", {
    body: JSON.stringify(baseline, null, 2),
    contentType: "application/json",
  })
})
