import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react"

import type { V2RendererArgs } from "@/app"
import { AspectRatioView } from "@/components/streamlit/aspect-ratio"
import { BadgeView } from "@/components/streamlit/badge"
import { ButtonView } from "@/components/streamlit/button"
import { CheckboxView } from "@/components/streamlit/checkbox"
import { InputView } from "@/components/streamlit/input"
import { LinkButtonView } from "@/components/streamlit/link-button"
import { ProgressView } from "@/components/streamlit/progress"
import { RadioGroupView } from "@/components/streamlit/radio-group"
import { SelectView } from "@/components/streamlit/select"
import { SeparatorView } from "@/components/streamlit/separator"
import { SliderView } from "@/components/streamlit/slider"
import { SwitchView } from "@/components/streamlit/switch"
import { TextareaView } from "@/components/streamlit/textarea"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRevisionedState } from "@/protocol/reconciliation"
import type {
  ElementsEnvelope,
  ElementsGap,
  ElementsLeafNode,
  ElementsNode,
  ElementsNodeState,
  ElementsStateValue,
} from "@/protocol/schema"

type ElementsViewProps = {
  envelope: ElementsEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
  setTriggerValue: V2RendererArgs["setTriggerValue"]
}

type QueuedElementEvent = {
  nodeId: string
  type: string
  payload: unknown
  sequence: number
}

const GAP_CLASSES: Record<ElementsGap, string> = {
  none: "gap-0",
  xs: "gap-1.5",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
}

const ALIGN_CLASSES = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
} as const

const JUSTIFY_CLASSES = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const

const TEXT_CLASSES = {
  body: "text-sm text-foreground",
  muted: "text-sm text-muted-foreground",
  label: "text-sm font-medium text-foreground",
  caption: "text-xs text-muted-foreground",
} as const

function renderHeading(node: Extract<ElementsNode, { type: "heading" }>) {
  const className = "font-semibold tracking-tight text-foreground"
  switch (node.props.level) {
    case 2:
      return <h2 className={cn(className, "text-xl")}>{node.props.text}</h2>
    case 3:
      return <h3 className={cn(className, "text-lg")}>{node.props.text}</h3>
    case 4:
      return <h4 className={cn(className, "text-base")}>{node.props.text}</h4>
  }
}

function renderLeaf(
  node: ElementsLeafNode,
  setNodeState: (
    nodeId: string,
    name: string,
    value: unknown
  ) => void,
  enqueueEvent: (
    nodeId: string,
    type: string,
    payload: unknown
  ) => void
) {
  const setStateValue = ((name: string, value: unknown) => {
    setNodeState(node.id, name, value)
  }) as V2RendererArgs["setStateValue"]
  const setTriggerValue = ((name: string, value: unknown) => {
    enqueueEvent(node.id, name, value)
  }) as V2RendererArgs["setTriggerValue"]

  switch (node.envelope.kind) {
    case "select":
      return (
        <SelectView
          envelope={node.envelope}
          setStateValue={setStateValue}
        />
      )
    case "checkbox":
      return (
        <CheckboxView
          envelope={node.envelope}
          setStateValue={setStateValue}
        />
      )
    case "button":
      return (
        <ButtonView
          envelope={node.envelope}
          setTriggerValue={setTriggerValue}
        />
      )
    case "badge":
      return <BadgeView envelope={node.envelope} />
    case "progress":
      return <ProgressView envelope={node.envelope} />
    case "separator":
      return <SeparatorView envelope={node.envelope} />
    case "aspect_ratio":
      return <AspectRatioView envelope={node.envelope} />
    case "link_button":
      return <LinkButtonView envelope={node.envelope} />
    case "input":
      return (
        <InputView
          envelope={node.envelope}
          setStateValue={setStateValue}
        />
      )
    case "textarea":
      return (
        <TextareaView
          envelope={node.envelope}
          setStateValue={setStateValue}
        />
      )
    case "radio_group":
      return (
        <RadioGroupView
          envelope={node.envelope}
          setStateValue={setStateValue}
        />
      )
    case "slider":
      return (
        <SliderView
          envelope={node.envelope}
          setStateValue={setStateValue}
        />
      )
    case "switch":
      return (
        <SwitchView
          envelope={node.envelope}
          setStateValue={setStateValue}
        />
      )
  }
}

