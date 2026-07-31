import { afterEach, describe, expect, it } from "vitest"

import {
  applyHostTheme,
  clearHostTheme,
} from "@/platform/theme"

function createShadowHost() {
  const host = document.createElement("div")
  document.body.append(host)
  return {
    host,
    shadowRoot: host.attachShadow({ mode: "open" }),
  }
}

afterEach(() => {
  document.documentElement.removeAttribute("dir")
  document.documentElement.removeAttribute("lang")
  document.body.replaceChildren()
})

describe("Streamlit host theme mapping", () => {
  it("detects light and dark semantic backgrounds", () => {
    const light = createShadowHost()
    light.host.style.setProperty(
      "--st-background-color",
      "rgb(255, 255, 255)"
    )
    applyHostTheme(light.shadowRoot)
    expect(light.host.dataset.theme).toBe("light")
    clearHostTheme(light.shadowRoot)

    const dark = createShadowHost()
    dark.host.style.setProperty(
      "--st-background-color",
      "rgb(12, 14, 18)"
    )
    applyHostTheme(dark.shadowRoot)
    expect(dark.host.dataset.theme).toBe("dark")
    expect(dark.host.style.colorScheme).toBe("dark")
  })

  it("detects Streamlit hex colors, including shorthand", () => {
    const dark = createShadowHost()
    dark.host.style.setProperty("--st-background-color", "#10141c")
    applyHostTheme(dark.shadowRoot)
    expect(dark.host.dataset.theme).toBe("dark")
    clearHostTheme(dark.shadowRoot)

    const light = createShadowHost()
    light.host.style.setProperty("--st-background-color", "#fff")
    applyHostTheme(light.shadowRoot)
    expect(light.host.dataset.theme).toBe("light")
  })

  it("copies document direction and language on every renderer update", () => {
    const { host, shadowRoot } = createShadowHost()
    document.documentElement.dir = "rtl"
    document.documentElement.lang = "ar"

    applyHostTheme(shadowRoot)

    expect(host.dir).toBe("rtl")
    expect(host.lang).toBe("ar")
  })

  it("chooses an accessible foreground for light and dark primary colors", () => {
    const lightPrimary = createShadowHost()
    lightPrimary.host.style.setProperty("--st-primary-color", "#facc15")
    applyHostTheme(lightPrimary.shadowRoot)
    expect(
      lightPrimary.host.style.getPropertyValue(
        "--ssui-v2-primary-foreground"
      )
    ).toBe("#000000")

    const darkPrimary = createShadowHost()
    darkPrimary.host.style.setProperty("--st-primary-color", "#1d4ed8")
    applyHostTheme(darkPrimary.shadowRoot)
    expect(
      darkPrimary.host.style.getPropertyValue(
        "--ssui-v2-primary-foreground"
      )
    ).toBe("#ffffff")
  })

  it("restores the exact pre-mount host attributes and inline style", () => {
    const { host, shadowRoot } = createShadowHost()
    host.setAttribute("data-ssui-v2-host", "existing-owner")
    host.setAttribute("data-theme", "custom")
    host.dir = "auto"
    host.lang = "zh"
    host.style.setProperty("color-scheme", "light", "important")
    host.style.setProperty(
      "--st-background-color",
      "rgb(10, 10, 10)"
    )
    host.style.setProperty(
      "--ssui-v2-primary-foreground",
      "CanvasText",
      "important"
    )

    applyHostTheme(shadowRoot)
    applyHostTheme(shadowRoot)
    clearHostTheme(shadowRoot)

    expect(host.getAttribute("data-ssui-v2-host")).toBe("existing-owner")
    expect(host.getAttribute("data-theme")).toBe("custom")
    expect(host.dir).toBe("auto")
    expect(host.lang).toBe("zh")
    expect(host.style.getPropertyValue("color-scheme")).toBe("light")
    expect(host.style.getPropertyPriority("color-scheme")).toBe("important")
    expect(
      host.style.getPropertyValue("--ssui-v2-primary-foreground")
    ).toBe("CanvasText")
    expect(
      host.style.getPropertyPriority("--ssui-v2-primary-foreground")
    ).toBe("important")
  })

  it("makes cleanup idempotent", () => {
    const { host, shadowRoot } = createShadowHost()
    applyHostTheme(shadowRoot)

    clearHostTheme(shadowRoot)
    clearHostTheme(shadowRoot)

    expect(host.hasAttribute("data-ssui-v2-host")).toBe(false)
    expect(host.hasAttribute("data-theme")).toBe(false)
  })
})
