import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  within,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactElement } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

import type { V2RendererArgs } from "@/app"
import { ComboboxView } from "@/components/streamlit/combobox"
import { ElementsView } from "@/components/streamlit/elements"
import { InputGroupView } from "@/components/streamlit/input-group"
import { ComponentShell } from "@/platform/component-shell"
import {
  parseEnvelope,
  type ComboboxEnvelope,
  type ElementsEnvelope,
  type InputGroupEnvelope,
} from "@/protocol/schema"

afterEach(() => {
  cleanup()
  document.body.replaceChildren()
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: undefined,
  })
})

function renderInShell(element: ReactElement) {
  const host = document.createElement("div")
  document.body.append(host)
  const shadowRoot = host.attachShadow({ mode: "open" })
  const appRoot = document.createElement("div")
  const overlayRoot = document.createElement("div")
  shadowRoot.append(appRoot, overlayRoot)
  const view = render(
    <ComponentShell
      overlayRoot={overlayRoot}
      parentElement={shadowRoot}
      resetKey="p0-foundations"
    >
      {element}
    </ComponentShell>,
    { container: appRoot }
  )
  return {
    ...view,
    root: within(shadowRoot as unknown as HTMLElement),
    shadowRoot,
  }
}

function comboboxEnvelope(
  selectionMode: "single" | "multiple" = "single"
): ComboboxEnvelope {
  return {
    protocolVersion: 1,
    kind: "combobox",
    state: {
      kind: "combobox",
      value: selectionMode === "single" ? null : [],
      clientRevision: 0,
      serverRevision: 0,
    },
    props: {
      clearable: true,
      disabled: false,
      emptyMessage: "No releases found.",
      label: "Release",
      options: [
        { label: "Alpha", value: "alpha" },
        { label: "Beta", value: "beta" },
      ],
      placeholder: "Select a release",
      selectionMode,
    },
  }
}

function inputGroupEnvelope(): InputGroupEnvelope {
  return {
    protocolVersion: 1,
    kind: "input_group",
    state: {
      kind: "input_group",
      value: "example.com",
      clientRevision: 0,
      serverRevision: 0,
    },
    props: {
      clearable: true,
      copyable: true,
      disabled: false,
      label: "Website",
      maxLength: 64,
      placeholder: "example.com",
      prefix: "https://",
      startIcon: "link",
      suffix: "verified",
      type: "url",
    },
  }
}

function buttonNode(id: string, text: string) {
  return {
    id,
    type: "button",
    props: {
      disabled: false,
      help: null,
      loading: false,
      size: "default",
      stretch: false,
      text,
      variant: "default",
    },
    children: [],
  }
}

