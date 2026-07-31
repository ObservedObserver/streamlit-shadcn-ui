import { Button } from "@/components/ui/button"
import type { ButtonEnvelope } from "@/protocol/schema"
import type { V2RendererArgs } from "@/app"

type ButtonViewProps = {
  envelope: ButtonEnvelope
  setTriggerValue: V2RendererArgs["setTriggerValue"]
}

export function ButtonView({
  envelope,
  setTriggerValue,
}: ButtonViewProps) {
  return (
    <div
      className="inline-flex p-px"
      data-ssui-component="button"
      data-testid="ssui-v2-button"
    >
      <Button
        disabled={envelope.props.disabled}
        onClick={() => {
          setTriggerValue("click", true)
        }}
        size={envelope.props.size}
        variant={envelope.props.variant}
      >
        {envelope.props.text}
      </Button>
    </div>
  )
}
