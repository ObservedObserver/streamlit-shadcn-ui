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
  "accordion.tsx": '@/components/ui/accordion',
  "alert.tsx": '@/components/ui/alert',
  "aspect-ratio.tsx": '@/components/ui/aspect-ratio',
  "avatar.tsx": '@/components/ui/avatar',
  "badge.tsx": '@/components/ui/badge',
  "breadcrumb.tsx": '@/components/ui/breadcrumb',
  "button.tsx": '@/components/ui/button',
  "card.tsx": '@/components/ui/card',
  "checkbox.tsx": '@/components/ui/checkbox',
  "collapsible.tsx": '@/components/ui/collapsible',
  "calendar.tsx": '@/components/ui/calendar',
  "dropdown-menu.tsx": '@/components/ui/dropdown-menu',
  "input-otp.tsx": '@/components/ui/input-otp',
  "input.tsx": '@/components/ui/input',
  "link-button.tsx": '@/components/ui/button',
  "pagination.tsx": '@/components/ui/pagination',
  "progress.tsx": '@/components/ui/progress',
  "radio-group.tsx": '@/components/ui/radio-group',
  "scroll-area.tsx": '@/components/ui/scroll-area',
  "select.tsx": '@/components/ui/select',
  "separator.tsx": '@/components/ui/separator',
  "skeleton.tsx": '@/components/ui/skeleton',
  "slider.tsx": '@/components/ui/slider',
  "switch.tsx": '@/components/ui/switch',
  "table.tsx": '@/components/ui/table',
  "tabs.tsx": '@/components/ui/tabs',
  "textarea.tsx": '@/components/ui/textarea',
  "toggle-group.tsx": '@/components/ui/toggle-group',
  "toggle.tsx": '@/components/ui/toggle',
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
