import type { V2RendererArgs } from "@/app"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { ToggleGroupEnvelope } from "@/protocol/schema"

type ToggleGroupViewProps = {
  envelope: ToggleGroupEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

export function ToggleGroupView({
  envelope,
  setStateValue,
}: ToggleGroupViewProps) {
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )

  return (
    <ToggleGroup
      aria-label={envelope.props.label}
      data-ssui-component="toggle_group"
      data-testid="ssui-v2-toggle-group"
      disabled={envelope.props.disabled}
      multiple={envelope.props.multiple}
      onValueChange={commit}
      orientation={envelope.props.orientation}
      size={envelope.props.size}
      value={state.value}
      variant={envelope.props.variant}
    >
      {envelope.props.options.map((option) => (
        <ToggleGroupItem
          aria-label={option.label}
          disabled={option.disabled}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
