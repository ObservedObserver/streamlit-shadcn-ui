import { AspectRatio } from "@/components/ui/aspect-ratio"
import type { AspectRatioEnvelope } from "@/protocol/schema"

type AspectRatioViewProps = {
  envelope: AspectRatioEnvelope
}

export function AspectRatioView({
  envelope,
}: AspectRatioViewProps) {
  return (
    <AspectRatio
      className="overflow-hidden rounded-lg bg-muted"
      data-ssui-component="aspect_ratio"
      data-testid="ssui-v2-aspect-ratio"
      ratio={envelope.props.ratio}
    >
      <img
        alt={envelope.props.alt}
        className="size-full object-cover"
        loading="lazy"
        src={envelope.props.src}
      />
    </AspectRatio>
  )
}
