import { expect, test, type Page } from "@playwright/test"
import axe from "axe-core"

type BrowserDiagnostics = {
  consoleMessages: string[]
  pageErrors: string[]
}

function collectDiagnostics(page: Page): BrowserDiagnostics {
  const diagnostics: BrowserDiagnostics = {
    consoleMessages: [],
    pageErrors: [],
  }
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      diagnostics.consoleMessages.push(
        `${message.type()}: ${message.text()}`
      )
    }
  })
  page.on("pageerror", (error) => {
    diagnostics.pageErrors.push(error.message)
  })
  return diagnostics
}

async function openAcceptanceApp(page: Page) {
  await page.goto("/")
  await expect(
    page.getByRole("heading", {
      name: "Streamlit Shadcn UI · Wave 2",
    })
  ).toBeVisible()
  await expect(page.locator("iframe")).toHaveCount(0)
}

async function componentIsolationState(page: Page) {
  return page.evaluate(() => {
    const hosts = [...document.querySelectorAll<HTMLElement>("*")].filter(
      (element) =>
        element.shadowRoot?.querySelector(
          "[data-ssui-v2-app-root]"
        ) != null
    )
    return {
      bodyComponents: document.body.querySelectorAll(
        "[data-ssui-component]"
      ).length,
      hostCount: hosts.length,
      invalidRoots: hosts.filter((host) => {
        const root = host.shadowRoot
        return (
          root === null ||
          root.querySelectorAll("[data-ssui-v2-app-root]").length !==
            1 ||
          root.querySelectorAll("[data-ssui-v2-overlay-root]").length !==
            1 ||
          root.querySelectorAll("style").length !== 1
        )
      }).length,
      openTopLayers: hosts.filter((host) =>
        host.shadowRoot
          ?.querySelector<HTMLElement>("[data-ssui-v2-overlay-root]")
          ?.matches(":popover-open")
      ).length,
    }
  })
}

async function seriousAccessibilityViolations(page: Page) {
  await page.addScriptTag({ content: axe.source })
  return page.evaluate(async () => {
    const axeRuntime = (
      globalThis as typeof globalThis & {
        axe: {
          run: (
            context: Node,
            options: unknown
          ) => Promise<{
            violations: Array<{
              help: string
              id: string
              impact: string | null
              nodes: Array<{ html: string; target: unknown[] }>
            }>
          }>
        }
      }
    ).axe
    const violations: Array<{
      help: string
      id: string
      impact: string | null
      nodes: Array<{ html: string; target: unknown[] }>
      scope: string
    }> = []
    const roots = [...document.querySelectorAll("*")]
      .map((element) => element.shadowRoot)
      .filter(
        (root): root is ShadowRoot =>
          root !== null &&
          root.querySelector("[data-ssui-v2-app-root]") !== null
      )

    for (const [index, root] of roots.entries()) {
      const result = await axeRuntime.run(root, {
        resultTypes: ["violations"],
        rules: {
          // The exact upstream shadcn neutral palette is locked by the
          // Shadow CSS contract test. Its muted-on-muted and destructive
          // Badge combinations are below axe's AA threshold, so this suite
          // keeps semantic/behavioral accessibility failures separate from
          // that explicitly accepted upstream visual baseline.
          "color-contrast": { enabled: false },
        },
      })
      for (const violation of result.violations) {
        if (
          violation.impact === "critical" ||
          violation.impact === "serious"
        ) {
          violations.push({
            help: violation.help,
            id: violation.id,
            impact: violation.impact,
            nodes: violation.nodes,
            scope: `shadow-${index}`,
          })
        }
      }
    }

    const documentResult = await axeRuntime.run(
      document.querySelector(
        "[data-testid='stMainBlockContainer']"
      ) ?? document,
      {
        resultTypes: ["violations"],
        rules: {
          "color-contrast": { enabled: false },
        },
      }
    )
    for (const violation of documentResult.violations) {
      if (
        violation.impact === "critical" ||
        violation.impact === "serious"
      ) {
        violations.push({
          help: violation.help,
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes,
          scope: "document",
        })
      }
    }
    return violations
  })
}

