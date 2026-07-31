import { useId } from "react"

import type { V2RendererArgs } from "@/app"
import { Switch } from "@/components/ui/switch"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { SwitchEnvelope } from "@/protocol/schema"

type SwitchViewProps = {
  envelope: SwitchEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

export function SwitchView({
  envelope,
  setStateValue,
}: SwitchViewProps) {
  const switchId = useId()
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )

  return (
    <div
      className="flex items-center gap-2 p-px"
      data-ssui-component="switch"
      data-testid="ssui-v2-switch"
    >
      <Switch
        checked={state.value}
        disabled={envelope.props.disabled}
        id={switchId}
        onCheckedChange={commit}
      />
      <label className="text-sm font-medium" htmlFor={switchId}>
        {envelope.props.label}
      </label>
    </div>
  )
}
