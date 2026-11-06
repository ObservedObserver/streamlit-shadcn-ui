import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"

import type { V2RendererArgs } from "@/app"
import { AspectRatioView } from "@/components/streamlit/aspect-ratio"
import { BadgeView } from "@/components/streamlit/badge"
import { ButtonView } from "@/components/streamlit/button"
import { ButtonControl } from "@/components/streamlit/button"
import { CheckboxView } from "@/components/streamlit/checkbox"
import { CheckboxControl } from "@/components/streamlit/checkbox"
import {
  ComboboxControl,
  ComboboxView,
} from "@/components/streamlit/combobox"
import { InputView } from "@/components/streamlit/input"
import { InputControl } from "@/components/streamlit/input"
import {
  InputGroupControl,
  InputGroupView,
} from "@/components/streamlit/input-group"
import { NumberInputView } from "@/components/streamlit/number-input"
import { LinkButtonView } from "@/components/streamlit/link-button"
import { LinkButtonControl } from "@/components/streamlit/link-button"
import { ProgressView } from "@/components/streamlit/progress"
import { RadioGroupView } from "@/components/streamlit/radio-group"
import { SelectView } from "@/components/streamlit/select"
import { SelectControl } from "@/components/streamlit/select"
import { SeparatorView } from "@/components/streamlit/separator"
import { SliderView } from "@/components/streamlit/slider"
import { SwitchView } from "@/components/streamlit/switch"
import { SwitchControl } from "@/components/streamlit/switch"
import { TextareaView } from "@/components/streamlit/textarea"
import { TextareaControl } from "@/components/streamlit/textarea"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  preferredReturnFocusElement,
  useExclusiveModalLayer,
} from "@/platform/modal-layer"
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

type SetNodeState = (
  nodeId: string,
  name: string,
  value: unknown
) => void

type EnqueueEvent = (
  nodeId: string,
  type: string,
  payload: unknown
) => void

type FieldBinding = {
  controlId: string
  describedBy?: string
  invalid: boolean
}

