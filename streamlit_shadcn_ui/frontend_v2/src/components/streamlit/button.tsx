import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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
      className={cn(
        "p-px",
        envelope.props.stretch ? "flex w-full" : "inline-flex"
      )}
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
        className={envelope.props.stretch ? "w-full" : undefined}
      >
        {envelope.props.text}
      </Button>
    </div>
  )
}
