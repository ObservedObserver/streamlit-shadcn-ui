import { expect, test } from "@playwright/test"

for (const side of ["right", "left", "top", "bottom"] as const) {
  test(`${side} Sheet preserves pinned nova dimensions, focus and dismissal`, async ({ page }) => {
    await page.goto("/")
    const trigger = page.getByRole("button", { name: `Open ${side}`, exact: true })
    await trigger.click()
    const popup = page.getByRole("dialog", { name: `${side} details` })
    await expect(popup).toBeVisible()
    await expect(page.getByText("Python runs: 1", { exact: true })).toBeVisible()
    await expect(popup).toHaveAttribute("data-side", side)
    const metrics = await popup.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      const header = element.querySelector("[data-slot=sheet-header]")!
      const title = element.querySelector("[data-slot=sheet-title]")!
      const close = Array.from(element.querySelectorAll("[data-slot=sheet-close]")).at(-1)!
      return {
        width: rect.width, height: rect.height,
        viewportWidth: innerWidth, viewportHeight: innerHeight,
        gap: getComputedStyle(element).gap,
        headerPadding: getComputedStyle(header).padding,
        titleFont: getComputedStyle(title).fontSize,
        buttonHeight: close.getBoundingClientRect().height,
        inputHeight: element.querySelector("input")!.getBoundingClientRect().height,
        inShadow: element.getRootNode() instanceof ShadowRoot,
      }
    })
    // Dimensions come from the pinned base-nova source: max-w-sm, p-4,
    // text-base, gap-4, Button icon-sm and Input default sizes.
    expect(metrics.headerPadding).toBe("16px")
    expect(metrics.titleFont).toBe("16px")
    expect(metrics.gap).toBe("16px")
    expect(metrics.buttonHeight).toBe(28)
    expect(metrics.inputHeight).toBe(32)
    expect(metrics.inShadow).toBe(true)
    if (side === "left" || side === "right") {
      expect(metrics.width).toBe(384)
      expect(metrics.height).toBe(metrics.viewportHeight)
    } else {
      expect(metrics.width).toBe(metrics.viewportWidth)
    }
    await page.keyboard.press("Escape")
    await expect(popup).toBeHidden()
    await expect(trigger).toBeFocused()
    await expect(page.getByText("Python runs: 1", { exact: true })).toBeVisible()
  })
}

test("Sheet retains values and open state through actions and closes once", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Open right", exact: true }).click()
  const popup = page.getByRole("dialog", { name: "right details" })
  await popup.getByRole("textbox", { name: "Name" }).fill("Grace")
  await popup.getByRole("textbox", { name: "Name" }).press("Enter")
  await expect(page.getByText("right name: Grace", { exact: true })).toBeVisible()
  await expect(popup).toBeVisible()
  await popup.getByRole("button", { name: "Save", exact: true }).click()
  await expect(page.getByText("Saves: 1", { exact: true })).toBeVisible()
  await expect(popup).toBeVisible()
  await popup.getByRole("button", { name: "Done", exact: true }).click()
  await expect(page.getByText("Closes: 1", { exact: true })).toBeVisible()
  await expect(popup).toBeHidden()
  const trigger = page.getByRole("button", { name: "Open right", exact: true })
  await expect(trigger).toBeFocused()
  await trigger.click()
  await expect(popup.getByRole("textbox", { name: "Name" })).toHaveValue("Grace")
  await page.mouse.click(50, 100)
  await expect(popup).toBeHidden()
  await expect(page.getByText("Closes: 1", { exact: true })).toBeVisible()
})

test("narrow Sheet respects default width and releases modal effects on dismissal", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  await page.getByRole("button", { name: "Open left", exact: true }).click()
  const popup = page.getByRole("dialog", { name: "left details" })
  await expect(popup).toBeVisible()
  await expect.poll(async () => (await popup.boundingBox())?.width).toBe(292.5)
  await page.keyboard.press("Escape")
  await expect(popup).toBeHidden()
  const effects = await page.evaluate(() => ({
    inert: document.body.inert,
    overflow: document.body.style.overflow,
  }))
  expect(effects.inert).toBe(false)
  expect(effects.overflow).not.toBe("hidden")
})


test("dark RTL Sheet preserves focus and captures acceptance view", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark" })
  await page.goto("/")
  await page.getByRole("button", { name: "Rerun", exact: true }).waitFor()
  await page.evaluate(() => {
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "ar"
  })
  await page.getByRole("button", { name: "Rerun", exact: true }).click()
  await expect(page.getByText("Python runs: 2", { exact: true })).toBeVisible()
  const trigger = page.getByRole("button", { name: "Open right", exact: true })
  await trigger.click()
  const popup = page.getByRole("dialog", { name: "right details" })
  await expect(popup).toBeVisible()
  await expect.poll(() => popup.evaluate((el) => getComputedStyle(el).direction)).toBe("rtl")
  await page.screenshot({ path: testInfo.outputPath("sheet-dark-rtl.png") })
  await page.keyboard.press("Tab")
  expect(await popup.evaluate((el) => el.contains((el.getRootNode() as ShadowRoot).activeElement))).toBe(true)
  await page.keyboard.press("Escape")
  await expect(trigger).toBeFocused()
})
