import { CalendarIcon } from "lucide-react"
import { useEffect, useId, useState } from "react"
import type { DateRange, Matcher } from "react-day-picker"

import type { V2RendererArgs } from "@/app"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  formatLocalDate,
  parseLocalDate,
} from "@/lib/date"
import { useRevisionedState } from "@/protocol/reconciliation"
import type {
  DatePickerEnvelope,
  DatePickerValue,
} from "@/protocol/schema"

type DatePickerViewProps = {
  envelope: DatePickerEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

function rangeFromValue(value: DatePickerValue): DateRange | undefined {
  if (!Array.isArray(value)) {
    return undefined
  }
  return {
    from: parseLocalDate(value[0]),
    to: parseLocalDate(value[1]),
  }
}

function triggerText(
  value: DatePickerValue,
  placeholder: string
): string {
  if (value === null) {
    return placeholder
  }
  return Array.isArray(value) ? value.join(" – ") : value
}

export function DatePickerView({
  envelope,
  setStateValue,
}: DatePickerViewProps) {
  const labelId = useId()
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )
  const [open, setOpen] = useState(false)
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(
    rangeFromValue(state.value)
  )

  useEffect(() => {
    setDraftRange(rangeFromValue(state.value))
  }, [state.value])

  const minDate = parseLocalDate(envelope.props.minDate)
  const maxDate = parseLocalDate(envelope.props.maxDate)
  const disabledMatchers: Matcher[] = []
  if (minDate !== undefined) {
    disabledMatchers.push({ before: minDate })
  }
  if (maxDate !== undefined) {
    disabledMatchers.push({ after: maxDate })
  }
  const disabled: Matcher | Matcher[] | undefined =
    envelope.props.disabled
      ? true
      : disabledMatchers.length > 0
        ? disabledMatchers
        : undefined
  const selectedSingle =
    typeof state.value === "string"
      ? parseLocalDate(state.value)
      : undefined
  const initialMonth =
    selectedSingle ??
    draftRange?.from ??
    minDate ??
    maxDate ??
    new Date()

  const closeWithValue = (value: DatePickerValue) => {
    commit(value)
    setOpen(false)
  }

  return (
    <div
      className="grid min-w-0 gap-1.5 p-px"
      data-ssui-component="date-picker"
      data-testid="ssui-v2-date-picker"
    >
      {envelope.props.label !== null ? (
        <span
          className="text-sm font-medium leading-none"
          id={labelId}
        >
          {envelope.props.label}
        </span>
      ) : null}
      <Popover
        modal={false}
        onOpenChange={(nextOpen) => {
          setDraftRange(rangeFromValue(state.value))
          setOpen(nextOpen)
        }}
        open={open}
      >
        <PopoverTrigger
          aria-label={
            envelope.props.label === null ? "Date picker" : undefined
          }
          aria-labelledby={
            envelope.props.label === null ? undefined : labelId
          }
          disabled={envelope.props.disabled}
          render={<Button className="justify-start" variant="outline" />}
        >
          <CalendarIcon aria-hidden="true" />
          <span
            className={
              state.value === null ? "text-muted-foreground" : undefined
            }
          >
            {triggerText(state.value, envelope.props.placeholder)}
          </span>
        </PopoverTrigger>
        <PopoverContent
          aria-label={envelope.props.label ?? "Date picker"}
          align="start"
          className="w-auto gap-0 p-0"
          data-testid="ssui-v2-date-picker-content"
        >
          {envelope.props.mode === "single" ? (
            <Calendar
              defaultMonth={initialMonth}
              disabled={disabled}
              endMonth={maxDate}
              mode="single"
              onSelect={(date) => {
                closeWithValue(
                  date === undefined ? null : formatLocalDate(date)
                )
              }}
              selected={selectedSingle}
              startMonth={minDate}
            />
          ) : (
            <Calendar
              defaultMonth={initialMonth}
              disabled={disabled}
              endMonth={maxDate}
              mode="range"
              onSelect={(range) => {
                setDraftRange(range)
              }}
              selected={draftRange}
              startMonth={minDate}
            />
          )}
          <div className="flex justify-end gap-1 border-t p-2">
            {envelope.props.mode === "range" ? (
              <Button
                onClick={() => {
                  setOpen(false)
                }}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            ) : null}
            <Button
              onClick={() => {
                closeWithValue(null)
              }}
              size="sm"
              variant="ghost"
            >
              Clear
            </Button>
            {envelope.props.mode === "range" ? (
              <Button
                disabled={
                  draftRange?.from === undefined ||
                  draftRange.to === undefined
                }
                onClick={() => {
                  if (
                    draftRange?.from !== undefined &&
                    draftRange.to !== undefined
                  ) {
                    closeWithValue([
                      formatLocalDate(draftRange.from),
                      formatLocalDate(draftRange.to),
                    ])
                  }
                }}
                size="sm"
              >
                Apply
              </Button>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
