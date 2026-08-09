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

async function openElementsApp(page: Page) {
  await page.goto("/")

  await expect(
    page.getByRole("heading", {
      name: "Beautiful shadcn components, built for Streamlit",
    }),
  ).toBeVisible()

  const expandSidebar = page.getByTestId("stExpandSidebarButton")
  await expect(expandSidebar).toBeVisible()
  await expandSidebar.click()

  const elementsLink = page.getByRole("link", { name: /V2 Elements/ })
  await expect(elementsLink).toBeVisible()
  await elementsLink.click()
  await expect(page).toHaveURL(/\/Elements$/)
  await expect(
    page.getByRole("heading", {
      name: "Streamlit Shadcn UI · Elements",
    })
  ).toBeVisible()
  await expect(page.getByTestId("ssui-v2-elements")).toHaveCount(1)
  await expect(page.locator("iframe")).toHaveCount(0)
}

test("Elements is an independent page and leaves the product homepage intact", async ({
  page,
}) => {
  await page.goto("/")
  await expect(
    page.getByRole("heading", {
      name: "Beautiful shadcn components, built for Streamlit",
    })
  ).toBeVisible()
  await expect(page.getByTestId("ssui-v2-elements")).toHaveCount(0)

  await openElementsApp(page)
})

test("Elements renders both shadcn homepage cards in one React root", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openElementsApp(page)

  await expect(page.locator("[data-slot='card']")).toHaveCount(2)
  await expect(
    page.getByRole("checkbox", { name: "Transaction alerts" })
  ).toBeChecked()
  await expect(
    page.getByRole("checkbox", { name: "Goal milestones" })
  ).not.toBeChecked()
  await expect(page.getByLabel("Amount to Transfer")).toHaveValue("1,200.00")

  const ownership = await page.evaluate(() => {
    const hosts = [...document.querySelectorAll<HTMLElement>("*")].filter(
      (element) =>
        element.shadowRoot?.querySelector(
          "[data-testid='ssui-v2-elements']"
        ) != null
    )
    return {
      cardCount:
        hosts[0]?.shadowRoot?.querySelectorAll("[data-slot='card']").length ??
        0,
      hostCount: hosts.length,
    }
  })
  expect(ownership).toEqual({ cardCount: 2, hostCount: 1 })
  expect(diagnostics).toEqual({ consoleMessages: [], pageErrors: [] })
})

test("Elements preserves aggregate values and dispatches child actions", async ({
  page,
}) => {
  const diagnostics = collectDiagnostics(page)
  await openElementsApp(page)

  const amount = page.getByLabel("Amount to Transfer")
  await amount.fill("900.00")
  await amount.blur()
  await expect(page.getByLabel("Amount to Transfer")).toHaveValue("900.00")

  await page.getByRole("button", { name: "Confirm Transfer" }).click()
  await expect(page.getByText("transfer/confirm-transfer")).toBeVisible()
  expect(diagnostics).toEqual({ consoleMessages: [], pageErrors: [] })
})
