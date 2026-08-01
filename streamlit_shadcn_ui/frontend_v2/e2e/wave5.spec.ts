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
      name: "Streamlit Shadcn UI · Wave 5",
    })
  ).toBeVisible()
  await expect(
    page.getByTestId("ssui-v2-alert-dialog")
  ).toHaveCount(5)
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

async function documentEffectState(page: Page) {
  return page.evaluate(() => {
    const roots = [...document.querySelectorAll<HTMLElement>("*")]
      .map((element) => element.shadowRoot)
      .filter(
        (root): root is ShadowRoot =>
          root?.querySelector("[data-ssui-v2-app-root]") != null
      )
    return {
      activeModalCount: roots.reduce(
        (count, root) =>
          count +
          root.querySelectorAll(
            "[data-ssui-component='alert-dialog'][data-modal-active='true']"
          ).length,
        0
      ),
      backdropCount: roots.reduce(
        (count, root) =>
          count +
          root.querySelectorAll(
            "[data-slot='alert-dialog-overlay'][data-open]"
          ).length,
        0
      ),
      baseUiMarkerCount: roots.reduce(
        (count, root) =>
          count +
          root.querySelectorAll("[data-base-ui-inert]").length,
        0
      ),
      bodyStyle: document.body.getAttribute("style"),
      htmlStyle: document.documentElement.getAttribute("style"),
      inertCount: document.querySelectorAll("[inert]").length,
      openTopLayers: roots.reduce(
        (count, root) =>
          count +
          [
            ...root.querySelectorAll<HTMLElement>(
              "[data-ssui-v2-overlay-root]"
            ),
          ].filter((overlay) => overlay.matches(":popover-open")).length,
        0
      ),
      portalCount: roots.reduce(
        (count, root) =>
          count +
          root.querySelectorAll("[data-base-ui-portal]").length,
        0
      ),
      scrollLocked:
        document.documentElement.hasAttribute(
          "data-base-ui-scroll-locked"
        ) ||
        document.documentElement.style.overflow === "hidden" ||
        document.documentElement.style.overflowY === "hidden" ||
        document.body.style.overflow === "hidden" ||
        document.body.style.overflowY === "hidden",
    }
  })
}

async function ariaChain(locator: Locator) {
  return locator.evaluate((element) => {
    const root = element.getRootNode()
    let current: Element | null =
      root instanceof ShadowRoot ? root.host : element
    const chain: Array<{
      ariaHidden: string | null
      inert: boolean
      tag: string
      testId: string | null
    }> = []
    while (current && current !== document.body) {
      chain.push({
        ariaHidden: current.getAttribute("aria-hidden"),
        inert: current.hasAttribute("inert"),
        tag: current.tagName,
        testId: current.getAttribute("data-testid"),
      })
      current = current.parentElement
    }
    return chain
  })
}

async function modalOverlayContract(content: Locator) {
  return content.evaluate((element) => {
    const root = element.getRootNode()
    if (!(root instanceof ShadowRoot)) {
      return { error: "content is not in a ShadowRoot" }
    }
    const overlay = root.querySelector<HTMLElement>(
      "[data-ssui-v2-overlay-root]"
    )
    const backdrop = root.querySelector<HTMLElement>(
      "[data-slot='alert-dialog-overlay'][data-open]"
    )
    return {
      backdropRootIsExpected: backdrop?.getRootNode() === root,
      error: overlay && backdrop ? null : "overlay or backdrop missing",
      overlayOpen: overlay?.matches(":popover-open") ?? false,
      overlayOwnsContent: overlay?.contains(element) ?? false,
      portalRootIsExpected:
        element.closest("[data-base-ui-portal]")?.getRootNode() === root,
    }
  })
}

async function expectModalContract(content: Locator) {
  await expect
    .poll(() => modalOverlayContract(content))
    .toEqual({
      backdropRootIsExpected: true,
      error: null,
      overlayOpen: true,
      overlayOwnsContent: true,
      portalRootIsExpected: true,
    })
}

async function clickDespiteModal(locator: Locator) {
  await locator.evaluate((element) => {
    if (!(element instanceof HTMLElement)) {
      throw new Error("Expected an HTMLElement control.")
    }
    element.click()
  })
}

