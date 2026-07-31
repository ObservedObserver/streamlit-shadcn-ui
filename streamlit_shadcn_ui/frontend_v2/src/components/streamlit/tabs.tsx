import { useId } from "react"

import type { V2RendererArgs } from "@/app"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { TabsEnvelope } from "@/protocol/schema"

type TabsViewProps = {
  envelope: TabsEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

export function TabsView({
  envelope,
  setStateValue,
}: TabsViewProps) {
  const labelId = useId()
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )

  return (
    <div
      className="grid min-w-0 gap-1.5 p-px"
      data-ssui-component="tabs"
      data-testid="ssui-v2-tabs"
    >
      <span className="sr-only" id={labelId}>
        {envelope.props.label}
      </span>
      <Tabs
        aria-labelledby={labelId}
        onValueChange={(value) => {
          if (typeof value === "string") {
            commit(value)
          }
        }}
        orientation={envelope.props.orientation}
        value={state.value}
      >
        <TabsList
          aria-label={envelope.props.label}
          variant={envelope.props.variant}
        >
          {envelope.props.options.map((option) => (
            <TabsTrigger
              disabled={
                envelope.props.disabled || option.disabled
              }
              key={option.value}
              value={option.value}
            >
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
