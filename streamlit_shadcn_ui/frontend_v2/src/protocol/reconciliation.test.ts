import { act, renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import {
  reconcileState,
  useRevisionedState,
} from "@/protocol/reconciliation"
import type {
  ComponentKind,
  StateCell,
} from "@/protocol/schema"

function state(
  value: string | null,
  clientRevision: number,
  serverRevision: number
): StateCell<string | null, "select"> {
  return {
    kind: "select",
    value,
    clientRevision,
    serverRevision,
  }
}

describe("reconcileState", () => {
  it("accepts a newer client revision at the same server revision", () => {
    expect(reconcileState(state("a", 1, 0), state("b", 2, 0))).toEqual({
      acknowledgeServerReset: false,
      state: state("b", 2, 0),
    })
  })

  it("rejects an out-of-order client message", () => {
    const local = state("new", 8, 2)
    expect(reconcileState(local, state("stale", 7, 2))).toEqual({
      acknowledgeServerReset: false,
      state: local,
    })
  })

  it("accepts and acknowledges a newer server reset", () => {
    const incoming = state("reset", 2, 4)
    expect(reconcileState(state("local", 9, 3), incoming)).toEqual({
      acknowledgeServerReset: true,
      state: incoming,
    })
  })

  it("rejects an out-of-order server message even with a newer client revision", () => {
    const local = state("authoritative", 3, 5)
    expect(reconcileState(local, state("stale", 99, 4))).toEqual({
      acknowledgeServerReset: false,
      state: local,
    })
  })

  it("fails closed when a key crosses component kinds", () => {
    expect(() =>
      reconcileState<unknown, ComponentKind>(
        state("a", 0, 0),
        {
          kind: "checkbox",
          value: true,
          clientRevision: 0,
          serverRevision: 0,
        }
      )
    ).toThrow("SSUI_V2_STATE_KIND_MISMATCH")
  })

  it("does not publish an unchanged array as a new revision", () => {
    const setStateValue = vi.fn()
    const initial: StateCell<number[], "slider"> = {
      kind: "slider",
      value: [20, 80],
      clientRevision: 4,
      serverRevision: 1,
    }
    const view = renderHook(() =>
      useRevisionedState(initial, setStateValue)
    )

    act(() => {
      view.result.current.commit([20, 80])
    })
    expect(setStateValue).not.toHaveBeenCalled()

    act(() => {
      view.result.current.commit([25, 80])
    })
    expect(setStateValue).toHaveBeenCalledWith("state", {
      ...initial,
      value: [25, 80],
      clientRevision: 5,
    })
  })
})
