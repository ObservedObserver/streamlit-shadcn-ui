// Chart has no nova-specific layout rules beyond its tooltip. Resolve the
// pinned template markers without consulting the mutable hosted registry.
import { createHash } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

const root = new URL("../", import.meta.url)
const manifestPath = new URL("provenance/shadcn-base-ui.json", root)
const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
const commit = manifest.upstream.commit
const base = `https://raw.githubusercontent.com/shadcn-ui/ui/${commit}/apps/v4/registry/`
const urls = [base + "bases/base/ui/chart.tsx", base + "styles/style-nova.css"]
const sources = await Promise.all(
  urls.map(async (url) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`${url}: ${response.status}`)
    return response.text()
  })
)
const hash = (text) => createHash("sha256").update(text).digest("hex")
const tooltip = sources[1].match(
  /\.cn-chart-tooltip\s*\{\s*@apply ([^;]+);\s*\}/
)?.[1]
if (!tooltip || /\.cn-chart\s*\{/.test(sources[1])) {
  throw new Error(
    "Pinned nova Chart styles changed; review the capture transform."
  )
}
const content = sources[0]
  .replaceAll("@/registry/bases/base/", "@/registry/base-nova/")
  .replace("cn-chart ", "")
  .replace("cn-chart-tooltip", tooltip)
if (/cn-chart/.test(content)) throw new Error("Unresolved Chart style marker.")
const payload =
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: "chart",
      type: "registry:ui",
      dependencies: ["recharts@3.8.0"],
      registryDependencies: ["utils", "card"],
      files: [
        {
          path: "registry/base-nova/ui/chart.tsx",
          type: "registry:ui",
          content
        }
      ]
    },
    null,
    2
  ) + "\n"
const registryPath = new URL("provenance/registry/chart.json", root)
await writeFile(registryPath, payload)
manifest.registry.chart = {
  url: urls[0],
  sha256: hash(payload),
  primitive: "react",
  sources: urls.map((url, i) => ({ url, sha256: hash(sources[i]) })),
  capture: "scripts/capture-chart.mjs"
}
manifest.registry = Object.fromEntries(
  Object.entries(manifest.registry).sort(([a], [b]) => a.localeCompare(b))
)
manifest.snapshotRevision += 1
manifest.capturedAt = new Date().toISOString()
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n")
console.log(
  `Captured pinned Chart at ${commit} into ${fileURLToPath(registryPath)}.`
)
