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
    .poll(async () => (await installedCatalogState(page)).hostCount)
    .toBe(34)
  await expect
    .poll(async () => (await installedCatalogState(page)).kinds.length)
    .toBe(34)

  const state = await installedCatalogState(page)
  expect(state.invalidRoots).toBe(0)
  expect(state.kinds).toHaveLength(34)
  expect(state.kinds).toContain("alert-dialog")
  expect(state.kinds).toContain("date-picker")
  expect(state.kinds).toContain("select")
  expect(diagnostics).toEqual({
    consoleMessages: [],
    pageErrors: [],
  })
})
