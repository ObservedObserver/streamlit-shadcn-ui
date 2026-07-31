function parseRgbChannel(channel: string): number | null {
  const value = Number.parseFloat(channel)
  if (!Number.isFinite(value)) {
    return null
  }
  return channel.includes("%") ? (value / 100) * 255 : value
}

function luminanceFromColor(color: string): number | null {
  const functional = color.match(
    /rgba?\(\s*([0-9.]+%?)\s*[, ]\s*([0-9.]+%?)\s*[, ]\s*([0-9.]+%?)/
  )
  const hex = color.trim().match(
    /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i
  )
  let channels: [number | null, number | null, number | null] | null = null
  if (functional) {
    channels = [
      parseRgbChannel(functional[1] ?? ""),
      parseRgbChannel(functional[2] ?? ""),
      parseRgbChannel(functional[3] ?? ""),
    ]
  } else if (hex) {
    const digits = hex[1] ?? ""
    const expanded =
      digits.length === 3 || digits.length === 4
        ? [...digits].map((digit) => digit + digit).join("")
        : digits
    channels = [
      Number.parseInt(expanded.slice(0, 2), 16),
      Number.parseInt(expanded.slice(2, 4), 16),
      Number.parseInt(expanded.slice(4, 6), 16),
    ]
  }
  if (!channels) {
    return null
  }
  const [red, green, blue] = channels
  if (red === null || green === null || blue === null) {
    return null
  }

  const linearize = (value: number) => {
    const normalized = value / 255
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4
  }
  return (
    0.2126 * linearize(red) +
    0.7152 * linearize(green) +
    0.0722 * linearize(blue)
  )
}

function getHost(parentElement: HTMLElement | ShadowRoot): HTMLElement {
  return parentElement instanceof ShadowRoot
    ? (parentElement.host as HTMLElement)
    : parentElement
}

type HostThemeSnapshot = {
  colorScheme: string
  colorSchemePriority: string
  dataSsuiV2Host: string | null
  dataTheme: string | null
  dir: string | null
  lang: string | null
  primaryForeground: string
  primaryForegroundPriority: string
}

const hostThemeSnapshots = new WeakMap<HTMLElement, HostThemeSnapshot>()
const hostThemeFrames = new WeakMap<HTMLElement, number>()

function restoreAttribute(
  host: HTMLElement,
  name: string,
  value: string | null
): void {
  if (value === null) {
    host.removeAttribute(name)
  } else {
    host.setAttribute(name, value)
  }
}

function syncHostTheme(host: HTMLElement): void {
  const styles = getComputedStyle(host)
  const background =
    styles.getPropertyValue("--st-background-color").trim() ||
    styles.backgroundColor
  const luminance = luminanceFromColor(background)
  const primary =
    styles.getPropertyValue("--st-primary-color").trim() || "#ff4b4b"
  const primaryLuminance = luminanceFromColor(primary)
  const theme =
    luminance === null
      ? "light"
      : luminance < 0.18
        ? "dark"
        : "light"
  const primaryForeground =
    primaryLuminance !== null && primaryLuminance >= 0.179
      ? "#000000"
      : "#ffffff"

  host.dataset.ssuiV2Host = ""
  host.dataset.theme = theme
  host.style.colorScheme = theme
  host.style.setProperty(
    "--ssui-v2-primary-foreground",
    primaryForeground
  )
  host.dir = document.documentElement.dir || "ltr"
  host.lang = document.documentElement.lang || "en"
}

export function applyHostTheme(
  parentElement: HTMLElement | ShadowRoot
): void {
  const host = getHost(parentElement)
  if (!hostThemeSnapshots.has(host)) {
    hostThemeSnapshots.set(host, {
      colorScheme: host.style.getPropertyValue("color-scheme"),
      colorSchemePriority:
        host.style.getPropertyPriority("color-scheme"),
      dataSsuiV2Host: host.getAttribute("data-ssui-v2-host"),
      dataTheme: host.getAttribute("data-theme"),
      dir: host.getAttribute("dir"),
      lang: host.getAttribute("lang"),
      primaryForeground: host.style.getPropertyValue(
        "--ssui-v2-primary-foreground"
      ),
      primaryForegroundPriority: host.style.getPropertyPriority(
        "--ssui-v2-primary-foreground"
      ),
    })
  }

  syncHostTheme(host)
  const pendingFrame = hostThemeFrames.get(host)
  if (pendingFrame !== undefined) {
    cancelAnimationFrame(pendingFrame)
  }
  hostThemeFrames.set(
    host,
    requestAnimationFrame(() => {
      hostThemeFrames.delete(host)
      if (hostThemeSnapshots.has(host) && host.isConnected) {
        syncHostTheme(host)
      }
    })
  )
}

export function clearHostTheme(
  parentElement: HTMLElement | ShadowRoot
): void {
  const host = getHost(parentElement)
  const pendingFrame = hostThemeFrames.get(host)
  if (pendingFrame !== undefined) {
    cancelAnimationFrame(pendingFrame)
    hostThemeFrames.delete(host)
  }
  const snapshot = hostThemeSnapshots.get(host)
  if (!snapshot) {
    return
  }

  restoreAttribute(host, "data-ssui-v2-host", snapshot.dataSsuiV2Host)
  restoreAttribute(host, "data-theme", snapshot.dataTheme)
  restoreAttribute(host, "dir", snapshot.dir)
  restoreAttribute(host, "lang", snapshot.lang)
  if (snapshot.colorScheme) {
    host.style.setProperty(
      "color-scheme",
      snapshot.colorScheme,
      snapshot.colorSchemePriority
    )
  } else {
    host.style.removeProperty("color-scheme")
  }
  if (snapshot.primaryForeground) {
    host.style.setProperty(
      "--ssui-v2-primary-foreground",
      snapshot.primaryForeground,
      snapshot.primaryForegroundPriority
    )
  } else {
    host.style.removeProperty("--ssui-v2-primary-foreground")
  }
  hostThemeSnapshots.delete(host)
}
