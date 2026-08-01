import { Badge } from "@/components/ui/badge"
import type { BadgeEnvelope } from "@/protocol/schema"

type BadgeViewProps = {
  envelope: BadgeEnvelope
}

export function BadgeView({ envelope }: BadgeViewProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-2 p-px"
      data-ssui-component="badge"
      data-testid="ssui-v2-badge"
      role="list"
    >
      {envelope.props.badges.map((badge, index) => (
        <Badge
          key={`${badge.text}-${index}`}
          role="listitem"
          variant={badge.variant}
        >
          {badge.text}
        </Badge>
      ))}
    </div>
  )
}
