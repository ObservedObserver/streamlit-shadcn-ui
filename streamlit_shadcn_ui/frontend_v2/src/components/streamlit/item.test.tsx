import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  within,
} from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { ElementsView } from "@/components/streamlit/elements"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemGroup,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item"
import { parseEnvelope, type ElementsEnvelope } from "@/protocol/schema"

afterEach(cleanup)
const node = (
  id: string,
  type: string,
  props: Record<string, unknown> = {},
  children: unknown[] = []
) => ({ id, type, props, children })
function row(id: string) {
  return node(id, "item", { variant: "outline", size: "default" }, [
    node(`${id}/media`, "item_media", { variant: "default" }, [
      node(`${id}/avatar`, "avatar", {
        src: null,
        alt: "Ada",
        fallback: "A",
        size: "default",
      }),
    ]),
    node(`${id}/content`, "item_content", {}, [
      node(`${id}/title`, "item_title", { text: "Ada" }),
      node(`${id}/description`, "item_description", {
        text: "Workspace member",
      }),
    ]),
    node(`${id}/actions`, "item_actions", {}, [
      node(`${id}/manage`, "button", {
        text: "Manage",
        disabled: false,
        help: null,
        loading: false,
        size: "default",
        variant: "default",
        stretch: false,
      }),
    ]),
  ])
}
function raw(nodes: unknown[]) {
  return {
    protocolVersion: 1,
    kind: "elements",
    state: {
      kind: "elements",
      value: { nodes: {}, sequence: 0 },
      clientRevision: 0,
      serverRevision: 0,
    },
    props: { nodes },
  }
}
function envelope(ids = ["ada"]): ElementsEnvelope {
  const parsed = parseEnvelope(
    raw([node("members", "item_group", {}, ids.map(row))])
  )
  if (!parsed.ok || parsed.envelope.kind !== "elements")
    throw new Error("Invalid fixture")
  return parsed.envelope
}

describe("Item composition", () => {
  it("uses exactly the pinned component classes and direct slot children", () => {
    const adapted = render(
      <ElementsView
        envelope={envelope()}
        setStateValue={vi.fn()}
        setTriggerValue={vi.fn()}
      />
    )
    const reference = render(
      <ItemGroup>
        <Item variant="outline" role="listitem">
          <ItemMedia>
            <Avatar aria-label="Ada">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Ada</ItemTitle>
            <ItemDescription>Workspace member</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button>Manage</Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    )
    for (const slot of [
      "item-group",
      "item",
      "item-media",
      "avatar",
      "avatar-fallback",
      "item-content",
      "item-title",
      "item-description",
      "item-actions",
      "button",
    ]) {
      const actual = adapted.container.querySelector(
        `[data-slot="${slot}"]`
      )!
      const expected = reference.container.querySelector(
        `[data-slot="${slot}"]`
      )!
      expect(actual.className).toBe(expected.className)
      expect(actual.parentElement?.dataset.slot).toBe(
        expected.parentElement?.dataset.slot
      )
    }
    expect(within(adapted.container).getByRole("listitem")).toBeTruthy()
    expect(within(adapted.container).getByLabelText("Ada")).toBeTruthy()
  })

  it("routes actions to stable item IDs after reordering without replay", async () => {
    const trigger = vi.fn()
    const view = render(
      <ElementsView
        envelope={envelope(["ada", "grace"])}
        setStateValue={vi.fn()}
        setTriggerValue={trigger}
      />
    )
    fireEvent.click(view.getAllByRole("button", { name: "Manage" })[0]!)
    await waitFor(() => expect(trigger).toHaveBeenCalledTimes(1))
    expect(trigger.mock.calls[0]![1][0].nodeId).toBe("ada/manage")
    view.rerender(
      <ElementsView
        envelope={envelope(["grace", "ada"])}
        setStateValue={vi.fn()}
        setTriggerValue={trigger}
      />
    )
    expect(trigger).toHaveBeenCalledTimes(1)
    fireEvent.click(view.getAllByRole("button", { name: "Manage" })[1]!)
    await waitFor(() => expect(trigger).toHaveBeenCalledTimes(2))
    expect(trigger.mock.calls[1]![1][0].nodeId).toBe("ada/manage")
  })

  it("preserves Item slot and list semantics inside a tab panel", async () => {
    const result = parseEnvelope(
      raw([
        node(
          "tabs",
          "tabs",
          { defaultValue: "members", label: "Views", variant: "default" },
          [
            node(
              "tabs/members",
              "tab",
              { value: "members", label: "Members", disabled: false },
              [node("group", "item_group", {}, [row("ada")])]
            ),
          ]
        ),
      ])
    )
    if (!result.ok || result.envelope.kind !== "elements")
      throw new Error("Invalid fixture")
    const trigger = vi.fn()
    const view = render(
      <ElementsView
        envelope={result.envelope}
        setStateValue={vi.fn()}
        setTriggerValue={trigger}
      />
    )
    expect(view.getByRole("listitem")).toBeTruthy()
    const button = view.getByRole("button", { name: "Manage" })
    expect(button.parentElement?.dataset.slot).toBe("item-actions")
    fireEvent.click(button)
    await waitFor(() => expect(trigger).toHaveBeenCalledTimes(1))
    expect(trigger.mock.calls[0]![1][0].nodeId).toBe("ada/manage")
  })

  it("rejects malformed trees and invalid variants at the frontend boundary", () => {
    const malformed = [
      node("orphan", "item_content"),
      node("group", "item_group", {}, [
        node("text", "text", { text: "Wrong", variant: "body" }),
      ]),
      node("bad", "item", { variant: "custom", size: "default" }),
      node("bad", "item", { variant: "default", size: "default" }, [
        node("a", "item_actions"),
        node("b", "item_actions"),
      ]),
      node("bad", "item", { variant: "default", size: "default" }, [
        node("x", "item_title", { text: "Wrong parent" }),
      ]),
    ]
    for (const invalid of malformed)
      expect(parseEnvelope(raw([invalid])).ok).toBe(false)
  })
})
