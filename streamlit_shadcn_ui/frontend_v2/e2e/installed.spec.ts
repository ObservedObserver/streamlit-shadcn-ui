import { expect, test, type Page } from "@playwright/test"

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

async function installedCatalogState(page: Page) {
  return page.evaluate(() => {
    const hosts = [...document.querySelectorAll<HTMLElement>("*")].filter(
      (element) =>
        element.shadowRoot?.querySelector(
          "[data-ssui-v2-app-root]"
        ) != null
    )
    const kinds = hosts.flatMap((host) => [
      ...(
        host.shadowRoot?.querySelectorAll<HTMLElement>(
          "[data-ssui-component]"
        ) ?? []
      ),
    ]).map((component) =>
      component.getAttribute("data-ssui-component")
    )

    return {
      hostCount: hosts.length,
      invalidRoots: hosts.filter((host) => {
        const root = host.shadowRoot
        return (
          root === null ||
          root.querySelectorAll("[data-ssui-v2-app-root]").length !==
            1 ||
          root.querySelectorAll("[data-ssui-v2-overlay-root]").length !==
            1 ||
          root.querySelectorAll("style").length !== 1 ||
          root.querySelectorAll("link[rel='stylesheet']").length !== 0
        )
      }).length,
      kinds: [...new Set(kinds)].sort(),
    }
  })
}

test("installed distribution renders the complete V2 catalog", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)

  await page.goto("/")
  await expect(
    page.getByRole("heading", {
      name: "Installed Streamlit Shadcn UI V2 smoke",
    })
  ).toBeVisible({ timeout: 60_000 })
  await expect(page.locator("iframe")).toHaveCount(0)

  await expect
    .poll(
      async () => (await installedCatalogState(page)).hostCount,
      { timeout: 60_000 }
    )
    .toBe(35)
  await expect
    .poll(
      async () => (await installedCatalogState(page)).kinds.length,
      { timeout: 60_000 }
    )
    .toBe(35)

  const state = await installedCatalogState(page)
  expect(state.invalidRoots).toBe(0)
  expect(state.kinds).toHaveLength(35)
  expect(state.kinds).toContain("alert-dialog")
  expect(state.kinds).toContain("date-picker")
  expect(state.kinds).toContain("elements")
  expect(state.kinds).toContain("select")
  await expect(
    page.getByRole("heading", { name: "Installed Elements" })
  ).toBeVisible()

  const selectTheme = await page
    .getByRole("combobox", { name: "Installed Select" })
    .evaluate((element) => {
      const host = (element.getRootNode() as ShadowRoot).host as HTMLElement
      const styles = getComputedStyle(host)
      return {
        fontFamily: styles.fontFamily,
        primary: styles.getPropertyValue("--primary").trim(),
        radius: styles.getPropertyValue("--radius").trim(),
        streamlitPrimary: styles
          .getPropertyValue("--st-primary-color")
          .trim(),
      }
    })
  expect(selectTheme).toMatchObject({
    primary: "oklch(20.5% 0 0)",
    radius: ".625rem",
    streamlitPrimary: "#ff4b4b",
  })
  expect(selectTheme.fontFamily).toContain('"Geist Variable"')
  expect(selectTheme.fontFamily).not.toContain("Source Sans")
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})
