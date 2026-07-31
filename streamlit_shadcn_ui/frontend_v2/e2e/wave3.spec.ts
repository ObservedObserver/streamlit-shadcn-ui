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
      name: "Streamlit Shadcn UI · Wave 3",
    })
  ).toBeVisible()
  await expect(page.getByTestId("ssui-v2-calendar")).toBeAttached()
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
      linkedStylesheets: hosts.reduce(
        (total, host) =>
          total +
          (host.shadowRoot?.querySelectorAll("link[rel='stylesheet']")
            .length ?? 0),
        0
      ),
      documentBaseUiStyles: document.querySelectorAll(
        "style[href^='base-ui']"
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

test("Wave 3 renders the complete inline catalog in isolated roots", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  const expectedCounts = {
    accordion: 1,
    calendar: 1,
    collapsible: 1,
    input: 2,
    "input-otp": 1,
    pagination: 1,
    "radio-group": 2,
    "scroll-area": 1,
    slider: 2,
    switch: 2,
    tabs: 1,
    textarea: 1,
    toggle: 2,
    "toggle-group": 1,
  }
  for (const [name, count] of Object.entries(expectedCounts)) {
    await expect(
      page.getByTestId(`ssui-v2-${name}`)
    ).toHaveCount(count)
  }
  expect(await componentIsolationState(page)).toEqual({
    bodyComponents: 0,
    documentBaseUiStyles: 0,
    hostCount: 19,
    invalidRoots: 0,
    linkedStylesheets: 0,
  })
  expect(await seriousAccessibilityViolations(page)).toEqual([])
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("draft inputs commit deliberately and persist across reruns", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  const input = page.getByRole("textbox", {
    name: "Name",
    exact: true,
  })
  await input.fill("Grace")
  await expect(
    page.getByText("Input Python value: Ada")
  ).toBeVisible()
  await input.press("Enter")
  await expect(
    page.getByText("Input Python value: Grace")
  ).toBeVisible()

  const textarea = page.getByRole("textbox", {
    name: "Notes",
    exact: true,
  })
  await textarea.fill("Committed notes")
  await expect(
    page.getByText("Textarea Python value: Initial notes")
  ).toBeVisible()
  await textarea.press("Control+Enter")
  await expect(
    page.getByText("Textarea Python value: Committed notes")
  ).toBeVisible()

  const otp = page.getByRole("textbox", {
    name: "Verification code",
  })
  await otp.fill("123456")
  await expect(
    page.getByText("OTP Python value: 123456")
  ).toBeVisible()

  await page.getByRole("switch", {
    name: "Feature enabled",
  }).click()
  await expect(input).toHaveValue("Grace")
  await expect(textarea).toHaveValue("Committed notes")
  await expect(otp).toHaveValue("123456")
  await expect(page.locator("iframe")).toHaveCount(0)
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("controlled disclosures, choices, navigation, and date state rerun safely", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  await page.getByRole("button", {
    name: "Is it iframe-free?",
  }).click()
  await expect(
    page.getByText("Accordion open: accessible,iframe-free")
  ).toBeVisible()

  await page.getByRole("button", {
    name: "Repository details",
  }).click()
  await expect(
    page.getByText("Collapsible open: True")
  ).toBeVisible()

  await page.getByRole("button", {
    name: "Go to next page",
  }).click()
  await expect(
    page.getByText("Pagination page: 51")
  ).toBeVisible()

  await page.getByRole("radio", { name: "Beta" }).click()
  await expect(page.getByText("Radio value: beta")).toBeVisible()

  const range = page
    .getByTestId("ssui-v2-slider")
    .first()
    .getByRole("slider")
    .first()
  await range.focus()
  await range.press("ArrowRight")
  await expect(page.getByText("Slider value: 25,80")).toBeVisible()

  await page.getByRole("tab", { name: "Analytics" }).click()
  await expect(page.getByText("Tabs value: Analytics")).toBeVisible()

  await page.getByTestId("ssui-v2-toggle").filter({
    hasText: "Bold",
  }).click()
  await expect(page.getByText("Toggle value: True")).toBeVisible()

  await page
    .getByTestId("ssui-v2-toggle-group")
    .getByRole("button", { name: "italic" })
    .click()
  await expect(
    page.getByText("Toggle group: bold,italic")
  ).toBeVisible()

  const calendar = page.getByTestId("ssui-v2-calendar")
  await calendar.scrollIntoViewIfNeeded()
  await calendar.getByRole("button", {
    name: "Friday, July 31st, 2026",
  }).click()
  await expect(
    page.getByText("Calendar value: 2026-07-31")
  ).toBeVisible()

  const viewport = page
    .getByTestId("ssui-v2-scroll-area")
    .locator("[data-slot='scroll-area-viewport']")
  await expect
    .poll(() =>
      viewport.evaluate((element) => {
        element.scrollTop = element.scrollHeight
        return element.scrollTop
      })
    )
    .toBeGreaterThan(0)

  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("Wave 3 state controls participate in Streamlit forms", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  const form = page.locator("[data-testid='stForm']")
  await form.getByRole("textbox", {
    name: "Form name",
  }).fill("Release")
  await form.getByRole("textbox", {
    name: "Form name",
  }).press("Enter")
  await form.getByRole("radio", { name: "Ready" }).click()
  const progress = form.getByRole("slider")
  await progress.focus()
  await progress.press("ArrowRight")

  await expect(
    page.getByText("Last submitted Wave 3 form: —")
  ).toBeVisible()
  await form.getByRole("button", {
    name: "Submit Wave 3 form",
  }).click()
  await expect(
    page.getByText(
      "Last submitted Wave 3 form: Release|Ready|30"
    )
  ).toBeVisible()
  await expect(page.locator("iframe")).toHaveCount(0)
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("Wave 3 core controls retain their visual contract", async ({
  browserName,
  page,
}) => {
  test.skip(browserName !== "chromium", "visual baselines run once")
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  await expect(
    page.getByTestId("ssui-v2-radio-group").first()
  ).toHaveScreenshot("wave3-radio-group.png", {
    animations: "disabled",
  })
  await expect(
    page.getByTestId("ssui-v2-calendar")
  ).toHaveScreenshot("wave3-calendar.png", {
    animations: "disabled",
  })
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})
