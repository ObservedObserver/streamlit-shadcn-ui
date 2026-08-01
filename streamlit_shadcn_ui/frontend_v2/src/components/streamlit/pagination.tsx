import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

import type { V2RendererArgs } from "@/app"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { PaginationEnvelope } from "@/protocol/schema"

type PaginationViewProps = {
  envelope: PaginationEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

type PaginationToken =
  | number
  | "ellipsis-left"
  | "ellipsis-right"

function numberRange(start: number, end: number) {
  return Array.from(
    { length: Math.max(end - start + 1, 0) },
    (_, index) => start + index
  )
}

export function paginationTokens(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): PaginationToken[] {
  const visibleSlots = siblingCount * 2 + 5
  if (totalPages <= visibleSlots) {
    return numberRange(1, totalPages)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(
    currentPage + siblingCount,
    totalPages
  )
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < totalPages - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    return [
      ...numberRange(1, siblingCount * 2 + 3),
      "ellipsis-right",
      totalPages,
    ]
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    return [
      1,
      "ellipsis-left",
      ...numberRange(
        totalPages - (siblingCount * 2 + 2),
        totalPages
      ),
    ]
  }
  return [
    1,
    "ellipsis-left",
    ...numberRange(leftSibling, rightSibling),
    "ellipsis-right",
    totalPages,
  ]
}

export function PaginationView({
  envelope,
  setStateValue,
}: PaginationViewProps) {
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )
  const tokens = paginationTokens(
    state.value,
    envelope.props.totalPages,
    envelope.props.siblingCount
  )

  return (
    <Pagination
      aria-label={envelope.props.label}
      data-ssui-component="pagination"
      data-testid="ssui-v2-pagination"
    >
      <PaginationContent>
        <PaginationItem>
          <Button
            aria-label="Go to previous page"
            disabled={
              envelope.props.disabled || state.value === 1
            }
            onClick={() => {
              commit(state.value - 1)
            }}
            size="default"
            variant="ghost"
          >
            <ChevronLeftIcon aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
        </PaginationItem>
        {tokens.map((token) => (
          <PaginationItem key={token}>
            {typeof token === "number" ? (
              <Button
                aria-current={
                  token === state.value ? "page" : undefined
                }
                aria-label={`Go to page ${token}`}
                disabled={envelope.props.disabled}
                onClick={() => {
                  commit(token)
                }}
                size="icon"
                variant={
                  token === state.value ? "outline" : "ghost"
                }
              >
                {token}
              </Button>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            aria-label="Go to next page"
            disabled={
              envelope.props.disabled ||
              state.value === envelope.props.totalPages
            }
            onClick={() => {
              commit(state.value + 1)
            }}
            size="default"
            variant="ghost"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRightIcon aria-hidden="true" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