function p0ElementsEnvelope(): ElementsEnvelope {
  const raw = {
    protocolVersion: 1,
    kind: "elements",
    state: {
      kind: "elements",
      value: {
        nodes: {
          "profile/website": {
            kind: "input_group",
            value: "example.com",
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
          id: "actions",
          type: "button_group",
          props: { label: "Editor actions", orientation: "horizontal" },
          children: [
            buttonNode("actions/run", "Run"),
            {
              id: "actions/separator",
              type: "button_group_separator",
              props: { orientation: "vertical" },
              children: [],
            },
            {
              id: "actions/text",
              type: "button_group_text",
              props: { text: "or" },
              children: [],
            },
          ],
        },
        {
          id: "details",
          type: "tooltip",
          props: { content: "Runs the current release", side: "top" },
          children: [buttonNode("details/run", "What happens?")],
        },
        {
          id: "confirm",
          type: "dialog",
          props: {
            description: "Review the pending action.",
            disabled: false,
            showCloseButton: true,
            title: "Confirm run",
            triggerLabel: "Open confirmation",
            triggerSize: "default",
            triggerVariant: "outline",
          },
          children: [
            {
              id: "confirm/body",
              type: "text",
              props: { text: "This action is safe to retry.", variant: "body" },
              children: [],
            },
            {
              id: "confirm/footer",
              type: "dialog_footer",
              props: {},
              children: [
                {
                  id: "confirm/done",
                  type: "dialog_close_button",
                  props: {
                    disabled: false,
                    loading: false,
                    size: "default",
                    text: "Done",
                    variant: "outline",
                  },
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: "empty",
          type: "empty",
          props: {},
          children: [
            {
              id: "empty/header",
              type: "empty_header",
              props: {},
              children: [
                {
                  id: "empty/media",
                  type: "empty_media",
                  props: { variant: "icon" },
                  children: [
                    {
                      id: "empty/loading",
                      type: "spinner",
                      props: { label: "Checking" },
                      children: [],
                    },
                  ],
                },
                {
                  id: "empty/title",
                  type: "empty_title",
                  props: { text: "No results" },
                  children: [],
                },
                {
                  id: "empty/description",
                  type: "empty_description",
                  props: { text: "Try another query." },
                  children: [],
                },
              ],
            },
            {
              id: "empty/content",
              type: "empty_content",
              props: {},
              children: [buttonNode("empty/reset", "Reset")],
            },
          ],
        },
        {
          id: "profile",
          type: "field_set",
          props: {
            description: "Public account details.",
            legend: "Profile",
            legendVariant: "legend",
          },
          children: [
            {
              id: "profile/group",
              type: "field_group",
              props: {},
              children: [
                {
                  id: "profile/field",
                  type: "field",
                  props: {
                    description: "Your public URL.",
                    error: "Check this address.",
                    label: "Website",
                    orientation: "vertical",
                  },
                  children: [
                    {
                      id: "profile/website",
                      type: "input_group",
                      props: inputGroupEnvelope().props,
                      children: [],
                    },
                  ],
                },
                {
                  id: "profile/separator",
                  type: "field_separator",
                  props: { text: "Optional" },
                  children: [],
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
    throw new Error("P0 Elements fixture failed protocol validation")
  }
  return parsed.envelope
}

describe("P0 standalone controls", () => {
  it("keeps Combobox filtering local and commits only a selection", async () => {
    const user = userEvent.setup()
    const setStateValueMock = vi.fn()
    const setStateValue =
      setStateValueMock as V2RendererArgs["setStateValue"]
    const view = renderInShell(
      <ComboboxView
        envelope={comboboxEnvelope()}
        setStateValue={setStateValue}
      />
    )
    const input = view.getByRole("combobox", {
      name: "Release",
    }) as HTMLInputElement
    await waitFor(() => {
      expect(
        view.getByRole("button", { name: "Open Release" })
      ).not.toBeNull()
    })

    await user.click(input)
    await user.type(input, "Bet")
    expect(setStateValueMock).not.toHaveBeenCalled()
    await user.click(view.root.getByRole("option", { name: "Beta" }))

    await waitFor(() => expect(setStateValueMock).toHaveBeenCalledTimes(1))
    expect(setStateValueMock.mock.calls[0]?.[1].value).toBe("beta")
    await waitFor(() => expect(input.value).toBe("Beta"))
    await waitFor(() => {
      expect(
        view.getByRole("button", { name: "Clear Release" })
      ).not.toBeNull()
    })
  })

  it("names multiple-selection chip removal actions", () => {
    const envelope = comboboxEnvelope("multiple")
    envelope.state.value = ["alpha"]
    const view = renderInShell(
      <ComboboxView envelope={envelope} setStateValue={vi.fn()} />
    )

    expect(
      view.getByRole("button", { name: "Remove Alpha" })
    ).not.toBeNull()
  })

  it("commits Input Group drafts while copy stays local and clear commits", async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    })
    const setStateValueMock = vi.fn()
    const setStateValue =
      setStateValueMock as V2RendererArgs["setStateValue"]
    const view = renderInShell(
      <InputGroupView
        envelope={inputGroupEnvelope()}
        setStateValue={setStateValue}
      />
    )
    const input = view.getByRole("textbox", {
      name: "Website",
    }) as HTMLInputElement

    fireEvent.change(input, { target: { value: "docs.example.com" } })
    expect(setStateValueMock).not.toHaveBeenCalled()

    await user.click(view.getByRole("button", { name: "Copy value" }))
    expect(writeText).toHaveBeenCalledWith("docs.example.com")
    expect(setStateValueMock).not.toHaveBeenCalled()

    fireEvent.keyDown(input, { key: "Enter" })
    expect(setStateValueMock).toHaveBeenCalledTimes(1)

    await user.click(view.getByRole("button", { name: "Clear value" }))
    expect(input.value).toBe("")
    expect(setStateValueMock).toHaveBeenCalledTimes(2)
    expect(setStateValueMock.mock.calls[1]?.[1].value).toBe("")
  })
})

describe("P0 Elements renderers", () => {
  it("renders Button Group, Empty, Field, Spinner, and Tooltip semantics", async () => {
    const user = userEvent.setup()
    const view = renderInShell(
      <ElementsView
        envelope={p0ElementsEnvelope()}
        setStateValue={vi.fn()}
        setTriggerValue={vi.fn()}
      />
    )

    expect(view.getByRole("group", { name: "Editor actions" })).not.toBeNull()
    expect(view.getByText("No results")).not.toBeNull()
    expect(view.getByRole("status", { name: "Checking" })).not.toBeNull()
    const website = view.getByRole("textbox", { name: "Website" })
    expect(website.getAttribute("aria-invalid")).toBe("true")
    expect(website.getAttribute("aria-describedby")).toContain("description")
    expect(website.getAttribute("aria-describedby")).toContain("error")

    await user.hover(view.getByRole("button", { name: "What happens?" }))
    await waitFor(() => {
      expect(view.root.getByText("Runs the current release")).not.toBeNull()
    })
  })

  it("opens Dialog in the shared overlay and restores trigger focus", async () => {
    const user = userEvent.setup()
    const setTriggerValueMock = vi.fn()
    const setTriggerValue =
      setTriggerValueMock as V2RendererArgs["setTriggerValue"]
    const view = renderInShell(
      <ElementsView
        envelope={p0ElementsEnvelope()}
        setStateValue={vi.fn()}
        setTriggerValue={setTriggerValue}
      />
    )
    const trigger = view.getByRole("button", {
      name: "Open confirmation",
    })

    await user.click(trigger)
    await waitFor(() => {
      expect(view.root.getByRole("dialog")).not.toBeNull()
    })
    expect(view.root.getByText("Confirm run")).not.toBeNull()
    expect(view.root.getByText("Review the pending action.")).not.toBeNull()

    await user.click(view.root.getByRole("button", { name: "Done" }))
    await waitFor(() => {
      expect(view.root.queryByRole("dialog")).toBeNull()
      expect(document.activeElement).not.toBe(trigger)
      expect(view.shadowRoot.activeElement).toBe(trigger)
    })
    await waitFor(() => expect(setTriggerValueMock).toHaveBeenCalledTimes(1))
  })
})


describe("Sheet composition", () => {
  function sheetEnvelope(): ElementsEnvelope {
    const base = p0ElementsEnvelope()
    const dialog = base.props.nodes.find((node) => node.type === "dialog")!
    // The serialized Sheet structure mirrors Dialog with an explicit side.
    const raw = JSON.parse(JSON.stringify(dialog).replaceAll("dialog", "sheet"))
    raw.props.side = "left"
    const parsed = parseEnvelope({ ...base, props: { nodes: [raw] },
      state: { ...base.state, value: { nodes: {}, sequence: 0 } } })
    if (!parsed.ok || parsed.envelope.kind !== "elements") throw new Error("Invalid Sheet")
    return parsed.envelope
  }

  it("rejects invalid side and mixed footer parents", () => {
    const envelope = sheetEnvelope()
    const raw = JSON.parse(JSON.stringify(envelope))
    raw.props.nodes[0].props.side = "center"
    expect(parseEnvelope(raw).ok).toBe(false)
    raw.props.nodes[0].props.side = "right"
    raw.props.nodes[0].children[1].type = "dialog_footer"
    expect(parseEnvelope(raw).ok).toBe(false)
  })

  it("uses the shared overlay and releases modal effects on unmount", async () => {
    const view = renderInShell(<ElementsView envelope={sheetEnvelope()}
      setStateValue={vi.fn()} setTriggerValue={vi.fn()} />)
    const user = userEvent.setup()
    await user.click(view.getByRole("button", { name: "Open confirmation" }))
    await waitFor(() => expect(view.root.getByRole("dialog")).not.toBeNull())
    expect(view.root.getByRole("dialog").getAttribute("data-side")).toBe("left")
    view.unmount()
    expect(document.body.style.overflow).not.toBe("hidden")
    expect(view.shadowRoot.querySelector("[data-slot=sheet-content]")).toBeNull()
  })

  it("activates a newer Sheet then resumes the previous Dialog", async () => {
    const sheet = sheetEnvelope()
    const dialog = p0ElementsEnvelope().props.nodes.find((node) => node.type === "dialog")!
    const second = JSON.parse(JSON.stringify(sheet.props.nodes[0]).replaceAll("confirm", "queued"))
    second.props.triggerLabel = "Open queued sheet"
    second.props.title = "Queued sheet"
    const envelope = { ...sheet, props: { nodes: [dialog, second] } }
    const view = renderInShell(<ElementsView envelope={envelope}
      setStateValue={vi.fn()} setTriggerValue={vi.fn()} />)
    fireEvent.click(view.getByRole("button", { name: "Open confirmation" }))
    await waitFor(() => expect(view.root.getByRole("dialog")).not.toBeNull())
    fireEvent.click(view.getByRole("button", { name: "Open queued sheet", hidden: true }))
    await waitFor(() => expect(view.root.getByRole("dialog", { name: "Queued sheet" })).not.toBeNull())
    expect(view.shadowRoot.querySelectorAll("[data-slot=sheet-content][data-open]").length).toBe(1)
    fireEvent.click(within(view.root.getByRole("dialog", { name: "Queued sheet" })).getByRole("button", { name: "Done" }))
    await waitFor(() => expect(view.root.getByRole("dialog", { name: "Confirm run" })).not.toBeNull())
  })

})
