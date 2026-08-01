import { describe, expect, it, vi } from "vitest"

import {
  createModalLayerCoordinator,
  deepActiveElement,
} from "@/platform/modal-layer"

describe("ModalLayerCoordinator v1", () => {
  it("keeps only the newest independent modal active", () => {
    const coordinator = createModalLayerCoordinator()
    const first = vi.fn()
    const second = vi.fn()
    const releaseFirst = coordinator.acquire(Symbol("first"), first)
    const releaseSecond = coordinator.acquire(Symbol("second"), second)

    expect(first.mock.calls).toEqual([[true], [false]])
    expect(second.mock.calls).toEqual([[true]])
    expect(coordinator.ownerCount()).toBe(2)

    releaseSecond()
    expect(first.mock.calls).toEqual([[true], [false], [true]])
    expect(coordinator.ownerCount()).toBe(1)

    releaseSecond()
    releaseFirst()
    expect(coordinator.ownerCount()).toBe(0)
  })

  it("finds the real focused element through nested ShadowRoots", () => {
    const outerHost = document.createElement("div")
    const innerHost = document.createElement("div")
    const button = document.createElement("button")
    document.body.append(outerHost)
    const outerRoot = outerHost.attachShadow({ mode: "open" })
    outerRoot.append(innerHost)
    const innerRoot = innerHost.attachShadow({ mode: "open" })
    innerRoot.append(button)
    button.focus()

    expect(deepActiveElement()).toBe(button)
  })

  it("snapshots and restores native inert across independent roots", () => {
    const coordinator = createModalLayerCoordinator()
    const firstBranch = document.createElement("section")
    const secondBranch = document.createElement("section")
    const background = document.createElement("main")
    const firstBoundary = document.createElement("div")
    const secondBoundary = document.createElement("div")
    firstBranch.append(firstBoundary)
    secondBranch.append(secondBoundary)
    background.setAttribute("inert", "existing")
    document.body.append(firstBranch, secondBranch, background)

    const releaseFirst = coordinator.acquire(
      Symbol("first"),
      () => {},
      () => firstBoundary
    )
    expect(firstBranch.hasAttribute("inert")).toBe(false)
    expect(secondBranch.hasAttribute("inert")).toBe(true)
    expect(background.getAttribute("inert")).toBe("existing")

    const releaseSecond = coordinator.acquire(
      Symbol("second"),
      () => {},
      () => secondBoundary
    )
    expect(firstBranch.hasAttribute("inert")).toBe(true)
    expect(secondBranch.hasAttribute("inert")).toBe(false)
    expect(background.getAttribute("inert")).toBe("existing")

    releaseSecond()
    expect(firstBranch.hasAttribute("inert")).toBe(false)
    expect(secondBranch.hasAttribute("inert")).toBe(true)

    releaseFirst()
    expect(firstBranch.hasAttribute("inert")).toBe(false)
    expect(secondBranch.hasAttribute("inert")).toBe(false)
    expect(background.getAttribute("inert")).toBe("existing")
  })
})
