import {
  expect,
  test,
  type Locator,
  type Page,
} from "@playwright/test"
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
    if (
      message.type() === "warning" &&
      message.text().includes(
        "This site appears to use a scroll-linked positioning effect"
      )
    ) {
      return
    }
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
      name: "Streamlit Shadcn UI · Wave 4",
    })
  ).toBeVisible()
  await expect(
    page.getByTestId("ssui-v2-date-picker")
  ).toHaveCount(3)
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
    }
  })
}

async function documentMutationState(page: Page) {
  return page.evaluate(() => ({
    ariaHidden: document.body.getAttribute("aria-hidden"),
    inert: document.body.inert,
    inertElements: document.querySelectorAll("[inert]").length,
    overflow: document.body.style.overflow,
    paddingRight: document.body.style.paddingRight,
    pointerEvents: document.body.style.pointerEvents,
  }))
}

async function openOverlayContract(
  trigger: Locator,
  popupSlot: string
) {
  return trigger.evaluate((element, slot) => {
    const root = element.getRootNode()
    if (!(root instanceof ShadowRoot)) {
      return { error: "trigger is not in a ShadowRoot" }
    }
    const overlay = root.querySelector<HTMLElement>(
      "[data-ssui-v2-overlay-root]"
    )
    const popup = root.querySelector<HTMLElement>(
      `[data-slot='${slot}'][data-open]`
    )
    if (!overlay || !popup) {
      return { error: "overlay or popup missing" }
    }
    const rect = popup.getBoundingClientRect()
    const hitX = rect.left + Math.min(12, rect.width / 2)
    const hitY = rect.top + Math.min(20, rect.height / 2)
    return {
      documentHitIsHost:
        document.elementFromPoint(hitX, hitY) === root.host,
      error: null,
      overlayOpen: overlay.matches(":popover-open"),
      overlayOwnsPopup: overlay.contains(popup),
      popupRootIsExpected: popup.getRootNode() === root,
    }
  }, popupSlot)
}

async function expectOpenOverlayContract(
  trigger: Locator,
  popupSlot: string
) {
  await expect
    .poll(() => openOverlayContract(trigger, popupSlot))
    .toMatchObject({
      documentHitIsHost: true,
      error: null,
      overlayOpen: true,
      overlayOwnsPopup: true,
      popupRootIsExpected: true,
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
    return violations
  })
}

