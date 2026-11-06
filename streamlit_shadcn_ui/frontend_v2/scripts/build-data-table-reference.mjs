import path from "node:path"
import { fileURLToPath } from "node:url"
import { build } from "vite"
import react from "@vitejs/plugin-react"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
await build({
  configFile: false,
  root,
  plugins: [react()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  resolve: { alias: { "@": path.join(root, "src") } },
  build: {
    outDir: path.join(root, "../../output/data-table-reference"),
    emptyOutDir: true,
    lib: {
      entry: path.join(root, "e2e/fixtures/data-table-reference.tsx"),
      formats: ["es"],
      fileName: () => "reference.js"
    }
  }
})
