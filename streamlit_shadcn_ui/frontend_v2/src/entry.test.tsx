import type { FrontendRendererArgs } from "@streamlit/component-v2-lib"
import { afterEach, describe, expect, it, vi } from "vitest"

import type { V2FrontendState } from "@/app"

const reactMocks = vi.hoisted(() => {
  const render = vi.fn()
  const unmount = vi.fn()
  return {
    createRoot: vi.fn(() => ({ render, unmount })),
    render,
    unmount,
  }
})

vi.mock("react-dom/client", () => ({
  createRoot: reactMocks.createRoot,
}))

import renderer from "@/entry"

type Args = FrontendRendererArgs<V2FrontendState, unknown>

function fixture() {
  const host = document.createElement("div")
  document.body.append(host)
  const parentElement = host.attachShadow({ mode: "open" })
  const appRoot = document.createElement("div")
  appRoot.dataset.ssuiV2AppRoot = ""
  const overlayRoot = document.createElement("div")
  overlayRoot.dataset.ssuiV2OverlayRoot = ""
  overlayRoot.setAttribute("popover", "manual")
  parentElement.append(appRoot, overlayRoot)

  const args: Args = {
    data: {
      protocolVersion: 1,
      kind: "button",
      props: {
        disabled: false,
        text: "Run",
        variant: "default",
      },
    },
    key: "stable-frontend-key",
    name: "streamlit-shadcn-ui.v2",
    parentElement,
    setStateValue: vi.fn(),
    setTriggerValue: vi.fn(),
  }
  return { appRoot, args, host, overlayRoot, parentElement }
}

afterEach(() => {
  document.body.replaceChildren()
  reactMocks.createRoot.mockClear()
  reactMocks.render.mockClear()
  reactMocks.unmount.mockClear()
})

describe("Streamlit V2 renderer lifecycle", () => {
  it("reuses one React root for 100 data/theme rerenders", () => {
    const { args, appRoot, overlayRoot } = fixture()
    const cleanups: Array<() => void> = []

    for (let index = 0; index < 100; index += 1) {
      const cleanup = renderer({
        ...args,
        data: {
          ...args.data as Record<string, unknown>,
          props: {
            disabled: false,
            text: `Run ${index}`,
            variant: "default",
          },
        },
      })
      expect(cleanup).toBeTypeOf("function")
      cleanups.push(cleanup as () => void)
    }

    expect(reactMocks.createRoot).toHaveBeenCalledTimes(1)
    expect(reactMocks.render).toHaveBeenCalledTimes(100)
    expect(appRoot.isConnected).toBe(true)
    expect(overlayRoot.isConnected).toBe(true)

    cleanups.at(-1)?.()
    cleanups[0]?.()
    expect(reactMocks.unmount).toHaveBeenCalledTimes(1)
  })

  it("cleans overlays and can mount a fresh root after unmount", () => {
    const { args, overlayRoot, parentElement } = fixture()
    const portal = document.createElement("div")
    overlayRoot.append(portal)
    const cleanup = renderer(args)

    cleanup?.()
    cleanup?.()

    expect(overlayRoot.childElementCount).toBe(0)
    expect(reactMocks.unmount).toHaveBeenCalledTimes(1)

    renderer(args)
    expect(reactMocks.createRoot).toHaveBeenCalledTimes(2)
    expect(parentElement.querySelector("[data-ssui-v2-app-root]")).not.toBeNull()
  })

  it("fails closed when Streamlit's fixed roots are missing", () => {
    const host = document.createElement("div")
    document.body.append(host)
    const parentElement = host.attachShadow({ mode: "open" })

    expect(() =>
      renderer({
        ...fixture().args,
        parentElement,
      })
    ).toThrow("SSUI_V2_APP_ROOT_MISSING")
  })
})
