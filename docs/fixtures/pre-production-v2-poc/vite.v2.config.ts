import path from "path";
import process from "node:process";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "production"),
  },
  base: "./",
  build: {
    outDir: "dist/v2",
    // Keep previous assets during watch rebuilds so Streamlit doesn't read an empty dir.
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "./src/v2/index.tsx"),
      formats: ["es"],
      fileName: () => "components.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "style.css";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
});