function streamlitButton(page: Page, name: string): Locator {
  return page
    .getByText(name, { exact: true })
    .locator("xpath=ancestor::button")
    .first()
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
    const roots = [...document.querySelectorAll("*")]
      .map((element) => element.shadowRoot)
      .filter(
        (root): root is ShadowRoot =>
          root !== null &&
          root.querySelector("[data-ssui-v2-app-root]") !== null
      )
    const violations = []
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

test("Wave 5 renders five Alert Dialog adapters in isolated roots", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  expect(await componentIsolationState(page)).toEqual({
    bodyComponents: 0,
    hostCount: 5,
    invalidRoots: 0,
    linkedStylesheets: 0,
  })
  expect(await documentEffectState(page)).toMatchObject({
    activeModalCount: 0,
    backdropCount: 0,
    openTopLayers: 0,
    portalCount: 0,
    scrollLocked: false,
  })
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("single modal owns the viewport, focus, keyboard, and scroll lifecycle", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)
  await page.evaluate(() => {
    document.body.style.setProperty(
      "--ssui-wave5-existing-style",
      "preserve"
    )
  })
  const launcher = page.getByRole("button", {
    name: "Open primary dialog",
  })
  const background = streamlitButton(page, "Background action")
  const before = await documentEffectState(page)
  const backgroundChainBefore = await ariaChain(background)

  await launcher.click()
  const content = page.getByTestId(
    "ssui-v2-alert-dialog-content"
  )
  await expect(content).toBeVisible()
  await expect(
    page.getByRole("heading", {
      name: "Ship the V2 migration?",
    })
  ).toBeVisible()
  await expectModalContract(content)
  await expect(
    page.getByRole("button", { name: "Keep reviewing" })
  ).toBeFocused()

  await expect
    .poll(async () => (await documentEffectState(page)).scrollLocked)
    .toBe(true)
  expect(await documentEffectState(page)).toMatchObject({
    activeModalCount: 1,
    backdropCount: 1,
    openTopLayers: 1,
    portalCount: 1,
    scrollLocked: true,
  })
  expect(
    (await ariaChain(background)).some(
      (entry) => entry.ariaHidden === "true" || entry.inert
    )
  ).toBe(true)

  const fixedCompetitorIsBlocked = await page.locator(
    "[data-wave5-fixed-competitor]"
  ).evaluate((element) => {
    const rect = element.getBoundingClientRect()
    return (
      document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      ) !== element
    )
  })
  expect(fixedCompetitorIsBlocked).toBe(true)

  await page.keyboard.press("Tab")
  await expect(
    page.getByRole("button", { name: "Ship it" })
  ).toBeFocused()
  await page.keyboard.press("Tab")
  await expect(
    page.getByRole("button", { name: "Keep reviewing" })
  ).toBeFocused()
  await page.keyboard.press("Shift+Tab")
  await expect(
    page.getByRole("button", { name: "Ship it" })
  ).toBeFocused()

  const backgroundAcceptedFocus = await background.evaluate(
    (element) => {
      ;(element as HTMLElement).focus()
      let active: Element | null = document.activeElement
      while (
        active instanceof HTMLElement &&
        active.shadowRoot?.activeElement
      ) {
        active = active.shadowRoot.activeElement
      }
      return active === element
    }
  )
  expect(backgroundAcceptedFocus).toBe(false)
  await background.evaluate((element) => {
    ;(element as HTMLElement).focus()
  })
  await expect
    .poll(() =>
      content.evaluate((element) => {
        let active: Element | null = document.activeElement
        while (
          active instanceof HTMLElement &&
          active.shadowRoot?.activeElement
        ) {
          active = active.shadowRoot.activeElement
        }
        return active !== null && element.contains(active)
      })
    )
    .toBe(true)

  const main = page.getByTestId("stMain")
  await main.evaluate((element) => {
    element.scrollTop = 400
  })
  const scrollBefore = await main.evaluate(
    (element) => element.scrollTop
  )
  await page.mouse.wheel(0, 900)
  await page.waitForTimeout(100)
  expect(
    await main.evaluate((element) => element.scrollTop)
  ).toBe(scrollBefore)

  await page.keyboard.press("Escape")
  await expect(content).toBeHidden()
  await expect(
    page.getByText("Primary decision: False")
  ).toBeVisible()
  await expect(launcher).toBeFocused()
  await expect
    .poll(() => documentEffectState(page))
    .toEqual(before)
  expect(await ariaChain(background)).toEqual(backgroundChainBefore)

  await launcher.click()
  await page.getByRole("button", { name: "Ship it" }).click()
  await expect(
    page.getByText("Primary decision: True")
  ).toBeVisible()
  await expect(launcher).toBeFocused()
  await expect
    .poll(() => documentEffectState(page))
    .toEqual(before)
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("two independent roots form one deterministic modal stack", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)
  const before = await documentEffectState(page)

  await page.getByRole("button", {
    name: "Open stacked dialogs",
  }).click()
  await expect(
    page.getByRole("heading", {
      name: "Second top dialog",
    })
  ).toBeVisible()
  await expect(
    page.getByRole("heading", {
      name: "First queued dialog",
    })
  ).toBeHidden()
  await expect
    .poll(async () => (await documentEffectState(page)).activeModalCount)
    .toBe(1)

  await page.getByRole("button", {
    name: "Cancel second",
  }).click()
  await expect(
    page.getByRole("heading", {
      name: "First queued dialog",
    })
  ).toBeVisible()
  await expect(
    page.getByText(
      "Stack decisions: first=—, second=False"
    )
  ).toBeVisible()
  expect(await documentEffectState(page)).toMatchObject({
    activeModalCount: 1,
    backdropCount: 1,
    openTopLayers: 1,
    portalCount: 1,
    scrollLocked: true,
  })

  await page.getByRole("button", {
    name: "Accept first",
  }).click()
  await expect(
    page.getByText(
      "Stack decisions: first=True, second=False"
    )
  ).toBeVisible()
  await expect
    .poll(() => documentEffectState(page))
    .toEqual(before)
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("rerun, external close, and conditional unmount restore every effect", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)
  const before = await documentEffectState(page)
  const open = page.getByRole("button", {
    name: "Open conditional dialog",
  })

  await open.click()
  await expect(
    page.getByRole("heading", {
      name: "Conditional dialog",
    })
  ).toBeVisible()
  await clickDespiteModal(
    streamlitButton(page, "Rerun while open")
  )
  await expect(
    page.getByText(
      "Conditional fixture: rendered=True, reruns=1, decision=—"
    )
  ).toBeVisible()
  await expect(
    page.getByRole("heading", {
      name: "Conditional dialog",
    })
  ).toBeVisible()
  expect(await documentEffectState(page)).toMatchObject({
    activeModalCount: 1,
    backdropCount: 1,
    openTopLayers: 1,
    portalCount: 1,
    scrollLocked: true,
  })

  await clickDespiteModal(
    streamlitButton(page, "Close conditional externally")
  )
  await expect(
    page.getByRole("heading", {
      name: "Conditional dialog",
    })
  ).toBeHidden()
  await expect
    .poll(() => documentEffectState(page))
    .toEqual(before)

  await open.click()
  await expect(
    page.getByRole("heading", {
      name: "Conditional dialog",
    })
  ).toBeVisible()
  await clickDespiteModal(
    streamlitButton(page, "Remove conditional component")
  )
  await expect(
    page.getByText(
      "Conditional fixture: rendered=False, reruns=1, decision=—"
    )
  ).toBeVisible()
  await expect(
    page.getByTestId("ssui-v2-alert-dialog")
  ).toHaveCount(4)
  await expect
    .poll(() => documentEffectState(page))
    .toEqual({
      ...before,
      activeModalCount: 0,
      backdropCount: 0,
      openTopLayers: 0,
      portalCount: 0,
    })
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("sidebar placement remains a same-root viewport modal", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)
  const sidebar = page.getByTestId("stSidebarUserContent")
  await sidebar.getByRole("button", {
    name: "Open sidebar dialog",
  }).click()
  const content = page.getByTestId(
    "ssui-v2-alert-dialog-content"
  )
  await expect(
    page.getByRole("heading", {
      name: "Sidebar-launched dialog",
    })
  ).toBeVisible()
  await expectModalContract(content)
  await page.keyboard.press("Escape")
  await expect(content).toBeHidden()
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("open Alert Dialog has no serious ShadowRoot accessibility violations", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)
  await page.getByRole("button", {
    name: "Open primary dialog",
  }).click()
  await expect(
    page.getByRole("heading", {
      name: "Ship the V2 migration?",
    })
  ).toBeVisible()

  expect(await seriousAccessibilityViolations(page)).toEqual([])
  await page.keyboard.press("Escape")
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("Alert Dialog visual baseline", async ({
  browserName,
  page,
}) => {
  test.skip(
    browserName !== "chromium",
    "Chromium owns the Wave 5 visual baseline."
  )
  await openAcceptanceApp(page)
  await page.getByRole("button", {
    name: "Open primary dialog",
  }).click()
  const content = page.getByTestId(
    "ssui-v2-alert-dialog-content"
  )
  await expect(content).toBeVisible()
  expect(
    await content.screenshot({
      animations: "disabled",
    })
  ).toMatchSnapshot("wave5-alert-dialog.png")
})
