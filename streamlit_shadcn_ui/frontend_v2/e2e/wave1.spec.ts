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
    if (message.type() === "error" || message.type() === "warning") {
      if (
        message.type() === "warning" &&
        message.text().includes(
          "This site appears to use a scroll-linked positioning effect"
        )
      ) {
        return
      }
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
      name: "Streamlit Shadcn UI · Wave 1",
    })
  ).toBeVisible()
  await expect(page.locator("iframe")).toHaveCount(0)
}

async function componentDomState(page: Page) {
  return page.evaluate(() => {
    const hosts = [...document.querySelectorAll<HTMLElement>("*")].filter(
      (element) =>
        element.shadowRoot?.querySelector(
          "[data-ssui-v2-app-root]"
        ) != null
    )
    return {
      documentNodes: document.querySelectorAll("*").length,
      hosts: hosts.length,
      openTopLayers: hosts.filter((host) =>
        host.shadowRoot
          ?.querySelector<HTMLElement>("[data-ssui-v2-overlay-root]")
          ?.matches(":popover-open")
      ).length,
      overlayChildren: hosts.reduce(
        (total, host) =>
          total +
          (
            host.shadowRoot?.querySelector(
              "[data-ssui-v2-overlay-root]"
            )?.childElementCount ?? 0
          ),
        0
      ),
      shadowNodes: hosts.reduce(
        (total, host) =>
          total + (host.shadowRoot?.querySelectorAll("*").length ?? 0),
        0
      ),
      shadowStyleSheets: hosts.reduce(
        (total, host) =>
          total + (host.shadowRoot?.styleSheets.length ?? 0),
        0
      ),
    }
  })
}

async function bodyMutationState(page: Page) {
  return page.evaluate(() => ({
    ariaHidden: document.body.getAttribute("aria-hidden"),
    inert: document.body.inert,
    overflow: document.body.style.overflow,
    paddingRight: document.body.style.paddingRight,
    pointerEvents: document.body.style.pointerEvents,
  }))
}

async function chromiumMemoryState(page: Page) {
  const session = await page.context().newCDPSession(page)
  await session.send("Performance.enable")
  await session.send("HeapProfiler.collectGarbage")
  const result = await session.send("Performance.getMetrics")
  await session.detach()
  const metrics = new Map(
    result.metrics.map((metric) => [metric.name, metric.value])
  )
  return {
    documents: metrics.get("Documents") ?? 0,
    jsEventListeners: metrics.get("JSEventListeners") ?? 0,
    jsHeapUsedBytes: metrics.get("JSHeapUsedSize") ?? 0,
    nodes: metrics.get("Nodes") ?? 0,
  }
}

async function openOverlayContract(trigger: Locator) {
  return trigger.evaluate((element) => {
    const root = element.getRootNode()
    if (!(root instanceof ShadowRoot)) {
      return { error: "trigger is not in a ShadowRoot" }
    }
    const overlay = root.querySelector<HTMLElement>(
      "[data-ssui-v2-overlay-root]"
    )
    const popup = root.querySelector<HTMLElement>(
      "[data-slot='select-content'],[data-slot='dropdown-menu-content']"
    )
    if (!overlay || !popup) {
      return { error: "overlay or popup missing" }
    }
    const rect = popup.getBoundingClientRect()
    const documentHit = document.elementFromPoint(
      rect.left + 8,
      rect.top + Math.min(40, rect.height / 2)
    )
    const shadowHit = root.elementFromPoint(
      rect.left + 8,
      rect.top + Math.min(40, rect.height / 2)
    )
    return {
      documentHitIsHost: documentHit === root.host,
      error: null,
      overlayOpen: overlay.matches(":popover-open"),
      overlayOwnsPopup: overlay.contains(popup),
      popupRootIsExpected: popup.getRootNode() === root,
      shadowHitText: shadowHit?.textContent?.trim() ?? "",
    }
  })
}

