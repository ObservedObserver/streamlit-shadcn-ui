import { useId } from "react"

import type { V2RendererArgs } from "@/app"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { RadioGroupEnvelope } from "@/protocol/schema"

type RadioGroupViewProps = {
  envelope: RadioGroupEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

export function RadioGroupView({
  envelope,
  setStateValue,
}: RadioGroupViewProps) {
  const labelId = useId()
  const optionIdPrefix = useId()
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )

  return (
    <fieldset
      className="grid min-w-0 gap-2 p-px"
      data-ssui-component="radio_group"
      data-testid="ssui-v2-radio-group"
    >
      <legend
        className="text-sm font-medium leading-none"
        id={labelId}
      >
        {envelope.props.label}
      </legend>
      <RadioGroup
        aria-labelledby={labelId}
        disabled={envelope.props.disabled}
        onValueChange={commit}
        value={state.value}
      >
        {envelope.props.options.map((option, index) => {
          const optionId = `${optionIdPrefix}-${index}`
          return (
            <div
              className="flex items-center gap-2"
              key={option.value}
            >
              <RadioGroupItem
                disabled={option.disabled}
                id={optionId}
                value={option.value}
              />
              <label
                className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                htmlFor={optionId}
              >
                {option.label}
              </label>
            </div>
          )
        })}
      </RadioGroup>
    </fieldset>
  )
}
