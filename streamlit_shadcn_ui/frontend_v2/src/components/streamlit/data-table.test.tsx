import {
  cleanup,
  fireEvent,
  render,
  within,
  waitFor
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"
import { DataTableView } from "@/components/streamlit/data-table"
import { ComponentShell } from "@/platform/component-shell"
import { parseEnvelope, type DataTableEnvelope } from "@/protocol/schema"

afterEach(() => {
  cleanup()
  document.body.replaceChildren()
})
export function fixture(): DataTableEnvelope {
  return {
    protocolVersion: 1,
    kind: "data_table",
    state: {
      kind: "data_table",
      value: [],
      clientRevision: 0,
      serverRevision: 0
    },
    props: {
      columns: [
        { key: "name", label: "Name" },
        { key: "amount", label: "Amount" }
      ],
      rows: [
        { id: "s:a", cells: ["Ada", 100] },
        { id: "s:b", cells: ["Bea", 2] },
        { id: "s:c", cells: ["Cy", 30] }
      ],
      pageSize: 2,
      selectionMode: "multiple",
      actions: [
        { id: "edit", label: "Edit", disabled: false },
        { id: "delete", label: "Delete", disabled: true }
      ]
    }
  }
}
function setup(envelope = fixture()) {
  const host = document.createElement("div")
  document.body.append(host)
  const root = host.attachShadow({ mode: "open" })
  const app = document.createElement("div"),
    overlay = document.createElement("div")
  root.append(app, overlay)
  const setStateValue = vi.fn(),
    setTriggerValue = vi.fn()
  const element = (value: DataTableEnvelope) => (
    <ComponentShell parentElement={root} overlayRoot={overlay} resetKey="table">
      <DataTableView
        envelope={value}
        setStateValue={setStateValue}
        setTriggerValue={setTriggerValue}
      />
    </ComponentShell>
  )
  const view = render(element(envelope), { container: app })
  return {
    ...view,
    update: (value: DataTableEnvelope) => view.rerender(element(value)),
    query: within(root as unknown as HTMLElement),
    setStateValue,
    setTriggerValue
  }
}

describe("Data Table", () => {
  it("sorts numbers and filters locally while pagination remains reactive", async () => {
    const user = userEvent.setup()
    const view = setup()
    await user.click(view.query.getByRole("button", { name: "Sort Amount" }))
    const records = view.query.getAllByRole("row").slice(1)
    expect(records.map((r) => r.getAttribute("data-row-id"))).toEqual([
      "s:b",
      "s:c"
    ])
    await user.click(view.query.getByRole("button", { name: "Next" }))
    expect(view.query.getByText("Ada")).not.toBeNull()
    view.update(structuredClone(fixture()))
    expect(view.query.getByRole("status").textContent).toContain("Page 2 of 2")
    fireEvent.change(view.query.getByRole("textbox", { name: "Search rows" }), {
      target: { value: "bea" }
    })
    await waitFor(() => expect(view.query.queryByText("Bea")).not.toBeNull())
    expect(view.query.getByText("Bea")).not.toBeNull()
    expect(view.query.getByRole("status").textContent).toContain("Page 1 of 1")
    expect(view.setStateValue).not.toHaveBeenCalled()
    expect(view.setTriggerValue).not.toHaveBeenCalled()
  })
  it("selects the visible page and preserves selection across paging", async () => {
    const user = userEvent.setup()
    const view = setup()
    await user.click(
      view.query.getByRole("checkbox", { name: "Select visible page" })
    )
    expect(view.setStateValue.mock.calls.at(-1)?.[1].value).toEqual([
      "s:a",
      "s:b"
    ])
    await user.click(view.query.getByRole("button", { name: "Next" }))
    await user.click(view.query.getByRole("checkbox", { name: "Select row c" }))
    expect(view.setStateValue.mock.calls.at(-1)?.[1].value).toEqual([
      "s:a",
      "s:b",
      "s:c"
    ])
  })
  it("hides columns and validates enabled row actions", async () => {
    const user = userEvent.setup()
    const view = setup()
    await user.click(view.query.getByRole("button", { name: "Columns" }))
    await waitFor(() =>
      expect(
        view.query.queryByRole("menuitemcheckbox", { name: "Amount" })
      ).not.toBeNull()
    )
    await user.click(
      view.query.getByRole("menuitemcheckbox", { name: "Amount" })
    )
    expect(view.query.queryByRole("button", { name: "Sort Amount" })).toBeNull()
    fireEvent.keyDown(view.query.getByRole("menu"), { key: "Escape" })
    await user.click(
      view.query.getByRole("button", { name: "Actions for row a" })
    )
    await waitFor(() =>
      expect(
        view.query.queryByRole("menuitem", { name: "Delete" })
      ).not.toBeNull()
    )
    expect(
      view.query
        .getByRole("menuitem", { name: "Delete" })
        .getAttribute("aria-disabled")
    ).toBe("true")
    await user.click(view.query.getByRole("menuitem", { name: "Edit" }))
    expect(view.setTriggerValue).toHaveBeenCalledWith("action", {
      rowId: "s:a",
      actionId: "edit"
    })
  })
  it("rejects malformed rows, selections and duplicate column keys", () => {
    expect(parseEnvelope(fixture()).ok).toBe(true)
    const bads = [fixture(), fixture(), fixture(), fixture()] as const
    bads[0].props.rows.push(bads[0].props.rows[0]!)
    bads[1].state.value = ["s:removed"]
    bads[2].props.rows[0]!.cells[1] = Infinity
    bads[3].props.columns[1]!.key = "name"
    for (const bad of bads) expect(parseEnvelope(bad).ok).toBe(false)
  })
  it("retains column state by key across reordering and clamps a shortened page", async () => {
    const user = userEvent.setup()
    const view = setup()
    await user.click(view.query.getByRole("button", { name: "Sort Amount" }))
    await user.click(view.query.getByRole("button", { name: "Columns" }))
    await waitFor(() =>
      expect(
        view.query.queryByRole("menuitemcheckbox", { name: "Name" })
      ).not.toBeNull()
    )
    await user.click(view.query.getByRole("menuitemcheckbox", { name: "Name" }))
    fireEvent.keyDown(view.query.getByRole("menu"), { key: "Escape" })
    const reordered = fixture()
    reordered.props.columns.reverse()
    reordered.props.rows.forEach((r) => r.cells.reverse())
    view.update(reordered)
    expect(view.query.queryByRole("button", { name: "Sort Name" })).toBeNull()
    expect(
      view.query
        .getByRole("button", { name: "Sort Amount" })
        .closest("th")
        ?.getAttribute("aria-sort")
    ).toBe("ascending")
    expect(
      view.query
        .getAllByRole("row")
        .slice(1)
        .map((r) => r.getAttribute("data-row-id"))
    ).toEqual(["s:b", "s:c"])
    await user.click(view.query.getByRole("button", { name: "Next" }))
    view.update({
      ...reordered,
      props: { ...reordered.props, rows: reordered.props.rows.slice(0, 1) }
    })
    await waitFor(() =>
      expect(view.query.getByRole("status").textContent).toContain(
        "Page 1 of 1"
      )
    )
    expect(view.query.getAllByRole("row").slice(1).length).toBe(1)
  })

  it("accepts bounded multiline string IDs and single selection", async () => {
    const envelope = fixture()
    envelope.props.rows[0]!.id = "s:\n\u2028"
    envelope.props.selectionMode = "single"
    expect(parseEnvelope(envelope).ok).toBe(true)
    const view = setup(envelope)
    fireEvent.click(view.query.getAllByRole("checkbox")[0]!)
    fireEvent.click(view.query.getAllByRole("checkbox")[1]!)
    expect(view.setStateValue.mock.calls.at(-1)?.[1].value).toEqual(["s:b"])
  })

  it("handles empty rows and no columns", () => {
    const empty = fixture()
    empty.props.rows = []
    empty.props.columns = []
    const view = setup(empty)
    expect(view.query.getByText("No results.")).not.toBeNull()
    expect(
      (view.query.getByRole("button", { name: "Next" }) as HTMLButtonElement)
        .disabled
    ).toBe(true)
  })
})