async function expectOpenOverlayContract(trigger: Locator) {
  await expect
    .poll(() => openOverlayContract(trigger))
    .toMatchObject({
      documentHitIsHost: true,
      error: null,
      overlayOpen: true,
      overlayOwnsPopup: true,
      popupRootIsExpected: true,
    })
}

test("Select escapes stacking and clipping without escaping its ShadowRoot", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)
  const bodyBefore = await bodyMutationState(page)

  const fruit = page
    .getByTestId("stMainBlockContainer")
    .getByRole("combobox", { name: "Fruit" })
  await fruit.click()
  await expect(page.getByRole("option", { name: "Banana" })).toBeVisible()
  await expectOpenOverlayContract(fruit)
  expect(
    await page.evaluate(
      () =>
        document.querySelectorAll(
          "[data-slot='select-content'],[data-slot='dropdown-menu-content']"
        ).length
    )
  ).toBe(0)
  expect(await bodyMutationState(page)).toEqual(bodyBefore)

  await page.getByRole("option", { name: "Banana" }).click()
  await expect(fruit).toContainText("Banana")
  await expect(page.getByText("Python value: Banana")).toBeVisible()

  const constrained = page.getByRole("combobox", {
    name: "Inside height-constrained container",
  })
  await constrained.click()
  await expect(page.getByRole("option", { name: "Epsilon" })).toBeVisible()
  const readClippingEvidence = () =>
    constrained.evaluate((element) => {
      const root = element.getRootNode() as ShadowRoot
      const popup = root.querySelector<HTMLElement>(
        "[data-slot='select-content'][data-open]"
      )
      const scrollAncestor = root.host.closest<HTMLElement>(
        "[data-testid='stVerticalBlock']"
      )
      if (!popup || !scrollAncestor) {
        return null
      }
      const popupRect = popup.getBoundingClientRect()
      const ancestorRect = scrollAncestor.getBoundingClientRect()
      const documentHit = document.elementFromPoint(
        popupRect.left + 8,
        popupRect.bottom - 8
      )
      return {
        documentHitIsHost: documentHit === root.host,
        popupBottom: popupRect.bottom,
        scrollAncestorBottom: ancestorRect.bottom,
      }
    })
  await expect
    .poll(async () => {
      const evidence = await readClippingEvidence()
      return Boolean(
        evidence &&
          evidence.popupBottom > evidence.scrollAncestorBottom &&
          evidence.documentHitIsHost
      )
    })
    .toBe(true)
  const clippingEvidence = await readClippingEvidence()
  expect(clippingEvidence).not.toBeNull()
  expect(clippingEvidence?.popupBottom).toBeGreaterThan(
    clippingEvidence?.scrollAncestorBottom ?? Number.POSITIVE_INFINITY
  )
  expect(clippingEvidence?.documentHitIsHost).toBe(true)
  const containerScroll = await constrained.evaluate((element) => {
    const root = element.getRootNode() as ShadowRoot
    const host = root.host as HTMLElement
    let ancestor: Element | null = host.parentElement
    while (ancestor) {
      const styles = getComputedStyle(ancestor)
      if (
        /(auto|scroll)/.test(styles.overflowY) &&
        ancestor.scrollHeight > ancestor.clientHeight + 10
      ) {
        const before = ancestor.scrollTop
        const maximum = ancestor.scrollHeight - ancestor.clientHeight
        const target =
          before + 40 <= maximum
            ? before + 40
            : Math.max(0, before - 40)
        ancestor.scrollTo({ behavior: "instant", top: target })
        return {
          before,
          target,
        }
      }
      ancestor = ancestor.parentElement
    }
    return null
  })
  expect(containerScroll).not.toBeNull()
  expect(
    Math.abs(
      (containerScroll?.target ?? 0) -
        (containerScroll?.before ?? 0)
    )
  ).toBeGreaterThan(10)
  await expectOpenOverlayContract(constrained)
  await page.getByRole("option", { name: "Epsilon" }).click()
  await expect(constrained).toContainText("Epsilon")

  const sidebar = page
    .getByTestId("stSidebarUserContent")
    .getByRole("combobox", { name: "Sidebar fruit" })
  await sidebar.click()
  await expectOpenOverlayContract(sidebar)
  await page.getByRole("option", { name: "Orange" }).click()
  await expect(sidebar).toContainText("Orange")

  await fruit.click()
  await page.getByText(
    "The popup must remain visible over a bounded scroll container."
  ).click()
  await expect(fruit).toHaveAttribute("aria-expanded", "false")

  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("ADR-001 placements, scrolling, and theme tokens remain instance-local", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  for (const [name, option] of [
    ["Long, scrollable list", "UTC +14:00"],
    [
      "Long labels",
      "A deliberately long option label that must remain bounded",
    ],
    ["Inside expander", "Second"],
  ] as const) {
    const trigger = page.getByRole("combobox", { name })
    await trigger.click()
    await page.getByRole("option", { name: option }).click()
    await expect(trigger).toContainText(option)
  }

  await page.getByText("Initially collapsed placement").click()
  const collapsed = page.getByRole("combobox", {
    name: "Inside initially collapsed expander",
  })
  await collapsed.click()
  await expect(page.getByRole("option", { name: "West" })).toBeVisible()
  await page.getByText("Initially collapsed placement").click()
  await expect
    .poll(async () => (await componentDomState(page)).openTopLayers)
    .toBe(0)
  await page.getByText("Initially collapsed placement").click()

  const themeCases = [
    {
      background: "oklch(100% 0 0)",
      name: "Light theme Select",
      primary: "oklch(20.5% 0 0)",
      radius: ".625rem",
      streamlitBackground: "#ffffff",
      streamlitPrimary: "#2563eb",
      streamlitRadius: "0.5rem",
      theme: "light",
    },
    {
      background: "oklch(14.5% 0 0)",
      name: "Dark theme Select",
      primary: "oklch(92.2% 0 0)",
      radius: ".625rem",
      streamlitBackground: "#10141c",
      streamlitPrimary: "#7dd3fc",
      streamlitRadius: "0.75rem",
      theme: "dark",
    },
    {
      background: "oklch(100% 0 0)",
      name: "Custom theme Select",
      primary: "oklch(20.5% 0 0)",
      radius: ".625rem",
      streamlitBackground: "#fffaf0",
      streamlitPrimary: "#7c3aed",
      streamlitRadius: "1rem",
      theme: "light",
    },
  ] as const

  for (const expected of themeCases) {
    const trigger = page.getByRole("combobox", {
      name: expected.name,
    })
    const tokens = await trigger.evaluate((element) => {
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
    expect(tokens).toEqual({
      background: expected.background,
      primary: expected.primary,
      radius: expected.radius,
      streamlitBackground: expected.streamlitBackground,
      streamlitPrimary: expected.streamlitPrimary,
      streamlitRadius: expected.streamlitRadius,
      theme: expected.theme,
    })

    await trigger.click()
    await expectOpenOverlayContract(trigger)
    await page.keyboard.press("Escape")
  }

  const fruit = page
    .getByTestId("stMainBlockContainer")
    .getByRole("combobox", { name: "Fruit" })
  await fruit.scrollIntoViewIfNeeded()
  await fruit.click()
  const readAnchoredGeometry = () =>
    fruit.evaluate((element) => {
      const root = element.getRootNode() as ShadowRoot
      const popup = root.querySelector<HTMLElement>(
        "[data-slot='select-content'][data-open]"
      )
      if (!popup) {
        return null
      }
      const popupRect = popup.getBoundingClientRect()
      const triggerRect = element.getBoundingClientRect()
      const side = popup.dataset.side
      let gap = Number.POSITIVE_INFINITY
      if (side === "bottom") {
        gap = Math.abs(popupRect.top - triggerRect.bottom)
      } else if (side === "top") {
        gap = Math.abs(triggerRect.top - popupRect.bottom)
      } else if (side === "left") {
        gap = Math.abs(triggerRect.left - popupRect.right)
      } else if (side === "right") {
        gap = Math.abs(popupRect.left - triggerRect.right)
      }
      return {
        gap,
        side,
        triggerTop: triggerRect.top,
      }
    })
  await expect
    .poll(async () => (await readAnchoredGeometry())?.gap)
    .toBeLessThan(10)
  const beforeScroll = await readAnchoredGeometry()
  const scrollRequest = await fruit.evaluate((element) => {
    const root = element.getRootNode() as ShadowRoot
    const host = root.host as HTMLElement
    const candidates: Element[] = []
    let ancestor: Element | null = host.parentElement
    while (ancestor) {
      candidates.push(ancestor)
      ancestor = ancestor.parentElement
    }
    if (document.scrollingElement) {
      candidates.push(document.scrollingElement)
    }
    const scroller = candidates.find((candidate) => {
      const styles = getComputedStyle(candidate)
      return (
        /(auto|scroll)/.test(styles.overflowY) &&
        candidate.scrollHeight > candidate.clientHeight + 20
      )
    })
    if (!scroller) {
      return null
    }
    const before = scroller.scrollTop
    const maximum = scroller.scrollHeight - scroller.clientHeight
    const target =
      before + 120 <= maximum
        ? before + 120
        : Math.max(0, before - 120)
    scroller.scrollTo({ behavior: "instant", top: target })
    return {
      before,
      target,
    }
  })
  expect(scrollRequest).not.toBeNull()
  expect(
    Math.abs(
      (scrollRequest?.target ?? 0) -
        (scrollRequest?.before ?? 0)
    )
  ).toBeGreaterThan(20)
  await expect(page.getByRole("option", { name: "Banana" })).toBeVisible()
  await expect
    .poll(async () => (await readAnchoredGeometry())?.gap)
    .toBeLessThan(10)
  await expect
    .poll(async () => {
      const geometry = await readAnchoredGeometry()
      return Math.abs(
        (geometry?.triggerTop ?? 0) -
          (beforeScroll?.triggerTop ?? 0)
      )
    })
    .toBeGreaterThan(20)
  const afterScroll = await readAnchoredGeometry()
  expect(beforeScroll).not.toBeNull()
  expect(afterScroll).not.toBeNull()
  await page.keyboard.press("Escape")

  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("light, dark, and custom Select visuals remain stable", async ({
  browserName,
  page,
}) => {
  test.skip(browserName !== "chromium", "visual baselines run once")
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  for (const theme of [
    { name: "Fruit", slug: "light" },
    { name: "Dark theme Select", slug: "dark" },
    { name: "Custom theme Select", slug: "custom" },
  ] as const) {
    const trigger = page
      .getByTestId("stMainBlockContainer")
      .getByRole("combobox", { name: theme.name })
    await trigger.scrollIntoViewIfNeeded()
    await expect(trigger).toHaveScreenshot(
      `select-trigger-${theme.slug}.png`,
      { animations: "disabled" }
    )
    await trigger.click()
    const popup = page.locator(
      '[data-testid="ssui-v2-select-content"][data-open]'
    )
    await expect(popup).toBeVisible()
    await expect(popup).toHaveScreenshot(
      `select-popup-${theme.slug}.png`,
      { animations: "disabled" }
    )
    await page.keyboard.press("Escape")
  }

  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("Wave 1 state, triggers, reruns, and forms preserve their contracts", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  const fruit = page
    .getByTestId("stMainBlockContainer")
    .getByRole("combobox", { name: "Fruit" })
  await fruit.click()
  await page.getByRole("option", { name: "Banana" }).click()

  await page.getByRole("tab", { name: "States and triggers" }).click()
  const menu = page.getByRole("button", { name: "Open actions" })
  await menu.click()
  await expectOpenOverlayContract(menu)
  await page.getByRole("menuitem", { name: "Duplicate" }).click()
  await expect(
    page.getByText("Latest menu event: Duplicate")
  ).toBeVisible()

  const checkbox = page
    .getByRole("checkbox", {
      name: "Keep this checked across reruns",
    })
    .first()
  await expect(checkbox).toBeChecked()
  await checkbox.click()
  await expect(checkbox).not.toBeChecked()
  await expect(page.getByText("Checkbox:").locator("code")).toHaveText(
    "False"
  )

  await page.getByRole("button", { name: "V2 button" }).click()
  await expect(page.getByText("Button clicks:").locator("code")).toHaveText(
    "1"
  )
  await page.getByRole("button", {
    name: "Unrelated Streamlit rerun",
  }).click()
  await expect(fruit).toContainText("Banana")
  await expect(checkbox).not.toBeChecked()
  await expect(page.getByText("Button clicks:").locator("code")).toHaveText(
    "1"
  )

  await page.getByRole("tab", { name: "Form behavior" }).click()
  const formSelect = page.getByRole("combobox", {
    name: "Stateful Select in st.form",
  })
  await formSelect.click()
  await page.getByRole("option", { name: "Ready" }).click()
  const formCheckbox = page
    .getByRole("checkbox", {
      name: "Stateful Checkbox in st.form",
    })
    .first()
  await formCheckbox.click()
  await expect(page.getByText("Last submitted state: —")).toBeVisible()
  await page.getByRole("button", { name: "Submit form" }).click()
  await expect(page.getByText('"Ready"')).toBeVisible()
  await expect(page.getByText("true", { exact: true })).toBeVisible()

  await page.getByRole("tab", { name: "Overlay placements" }).click()
  const dynamic = page.getByRole("combobox", {
    name: "Dynamic option invalidation",
  })
  await dynamic.click()
  await page.getByRole("option", { name: "Banana" }).click()
  await expect(dynamic).toContainText("Banana")
  await page.getByText(
    "Remove Banana from the dynamic options",
    { exact: true }
  ).click()
  await expect(dynamic).toContainText("Apple")
  await expect(page.getByText("Dynamic value: Apple")).toBeVisible()

  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("Select keyboard, focus restoration, and ShadowRoot accessibility pass", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  const fruit = page
    .getByTestId("stMainBlockContainer")
    .getByRole("combobox", { name: "Fruit" })
  await fruit.click()
  await expect(page.getByRole("option", { name: "Apple" })).toBeFocused()
  await expect(page.getByRole("option", { name: "Banana" })).toBeVisible()
  await page.keyboard.press("ArrowDown")
  await expect(page.getByRole("option", { name: "Banana" })).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(fruit).toContainText("Banana")

  await fruit.click()
  await expect(page.getByRole("option", { name: "Banana" })).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(fruit).toHaveAttribute("aria-expanded", "false")
  await expect(fruit).toBeFocused()

  await fruit.click()
  await page.addScriptTag({ content: axe.source })
  const accessibilityViolations = await page.evaluate(async () => {
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
              nodes: Array<{
                html: string
                target: unknown[]
              }>
            }>
          }>
        }
      }
    ).axe
    const violations: Array<{
      help: string
      id: string
      impact: string | null
      nodeCount: number
      nodes: Array<{
        html: string
        target: unknown[]
      }>
    }> = []
    const roots = [...document.querySelectorAll("*")]
      .map((element) => element.shadowRoot)
      .filter(
        (root): root is ShadowRoot =>
          root !== null &&
          root.querySelector("[data-ssui-v2-app-root]") !== null
      )
    for (const root of roots) {
      const result = await axeRuntime.run(root, {
        resultTypes: ["violations"],
        rules: {
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
            nodeCount: violation.nodes.length,
            nodes: violation.nodes.map((node) => ({
              html: node.html,
              target: node.target,
            })),
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
          nodeCount: violation.nodes.length,
          nodes: violation.nodes.map((node) => ({
            html: node.html,
            target: node.target,
          })),
        })
      }
    }
    return violations
  })
  expect(accessibilityViolations).toEqual([])
  await page.keyboard.press("Escape")

  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("mobile, RTL, 200% text scaling, and touch-style input keep Select usable", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await page.setViewportSize({ width: 390, height: 844 })
  await openAcceptanceApp(page)
  await page.evaluate(() => {
    document.documentElement.dir = "rtl"
    document.documentElement.style.fontSize = "32px"
  })

  await page.getByRole("tab", { name: "States and triggers" }).click()
  await page.getByRole("button", {
    name: "Unrelated Streamlit rerun",
  }).click()

  const fruit = page
    .getByTestId("stMainBlockContainer")
    .getByRole("combobox", { name: "Fruit" })
  await fruit.scrollIntoViewIfNeeded()
  await fruit.dispatchEvent("pointerdown", {
    button: 0,
    isPrimary: true,
    pointerId: 1,
    pointerType: "touch",
  })
  await fruit.dispatchEvent("pointerup", {
    button: 0,
    isPrimary: true,
    pointerId: 1,
    pointerType: "touch",
  })
  await fruit.click()
  await expect(page.getByRole("option", { name: "Grape" })).toBeVisible()

  const geometry = await fruit.evaluate((element) => {
    const root = element.getRootNode() as ShadowRoot
    const host = root.host as HTMLElement
    const popup = root.querySelector<HTMLElement>(
      "[data-slot='select-content']"
    )
    const rect = popup?.getBoundingClientRect()
    return {
      dir: host.dir,
      left: rect?.left ?? -1,
      right: rect?.right ?? Number.POSITIVE_INFINITY,
      rootOwned: popup?.getRootNode() === root,
      viewportWidth: window.innerWidth,
    }
  })
  expect(geometry.dir).toBe("rtl")
  expect(geometry.rootOwned).toBe(true)
  expect(geometry.left).toBeGreaterThanOrEqual(0)
  expect(geometry.right).toBeLessThanOrEqual(geometry.viewportWidth + 1)
  await page.getByRole("option", { name: "Grape" }).click()
  await expect(fruit).toContainText("Grape")

  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})

test("200% browser-zoom-equivalent metrics keep Select inside the viewport", async ({
  browser,
}) => {
  const context = await browser.newContext({
    deviceScaleFactor: 2,
    viewport: { width: 640, height: 450 },
  })
  const page = await context.newPage()
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)

  expect(
    await page.evaluate(() => ({
      devicePixelRatio: window.devicePixelRatio,
      innerWidth: window.innerWidth,
    }))
  ).toEqual({
    devicePixelRatio: 2,
    innerWidth: 640,
  })

  const fruit = page
    .getByTestId("stMainBlockContainer")
    .getByRole("combobox", { name: "Fruit" })
  await fruit.scrollIntoViewIfNeeded()
  await fruit.click()
  await expect(page.getByRole("option", { name: "Orange" })).toBeVisible()
  const geometry = await fruit.evaluate((element) => {
    const root = element.getRootNode() as ShadowRoot
    const popup = root.querySelector<HTMLElement>(
      "[data-slot='select-content']"
    )
    const rect = popup?.getBoundingClientRect()
    return {
      bottom: rect?.bottom ?? Number.POSITIVE_INFINITY,
      left: rect?.left ?? -1,
      right: rect?.right ?? Number.POSITIVE_INFINITY,
      rootOwned: popup?.getRootNode() === root,
      top: rect?.top ?? -1,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    }
  })
  expect(geometry.rootOwned).toBe(true)
  expect(geometry.left).toBeGreaterThanOrEqual(0)
  expect(geometry.right).toBeLessThanOrEqual(
    geometry.viewportWidth + 1
  )
  expect(geometry.top).toBeGreaterThanOrEqual(0)
  expect(geometry.bottom).toBeLessThanOrEqual(
    geometry.viewportHeight + 1
  )
  await page.getByRole("option", { name: "Orange" }).click()
  await expect(fruit).toContainText("Orange")

  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
  await context.close()
})

