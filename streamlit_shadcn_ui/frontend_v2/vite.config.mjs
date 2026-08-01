import path from "node:path"
import { fileURLToPath } from "node:url"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import {
  shadowCssInputPlugin,
  shadowCssOutputPlugin,
} from "./scripts/normalize-shadow-css.mjs"

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: "./",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [
    shadowCssInputPlugin(),
    react(),
    tailwindcss(),
    shadowCssOutputPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "src"),
    },
  },
  build: {
    cssCodeSplit: false,
    emptyOutDir: true,
    outDir: "dist",
    sourcemap: false,
    lib: {
      entry: path.resolve(projectRoot, "src/entry.tsx"),
      formats: ["es"],
    },
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
  },
})
