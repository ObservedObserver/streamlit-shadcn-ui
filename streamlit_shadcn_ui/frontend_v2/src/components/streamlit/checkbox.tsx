import { useId } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { CheckboxEnvelope } from "@/protocol/schema"
import type { V2RendererArgs } from "@/app"

type CheckboxViewProps = {
  envelope: CheckboxEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

export function CheckboxView({
  envelope,
  setStateValue,
}: CheckboxViewProps) {
  const checkboxId = useId()
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )

  return (
    <div
      className="flex min-h-8 items-center gap-2.5 p-px"
      data-ssui-component="checkbox"
      data-testid="ssui-v2-checkbox"
    >
      <Checkbox
        checked={state.value}
        disabled={envelope.props.disabled}
        id={checkboxId}
        onCheckedChange={(checked) => {
          commit(checked)
        }}
      />
      <label
        className="cursor-default text-sm font-medium leading-none"
        htmlFor={checkboxId}
      >
        {envelope.props.label}
      </label>
    </div>
  )
}