test("cleanup, bounded errors, multipage navigation, and 100 rerenders are stable", async ({
  browserName,
  page,
}, testInfo) => {
  test.skip(browserName !== "chromium", "100-rerun lifecycle baseline runs once")
  test.setTimeout(180_000)
  const diagnostics = collectDiagnostics(page)
  await openAcceptanceApp(page)
  await page.getByRole("tab", {
    name: "Lifecycle and errors",
  }).click()

  const protocolError = page.getByRole("alert")
  await expect(protocolError).toContainText(
    "SSUI_V2_PROTOCOL_VERSION; kind=select; protocol=999"
  )
  await expect(protocolError).not.toContainText("option")

  const conditional = page.getByRole("combobox", {
    name: "Conditional lifecycle Select",
  })
  await conditional.click()
  await expect(page.getByRole("option", { name: "Stable" })).toBeVisible()
  await page.getByText(
    "Render the conditional V2 Select",
    { exact: true }
  ).click()
  await expect(conditional).toHaveCount(0)
  expect((await componentDomState(page)).openTopLayers).toBe(0)

  const before = await componentDomState(page)
  const memoryBefore = await chromiumMemoryState(page)
  const startedAt = Date.now()
  await page.getByRole("button", {
    name: "Run 100 server rerenders",
  }).click()
  await expect(
    page.getByText("Lifecycle rerenders completed:").locator("code")
  ).toHaveText("100", { timeout: 150_000 })
  const elapsedMs = Date.now() - startedAt
  const after = await componentDomState(page)
  const memoryAfter = await chromiumMemoryState(page)

  expect(after.hosts).toBe(before.hosts)
  expect(after.openTopLayers).toBe(0)
  expect(after.shadowStyleSheets).toBe(before.shadowStyleSheets)
  expect(after.shadowNodes).toBeLessThanOrEqual(before.shadowNodes + 20)
  expect(memoryAfter.jsHeapUsedBytes).toBeLessThanOrEqual(
    memoryBefore.jsHeapUsedBytes + 16 * 1024 * 1024
  )
  console.log(
    `WAVE1_100_RERENDER_BASELINE ${JSON.stringify({
      after,
      before,
      elapsedMs,
      memoryAfter,
      memoryBefore,
      perRerenderMs: elapsedMs / 100,
    })}`
  )
  await testInfo.attach("wave1-100-rerender-baseline.json", {
    body: JSON.stringify(
      {
        after,
        before,
        elapsedMs,
        memoryAfter,
        memoryBefore,
        perRerenderMs: elapsedMs / 100,
      },
      null,
      2
    ),
    contentType: "application/json",
  })

  await page.getByRole("button", {
    name: /View \d+ more/,
  }).click()
  const lifecycleLink = page.getByRole("link", {
    name: /V2 Lifecycle/i,
  })
  await lifecycleLink.click()
  await expect(
    page.getByRole("heading", {
      name: "Multipage lifecycle fixture",
    })
  ).toBeVisible()
  const multipage = page.getByRole("combobox", {
    name: "Multipage Select",
  })
  await multipage.click()
  await page.getByRole("option", { name: "Page B" }).click()
  await expect(multipage).toContainText("Page B")
  await page.getByRole("button", {
    name: "Return to Wave 1 POC",
  }).click()
  await expect(
    page.getByRole("heading", {
      name: "Streamlit Shadcn UI · Wave 1",
    })
  ).toBeVisible()

  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})
