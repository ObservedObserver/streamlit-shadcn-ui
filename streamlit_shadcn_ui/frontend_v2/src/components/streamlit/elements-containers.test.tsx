import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react"
import { afterEach, expect, it, vi } from "vitest"
import { ElementsView } from "./elements"
import { parseEnvelope } from "@/protocol/schema"

afterEach(cleanup)
const node = (
  id: string,
  type: string,
  props: object,
  children: unknown[] = []
) => ({ id, type, props, children })
function raw() {
  return {
    protocolVersion: 1,
    kind: "elements",
    state: {
      kind: "elements",
      value: { nodes: {}, sequence: 0 },
      clientRevision: 0,
      serverRevision: 0,
    },
    props: {
      nodes: [
        node(
          "tabs",
          "tabs",
          {
            defaultValue: null,
            label: "Settings",
            orientation: "horizontal",
            variant: "default",
          },
          [
            node(
              "tabs/a",
              "tab",
              { value: "a", label: "General", disabled: false },
              [
                node(
                  "tabs/a/collapse",
                  "collapsible",
                  {
                    title: "Details",
                    defaultOpen: false,
                    disabled: false,
                    triggerSize: "default",
                    triggerVariant: "outline",
                  },
                  [
                    node("text", "text", {
                      text: "Nested content",
                      variant: "body",
                    }),
                  ]
                ),
              ]
            ),
            node(
              "tabs/b",
              "tab",
              { value: "b", label: "Advanced", disabled: false },
              [
                node("advanced", "text", {
                  text: "Advanced content",
                  variant: "body",
                }),
              ]
            ),
          ]
        ),
      ],
    },
  }
}
function parsed(value = raw()) {
  const result = parseEnvelope(value)
  if (!result.ok || result.envelope.kind !== "elements")
    throw new Error("Invalid fixture")
  return result.envelope
}
it("keeps local container state across hiding, rerender and keyed reorder without Python events", async () => {
  const setStateValue = vi.fn(),
    setTriggerValue = vi.fn()
  const view = render(
    <ElementsView
      envelope={parsed()}
      setStateValue={setStateValue}
      setTriggerValue={setTriggerValue}
    />
  )
  fireEvent.click(screen.getByRole("button", { name: "Details" }))
  await waitFor(() =>
    expect(
      screen
        .getByRole("button", { name: "Details" })
        .getAttribute("aria-expanded")
    ).toBe("true")
  )
  fireEvent.click(screen.getByRole("tab", { name: "Advanced" }))
  await waitFor(() =>
    expect(screen.queryByRole("button", { name: "Details" })).toBeNull()
  )
  const changed = raw()
  changed.props.nodes[0]!.children.reverse()
  view.rerender(
    <ElementsView
      envelope={parsed(changed)}
      setStateValue={setStateValue}
      setTriggerValue={setTriggerValue}
    />
  )
  expect(
    screen.getByRole("tab", { name: "Advanced" }).getAttribute("aria-selected")
  ).toBe("true")
  fireEvent.click(screen.getByRole("tab", { name: "General" }))
  expect(
    screen
      .getByRole("button", { name: "Details" })
      .getAttribute("aria-expanded")
  ).toBe("true")
  expect(setStateValue).not.toHaveBeenCalled()
  expect(setTriggerValue).not.toHaveBeenCalled()
})
it("resets local selection when the Python default changes and recovers after selected item removal", () => {
  const view = render(
    <ElementsView
      envelope={parsed()}
      setStateValue={vi.fn()}
      setTriggerValue={vi.fn()}
    />
  )
  const changed = raw()
  Object.assign(changed.props.nodes[0]!.props, { defaultValue: "b" })
  view.rerender(
    <ElementsView
      envelope={parsed(changed)}
      setStateValue={vi.fn()}
      setTriggerValue={vi.fn()}
    />
  )
  expect(
    screen.getByRole("tab", { name: "Advanced" }).getAttribute("aria-selected")
  ).toBe("true")
  const removed = raw()
  removed.props.nodes[0]!.children.pop()
  view.rerender(
    <ElementsView
      envelope={parsed(removed)}
      setStateValue={vi.fn()}
      setTriggerValue={vi.fn()}
    />
  )
  expect(
    screen.getByRole("tab", { name: "General" }).getAttribute("aria-selected")
  ).toBe("true")
})
it("rejects malformed typed slots, duplicate values, missing defaults and invalid viewport sizes", () => {
  for (const mutate of [
    (value: ReturnType<typeof raw>) => {
      value.props.nodes[0]!.children.push(
        node("bad", "text", { text: "bad", variant: "body" })
      )
    },
    (value: ReturnType<typeof raw>) => {
      Object.assign(
        (value.props.nodes[0]!.children[1] as ReturnType<typeof node>).props,
        { value: "a" }
      )
    },
    (value: ReturnType<typeof raw>) => {
      Object.assign(value.props.nodes[0]!.props, { defaultValue: "missing" })
    },
    (value: ReturnType<typeof raw>) => {
      value.props.nodes = [
        node("scroll", "scroll_area", { height: 1, label: "bad" }),
      ]
    },
  ]) {
    const value = raw()
    mutate(value)
    expect(parseEnvelope(value).ok).toBe(false)
  }
})

