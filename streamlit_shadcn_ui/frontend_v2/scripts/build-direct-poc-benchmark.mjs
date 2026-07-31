import path from "node:path"
import { fileURLToPath } from "node:url"

import react from "@vitejs/plugin-react"
import { build } from "vite"

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const frontendRoot = path.resolve(scriptDirectory, "..")
const repositoryRoot = path.resolve(frontendRoot, "..", "..")
const fixtureRoot = path.join(
  repositoryRoot,
  "docs",
  "fixtures",
  "pre-production-v2-poc"
)
const outputArgument = process.argv[2]

if (!outputArgument) {
  throw new Error(
    "Pass an output directory for the direct Base UI benchmark build."
  )
}

const outputDirectory = path.resolve(outputArgument)

await build({
  base: "./",
  build: {
    cssCodeSplit: false,
    emptyOutDir: true,
    lib: {
      entry: path.join(fixtureRoot, "index.tsx"),
      formats: ["es"],
    },
    outDir: outputDirectory,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const names = [
            assetInfo.name,
            ...(assetInfo.names ?? []),
          ].filter(Boolean)
          return names.some((name) => name.endsWith(".css"))
            ? "style-[hash].css"
            : "asset-[name]-[hash][extname]"
        },
        chunkFileNames: "chunk-[name]-[hash].js",
        entryFileNames: "entry-[hash].js",
      },
    },
    sourcemap: false,
  },
  configFile: false,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  logLevel: "warn",
  plugins: [react()],
  resolve: {
    alias: {
      "@base-ui/react": path.join(
        frontendRoot,
        "node_modules",
        "@base-ui",
        "react"
      ),
      "@streamlit/component-v2-lib": path.join(
        frontendRoot,
        "node_modules",
        "@streamlit",
        "component-v2-lib"
      ),
      "lucide-react": path.join(
        frontendRoot,
        "node_modules",
        "lucide-react"
      ),
      react: path.join(frontendRoot, "node_modules", "react"),
      "react-dom": path.join(
        frontendRoot,
        "node_modules",
        "react-dom"
      ),
    },
  },
  root: frontendRoot,
})

console.log(outputDirectory)
