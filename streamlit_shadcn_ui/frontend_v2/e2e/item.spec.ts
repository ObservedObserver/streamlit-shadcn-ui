import { test, expect, type Locator } from "@playwright/test"
import { readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.."
)
async function appearance(locator: Locator) {
  return locator.evaluate((el) => {
    const css = getComputedStyle(el)
    return Object.fromEntries(
      [
        "height",
        "paddingTop",
        "paddingBottom",
        "paddingLeft",
        "paddingRight",
        "gap",
        "fontSize",
        "fontWeight",
        "lineHeight",
        "borderRadius",
        "borderWidth",
        "borderColor",
        "backgroundColor",
        "color",
        "boxShadow",
        "opacity",
      ].map((key) => [key, css[key as keyof CSSStyleDeclaration]])
    )
  })
}

test("Item defaults match pinned reference and actions retain identity across reruns", async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/")
  await expect(
    page.getByRole("heading", { name: "Item acceptance" })
  ).toBeVisible()
  const elements = page.getByTestId("ssui-v2-elements")
  await expect(elements.getByRole("list")).toHaveCount(1)
  await expect(elements.getByRole("listitem")).toHaveCount(2)
  await expect(elements.getByLabel("Ada", { exact: true })).toHaveText("A")
  await expect(elements.getByRole("img", { name: "Grace", exact: true })).toHaveText("G")
  await expect(
    elements.getByRole("button", { name: "Manage Grace" })
  ).toBeDisabled()
  const preview = elements.getByAltText("Preview", { exact: true })
  await expect(preview).toHaveJSProperty("complete", true)
  await expect(preview).toHaveJSProperty("naturalWidth", 1)
  expect(
    await preview.evaluate((img) => ({
      width: img.getBoundingClientRect().width,
      height: img.getBoundingClientRect().height,
    }))
  ).toEqual({ width: 24, height: 24 })
  // Render the actual pinned components directly in a sibling with the same
  // ShadowRoot, tokens and available width. No adapter or copied control CSS.
  await page.addScriptTag({
    type: "module",
    content: readFileSync(
      path.join(root, "output/item-reference/reference.js"),
      "utf8"
    ),
  })
  await elements.evaluate((el) => {
    const target = document.createElement("div")
    target.id = "item-reference"
    el.parentElement!.append(target)
    ;(
      window as unknown as {
        mountItemReference: (target: HTMLElement) => void
      }
    ).mountItemReference(target)
  })
  const reference = page.locator("#item-reference")
  await expect(reference.getByRole("button")).toBeVisible()
  const actualRow = elements.getByRole("listitem").first()
  for (const slot of [
    "item",
    "item-media",
    "avatar",
    "item-content",
    "item-title",
    "item-description",
    "item-actions",
    "button",
  ]) {
    const actual =
      slot === "item"
        ? actualRow
        : actualRow.locator(`[data-slot="${slot}"]`)
    expect(await appearance(actual)).toEqual(
      await appearance(reference.locator(`[data-slot="${slot}"]`))
    )
  }
  const actualButton = actualRow.getByRole("button")
  const referenceButton = reference.getByRole("button")
  await actualButton.hover()
  await page.waitForTimeout(200)
  const hovered = await appearance(actualButton)
  await referenceButton.hover()
  await page.waitForTimeout(200)
  expect(await appearance(referenceButton)).toEqual(hovered)
  await page.mouse.move(0, 0)
  await actualButton.focus()
  await page.waitForTimeout(200)
  const focused = await appearance(actualButton)
  await referenceButton.focus()
  await page.waitForTimeout(200)
  expect(await appearance(referenceButton)).toEqual(focused)
  await elements.evaluate((el) => {
    const host = (el.getRootNode() as ShadowRoot).host
    host.setAttribute("data-theme", "dark")
    host.setAttribute("dir", "rtl")
  })
  await page.mouse.move(0, 0)
  await referenceButton.blur()
  await page.waitForTimeout(200)
  expect(await appearance(actualRow)).toEqual(
    await appearance(reference.locator('[data-slot="item"]'))
  )
  expect(await appearance(actualButton)).toEqual(
    await appearance(referenceButton)
  )
  await elements.evaluate((el) => {
    const host = (el.getRootNode() as ShadowRoot).host
    host.setAttribute("data-theme", "light")
    host.setAttribute("dir", "ltr")
  })
  await reference.evaluate((el) => el.remove())
  await elements.getByRole("button", { name: "Manage Ada" }).click()
  await expect(
    page.getByText("Actions: 1; Last: group/Ada/manage", { exact: true })
  ).toBeVisible()
  await page.getByRole("checkbox", { name: "Reverse members" }).focus()
  await page.keyboard.press("Space")
  await expect(elements.getByRole("listitem").first()).toContainText(
    "Grace"
  )
  await elements.getByRole("button", { name: "Manage Ada" }).click()
  await expect(
    page.getByText("Actions: 2; Last: group/Ada/manage", { exact: true })
  ).toBeVisible()
  await page.screenshot({
    path: testInfo.outputPath("item-desktop.png"),
    fullPage: true,
  })
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(
    elements.getByRole("button", { name: "Manage Ada" })
  ).toBeVisible()
  expect(
    await elements.evaluate((el) => el.scrollWidth <= el.clientWidth)
  ).toBe(true)
  await page.screenshot({
    path: testInfo.outputPath("item-mobile.png"),
    fullPage: true,
  })
  expect(errors).toEqual([])
})