function renderNode(
  node: ElementsNode,
  setNodeState: (
    nodeId: string,
    name: string,
    value: unknown
  ) => void,
  enqueueEvent: (
    nodeId: string,
    type: string,
    payload: unknown
  ) => void
): ReactNode {
  const children = node.children.map((child) => (
    <Fragment key={child.id}>
      {renderNode(child, setNodeState, enqueueEvent)}
    </Fragment>
  ))

  switch (node.type) {
    case "leaf":
      return renderLeaf(node, setNodeState, enqueueEvent)
    case "text":
      return (
        <p className={TEXT_CLASSES[node.props.variant]}>{node.props.text}</p>
      )
    case "heading":
      return renderHeading(node)
    case "code":
      return (
        <code
          className="block overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground"
          data-language={node.props.language}
        >
          {node.props.text}
        </code>
      )
    case "stack":
      return (
        <div
          className={cn(
            "flex w-full min-w-0",
            node.props.direction === "vertical" ? "flex-col" : "flex-row",
            GAP_CLASSES[node.props.gap],
            ALIGN_CLASSES[node.props.align],
            JUSTIFY_CLASSES[node.props.justify],
            node.props.wrap && "flex-wrap"
          )}
        >
          {children}
        </div>
      )
    case "grid": {
      const style: CSSProperties = {
        gridTemplateColumns:
          node.props.minColumnWidth === null
            ? `repeat(${node.props.columns}, minmax(0, 1fr))`
            : `repeat(auto-fit, minmax(min(100%, ${node.props.minColumnWidth}px), 1fr))`,
      }
      return (
        <div className={cn("grid w-full min-w-0", GAP_CLASSES[node.props.gap])} style={style}>
          {children}
        </div>
      )
    }
    case "card":
      return <Card size={node.props.size}>{children}</Card>
    case "card_header":
      return <CardHeader>{children}</CardHeader>
    case "card_content":
      return <CardContent>{children}</CardContent>
    case "card_footer":
      return <CardFooter>{children}</CardFooter>
  }
}

const ElementsTree = memo(function ElementsTree({
  enqueueEvent,
  nodes,
  setNodeState,
}: {
  enqueueEvent: (
    nodeId: string,
    type: string,
    payload: unknown
  ) => void
  nodes: ElementsNode[]
  setNodeState: (
    nodeId: string,
    name: string,
    value: unknown
  ) => void
}) {
  return nodes.map((node) => (
    <div
      className="min-w-0"
      data-ssui-element-id={node.id}
      key={node.id}
    >
      {renderNode(node, setNodeState, enqueueEvent)}
    </div>
  ))
})

export function ElementsView({
  envelope,
  setStateValue,
  setTriggerValue,
}: ElementsViewProps) {
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )
  const stateValueRef = useRef<ElementsStateValue>(state.value)
  const eventSequenceRef = useRef(state.value.sequence)
  const queuedEventsRef = useRef<QueuedElementEvent[]>([])
  const flushScheduledRef = useRef(false)

  useEffect(() => {
    stateValueRef.current = state.value
    eventSequenceRef.current = Math.max(
      eventSequenceRef.current,
      state.value.sequence
    )
  }, [state.value])

  const setNodeState = useCallback(
    (nodeId: string, name: string, value: unknown) => {
      if (name !== "state" || typeof value !== "object" || value === null) {
        return
      }
      const current = stateValueRef.current
      const sequence = current.sequence + 1
      const nextNodeState = {
        ...(value as Omit<ElementsNodeState, "changeSequence">),
        changeSequence: sequence,
      }
      const nextValue: ElementsStateValue = {
        nodes: {
          ...current.nodes,
          [nodeId]: nextNodeState,
        },
        sequence,
      }
      stateValueRef.current = nextValue
      eventSequenceRef.current = Math.max(
        eventSequenceRef.current,
        sequence
      )
      commit(nextValue)
    },
    [commit]
  )

  const enqueueEvent = useCallback(
    (nodeId: string, type: string, payload: unknown) => {
      eventSequenceRef.current += 1
      queuedEventsRef.current.push({
        nodeId,
        type,
        payload,
        sequence: eventSequenceRef.current,
      })
      if (flushScheduledRef.current) {
        return
      }
      flushScheduledRef.current = true
      queueMicrotask(() => {
        flushScheduledRef.current = false
        const batch = queuedEventsRef.current.splice(0)
        if (batch.length > 0) {
          setTriggerValue("events", batch)
        }
      })
    },
    [setTriggerValue]
  )

  return (
    <div
      className="@container/elements grid min-w-0 gap-4 p-px"
      data-ssui-component="elements"
      data-testid="ssui-v2-elements"
    >
      <ElementsTree
        enqueueEvent={enqueueEvent}
        nodes={envelope.props.nodes}
        setNodeState={setNodeState}
      />
    </div>
  )
}
