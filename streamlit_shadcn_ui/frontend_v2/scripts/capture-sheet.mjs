// Resolve Sheet style markers from the pinned upstream template and nova CSS.
// Never consult the mutable hosted registry.
import { createHash } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const root = new URL("../", import.meta.url)
const manifestPath = new URL("provenance/shadcn-base-ui.json", root)
const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
const commit = manifest.upstream.commit
const base = `https://raw.githubusercontent.com/shadcn-ui/ui/${commit}/apps/v4/registry/`
const urls = [base + "bases/base/ui/sheet.tsx", base + "styles/style-nova.css"]
const sources = await Promise.all(
  urls.map(async (url) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`${url}: ${response.status}`)
    return response.text()
  })
)
const hash = (text) => createHash("sha256").update(text).digest("hex")
let content = sources[0].replaceAll("@/registry/bases/base/", "@/registry/base-nova/")
for (const marker of new Set(content.match(/cn-sheet[\w-]*/g))) {
  const escaped = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const rule = sources[1].match(new RegExp(`\\.${escaped}\\s*\\{\\s*@apply ([^;]+);\\s*\\}`))?.[1]
  if (!rule) throw new Error(`Missing pinned nova style: ${marker}`)
  content = content.replaceAll(marker, rule)
}
if (/cn-sheet/.test(content)) throw new Error("Unresolved Sheet style marker.")
const payload =
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: "sheet",
      type: "registry:ui",
      dependencies: ["@base-ui/react"],
      registryDependencies: ["utils", "button"],
      files: [
        {
          path: "registry/base-nova/ui/sheet.tsx",
          type: "registry:ui",
          content
        }
      ]
    },
    null,
    2
  ) + "\n"
const registryPath = new URL("provenance/registry/sheet.json", root)
await writeFile(registryPath, payload)
manifest.registry.sheet = {
  url: urls[0],
  sha256: hash(payload),
  primitive: "base-ui",
  sources: urls.map((url, i) => ({ url, sha256: hash(sources[i]) })),
  capture: "scripts/capture-sheet.mjs"
}
manifest.registry = Object.fromEntries(
  Object.entries(manifest.registry).sort(([a], [b]) => a.localeCompare(b))
)
manifest.snapshotRevision += 1
manifest.capturedAt = new Date().toISOString()
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n")
console.log(
  `Captured pinned Sheet at ${commit} into ${fileURLToPath(registryPath)}.`
)
