import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process"
import { once } from "node:events"
import { mkdtemp, rm } from "node:fs/promises"
import net from "node:net"
import os from "node:os"
import path from "node:path"
import { performance } from "node:perf_hooks"
import { fileURLToPath } from "node:url"

import {
  expect,
  test,
  type Browser,
  type Page,
} from "@playwright/test"

const frontendRoot = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(frontendRoot, "..", "..", "..")
const fixture = path.join(
  repositoryRoot,
  "tests",
  "v2",
  "fixtures",
  "direct_poc_performance.py"
)
const buildScript = path.join(
  frontendRoot,
  "..",
  "scripts",
  "build-direct-poc-benchmark.mjs"
)
const python = process.env.SSUI_V2_PYTHON ?? "python3"

type Server = {
  output: () => string
  process: ChildProcessWithoutNullStreams
}

type ComparisonResult = {
  initialMedianMs: number
  initialSamplesMs: number[]
  perRerenderMs: number
  rerenderMs: number
}

async function freePort(): Promise<number> {
  const server = net.createServer()
  server.unref()
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject)
    server.listen(0, "127.0.0.1", resolve)
  })
  const address = server.address()
  if (address === null || typeof address === "string") {
    server.close()
    throw new Error("Unable to allocate a performance-test port.")
  }
  const port = address.port
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()))
  })
  return port
}

async function runBuild(outputDirectory: string): Promise<void> {
  const child = spawn(
    process.execPath,
    [buildScript, outputDirectory],
    {
      cwd: path.join(frontendRoot, ".."),
      stdio: "pipe",
    }
  )
  let output = ""
  const collect = (chunk: Buffer) => {
    output = `${output}${chunk.toString("utf8")}`.slice(-20_000)
  }
  child.stdout.on("data", collect)
  child.stderr.on("data", collect)
  const [exitCode] = await once(child, "exit")
  if (exitCode !== 0) {
    throw new Error(`Direct POC benchmark build failed.\n${output}`)
  }
}

function startServer(
  mode: "direct-base-ui" | "shadcn",
  assetDirectory: string,
  port: number
): Server {
  const child = spawn(
    python,
    [
      "-m",
      "streamlit",
      "run",
      fixture,
      "--server.headless=true",
      "--server.address=127.0.0.1",
      `--server.port=${port}`,
      "--browser.gatherUsageStats=false",
    ],
    {
      cwd: repositoryRoot,
      env: {
        ...process.env,
        SSUI_V2_DIRECT_POC_ASSET_DIR: assetDirectory,
        SSUI_V2_PERFORMANCE_MODE: mode,
      },
      stdio: "pipe",
    }
  )
  let output = ""
  const collect = (chunk: Buffer) => {
    output = `${output}${chunk.toString("utf8")}`.slice(-20_000)
  }
  child.stdout.on("data", collect)
  child.stderr.on("data", collect)
  return { output: () => output, process: child }
}

async function waitForServer(server: Server, url: string) {
  const deadline = Date.now() + 60_000
  while (Date.now() < deadline) {
    if (server.process.exitCode !== null) {
      throw new Error(
        `Streamlit exited before startup.\n${server.output()}`
      )
    }
    try {
      const response = await fetch(url)
      if (response.ok) {
        return
      }
    } catch {
      // The socket is expected to reject until Streamlit is listening.
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  throw new Error(`Timed out starting Streamlit.\n${server.output()}`)
}

async function stopServer(server: Server | null) {
  if (server === null || server.process.exitCode !== null) {
    return
  }
  server.process.kill("SIGINT")
  await Promise.race([
    once(server.process, "exit"),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ])
  if (server.process.exitCode === null) {
    server.process.kill("SIGTERM")
    await once(server.process, "exit")
  }
}

async function expectReady(page: Page): Promise<void> {
  await expect(
    page.getByRole("heading", {
      name: "V2 direct POC performance comparison",
    })
  ).toBeVisible({ timeout: 60_000 })
  await expect(
    page.getByRole("combobox", { name: "Benchmark Select" })
  ).toBeVisible()
  await expect(page.locator("iframe")).toHaveCount(0)
}

function median(values: number[]): number {
  const ordered = [...values].sort((left, right) => left - right)
  return ordered[Math.floor(ordered.length / 2)]
}

async function measure(
  browser: Browser,
  mode: "direct-base-ui" | "shadcn",
  assetDirectory: string
): Promise<ComparisonResult> {
  const port = await freePort()
  const url = `http://127.0.0.1:${port}`
  const server = startServer(mode, assetDirectory, port)

  try {
    await waitForServer(server, url)
    const initialSamplesMs: number[] = []

    for (let trial = 0; trial < 3; trial += 1) {
      const context = await browser.newContext()
      const page = await context.newPage()
      const startedAt = performance.now()
      await page.goto(`${url}/?trial=${trial}`)
      await expectReady(page)
      initialSamplesMs.push(performance.now() - startedAt)
      await context.close()
    }

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(`${url}/?rerender=1`)
    await expectReady(page)
    const startedAt = performance.now()
    await page.getByRole("button", {
      name: "Run 100 comparison rerenders",
    }).click()
    await expect(
      page
        .getByText("Comparison rerenders completed:")
        .locator("code")
    ).toHaveText("100", { timeout: 150_000 })
    const rerenderMs = performance.now() - startedAt
    await context.close()

    return {
      initialMedianMs: median(initialSamplesMs),
      initialSamplesMs,
      perRerenderMs: rerenderMs / 100,
      rerenderMs,
    }
  } finally {
    await stopServer(server)
  }
}

test("records shadcn overhead against the archived direct Base UI POC", async ({
  browser,
  browserName,
}, testInfo) => {
  test.skip(browserName !== "chromium", "performance comparison runs once")
  test.setTimeout(300_000)

  const temporaryRoot = await mkdtemp(
    path.join(os.tmpdir(), "ssui-v2-direct-poc-")
  )
  const assetDirectory = path.join(temporaryRoot, "dist")

  try {
    await runBuild(assetDirectory)
    const directBaseUi = await measure(
      browser,
      "direct-base-ui",
      assetDirectory
    )
    const shadcn = await measure(browser, "shadcn", assetDirectory)
    const comparison = {
      directBaseUi,
      initialMedianRatio:
        shadcn.initialMedianMs / directBaseUi.initialMedianMs,
      rerenderRatio:
        shadcn.perRerenderMs / directBaseUi.perRerenderMs,
      shadcn,
    }

    expect(shadcn.initialMedianMs).toBeLessThanOrEqual(
      directBaseUi.initialMedianMs * 3 + 2_000
    )
    expect(shadcn.perRerenderMs).toBeLessThanOrEqual(
      directBaseUi.perRerenderMs * 3 + 20
    )

    console.log(
      `V2_DIRECT_POC_COMPARISON ${JSON.stringify(comparison)}`
    )
    await testInfo.attach("v2-direct-poc-comparison.json", {
      body: JSON.stringify(comparison, null, 2),
      contentType: "application/json",
    })
  } finally {
    await rm(temporaryRoot, { recursive: true })
  }
})
