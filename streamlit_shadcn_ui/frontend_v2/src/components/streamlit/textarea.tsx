import { useId } from "react"

import type { V2RendererArgs } from "@/app"
import { Textarea } from "@/components/ui/textarea"
import { useRevisionedDraftState } from "@/protocol/reconciliation"
import type { TextareaEnvelope } from "@/protocol/schema"

type TextareaViewProps = {
  envelope: TextareaEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

export function TextareaView({
  envelope,
  setStateValue,
}: TextareaViewProps) {
  const textareaId = useId()
  const { commitDraft, draft, setDraft } =
    useRevisionedDraftState(envelope.state, setStateValue)

  return (
    <div
      className="grid min-w-0 gap-1.5 p-px"
      data-ssui-component="textarea"
      data-testid="ssui-v2-textarea"
    >
      <label
        className="text-sm font-medium leading-none"
        htmlFor={textareaId}
      >
        {envelope.props.label}
      </label>
      <Textarea
        disabled={envelope.props.disabled}
        id={textareaId}
        maxLength={envelope.props.maxLength ?? undefined}
        onBlur={commitDraft}
        onChange={(event) => {
          setDraft(event.currentTarget.value)
        }}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            (event.ctrlKey || event.metaKey)
          ) {
            commitDraft()
          }
        }}
        placeholder={envelope.props.placeholder}
        rows={envelope.props.rows}
        value={draft}
      />
    </div>
  )
}
