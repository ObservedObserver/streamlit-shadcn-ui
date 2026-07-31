import { createHash } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
)
const registryDir = path.join(projectRoot, "provenance", "registry")
const manifestPath = path.join(
  projectRoot,
  "provenance",
  "shadcn-base-ui.json"
)

function sha256(content) {
  return createHash("sha256").update(content).digest("hex")
}

function parseArguments() {
  const args = process.argv.slice(2)
  if (
    args[0] !== "--upstream-commit" ||
    !/^[0-9a-f]{40}$/.test(args[1] ?? "") ||
    args.length < 3
  ) {
    throw new Error(
      "Use --upstream-commit <40-character-sha> <registry-item> [...]."
    )
  }

  const items = [...new Set(args.slice(2))].sort()
  if (items.some((item) => !/^[a-z0-9-]+$/.test(item))) {
    throw new Error("Registry item names must be lowercase kebab-case.")
  }
  return { commit: args[1], items }
}

async function fetchStablePayload(url, item) {
  const responses = []
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch(url, {
      headers: { "cache-control": "no-cache" },
    })
    if (!response.ok) {
      throw new Error(
        `Unable to capture ${item}: ${response.status} ${response.statusText}.`
      )
    }
    responses.push(Buffer.from(await response.arrayBuffer()))
  }

  if (!responses[0].equals(responses[1])) {
    throw new Error(
      `Registry item ${item} changed during capture; retry from a stable registry.`
    )
  }

  const payload = JSON.parse(responses[0].toString("utf8"))
  if (
    payload.name !== item ||
    !Array.isArray(payload.files) ||
    payload.files.length !== 1 ||
    typeof payload.files[0]?.content !== "string"
  ) {
    throw new Error(`Unexpected registry payload shape for ${item}.`)
  }
  return {
    content: responses[0],
    primitive: payload.files[0].content.includes("@base-ui/react")
      ? "base-ui"
      : "react",
  }
}

const { commit, items } = parseArguments()
const manifest = JSON.parse(await readFile(manifestPath, "utf8"))
const style = manifest.generator?.style
if (typeof style !== "string" || !/^[a-z0-9-]+$/.test(style)) {
  throw new Error("The provenance manifest has no safe generator.style.")
}

for (const item of items) {
  const url = `https://ui.shadcn.com/r/styles/${style}/${item}.json`
  const { content, primitive } = await fetchStablePayload(url, item)
  await writeFile(path.join(registryDir, `${item}.json`), content)
  manifest.registry[item] = {
    url,
    sha256: sha256(content),
    primitive,
  }
}

manifest.capturedAt = new Date().toISOString()
manifest.snapshotRevision = (manifest.snapshotRevision ?? 1) + 1
manifest.upstream.commit = commit
manifest.registry = Object.fromEntries(
  Object.entries(manifest.registry).sort(([left], [right]) =>
    left.localeCompare(right)
  )
)

await writeFile(
  manifestPath,
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
)

console.log(
  `Captured ${items.length} shadcn ${style} registry items at ${commit}.`
)
