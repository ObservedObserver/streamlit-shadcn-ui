import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const v1OutputDirectory = process.env.SSUI_V1_OUT_DIR

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "./",
  build: v1OutputDirectory
    ? {
        emptyOutDir: true,
        outDir: v1OutputDirectory,
      }
    : undefined,
})
