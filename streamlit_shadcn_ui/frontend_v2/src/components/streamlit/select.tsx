import { useId } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { SelectEnvelope } from "@/protocol/schema"
import type { V2RendererArgs } from "@/app"

type SelectViewProps = {
  envelope: SelectEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

export function SelectView({
  envelope,
  setStateValue,
}: SelectViewProps) {
  const labelId = useId()
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )
  const isDisabled =
    envelope.props.disabled || envelope.props.options.length === 0

  return (
    <div
      className="grid min-w-0 gap-1.5 p-px"
      data-ssui-component="select"
      data-testid="ssui-v2-select"
    >
      <span
        className="text-sm font-medium leading-none"
        id={labelId}
      >
        {envelope.props.label}
      </span>
      <Select
        disabled={isDisabled}
        items={envelope.props.options}
        modal={false}
        onValueChange={(value) => {
          commit(typeof value === "string" ? value : null)
        }}
        value={state.value}
      >
        <SelectTrigger
          aria-labelledby={labelId}
          className="w-full"
          data-testid="ssui-v2-select-trigger"
        >
          <SelectValue
            placeholder={
              envelope.props.options.length === 0
                ? "No options"
                : envelope.props.placeholder
            }
          />
        </SelectTrigger>
        <SelectContent
          align="start"
          alignItemWithTrigger={false}
          data-testid="ssui-v2-select-content"
        >
          {envelope.props.options.map((option) => (
            <SelectItem
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