test("Wave 4 renders the anchored catalog in isolated roots", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  await expect(page.getByTestId("ssui-v2-popover")).toHaveCount(2)
  await expect(page.getByTestId("ssui-v2-hover-card")).toHaveCount(2)
  expect(await componentIsolationState(page)).toEqual({
    bodyComponents: 0,
    hostCount: 7,
    invalidRoots: 0,
    linkedStylesheets: 0,
  })
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("Popover and Hover Card share ADR-001 ownership without document effects", async ({
  browserName,
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)
  const documentBefore = await documentMutationState(page)

  const popover = page.getByRole("button", {
    name: "Open migration details",
  })
  await popover.click()
  await expect(
    page.getByText(
      "This is generated shadcn Popover source backed by Base UI."
    )
  ).toBeVisible()
  await expectOpenOverlayContract(popover, "popover-content")
  expect(await documentMutationState(page)).toEqual(documentBefore)
  expect(
    await page.evaluate(
      () =>
        document.querySelectorAll(
          "[data-slot='popover-content'],[data-slot='hover-card-content']"
        ).length
    )
  ).toBe(0)
  await popover.press("Escape")
  await expect(popover).toBeFocused()

  const hoverCard = page.getByRole("button", {
    name: "Hover for architecture",
  })
  if (browserName === "firefox") {
    await page.keyboard.press("Tab")
  } else {
    await hoverCard.focus()
  }
  await expect(hoverCard).toBeFocused()
  await expect(
    page.getByText(
      "Streamlit V2 → shadcn → Base UI, with one owned overlay root."
    )
  ).toBeVisible()
  await expectOpenOverlayContract(hoverCard, "hover-card-content")
  await page.keyboard.press("Escape")
  await expect(hoverCard).toBeFocused()

  await hoverCard.hover()
  await expect(
    page.getByText(
      "Streamlit V2 → shadcn → Base UI, with one owned overlay root."
    )
  ).toBeVisible()
  await page.getByRole("heading", {
    name: "Informational overlays",
  }).hover()
  await expect(
    page.getByText(
      "Streamlit V2 → shadcn → Base UI, with one owned overlay root."
    )
  ).toBeHidden()

  const sidebarCard = page
    .getByTestId("stSidebarUserContent")
    .getByRole("button", { name: "Sidebar architecture" })
  await sidebarCard.hover()
  await expect(
    page.getByText(
      "The Preview Card portal belongs to this component ShadowRoot."
    )
  ).toBeVisible()
  await expectOpenOverlayContract(sidebarCard, "hover-card-content")
  expect(await documentMutationState(page)).toEqual(documentBefore)
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("single and range Date Pickers commit atomically and persist", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)
  const documentBefore = await documentMutationState(page)

  const single = page.getByRole("button", {
    name: "Release date",
    exact: true,
  })
  await single.click()
  await expectOpenOverlayContract(single, "popover-content")
  await page.getByRole("button", {
    name: "Friday, July 31st, 2026",
  }).click()
  await expect(
    page.getByText("Single date Python value: 2026-07-31")
  ).toBeVisible()
  await expect(single).toContainText("2026-07-31")

  const range = page.getByRole("button", {
    name: "Release window",
  })
  await range.click()
  await page.getByRole("button", {
    name: "Thursday, July 30th, 2026",
  }).click()
  await expect(
    page.getByText("Range Python value: —")
  ).toBeVisible()
  await expectOpenOverlayContract(range, "popover-content")
  await page.getByRole("button", {
    name: "Friday, July 31st, 2026",
  }).click()
  await expect(
    page.getByText("Range Python value: —")
  ).toBeVisible()
  await page.getByRole("button", { name: "Apply" }).click()
  await expect(
    page.getByText(
      "Range Python value: 2026-07-30 – 2026-07-31"
    )
  ).toBeVisible()
  await expect(range).toContainText("2026-07-30 – 2026-07-31")

  expect(await documentMutationState(page)).toEqual(documentBefore)
  await expect(page.locator("iframe")).toHaveCount(0)
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("Date Picker state participates in Streamlit forms", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  const form = page.locator("[data-testid='stForm']")
  const picker = form.getByRole("button", {
    name: "Form release date",
  })
  await picker.click()
  await page.getByRole("button", {
    name: "Friday, July 31st, 2026",
  }).click()
  await expect(
    page.getByText("Last submitted Wave 4 form: —")
  ).toBeVisible()
  await form.getByRole("button", {
    name: "Submit Wave 4 form",
  }).click()
  await expect(
    page.getByText("Last submitted Wave 4 form: 2026-07-31")
  ).toBeVisible()
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("the top-layer host escapes a bounded Streamlit container", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  const trigger = page.getByRole("button", {
    name: "Open beyond bounded container",
  })
  await trigger.scrollIntoViewIfNeeded()
  await trigger.click()
  await expectOpenOverlayContract(trigger, "popover-content")

  await expect
    .poll(() =>
      trigger.evaluate((element) => {
        const root = element.getRootNode() as ShadowRoot
        const popup = root.querySelector<HTMLElement>(
          "[data-slot='popover-content'][data-open]"
        )
        const bounded = root.host.closest<HTMLElement>(
          "[data-testid='stVerticalBlock']"
        )
        if (!popup || !bounded) {
          return false
        }
        return (
          popup.getBoundingClientRect().bottom >
          bounded.getBoundingClientRect().bottom
        )
      })
    )
    .toBe(true)
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("open Wave 4 overlays have no serious accessibility violations", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  await page.getByRole("button", {
    name: "Open migration details",
  }).click()
  await page.getByRole("button", {
    name: "Release date",
    exact: true,
  }).click()
  expect(await seriousAccessibilityViolations(page)).toEqual([])
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("Wave 4 overlays retain their visual contract", async ({
  browserName,
  page,
}) => {
  test.skip(browserName !== "chromium", "visual baselines run once")
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  const popover = page.getByRole("button", {
    name: "Open migration details",
  })
  await popover.click()
  await expect(
    page.getByTestId("ssui-v2-popover-content")
  ).toHaveScreenshot("wave4-popover.png", {
    animations: "disabled",
  })
  await popover.press("Escape")

  const picker = page.getByRole("button", {
    name: "Release date",
    exact: true,
  })
  await picker.click()
  await expect(
    page.getByTestId("ssui-v2-date-picker-content")
  ).toHaveScreenshot("wave4-date-picker.png", {
    animations: "disabled",
  })
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})
