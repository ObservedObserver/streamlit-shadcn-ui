import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import type { AvatarEnvelope } from "@/protocol/schema"

type AvatarViewProps = {
  envelope: AvatarEnvelope
}

export function AvatarView({ envelope }: AvatarViewProps) {
  return (
    <div
      className="inline-flex p-px"
      data-ssui-component="avatar"
      data-testid="ssui-v2-avatar"
    >
      <Avatar size={envelope.props.size}>
        {envelope.props.src !== null ? (
          <AvatarImage
            alt={envelope.props.alt}
            src={envelope.props.src}
          />
        ) : null}
        <AvatarFallback>{envelope.props.fallback}</AvatarFallback>
      </Avatar>
    </div>
  )
}
