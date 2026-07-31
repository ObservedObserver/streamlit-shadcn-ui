import { useId } from "react"

import type { V2RendererArgs } from "@/app"
import { Input } from "@/components/ui/input"
import { useRevisionedDraftState } from "@/protocol/reconciliation"
import type { InputEnvelope } from "@/protocol/schema"

type InputViewProps = {
  envelope: InputEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

export function InputView({
  envelope,
  setStateValue,
}: InputViewProps) {
  const inputId = useId()
  const { commitDraft, draft, setDraft } =
    useRevisionedDraftState(envelope.state, setStateValue)

  return (
    <div
      className="grid min-w-0 gap-1.5 p-px"
      data-ssui-component="input"
      data-testid="ssui-v2-input"
    >
      <label
        className="text-sm font-medium leading-none"
        htmlFor={inputId}
      >
        {envelope.props.label}
      </label>
      <Input
        disabled={envelope.props.disabled}
        id={inputId}
        maxLength={envelope.props.maxLength ?? undefined}
        onBlur={commitDraft}
        onChange={(event) => {
          setDraft(event.currentTarget.value)
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            commitDraft()
          }
        }}
        placeholder={envelope.props.placeholder}
        type={envelope.props.type}
        value={draft}
      />
    </div>
  )
}