test("Wave 2 renders the complete display catalog in isolated roots", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  await expect(page.getByTestId("ssui-v2-alert")).toHaveCount(3)
  await expect(page.getByTestId("ssui-v2-avatar")).toHaveCount(3)
  await expect(page.getByTestId("ssui-v2-badge")).toHaveCount(1)
  await expect(page.getByTestId("ssui-v2-breadcrumb")).toHaveCount(1)
  await expect(page.getByTestId("ssui-v2-card")).toHaveCount(1)
  await expect(page.getByTestId("ssui-v2-metric-card")).toHaveCount(2)
  const darkMetric = page
    .getByTestId("ssui-v2-metric-card")
    .filter({ hasText: "Iframe count" })
  await expect(darkMetric.locator("[data-slot='card-action']")).toHaveText(
    "Native"
  )
  await expect(darkMetric.locator("[data-slot='badge']")).toHaveAttribute(
    "data-variant",
    "outline"
  )
  await expect(darkMetric.locator("[data-slot='card-footer']")).toHaveText(
    "Explicit dark Streamlit tokens"
  )
  await expect(page.getByTestId("ssui-v2-aspect-ratio")).toHaveCount(1)
  await expect(page.getByTestId("ssui-v2-progress")).toHaveCount(2)
  await expect(page.getByTestId("ssui-v2-separator")).toHaveCount(2)
  await expect(page.getByTestId("ssui-v2-skeleton")).toHaveCount(2)
  await expect(page.getByTestId("ssui-v2-table")).toHaveCount(1)
  await expect(page.getByTestId("ssui-v2-link-button")).toHaveCount(1)

  await expect(
    page.getByRole("progressbar", { name: "Completion" })
  ).toContainText("42%")
  await expect(
    page.getByRole("table", {
      name: "Wave 2 implementation provenance",
    })
  ).toBeVisible()
  await expect(
    page.getByRole("img", {
      name: "Wave 2 aspect ratio fixture",
    })
  ).toBeVisible()

  expect(await componentIsolationState(page)).toEqual({
    bodyComponents: 0,
    hostCount: 20,
    invalidRoots: 0,
    openTopLayers: 0,
  })
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("Breadcrumb triggers and Streamlit reruns preserve display state", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  await expect(page.getByText("Breadcrumb event: none")).toBeVisible()
  await page.getByRole("link", { name: "Home" }).click()
  await expect(
    page.getByText("Breadcrumb event: 0|Home|/")
  ).toBeVisible()

  const slider = page.getByRole("slider", {
    name: /Progress fixture/,
  })
  await slider.focus()
  await slider.press("ArrowRight")
  await expect(
    page.getByRole("progressbar", { name: "Completion" })
  ).toContainText("43%")
  await expect(
    page.getByText("Breadcrumb event: 0|Home|/")
  ).toBeVisible()
  await expect(page.locator("iframe")).toHaveCount(0)

  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("theme tokens, link semantics, and accessibility stay intact", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  const darkMetric = page
    .getByTestId("ssui-v2-metric-card")
    .filter({ hasText: "Iframe count" })
  const theme = await darkMetric.evaluate((element) => {
    const root = element.getRootNode() as ShadowRoot
    const host = root.host as HTMLElement
    const styles = getComputedStyle(host)
    return {
      background: styles.getPropertyValue("--background").trim(),
      primary: styles.getPropertyValue("--primary").trim(),
      radius: styles.getPropertyValue("--radius").trim(),
      streamlitBackground: styles
        .getPropertyValue("--st-background-color")
        .trim(),
      streamlitPrimary: styles
        .getPropertyValue("--st-primary-color")
        .trim(),
      streamlitRadius: styles
        .getPropertyValue("--st-base-radius")
        .trim(),
      theme: host.dataset.theme,
    }
  })
  expect(theme).toEqual({
    background: "oklch(14.5% 0 0)",
    primary: "oklch(92.2% 0 0)",
    radius: ".625rem",
    streamlitBackground: "#10141c",
    streamlitPrimary: "#7dd3fc",
    streamlitRadius: "0.75rem",
    theme: "dark",
  })

  const link = page.getByRole("link", { name: "Open project" })
  await expect(link).toHaveAttribute(
    "href",
    "https://github.com/ObservedObserver/streamlit-shadcn-ui"
  )
  await expect(link).toHaveAttribute("target", "_blank")
  await expect(link).toHaveAttribute(
    "rel",
    "noopener noreferrer"
  )
  expect(
    await link.evaluate((element) => ({
      role: element.getAttribute("role"),
      tagName: element.tagName,
    }))
  ).toEqual({ role: null, tagName: "A" })

  expect(await seriousAccessibilityViolations(page)).toEqual([])
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("Wave 2 light and explicit dark visuals remain stable", async ({
  browserName,
  page,
}) => {
  test.skip(browserName !== "chromium", "visual baselines run once")
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  await expect(
    page.getByTestId("ssui-v2-table")
  ).toHaveScreenshot("wave2-table-light.png", {
    animations: "disabled",
  })
  await expect(
    page
      .getByTestId("ssui-v2-metric-card")
      .filter({ hasText: "Iframe count" })
  ).toHaveScreenshot("wave2-metric-dark.png", {
    animations: "disabled",
  })

  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})
