import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

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

const javascript = await readFile(path.join(distDir, entries[0]), "utf8")
for (const forbidden of ["process.env", "react.development.js"]) {
  if (javascript.includes(forbidden)) {
    throw new Error(
      `Compiled JavaScript contains development/runtime token: ${forbidden}`
    )
  }
}

console.log(`Verified ${entries[0]} and ${styles[0]}.`)
