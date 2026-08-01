import { render } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"

import { ScrollArea } from "@/components/ui/scroll-area"
import { ComponentShell } from "@/platform/component-shell"

afterEach(() => {
  document.body.replaceChildren()
})

describe("ComponentShell", () => {
  it("disables Base UI runtime style elements inside the ShadowRoot", () => {
    const host = document.createElement("div")
    document.body.append(host)
    const shadowRoot = host.attachShadow({ mode: "open" })
    const appRoot = document.createElement("div")
    const overlayRoot = document.createElement("div")
    shadowRoot.append(appRoot, overlayRoot)

    render(
      <ComponentShell
        overlayRoot={overlayRoot}
        parentElement={shadowRoot}
        resetKey="scroll-area"
      >
        <ScrollArea style={{ height: 100 }}>
          <div style={{ height: 300 }}>Scrollable</div>
        </ScrollArea>
      </ComponentShell>,
      { container: appRoot }
    )

    expect(
      shadowRoot.querySelector(
        "style[href='base-ui-disable-scrollbar']"
      )
    ).toBeNull()
    expect(
      shadowRoot.querySelector(
        ".base-ui-disable-scrollbar"
      )
    ).not.toBeNull()
  })
})
