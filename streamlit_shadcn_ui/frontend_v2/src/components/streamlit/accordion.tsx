import type { V2RendererArgs } from "@/app"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { AccordionEnvelope } from "@/protocol/schema"

type AccordionViewProps = {
  envelope: AccordionEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

export function AccordionView({
  envelope,
  setStateValue,
}: AccordionViewProps) {
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )

  return (
    <Accordion
      aria-label={envelope.props.label}
      className="rounded-lg border px-3"
      data-ssui-component="accordion"
      data-testid="ssui-v2-accordion"
      disabled={envelope.props.disabled}
      multiple={envelope.props.multiple}
      onValueChange={commit}
      value={state.value}
    >
      {envelope.props.items.map((item) => (
        <AccordionItem
          disabled={item.disabled}
          key={item.value}
          value={item.value}
        >
          <AccordionTrigger>{item.label}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