it("does not restore a removed tab selection when that value is reinserted", () => {
  const view = render(
    <ElementsView
      envelope={parsed()}
      setStateValue={vi.fn()}
      setTriggerValue={vi.fn()}
    />
  )
  fireEvent.click(screen.getByRole("tab", { name: "Advanced" }))
  const removed = raw()
  removed.props.nodes[0]!.children.pop()
  view.rerender(
    <ElementsView
      envelope={parsed(removed)}
      setStateValue={vi.fn()}
      setTriggerValue={vi.fn()}
    />
  )
  view.rerender(
    <ElementsView
      envelope={parsed()}
      setStateValue={vi.fn()}
      setTriggerValue={vi.fn()}
    />
  )
  expect(
    screen.getByRole("tab", { name: "General" }).getAttribute("aria-selected")
  ).toBe("true")
})

it("supports multiple accordion items and resets expansion when defaults change", async () => {
  const value = raw()
  value.props.nodes = [
    node(
      "accordion",
      "accordion",
      { defaultValue: ["a"], multiple: true, disabled: false },
      [
        node(
          "accordion/a",
          "accordion_item",
          { value: "a", label: "First", disabled: false },
          [node("a-text", "text", { text: "First content", variant: "body" })]
        ),
        node(
          "accordion/b",
          "accordion_item",
          { value: "b", label: "Second", disabled: false },
          [node("b-text", "text", { text: "Second content", variant: "body" })]
        ),
      ]
    ),
  ]
  const view = render(
    <ElementsView
      envelope={parsed(value)}
      setStateValue={vi.fn()}
      setTriggerValue={vi.fn()}
    />
  )
  fireEvent.click(screen.getByRole("button", { name: "Second" }))
  await waitFor(() =>
    expect(
      screen
        .getByRole("button", { name: "Second" })
        .getAttribute("aria-expanded")
    ).toBe("true")
  )
  expect(
    screen.getByRole("button", { name: "First" }).getAttribute("aria-expanded")
  ).toBe("true")
  const second = value.props.nodes[0]!.children.pop()!
  view.rerender(
    <ElementsView
      envelope={parsed(value)}
      setStateValue={vi.fn()}
      setTriggerValue={vi.fn()}
    />
  )
  value.props.nodes[0]!.children.push(second)
  view.rerender(
    <ElementsView
      envelope={parsed(value)}
      setStateValue={vi.fn()}
      setTriggerValue={vi.fn()}
    />
  )
  expect(
    screen.getByRole("button", { name: "Second" }).getAttribute("aria-expanded")
  ).toBe("false")
  Object.assign(value.props.nodes[0]!.props, { defaultValue: [] })
  view.rerender(
    <ElementsView
      envelope={parsed(value)}
      setStateValue={vi.fn()}
      setTriggerValue={vi.fn()}
    />
  )
  expect(
    screen.getByRole("button", { name: "First" }).getAttribute("aria-expanded")
  ).toBe("false")
  expect(
    screen.getByRole("button", { name: "Second" }).getAttribute("aria-expanded")
  ).toBe("false")
})
