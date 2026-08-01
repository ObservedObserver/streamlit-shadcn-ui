import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import type { HoverCardEnvelope } from "@/protocol/schema"

type HoverCardViewProps = {
  envelope: HoverCardEnvelope
}

export function HoverCardView({ envelope }: HoverCardViewProps) {
  return (
    <div
      className="inline-flex p-px"
      data-ssui-component="hover-card"
      data-testid="ssui-v2-hover-card"
    >
      <HoverCard>
        <HoverCardTrigger
          closeDelay={100}
          delay={200}
          render={
            <Button
              disabled={envelope.props.disabled}
              variant="ghost"
            />
          }
        >
          {envelope.props.label}
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          data-testid="ssui-v2-hover-card-content"
        >
          <p>{envelope.props.content}</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
