import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react"

import type { V2RendererArgs } from "@/app"
import { Toggle } from "@/components/ui/toggle"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { ToggleEnvelope } from "@/protocol/schema"

type ToggleViewProps = {
  envelope: ToggleEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

const TOGGLE_ICONS = {
  bold: BoldIcon,
  italic: ItalicIcon,
  underline: UnderlineIcon,
}

export function ToggleView({
  envelope,
  setStateValue,
}: ToggleViewProps) {
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )
  const Icon =
    envelope.props.icon === null
      ? null
      : TOGGLE_ICONS[envelope.props.icon]

  return (
    <Toggle
      aria-label={envelope.props.label}
      data-ssui-component="toggle"
      data-testid="ssui-v2-toggle"
      disabled={envelope.props.disabled}
      onPressedChange={commit}
      pressed={state.value}
      size={envelope.props.size}
      variant={envelope.props.variant}
    >
      {Icon !== null ? <Icon aria-hidden="true" /> : null}
      {envelope.props.label}
    </Toggle>
  )
}
