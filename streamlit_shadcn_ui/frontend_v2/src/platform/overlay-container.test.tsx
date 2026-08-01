import {
  render,
  waitFor,
} from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import {
  OverlayContainerProvider,
  useOverlayContainer,
} from "@/platform/overlay-container"

function Probe() {
  const container = useOverlayContainer()
  return (
    <span data-testid="container-kind">
      {container instanceof HTMLElement ? container.dataset.testId : "shadow"}
    </span>
  )
}

function connectedShadowFixture() {
  const host = document.createElement("div")
  document.body.append(host)
  const shadowRoot = host.attachShadow({ mode: "open" })
  const overlayRoot = document.createElement("div")
  overlayRoot.dataset.testId = "overlay"
  shadowRoot.append(overlayRoot)
  return { host, overlayRoot, shadowRoot }
}

afterEach(() => {
  document.body.replaceChildren()
})

describe("OverlayContainerProvider", () => {
  it("provides an overlay root owned by the component ShadowRoot", () => {
    const { overlayRoot, shadowRoot } = connectedShadowFixture()
    const view = render(
      <OverlayContainerProvider
        container={overlayRoot}
        expectedRoot={shadowRoot}
      >
        <Probe />
      </OverlayContainerProvider>,
      { container: shadowRoot }
    )

    expect(view.getByTestId("container-kind").textContent).toBe("overlay")
  })

  it("rejects a document-level overlay root", () => {
    const { shadowRoot } = connectedShadowFixture()
    const escaped = document.createElement("div")
    document.body.append(escaped)

    expect(() =>
      render(
        <OverlayContainerProvider
          container={escaped}
          expectedRoot={shadowRoot}
        >
          <Probe />
        </OverlayContainerProvider>,
        { container: shadowRoot }
      )
    ).toThrow("SSUI_V2_OVERLAY_WRONG_ROOT")
  })

  it("rejects disconnected overlay roots", () => {
    const { host, overlayRoot, shadowRoot } = connectedShadowFixture()
    host.remove()

    expect(() =>
      render(
        <OverlayContainerProvider
          container={overlayRoot}
          expectedRoot={shadowRoot}
        >
          <Probe />
        </OverlayContainerProvider>,
        { container: shadowRoot }
      )
    ).toThrow("SSUI_V2_OVERLAY_DISCONNECTED")
  })

  it("fails closed without a provider", () => {
    expect(() => render(<Probe />)).toThrow(
      "SSUI_V2_OVERLAY_PROVIDER_MISSING"
    )
  })

  it("names WebKit VoiceOver focus guards without moving them", async () => {
    const { overlayRoot, shadowRoot } = connectedShadowFixture()
    render(
      <OverlayContainerProvider
        container={overlayRoot}
        expectedRoot={shadowRoot}
      >
        <Probe />
      </OverlayContainerProvider>,
      { container: shadowRoot }
    )
    const guard = document.createElement("span")
    guard.dataset.baseUiFocusGuard = ""
    shadowRoot.append(guard)
    guard.setAttribute("role", "button")

    await waitFor(() => {
      expect(guard.getAttribute("aria-label")).toBe("Focus boundary")
    })
    expect(guard.getRootNode()).toBe(shadowRoot)
  })
})
