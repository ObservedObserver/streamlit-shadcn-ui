import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import postcss from "postcss"

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
)
const distDir = path.join(projectRoot, "dist")
const files = await readdir(distDir)
const entries = files.filter((file) => /^entry-[a-zA-Z0-9_-]+\.js$/.test(file))
const styles = files.filter((file) =>
  /^style-[a-zA-Z0-9_-]+\.css$/.test(file)
)

if (entries.length !== 1 || styles.length !== 1) {
  throw new Error(
    `Expected one hashed entry and one hashed style; found entries=${entries.join(
      ","
    )}, styles=${styles.join(",")}.`
  )
}

const css = await readFile(path.join(distDir, styles[0]), "utf8")
for (const forbidden of [":root", " html", " body", "--tw-", "@import"]) {
  if (css.includes(forbidden)) {
    throw new Error(`Compiled Shadow CSS contains forbidden token: ${forbidden}`)
  }
}

const cssRoot = postcss.parse(css)
let shadowPropertyDefaults
let shadowHostDefaults
cssRoot.walkRules((rule) => {
  const selectors = new Set(rule.selectors)
  const isUnconditionalPropertiesRule =
    rule.parent?.type === "atrule" &&
    rule.parent.name === "layer" &&
    rule.parent.params.trim() === "properties" &&
    rule.parent.parent === cssRoot
  if (!isUnconditionalPropertiesRule) {
    return
  }

  const declarations = new Map(
    rule.nodes
      .filter((node) => node.type === "decl")
      .map((node) => [node.prop, node.value])
  )
  if (selectors.size === 1 && selectors.has(":host")) {
    shadowHostDefaults = declarations
  }
  if (
    selectors.has("*") &&
    (selectors.has(":before") || selectors.has("::before")) &&
    (selectors.has(":after") || selectors.has("::after")) &&
    selectors.has("::backdrop")
  ) {
    shadowPropertyDefaults = declarations
  }
})

const requiredShadowPropertyDefaults = new Map([
  ["--ssui-v2-1-tw-border-style", "solid"],
  ["--ssui-v2-1-tw-translate-x", "0"],
  ["--ssui-v2-1-tw-translate-y", "0"],
  ["--ssui-v2-1-tw-ring-shadow", "0 0 #0000"],
  ["--ssui-v2-1-tw-ring-offset-width", "0px"],
  ["--ssui-v2-1-tw-shadow", "0 0 #0000"],
])
for (const [propertyName, expectedValue] of requiredShadowPropertyDefaults) {
  if (shadowPropertyDefaults?.get(propertyName) !== expectedValue) {
    throw new Error(
      `Compiled Shadow CSS is missing the unconditional ${propertyName}:${expectedValue} default.`
    )
  }
}
if (shadowHostDefaults?.get("--ssui-v2-1-shimmer-angle") !== "20deg") {
  throw new Error(
    "Compiled Shadow CSS is missing the unconditional --ssui-v2-1-shimmer-angle:20deg host default."
  )
}

const javascript = await readFile(path.join(distDir, entries[0]), "utf8")
for (const forbidden of ["process.env", "react.development.js"]) {
  if (javascript.includes(forbidden)) {
    throw new Error(
      `Compiled JavaScript contains development/runtime token: ${forbidden}`
    )
  }
}

console.log(`Verified ${entries[0]} and ${styles[0]}.`)
