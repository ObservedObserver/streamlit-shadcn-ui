import { ChevronDownIcon } from "lucide-react"

import type { V2RendererArgs } from "@/app"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { CollapsibleEnvelope } from "@/protocol/schema"

type CollapsibleViewProps = {
  envelope: CollapsibleEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

export function CollapsibleView({
  envelope,
  setStateValue,
}: CollapsibleViewProps) {
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )

  return (
    <Collapsible
      data-ssui-component="collapsible"
      data-testid="ssui-v2-collapsible"
      disabled={envelope.props.disabled}
      onOpenChange={commit}
      open={state.value}
    >
      <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm font-medium outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
        {envelope.props.title}
        <ChevronDownIcon
          aria-hidden="true"
          className="size-4 transition-transform group-aria-expanded:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 px-3 pt-2 text-sm">
        {envelope.props.firstItem !== null ? (
          <div className="font-medium">
            {envelope.props.firstItem}
          </div>
        ) : null}
        {envelope.props.items.map((item, index) => (
          <div
            className="border-t py-1.5 text-muted-foreground"
            key={`${item}-${index}`}
          >
            {item}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
