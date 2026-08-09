import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import type { V2RendererArgs } from "@/app"
import { ElementsView } from "@/components/streamlit/elements"
import { parseEnvelope } from "@/protocol/schema"

afterEach(cleanup)

function elementsEnvelope() {
  const raw = {
    protocolVersion: 1,
    kind: "elements",
    state: {
      kind: "elements",
      value: {
        nodes: {
          "settings/email": {
            kind: "input",
            value: "ada@example.com",
            clientRevision: 0,
            serverRevision: 0,
            changeSequence: 0,
          },
          "settings/alerts": {
            kind: "checkbox",
            value: true,
            clientRevision: 0,
            serverRevision: 0,
            changeSequence: 0,
          },
        },
        sequence: 0,
      },
      clientRevision: 0,
      serverRevision: 0,
    },
    props: {
      nodes: [
        {
          id: "settings",
          type: "card",
          props: { size: "default" },
          children: [
            {
              id: "settings/header",
              type: "card_header",
              props: {},
              children: [
                {
                  id: "settings/header/title",
                  type: "heading",
                  props: { text: "Account settings", level: 3 },
                  children: [],
                },
              ],
            },
            {
              id: "settings/content",
              type: "card_content",
              props: {},
              children: [
                {
                  id: "settings/form",
                  type: "stack",
                  props: {
                    direction: "vertical",
                    gap: "sm",
                    align: "stretch",
                    justify: "start",
                    wrap: false,
                  },
                  children: [
                    {
                      id: "settings/email",
                      type: "input",
                      props: {
                        label: "Email",
                        placeholder: "",
                        type: "email",
                        disabled: false,
                        maxLength: null,
                      },
                      children: [],
                    },
                    {
                      id: "settings/alerts",
                      type: "checkbox",
                      props: {
                        label: "Security alerts",
                        disabled: false,
                      },
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: "settings/footer",
              type: "card_footer",
              props: {},
              children: [
                {
                  id: "settings/actions",
                  type: "stack",
                  props: {
                    direction: "horizontal",
                    gap: "sm",
                    align: "center",
                    justify: "end",
                    wrap: false,
                  },
                  children: [
                    {
                      id: "settings/cancel",
                      type: "button",
                      props: {
                        disabled: false,
                        text: "Cancel",
                        variant: "outline",
                        size: "default",
                        stretch: false,
                      },
                      children: [],
                    },
                    {
                      id: "settings/save",
                      type: "button",
                      props: {
                        disabled: false,
                        text: "Save",
                        variant: "default",
                        size: "default",
                        stretch: false,
                      },
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  }
  const parsed = parseEnvelope(raw)
  if (!parsed.ok || parsed.envelope.kind !== "elements") {
    throw new Error("Elements fixture failed protocol validation")
  }
  return parsed.envelope
}

describe("ElementsView", () => {
  it("renders a nested tree and commits one keyed aggregate state", async () => {
    const setStateValueMock = vi.fn()
    const setStateValue = setStateValueMock as V2RendererArgs["setStateValue"]
    render(
      <ElementsView
        envelope={elementsEnvelope()}
        setStateValue={setStateValue}
        setTriggerValue={vi.fn()}
      />
    )

    expect(screen.getByText("Account settings")).not.toBeNull()
    expect(
      screen
        .getByRole("checkbox", { name: "Security alerts" })
        .getAttribute("aria-checked")
    ).toBe("true")
    const input = screen.getByLabelText("Email")
    fireEvent.change(input, { target: { value: "grace@example.com" } })
    fireEvent.blur(input)

    await waitFor(() => expect(setStateValueMock).toHaveBeenCalledTimes(1))
    const [name, state] = setStateValueMock.mock.calls[0] as [
      string,
      {
        value: {
          nodes: Record<string, { value: unknown; changeSequence: number }>
          sequence: number
        }
      },
    ]
    expect(name).toBe("state")
    expect(state.value.nodes["settings/email"]?.value).toBe(
      "grace@example.com"
    )
    expect(state.value.nodes["settings/alerts"]?.value).toBe(true)
    expect(state.value.nodes["settings/email"]?.changeSequence).toBe(1)
    expect(state.value.sequence).toBe(1)
  })

  it("batches multiple same-task actions in deterministic order", async () => {
    const setTriggerValue = vi.fn() as V2RendererArgs["setTriggerValue"]
    render(
      <ElementsView
        envelope={elementsEnvelope()}
        setStateValue={vi.fn()}
        setTriggerValue={setTriggerValue}
      />
    )

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Cancel" }))
      fireEvent.click(screen.getByRole("button", { name: "Save" }))
    })
    await act(async () => {
      await Promise.resolve()
    })

    expect(setTriggerValue).toHaveBeenCalledTimes(1)
    expect(setTriggerValue).toHaveBeenCalledWith("events", [
      {
        nodeId: "settings/cancel",
        type: "click",
        payload: true,
        sequence: 1,
      },
      {
        nodeId: "settings/save",
        type: "click",
        payload: true,
        sequence: 2,
      },
    ])
  })
})
