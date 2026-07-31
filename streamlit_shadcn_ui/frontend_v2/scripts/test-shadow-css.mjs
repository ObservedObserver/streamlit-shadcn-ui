import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import postcss from "postcss"

import {
  normalizeCompiledShadowCss,
  normalizeShadowCssInput,
} from "./normalize-shadow-css.mjs"

const fixture = `
:root, html { --tw-ring-color: red; }
body .dark .sentinel {
  --tw-shadow: 0 0 #0000;
  animation: spin 1s linear;
  color: var(--tw-ring-color);
  background: var(--shimmer-image);
}
@property --tw-translate-x { syntax: "*"; inherits: false; }
@property --shimmer-image { syntax: "<image>"; inherits: false; }
@keyframes spin { to { transform: rotate(360deg); } }
`

const normalizedInput = normalizeShadowCssInput(fixture)
assert.doesNotMatch(normalizedInput, /(^|[,\s])(:root|html|body)(?=[\s,{.#[:])/)
assert.match(normalizedInput, /:host/)
assert.match(normalizedInput, /\[data-ssui-v2-app-root\]/)

const normalized = normalizeCompiledShadowCss(fixture)
assert.doesNotMatch(normalized, /--tw-/)
assert.match(normalized, /--ssui-v2-1-tw-ring-color/)
assert.match(normalized, /@property --ssui-v2-1-tw-translate-x/)
assert.match(normalized, /@property --ssui-v2-1-shimmer-image/)
assert.match(normalized, /var\(--ssui-v2-1-shimmer-image\)/)
assert.match(normalized, /@keyframes ssui-v2-1-spin/)
assert.match(normalized, /animation: ssui-v2-1-spin/)
assert.equal(normalizeCompiledShadowCss(normalized), normalized)

const shadowSource = await readFile(
  new URL("../src/platform/shadow.css", import.meta.url),
  "utf8"
)

const expectedLightTokens = {
  "--background": "oklch(1 0 0)",
  "--foreground": "oklch(0.145 0 0)",
  "--card": "oklch(1 0 0)",
  "--card-foreground": "oklch(0.145 0 0)",
  "--popover": "oklch(1 0 0)",
  "--popover-foreground": "oklch(0.145 0 0)",
  "--primary": "oklch(0.205 0 0)",
  "--primary-foreground": "oklch(0.985 0 0)",
  "--secondary": "oklch(0.97 0 0)",
  "--secondary-foreground": "oklch(0.205 0 0)",
  "--muted": "oklch(0.97 0 0)",
  "--muted-foreground": "oklch(0.556 0 0)",
  "--accent": "oklch(0.97 0 0)",
  "--accent-foreground": "oklch(0.205 0 0)",
  "--destructive": "oklch(0.577 0.245 27.325)",
  "--border": "oklch(0.922 0 0)",
  "--input": "oklch(0.922 0 0)",
  "--ring": "oklch(0.708 0 0)",
  "--chart-1": "oklch(0.87 0 0)",
  "--chart-2": "oklch(0.556 0 0)",
  "--chart-3": "oklch(0.439 0 0)",
  "--chart-4": "oklch(0.371 0 0)",
  "--chart-5": "oklch(0.269 0 0)",
  "--radius": "0.625rem",
  "--sidebar": "oklch(0.985 0 0)",
  "--sidebar-foreground": "oklch(0.145 0 0)",
  "--sidebar-primary": "oklch(0.205 0 0)",
  "--sidebar-primary-foreground": "oklch(0.985 0 0)",
  "--sidebar-accent": "oklch(0.97 0 0)",
  "--sidebar-accent-foreground": "oklch(0.205 0 0)",
  "--sidebar-border": "oklch(0.922 0 0)",
  "--sidebar-ring": "oklch(0.708 0 0)",
}

const expectedDarkTokens = {
  "--background": "oklch(0.145 0 0)",
  "--foreground": "oklch(0.985 0 0)",
  "--card": "oklch(0.205 0 0)",
  "--card-foreground": "oklch(0.985 0 0)",
  "--popover": "oklch(0.205 0 0)",
  "--popover-foreground": "oklch(0.985 0 0)",
  "--primary": "oklch(0.922 0 0)",
  "--primary-foreground": "oklch(0.205 0 0)",
  "--secondary": "oklch(0.269 0 0)",
  "--secondary-foreground": "oklch(0.985 0 0)",
  "--muted": "oklch(0.269 0 0)",
  "--muted-foreground": "oklch(0.708 0 0)",
  "--accent": "oklch(0.269 0 0)",
  "--accent-foreground": "oklch(0.985 0 0)",
  "--destructive": "oklch(0.704 0.191 22.216)",
  "--border": "oklch(1 0 0 / 10%)",
  "--input": "oklch(1 0 0 / 15%)",
  "--ring": "oklch(0.556 0 0)",
  "--chart-1": "oklch(0.87 0 0)",
  "--chart-2": "oklch(0.556 0 0)",
  "--chart-3": "oklch(0.439 0 0)",
  "--chart-4": "oklch(0.371 0 0)",
  "--chart-5": "oklch(0.269 0 0)",
  "--sidebar": "oklch(0.205 0 0)",
  "--sidebar-foreground": "oklch(0.985 0 0)",
  "--sidebar-primary": "oklch(0.488 0.243 264.376)",
  "--sidebar-primary-foreground": "oklch(0.985 0 0)",
  "--sidebar-accent": "oklch(0.269 0 0)",
  "--sidebar-accent-foreground": "oklch(0.985 0 0)",
  "--sidebar-border": "oklch(1 0 0 / 10%)",
  "--sidebar-ring": "oklch(0.556 0 0)",
}

function semanticTokens(rule) {
  return Object.fromEntries(
    rule.nodes
      .filter((node) => node.type === "decl" && node.prop.startsWith("--"))
      .map((node) => [node.prop, node.value])
  )
}

const shadowRoot = postcss.parse(shadowSource)
const lightRule = shadowRoot.nodes.find(
  (node) => node.type === "rule" && node.selector === ":host"
)
const darkRule = shadowRoot.nodes.find(
  (node) =>
    node.type === "rule" && node.selector === ':host([data-theme="dark"])'
)
assert.ok(lightRule, "The light shadcn :host token rule must exist")
assert.ok(darkRule, "The dark shadcn :host token rule must exist")
assert.deepEqual(semanticTokens(lightRule), expectedLightTokens)
assert.deepEqual(semanticTokens(darkRule), expectedDarkTokens)

assert.match(
  shadowSource,
  /\.base-ui-disable-scrollbar\s*\{[^}]*scrollbar-width:\s*none/s
)
assert.match(
  shadowSource,
  /\.base-ui-disable-scrollbar::\-webkit-scrollbar\s*\{[^}]*display:\s*none/s
)
assert.match(
  shadowSource,
  /"Geist Variable",\s*"Geist",\s*ui-sans-serif/
)
assert.doesNotMatch(shadowSource, /var\(--st-/)
assert.doesNotMatch(shadowSource, /--ssui-v2-primary-foreground/)

console.log("Shadow CSS normalization and idempotency checks passed.")