function renderLeaf(
  node: ElementsLeafNode,
  setNodeState: SetNodeState,
  enqueueEvent: EnqueueEvent,
  mode: "default" | "raw" = "default",
  fieldBinding?: FieldBinding
) {
  const setStateValue = ((name: string, value: unknown) => {
    setNodeState(node.id, name, value)
  }) as V2RendererArgs["setStateValue"]
  const setTriggerValue = ((name: string, value: unknown) => {
    enqueueEvent(node.id, name, value)
  }) as V2RendererArgs["setTriggerValue"]

  if (fieldBinding) {
    const controlProps = {
      controlId: fieldBinding.controlId,
      describedBy: fieldBinding.describedBy,
      envelope: node.envelope,
      invalid: fieldBinding.invalid,
      setStateValue,
    }
    switch (node.envelope.kind) {
      case "input":
        return <InputControl {...controlProps} envelope={node.envelope} />
      case "input_group":
        return <InputGroupControl {...controlProps} envelope={node.envelope} />
      case "textarea":
        return <TextareaControl {...controlProps} envelope={node.envelope} />
      case "select":
        return <SelectControl {...controlProps} envelope={node.envelope} />
      case "combobox":
        return <ComboboxControl {...controlProps} envelope={node.envelope} />
      case "checkbox":
        return <CheckboxControl {...controlProps} envelope={node.envelope} />
      case "switch":
        return <SwitchControl {...controlProps} envelope={node.envelope} />
    }
  }

  if (mode === "raw") {
    switch (node.envelope.kind) {
      case "button":
        return (
          <ButtonControl
            envelope={node.envelope}
            onClick={() => setTriggerValue("click", true)}
          />
        )
      case "link_button":
        return <LinkButtonControl envelope={node.envelope} />
    }
  }

  switch (node.envelope.kind) {
    case "combobox":
      return (
        <ComboboxView
          envelope={node.envelope}
          setStateValue={setStateValue}
        />
      )
    case "input_group":
      return (
        <InputGroupView
          envelope={node.envelope}
          setStateValue={setStateValue}
        />
      )
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
    case "number_input":
      return (
        <NumberInputView
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

function nodeDisabled(node: ElementsLeafNode): boolean {
  const disabled = (node.envelope.props as { disabled?: unknown }).disabled
  return disabled === true
}

function FieldNodeView({
  enqueueEvent,
  node,
  setNodeState,
}: {
  enqueueEvent: EnqueueEvent
  node: Extract<ElementsNode, { type: "field" }>
  setNodeState: SetNodeState
}) {
  const controlId = useId()
  const descriptionId = `${controlId}-description`
  const errorId = `${controlId}-error`
  const child = node.children[0]
  if (!child || child.type !== "leaf") return null

  const invalid = node.props.error !== null
  const describedBy = [
    node.props.description !== null ? descriptionId : null,
    invalid ? errorId : null,
  ]
    .filter((value): value is string => value !== null)
    .join(" ")
  const control = renderLeaf(
    child,
    setNodeState,
    enqueueEvent,
    "raw",
    {
      controlId,
      describedBy: describedBy || undefined,
      invalid,
    }
  )
  const details = (
    <>
      {node.props.description !== null && (
        <FieldDescription id={descriptionId}>
          {node.props.description}
        </FieldDescription>
      )}
      {node.props.error !== null && (
        <FieldError id={errorId}>{node.props.error}</FieldError>
      )}
    </>
  )
  const choiceControl =
    child.envelope.kind === "checkbox" || child.envelope.kind === "switch"

  return (
    <Field
      data-disabled={nodeDisabled(child) || undefined}
      data-invalid={invalid || undefined}
      data-ssui-component="field"
      data-testid="ssui-v2-field"
      orientation={node.props.orientation}
    >
      {choiceControl ? (
        <>
          {control}
          <FieldContent>
            <FieldLabel htmlFor={controlId}>{node.props.label}</FieldLabel>
            {details}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldLabel htmlFor={controlId}>{node.props.label}</FieldLabel>
          {control}
          {details}
        </>
      )}
    </Field>
  )
}

function DialogNodeView({
  enqueueEvent,
  node,
  setNodeState,
}: {
  enqueueEvent: EnqueueEvent
  node: Extract<ElementsNode, { type: "dialog" }>
  setNodeState: SetNodeState
}) {
  const [requested, setRequested] = useState(false)
  const modalBoundary = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (requested) returnFocus.current = preferredReturnFocusElement()
  }, [requested])

  const active = useExclusiveModalLayer(requested, modalBoundary)
  const footer = node.children.find((child) => child.type === "dialog_footer")
  const body = node.children.filter((child) => child.type !== "dialog_footer")

  return (
    <div
      data-modal-active={active ? "true" : "false"}
      data-ssui-component="dialog"
      data-testid="ssui-v2-dialog"
      ref={modalBoundary}
    >
      <Dialog
        onOpenChange={(open) => setRequested(open)}
        open={active}
      >
        <DialogTrigger
          render={
            <Button
              disabled={node.props.disabled}
              size={node.props.triggerSize}
              variant={node.props.triggerVariant}
            />
          }
        >
          {node.props.triggerLabel}
        </DialogTrigger>
        <DialogContent
          finalFocus={() =>
            returnFocus.current?.isConnected ? returnFocus.current : true
          }
          showCloseButton={node.props.showCloseButton}
        >
          <DialogHeader>
            <DialogTitle>{node.props.title}</DialogTitle>
            {node.props.description !== null && (
              <DialogDescription>{node.props.description}</DialogDescription>
            )}
          </DialogHeader>
          {body.map((child) => (
            <Fragment key={child.id}>
              {renderNode(child, setNodeState, enqueueEvent)}
            </Fragment>
          ))}
          {footer && renderNode(footer, setNodeState, enqueueEvent)}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SheetNodeView({
  enqueueEvent,
  node,
  setNodeState,
}: {
  enqueueEvent: EnqueueEvent
  node: Extract<ElementsNode, { type: "sheet" }>
  setNodeState: SetNodeState
}) {
  const [requested, setRequested] = useState(false)
  const modalBoundary = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (requested) returnFocus.current = preferredReturnFocusElement()
  }, [requested])

  const active = useExclusiveModalLayer(requested, modalBoundary)
  const footer = node.children.find((child) => child.type === "sheet_footer")
  const body = node.children.filter((child) => child.type !== "sheet_footer")

  return (
    <div
      data-modal-active={active ? "true" : "false"}
      data-ssui-component="sheet"
      data-testid="ssui-v2-sheet"
      ref={modalBoundary}
    >
      <Sheet
        onOpenChange={(open) => setRequested(open)}
        open={active}
      >
        <SheetTrigger
          render={
            <Button
              disabled={node.props.disabled}
              size={node.props.triggerSize}
              variant={node.props.triggerVariant}
            />
          }
        >
          {node.props.triggerLabel}
        </SheetTrigger>
        <SheetContent
          finalFocus={() =>
            returnFocus.current?.isConnected ? returnFocus.current : true
          }
          side={node.props.side}
          showCloseButton={node.props.showCloseButton}
        >
          <SheetHeader>
            <SheetTitle>{node.props.title}</SheetTitle>
            {node.props.description !== null && (
              <SheetDescription>{node.props.description}</SheetDescription>
            )}
          </SheetHeader>
          {body.map((child) => (
            <Fragment key={child.id}>
              {renderNode(child, setNodeState, enqueueEvent)}
            </Fragment>
          ))}
          {footer && renderNode(footer, setNodeState, enqueueEvent)}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function TooltipNodeView({
  enqueueEvent,
  node,
}: {
  enqueueEvent: EnqueueEvent
  node: Extract<ElementsNode, { type: "tooltip" }>
}) {
  const child = node.children[0]
  if (!child || child.type !== "leaf") return null

  let trigger: ReactNode
  if (child.envelope.kind === "button") {
    const envelope = child.envelope
    const disabled = envelope.props.disabled || envelope.props.loading
    const content = (
      <>
        {envelope.props.loading && <Spinner />}
        {envelope.props.text}
      </>
    )
    const button = (
      <Button
        aria-busy={envelope.props.loading || undefined}
        className={envelope.props.stretch ? "w-full" : undefined}
        disabled={disabled}
        onClick={() => enqueueEvent(child.id, "click", true)}
        size={envelope.props.size}
        variant={envelope.props.variant}
      >
        {content}
      </Button>
    )
    trigger = disabled ? (
      <TooltipTrigger render={<span tabIndex={0} />}>{button}</TooltipTrigger>
    ) : (
      <TooltipTrigger
        render={
          <Button
            aria-busy={envelope.props.loading || undefined}
            className={envelope.props.stretch ? "w-full" : undefined}
            onClick={() => enqueueEvent(child.id, "click", true)}
            size={envelope.props.size}
            variant={envelope.props.variant}
          />
        }
      >
        {content}
      </TooltipTrigger>
    )
  } else if (child.envelope.kind === "link_button") {
    const envelope = child.envelope
    if (envelope.props.disabled) {
      trigger = (
        <TooltipTrigger render={<span tabIndex={0} />}>
          <LinkButtonControl envelope={envelope} />
        </TooltipTrigger>
      )
    } else {
      trigger = (
        <TooltipTrigger
          render={
            <a
              className={cn(
                buttonVariants({
                  size: envelope.props.size,
                  variant: envelope.props.variant,
                }),
                envelope.props.stretch && "w-full"
              )}
              href={envelope.props.url}
              rel={
                envelope.props.target === "_blank"
                  ? "noopener noreferrer"
                  : undefined
              }
              target={envelope.props.target}
            />
          }
        >
          {envelope.props.text}
        </TooltipTrigger>
      )
    }
  } else {
    return null
  }

  return (
    <Tooltip>
      {trigger}
      <TooltipContent side={node.props.side}>{node.props.content}</TooltipContent>
    </Tooltip>
  )
}

function renderNode(
  node: ElementsNode,
  setNodeState: SetNodeState,
  enqueueEvent: EnqueueEvent,
  mode: "default" | "raw" = "default"
): ReactNode {
  if (node.type === "dialog") {
    return (
      <DialogNodeView
        enqueueEvent={enqueueEvent}
        node={node}
        setNodeState={setNodeState}
      />
    )
  }
  if (node.type === "sheet") {
    return (
      <SheetNodeView
        enqueueEvent={enqueueEvent}
        node={node}
        setNodeState={setNodeState}
      />
    )
  }
  if (node.type === "field") {
    return (
      <FieldNodeView
        enqueueEvent={enqueueEvent}
        node={node}
        setNodeState={setNodeState}
      />
    )
  }
  if (node.type === "tooltip") {
    return <TooltipNodeView enqueueEvent={enqueueEvent} node={node} />
  }

  const rawChildren =
    mode === "raw" ||
    node.type === "button_group" ||
    node.type === "dialog_footer" ||
    node.type === "sheet_footer" ||
    node.type === "empty_content"
  const children = node.children.map((child) => (
    <Fragment key={child.id}>
      {renderNode(
        child,
        setNodeState,
        enqueueEvent,
        rawChildren ? "raw" : "default"
      )}
    </Fragment>
  ))

  switch (node.type) {
    case "leaf":
      return renderLeaf(node, setNodeState, enqueueEvent, mode)
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
    case "button_group":
      return (
        <ButtonGroup
          aria-label={node.props.label}
          orientation={node.props.orientation}
        >
          {children}
        </ButtonGroup>
      )
    case "button_group_separator":
      return <ButtonGroupSeparator orientation={node.props.orientation} />
    case "button_group_text":
      return <ButtonGroupText>{node.props.text}</ButtonGroupText>
    case "dialog_footer":
      return <DialogFooter>{children}</DialogFooter>
    case "dialog_close_button":
      return (
        <DialogClose
          render={
            <Button
              aria-busy={node.props.loading || undefined}
              disabled={node.props.disabled || node.props.loading}
              onClick={() => enqueueEvent(node.id, "click", true)}
              size={node.props.size}
              variant={node.props.variant}
            />
          }
        >
          {node.props.loading && <Spinner />}
          {node.props.text}
        </DialogClose>
      )
    case "sheet_footer":
      return <SheetFooter>{children}</SheetFooter>
    case "sheet_close_button":
      return (
        <SheetClose
          render={
            <Button
              aria-busy={node.props.loading || undefined}
              disabled={node.props.disabled || node.props.loading}
              onClick={() => enqueueEvent(node.id, "click", true)}
              size={node.props.size}
              variant={node.props.variant}
            />
          }
        >
          {node.props.loading && <Spinner />}
          {node.props.text}
        </SheetClose>
      )
    case "empty":
      return <Empty>{children}</Empty>
    case "empty_header":
      return <EmptyHeader>{children}</EmptyHeader>
    case "empty_media":
      return <EmptyMedia variant={node.props.variant}>{children}</EmptyMedia>
    case "empty_title":
      return <EmptyTitle>{node.props.text}</EmptyTitle>
    case "empty_description":
      return <EmptyDescription>{node.props.text}</EmptyDescription>
    case "empty_content":
      return <EmptyContent>{children}</EmptyContent>
    case "field_set":
      return (
        <FieldSet>
          <FieldLegend variant={node.props.legendVariant}>
            {node.props.legend}
          </FieldLegend>
          {node.props.description !== null && (
            <FieldDescription>{node.props.description}</FieldDescription>
          )}
          {children}
        </FieldSet>
      )
    case "field_group":
      return <FieldGroup>{children}</FieldGroup>
    case "field_separator":
      return <FieldSeparator>{node.props.text}</FieldSeparator>
    case "spinner":
      return (
        <span aria-label={node.props.label} role="status">
          <Spinner />
        </span>
      )
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
