import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { V2RendererArgs } from "@/app"
import {
  preferredReturnFocusElement,
  useExclusiveModalLayer,
} from "@/platform/modal-layer"
import type { AlertDialogEnvelope } from "@/protocol/schema"

type AlertDialogViewProps = {
  envelope: AlertDialogEnvelope
  setTriggerValue: V2RendererArgs["setTriggerValue"]
}

export function AlertDialogView({
  envelope,
  setTriggerValue,
}: AlertDialogViewProps) {
  const {
    openRequestId,
    resolvedRequestId,
    show,
  } = envelope.props
  const [closedRequestId, setClosedRequestId] = useState(
    resolvedRequestId
  )
  const sentRequestId = useRef(resolvedRequestId)
  const capturedRequestId = useRef(0)
  const returnFocus = useRef<HTMLElement | null>(null)
  const cancelButton = useRef<HTMLButtonElement>(null)
  const modalBoundary = useRef<HTMLDivElement>(null)

  const requested =
    show &&
    openRequestId > resolvedRequestId &&
    openRequestId > closedRequestId

  useLayoutEffect(() => {
    if (resolvedRequestId > sentRequestId.current) {
      sentRequestId.current = resolvedRequestId
    }
  }, [resolvedRequestId])

  useLayoutEffect(() => {
    if (
      requested &&
      capturedRequestId.current !== openRequestId
    ) {
      capturedRequestId.current = openRequestId
      returnFocus.current = preferredReturnFocusElement()
    }
  }, [openRequestId, requested])

  const active = useExclusiveModalLayer(requested, modalBoundary)

  const decide = useCallback(
    (decision: boolean) => {
      if (sentRequestId.current >= openRequestId) {
        return
      }
      sentRequestId.current = openRequestId
      setClosedRequestId(openRequestId)
      setTriggerValue("decision", decision)
    },
    [openRequestId, setTriggerValue]
  )

  const resolveFinalFocus = useCallback(() => {
    const target = returnFocus.current
    return target?.isConnected ? target : true
  }, [])

  return (
    <div
      className="size-0 overflow-visible"
      data-modal-active={active ? "true" : "false"}
      data-ssui-component="alert-dialog"
      data-testid="ssui-v2-alert-dialog"
      ref={modalBoundary}
    >
      <AlertDialog
        onOpenChange={(open) => {
          if (!open && active) {
            decide(false)
          }
        }}
        open={active}
      >
        <AlertDialogContent
          data-testid="ssui-v2-alert-dialog-content"
          finalFocus={resolveFinalFocus}
          initialFocus={cancelButton}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              {envelope.props.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {envelope.props.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                decide(false)
              }}
              ref={cancelButton}
            >
              {envelope.props.cancelLabel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                decide(true)
              }}
            >
              {envelope.props.confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
