import { useEffect, useRef, useState } from "react"

import type {
  ComponentKind,
  StateCell,
} from "@/protocol/schema"

export type ReconciliationResult<
  TValue,
  TKind extends ComponentKind,
> = {
  acknowledgeServerReset: boolean
  state: StateCell<TValue, TKind>
}

export function reconcileState<
  TValue,
  TKind extends ComponentKind,
>(
  local: StateCell<TValue, TKind>,
  incoming: StateCell<TValue, TKind>
): ReconciliationResult<TValue, TKind> {
  if (local.kind !== incoming.kind) {
    throw new Error("SSUI_V2_STATE_KIND_MISMATCH")
  }
  if (incoming.serverRevision > local.serverRevision) {
    return {
      acknowledgeServerReset: true,
      state: incoming,
    }
  }
  if (incoming.serverRevision < local.serverRevision) {
    return {
      acknowledgeServerReset: false,
      state: local,
    }
  }
  if (incoming.clientRevision < local.clientRevision) {
    return {
      acknowledgeServerReset: false,
      state: local,
    }
  }
  return {
    acknowledgeServerReset: false,
    state: incoming,
  }
}

type SetStateCell = (name: "state", value: unknown) => void

export function useRevisionedState<
  TValue,
  TKind extends ComponentKind,
>(
  incoming: StateCell<TValue, TKind>,
  setStateCell: SetStateCell
) {
  const [local, setLocal] = useState(incoming)
  const localRef = useRef(local)
  const acknowledgedServerRevision = useRef(incoming.serverRevision)

  useEffect(() => {
    const reconciled = reconcileState(localRef.current, incoming)
    localRef.current = reconciled.state
    setLocal(reconciled.state)

    if (
      reconciled.acknowledgeServerReset &&
      incoming.serverRevision >
        acknowledgedServerRevision.current
    ) {
      acknowledgedServerRevision.current = incoming.serverRevision
      setStateCell("state", incoming)
    }
  }, [
    incoming.clientRevision,
    incoming.kind,
    incoming.serverRevision,
    incoming.value,
    setStateCell,
  ])

  const commit = (value: TValue) => {
    const next = {
      ...localRef.current,
      value,
      clientRevision: localRef.current.clientRevision + 1,
    }
    localRef.current = next
    setLocal(next)
    setStateCell("state", next)
  }

  return { commit, state: local }
}
