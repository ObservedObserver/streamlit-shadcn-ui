import { useId } from "react"

import type { V2RendererArgs } from "@/app"
import { Slider } from "@/components/ui/slider"
import { useRevisionedDraftState } from "@/protocol/reconciliation"
import type { SliderEnvelope } from "@/protocol/schema"

type SliderViewProps = {
  envelope: SliderEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

function normalizeSliderValue(
  value: number | readonly number[]
): number[] {
  return typeof value === "number" ? [value] : [...value]
}

export function SliderView({
  envelope,
  setStateValue,
}: SliderViewProps) {
  const labelId = useId()
  const { commit, draft, setDraft } =
    useRevisionedDraftState(envelope.state, setStateValue)

  return (
    <div
      className="grid min-w-0 gap-2 p-px"
      data-ssui-component="slider"
      data-testid="ssui-v2-slider"
    >
      <div
        className="flex items-center justify-between gap-3 text-sm"
        id={labelId}
      >
        <span className="font-medium">{envelope.props.label}</span>
        <output className="tabular-nums text-muted-foreground">
          {draft.join(" – ")}
        </output>
      </div>
      <Slider
        aria-labelledby={labelId}
        disabled={envelope.props.disabled}
        max={envelope.props.max}
        min={envelope.props.min}
        onValueChange={(value) => {
          setDraft(normalizeSliderValue(value))
        }}
        onValueCommitted={(value) => {
          commit(normalizeSliderValue(value))
        }}
        step={envelope.props.step}
        value={draft}
      />
    </div>
  )
}
