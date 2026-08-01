import { ScrollArea } from "@/components/ui/scroll-area"
import type { ScrollAreaEnvelope } from "@/protocol/schema"

type ScrollAreaViewProps = {
  envelope: ScrollAreaEnvelope
}

export function ScrollAreaView({
  envelope,
}: ScrollAreaViewProps) {
  return (
    <div
      className="min-w-0"
      data-ssui-component="scroll_area"
      data-testid="ssui-v2-scroll-area"
    >
      {envelope.props.title !== null ? (
        <div className="mb-2 text-sm font-medium">
          {envelope.props.title}
        </div>
      ) : null}
      <ScrollArea
        className="rounded-lg border"
        style={{ height: envelope.props.height }}
      >
        <div className="divide-y p-3 text-sm">
          {envelope.props.items.map((item, index) => (
            <div
              className="py-2 first:pt-0 last:pb-0"
              key={`${item}-${index}`}
            >
              {item}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
