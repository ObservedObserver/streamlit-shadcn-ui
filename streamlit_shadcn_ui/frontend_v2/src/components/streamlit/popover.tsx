import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { PopoverEnvelope } from "@/protocol/schema"

type PopoverViewProps = {
  envelope: PopoverEnvelope
}

export function PopoverView({ envelope }: PopoverViewProps) {
  return (
    <div
      className="inline-flex p-px"
      data-ssui-component="popover"
      data-testid="ssui-v2-popover"
    >
      <Popover modal={false}>
        <PopoverTrigger
          disabled={envelope.props.disabled}
          render={<Button variant="outline" />}
        >
          {envelope.props.label}
        </PopoverTrigger>
        <PopoverContent
          align="start"
          data-testid="ssui-v2-popover-content"
        >
          <PopoverHeader>
            <PopoverTitle>{envelope.props.label}</PopoverTitle>
            <PopoverDescription>
              {envelope.props.content ?? "No additional content."}
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  )
}
