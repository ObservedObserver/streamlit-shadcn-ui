import { Skeleton } from "@/components/ui/skeleton"
import type { SkeletonEnvelope } from "@/protocol/schema"

type SkeletonViewProps = {
  envelope: SkeletonEnvelope
}

export function SkeletonView({ envelope }: SkeletonViewProps) {
  return (
    <Skeleton
      aria-hidden="true"
      className={
        envelope.props.shape === "circle" ? "rounded-full" : undefined
      }
      data-ssui-component="skeleton"
      data-testid="ssui-v2-skeleton"
      style={{
        width: envelope.props.width,
        height: envelope.props.height,
      }}
    />
  )
}
