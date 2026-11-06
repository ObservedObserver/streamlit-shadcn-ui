import { expect, test } from "@playwright/test"

test("local sort, search, paging and visibility preserve native control styles", async ({
  page
}) => {
  await page.goto("/")
  const root = page.getByTestId("ssui-v2-data-table")
  await expect(root).toBeVisible()
  const metrics = await root.evaluate((el) => ({
    inputHeight: el.querySelector("input")!.getBoundingClientRect().height,
    buttonHeight: el.querySelector("button")!.getBoundingClientRect().height,
    checkboxSize: el.querySelector("[role=checkbox]")!.getBoundingClientRect()
      .width,
    cellPadding: getComputedStyle(el.querySelector("td")!).paddingTop
  }))
  expect(metrics).toEqual({
    inputHeight: 32,
    buttonHeight: 32,
    checkboxSize: 16,
    cellPadding: "8px"
  })
  await root.getByRole("button", { name: "Sort amount" }).click()
  await expect(root.locator("tbody tr").first()).toHaveAttribute(
    "data-row-id",
    "s:1"
  )
  await root.getByRole("button", { name: "Next", exact: true }).click()
  await expect(root.getByRole("status")).toContainText("Page 2 of 3")
  await root.getByRole("textbox", { name: "Search rows" }).fill("Record 0")
  await expect(root.getByRole("status")).toContainText(
    "1 results · Page 1 of 1"
  )
  await expect(root.getByText("Record 0", { exact: true })).toBeVisible()
  await root.getByRole("textbox", { name: "Search rows" }).fill("")
  await root.getByRole("button", { name: "Columns", exact: true }).click()
  await page
    .getByRole("menuitemcheckbox", { name: "amount", exact: true })
    .click()
  await page.keyboard.press("Escape")
  await expect(root.getByRole("button", { name: "Sort amount" })).toHaveCount(0)
  await expect(page.getByText("Python runs: 1", { exact: true })).toBeVisible()
})

test("page selection survives filtering, unrelated reruns and removes stale IDs", async ({
  page
}) => {
  await page.goto("/")
  const root = page.getByTestId("ssui-v2-data-table")
  await root.getByRole("checkbox", { name: "Select visible page" }).check()
  await expect(page.getByText("Selected: 0,1,2", { exact: true })).toBeVisible()
  await root.getByRole("button", { name: "Next", exact: true }).click()
  await root
    .getByRole("checkbox", { name: "Select row 3", exact: true })
    .check()
  await expect(
    page.getByText("Selected: 0,1,2,3", { exact: true })
  ).toBeVisible()
  await root.getByRole("textbox", { name: "Search rows" }).fill("missing")
  await expect(root.getByText("No results.")).toBeVisible()
  await expect(root.getByRole("status")).toContainText("4 selected")
  await page.getByRole("button", { name: "Unrelated rerun" }).click()
  await expect(
    page.getByText("Selected: 0,1,2,3", { exact: true })
  ).toBeVisible()
  await page.getByRole("button", { name: "Remove first record" }).click()
  await expect(page.getByText("Selected: 1,2,3", { exact: true })).toBeVisible()
})

test("row actions fire once and disabled actions cannot run", async ({
  page
}) => {
  await page.goto("/")
  await page
    .getByRole("button", { name: "Actions for row 0", exact: true })
    .click()
  await expect(
    page.getByRole("menuitem", { name: "Delete", exact: true })
  ).toBeDisabled()
  await page.getByRole("menuitem", { name: "Edit", exact: true }).click()
  await expect(
    page.getByText("Last action: 0:edit", { exact: true })
  ).toBeVisible()
  await expect(page.getByText("Action count: 1", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Unrelated rerun" }).click()
  await expect(page.getByText("Action count: 1", { exact: true })).toBeVisible()
})

test("narrow empty results remain keyboard operable", async ({
  page
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  const root = page.getByTestId("ssui-v2-data-table")
  await root.getByRole("textbox", { name: "Search rows" }).fill("missing")
  await expect(root.getByText("No results.")).toBeVisible()
  await expect(
    root.getByRole("button", { name: "Next", exact: true })
  ).toBeDisabled()
  await root.getByRole("button", { name: "Columns", exact: true }).focus()
  await page.keyboard.press("Enter")
  await expect(
    page.getByRole("menuitemcheckbox", { name: "name", exact: true })
  ).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(
    root.getByRole("button", { name: "Columns", exact: true })
  ).toBeFocused()
  await root.getByRole("textbox", { name: "Search rows" }).fill("")
  await page.screenshot({ path: testInfo.outputPath("data-table-mobile.png") })
})
