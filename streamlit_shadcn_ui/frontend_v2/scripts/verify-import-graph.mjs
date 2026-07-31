import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
)
const adaptersDir = path.join(
  projectRoot,
  "src",
  "components",
  "streamlit"
)
const expectedEdges = {
  "alert.tsx": '@/components/ui/alert',
  "aspect-ratio.tsx": '@/components/ui/aspect-ratio',
  "avatar.tsx": '@/components/ui/avatar',
  "badge.tsx": '@/components/ui/badge',
  "breadcrumb.tsx": '@/components/ui/breadcrumb',
  "button.tsx": '@/components/ui/button',
  "card.tsx": '@/components/ui/card',
  "checkbox.tsx": '@/components/ui/checkbox',
  "dropdown-menu.tsx": '@/components/ui/dropdown-menu',
  "link-button.tsx": '@/components/ui/button',
  "progress.tsx": '@/components/ui/progress',
  "select.tsx": '@/components/ui/select',
  "separator.tsx": '@/components/ui/separator',
  "skeleton.tsx": '@/components/ui/skeleton',
  "table.tsx": '@/components/ui/table',
}

const adapterFiles = (await readdir(adaptersDir))
  .filter((file) => file.endsWith(".tsx"))
  .sort()

for (const [file, shadcnImport] of Object.entries(expectedEdges)) {
  if (!adapterFiles.includes(file)) {
    throw new Error(`Missing Streamlit adapter: ${file}.`)
  }
  const source = await readFile(path.join(adaptersDir, file), "utf8")
  if (!source.includes(shadcnImport)) {
    throw new Error(`${file} bypasses its checked-in shadcn component.`)
  }
  if (source.includes("@base-ui/react")) {
    throw new Error(`${file} imports Base UI directly.`)
  }
}

console.log("Verified Streamlit adapter -> shadcn source -> Base UI import graph.")
