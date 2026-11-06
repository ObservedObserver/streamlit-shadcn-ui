// Expand the pinned Nova template, never a mutable hosted registry response.
import { createHash } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"

const root = new URL("../", import.meta.url)
const manifestPath = new URL("provenance/shadcn-base-ui.json", root)
const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
const base = `https://raw.githubusercontent.com/shadcn-ui/ui/${manifest.upstream.commit}/apps/v4/registry/`
const urls = [
  base + "bases/base/ui/item.tsx",
  base + "styles/style-nova.css",
]
const sources = await Promise.all(
  urls.map(async (url) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`${url}: ${response.status}`)
    return response.text()
  })
)
const hash = (text) => createHash("sha256").update(text).digest("hex")
const styles = new Map(
  [
    ...sources[1].matchAll(
      /\.(cn-item(?:-[a-z]+)*)\s*\{\s*@apply ([^;]+);\s*\}/g
    ),
  ].map((match) => [match[1], match[2]])
)
const content = sources[0]
  .replaceAll("@/registry/bases/base/", "@/registry/base-nova/")
  .replace(/cn-item(?:-[a-z]+)*/g, (marker) => {
    const value = styles.get(marker)
    if (!value) throw new Error(`Missing pinned Nova rule: ${marker}`)
    return value
  })
const payload =
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: "item",
      type: "registry:ui",
      dependencies: ["@base-ui/react", "class-variance-authority"],
      registryDependencies: ["utils", "separator"],
      files: [
        {
          path: "registry/base-nova/ui/item.tsx",
          type: "registry:ui",
          content,
        },
      ],
    },
    null,
    2
  ) + "\n"
await writeFile(new URL("provenance/registry/item.json", root), payload)
manifest.registry.item = {
  url: urls[0],
  sha256: hash(payload),
  primitive: "base-ui",
  sources: urls.map((url, i) => ({ url, sha256: hash(sources[i]) })),
  capture: "scripts/capture-item.mjs",
}
manifest.registry = Object.fromEntries(
  Object.entries(manifest.registry).sort(([a], [b]) => a.localeCompare(b))
)
manifest.snapshotRevision += 1
manifest.capturedAt = new Date().toISOString()
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n")
console.log(`Captured Item from pinned ${manifest.upstream.commit}.`)
