import { expect, test, type Locator } from "@playwright/test"

async function appearance(locator: Locator) {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element)
    return Object.fromEntries(
      [
        "height",
        "paddingTop",
        "paddingBottom",
        "paddingLeft",
        "paddingRight",
        "fontSize",
        "fontWeight",
        "borderRadius",
        "borderTopWidth",
      ].map((key) => [key, style[key as keyof CSSStyleDeclaration]])
    )
  })
}

test("nested controls retain drafts across hide, rerun and reorder with native keyboard navigation", async ({
  page,
}) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/")
  const root = page.getByTestId("ssui-v2-elements")
  await expect(
    root.getByRole("textbox", { name: "Name", exact: true })
  ).toBeVisible()
  await root.getByRole("textbox", { name: "Name", exact: true }).fill("Grace")
  await root.getByRole("textbox", { name: "Name", exact: true }).press("Tab")
  await root.getByRole("button", { name: "More", exact: true }).click()
  await root.getByRole("textbox", { name: "Notes" }).fill("Keep this draft")
  await root.getByRole("textbox", { name: "Notes" }).press("Tab")
  await expect(root.getByRole("button", { name: "Unavailable" })).toBeDisabled()
  await root.getByRole("tab", { name: "General" }).focus()
  await page.keyboard.press("ArrowRight")
  await expect(root.getByRole("tab", { name: "Advanced" })).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(
    root.getByRole("textbox", { name: "Name", exact: true })
  ).toBeHidden()
  await expect(root.getByRole("region", { name: "Records" })).toBeVisible()
  const viewport = root.locator('[data-slot="scroll-area-viewport"]')
  expect(
    await viewport.evaluate(
      (element) => element.scrollHeight > element.clientHeight
    )
  ).toBe(true)
  await page.getByRole("button", { name: "Rerun", exact: true }).click()
  await page.getByRole("checkbox", { name: "Reverse panels" }).focus()
  await page.keyboard.press("Space")
  await expect(root.getByRole("tab", { name: "Advanced" })).toHaveAttribute(
    "aria-selected",
    "true"
  )
  await root.getByRole("tab", { name: "General" }).click()
  await expect(
    root.getByRole("textbox", { name: "Name", exact: true })
  ).toHaveValue("Grace")
  await expect(root.getByRole("textbox", { name: "Notes" })).toHaveValue(
    "Keep this draft"
  )
  await root.getByRole("button", { name: "Details", exact: true }).click()
  await expect(root.getByRole("textbox", { name: "Notes" })).toBeHidden()
  await root.getByRole("button", { name: "Details", exact: true }).click()
  await expect(root.getByRole("textbox", { name: "Notes" })).toHaveValue(
    "Keep this draft"
  )
  await root
    .locator('[data-slot="accordion-content"]')
    .first()
    .evaluate((element) =>
      Promise.all(
        element
          .getAnimations({ subtree: true })
          .map((animation) => animation.finished)
      )
    )
  await expect(root.getByRole("textbox", { name: "Notes" })).toBeInViewport()
  expect(errors).toEqual([])
  await page.screenshot({
    path: test.info().outputPath("containers.png"),
    fullPage: true,
  })
})

test("composed controls preserve generated dimensions and focus styling", async ({
  page,
}) => {
  await page.goto("/")
  const root = page.getByTestId("ssui-v2-elements")
  const tab = root.getByRole("tab", { name: "General" })
  const referenceTab = page
    .getByTestId("ssui-v2-tabs")
    .getByRole("tab", { name: "General" })
  await expect(tab).toBeVisible()
  expect(await appearance(tab)).toEqual(await appearance(referenceTab))
  expect(
    await appearance(root.getByRole("button", { name: "Details", exact: true }))
  ).toEqual(
    await appearance(
      page
        .getByTestId("ssui-v2-accordion")
        .getByRole("button", { name: "Details", exact: true })
    )
  )
  expect(
    await appearance(root.getByRole("button", { name: "More", exact: true }))
  ).toEqual(
    await appearance(
      page
        .getByTestId("ssui-v2-button")
        .getByRole("button", { name: "More", exact: true })
    )
  )
  await tab.focus()
  await tab.evaluate((element) =>
    Promise.all(element.getAnimations().map((animation) => animation.finished))
  )
  const focused = await tab.evaluate(
    (element) => getComputedStyle(element).boxShadow
  )
  await referenceTab.focus()
  await referenceTab.evaluate((element) =>
    Promise.all(element.getAnimations().map((animation) => animation.finished))
  )
  expect(focused).toEqual(
    await referenceTab.evaluate(
      (element) => getComputedStyle(element).boxShadow
    )
  )
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(tab).toBeVisible()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    )
  ).toBe(true)
})
