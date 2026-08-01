import { Separator } from "@/components/ui/separator"
import type { SeparatorEnvelope } from "@/protocol/schema"

type SeparatorViewProps = {
  envelope: SeparatorEnvelope
}

export function SeparatorView({
  envelope,
}: SeparatorViewProps) {
  return (
    <div
      className={
        envelope.props.orientation === "vertical"
          ? "flex h-8 justify-center"
          : "py-2"
      }
      data-ssui-component="separator"
      data-testid="ssui-v2-separator"
    >
      <Separator orientation={envelope.props.orientation} />
    </div>
  )
}
