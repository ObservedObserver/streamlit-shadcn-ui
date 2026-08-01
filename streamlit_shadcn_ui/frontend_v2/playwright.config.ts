import path from "node:path"
import { fileURLToPath } from "node:url"

import {
  defineConfig,
  devices,
} from "@playwright/test"

const frontendRoot = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(frontendRoot, "..", "..")
const port = process.env.SSUI_V2_E2E_PORT ?? "8503"
const baseURL =
  process.env.SSUI_V2_E2E_BASE_URL ??
  `http://127.0.0.1:${port}`
const python = process.env.SSUI_V2_PYTHON ?? "python3"
const app = process.env.SSUI_V2_E2E_APP ?? "V2_POC.py"
const suite = process.env.SSUI_V2_E2E_SUITE
const selfManagedServer = new Set([
  "asset-upgrade",
  "performance-comparison",
]).has(suite ?? "")

export default defineConfig({
  expect: {
    timeout: 10_000,
  },
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: false,
  outputDir: path.join(
    repositoryRoot,
    "output",
    "playwright",
    `${suite ?? "wave1"}-automated`
  ),
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  reporter: [["list"]],
  retries: process.env.CI ? 1 : 0,
  testDir: "./e2e",
  testMatch: suite
    ? `${suite}.spec.ts`
    : ["wave1.spec.ts", "performance.spec.ts"],
  timeout: 60_000,
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer:
    selfManagedServer
      ? undefined
      : {
          command: `"${python}" -m streamlit run "${app}" --server.headless true --server.address 127.0.0.1 --server.port ${port} --browser.gatherUsageStats false`,
          cwd: repositoryRoot,
          reuseExistingServer: !process.env.CI,
          timeout: 60_000,
          url: baseURL,
        },
  workers: 1,
})
