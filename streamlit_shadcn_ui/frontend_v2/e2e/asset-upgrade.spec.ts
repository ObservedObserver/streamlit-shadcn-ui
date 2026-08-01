import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process"
import { createHash } from "node:crypto"
import { once } from "node:events"
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises"
import net from "node:net"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { expect, test, type Page } from "@playwright/test"

const frontendRoot = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(frontendRoot, "..", "..", "..")
const sourceDist = path.join(frontendRoot, "..", "dist")
const fixture = path.join(
  repositoryRoot,
  "tests",
  "v2",
  "fixtures",
  "asset_upgrade_v2.py"
)
const python = process.env.SSUI_V2_PYTHON ?? "python3"

type Server = {
  output: () => string
  process: ChildProcessWithoutNullStreams
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
    throw new Error("Unable to allocate an upgrade-test port.")
  }
  const port = address.port
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()))
  })
  return port
}

async function createVariant(
  root: string,
  name: "a" | "b",
  javascript: string,
  stylesheet: string
) {
  const directory = path.join(root, name)
  await mkdir(directory)
  const javascriptVariant =
    `${javascript}\n` +
    `globalThis.__SSUI_CACHE_UPGRADE_MARKER__=${JSON.stringify(name)};\n`
  const stylesheetVariant =
    `${stylesheet}\n:host{--ssui-cache-upgrade:${name};}\n`
  const entryHash = createHash("sha256")
    .update(javascriptVariant)
    .digest("hex")
    .slice(0, 12)
  const styleHash = createHash("sha256")
    .update(stylesheetVariant)
    .digest("hex")
    .slice(0, 12)
  const entry = `entry-${entryHash}.js`
  const style = `style-${styleHash}.css`
  await writeFile(path.join(directory, entry), javascriptVariant, "utf8")
  await writeFile(path.join(directory, style), stylesheetVariant, "utf8")
  return { directory, entry }
}

function startServer(directory: string, port: number): Server {
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
        SSUI_V2_TEST_ASSET_DIR: directory,
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

async function cssUpgradeMarker(page: Page) {
  return page
    .getByRole("button", { name: "Upgrade fixture" })
    .evaluate((element) => {
      const root = element.getRootNode()
      if (!(root instanceof ShadowRoot)) {
        return null
      }
      return getComputedStyle(root.host)
        .getPropertyValue("--ssui-cache-upgrade")
        .trim()
    })
}

async function javascriptUpgradeMarker(page: Page) {
  return page.evaluate(() =>
    Reflect.get(globalThis, "__SSUI_CACHE_UPGRADE_MARKER__")
  )
}

test("a changed entry hash bypasses the public asset cache", async ({
  browserName,
  page,
}) => {
  test.skip(browserName !== "chromium", "cache upgrade contract runs once")
  test.setTimeout(120_000)

  const temporaryRoot = await mkdtemp(
    path.join(os.tmpdir(), "ssui-v2-asset-upgrade-")
  )
  const files = await readdir(sourceDist)
  const entryName = files.find((name) => /^entry-.*\.js$/.test(name))
  const styleName = files.find((name) => /^style-.*\.css$/.test(name))
  expect(entryName).toBeTruthy()
  expect(styleName).toBeTruthy()
  const javascript = await readFile(
    path.join(sourceDist, entryName as string),
    "utf8"
  )
  const stylesheet = await readFile(
    path.join(sourceDist, styleName as string),
    "utf8"
  )
  const variantA = await createVariant(
    temporaryRoot,
    "a",
    javascript,
    stylesheet
  )
  const variantB = await createVariant(
    temporaryRoot,
    "b",
    javascript,
    stylesheet
  )
  expect(variantA.entry).not.toBe(variantB.entry)
  const port = await freePort()
  const url = `http://127.0.0.1:${port}`
  let server: Server | null = null
  let responses: Array<{
    cacheControl: string | undefined
    url: string
  }> = []
  page.on("response", (response) => {
    if (
      response.url().endsWith(variantA.entry) ||
      response.url().endsWith(variantB.entry)
    ) {
      responses.push({
        cacheControl: response.headers()["cache-control"],
        url: response.url(),
      })
    }
  })

  try {
    server = startServer(variantA.directory, port)
    await waitForServer(server, url)
    await page.goto(url)
    await expect(
      page.getByRole("heading", {
        name: "Streamlit Shadcn UI V2 asset upgrade",
      })
    ).toBeVisible({ timeout: 60_000 })
    await expect(
      page.getByRole("button", { name: "Upgrade fixture" })
    ).toBeVisible()
    await expect(page.locator("iframe")).toHaveCount(0)
    expect(await javascriptUpgradeMarker(page)).toBe("a")
    expect(await cssUpgradeMarker(page)).toBe("a")
    expect(responses).toContainEqual({
      cacheControl: expect.stringContaining("public"),
      url: expect.stringMatching(
        new RegExp(`${variantA.entry.replace(".", "\\.")}$`)
      ),
    })

    await stopServer(server)
    server = startServer(variantB.directory, port)
    await waitForServer(server, url)
    responses = []
    await page.goto(`${url}/?release=b`)
    await expect(
      page.getByRole("button", { name: "Upgrade fixture" })
    ).toBeVisible({ timeout: 60_000 })
    await expect(page.locator("iframe")).toHaveCount(0)
    expect(await javascriptUpgradeMarker(page)).toBe("b")
    expect(await cssUpgradeMarker(page)).toBe("b")
    expect(responses).toContainEqual({
      cacheControl: expect.stringContaining("public"),
      url: expect.stringMatching(
        new RegExp(`${variantB.entry.replace(".", "\\.")}$`)
      ),
    })
    expect(
      await page.evaluate(
        (oldEntry) =>
          performance
            .getEntriesByType("resource")
            .some((entry) => entry.name.endsWith(oldEntry)),
        variantA.entry
      )
    ).toBe(false)
  } finally {
    await stopServer(server)
    await rm(temporaryRoot, { recursive: true })
  }
})
