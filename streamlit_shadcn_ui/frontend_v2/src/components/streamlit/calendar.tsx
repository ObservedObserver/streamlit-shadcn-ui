import { useEffect, useState } from "react"
import type { Matcher } from "react-day-picker"

import type { V2RendererArgs } from "@/app"
import { Calendar } from "@/components/ui/calendar"
import { useRevisionedState } from "@/protocol/reconciliation"
import type { CalendarEnvelope } from "@/protocol/schema"

type CalendarViewProps = {
  envelope: CalendarEnvelope
  setStateValue: V2RendererArgs["setStateValue"]
}

function parseLocalDate(value: string | null) {
  if (value === null) {
    return undefined
  }
  const year = Number(value.slice(0, 4))
  const month = Number(value.slice(5, 7))
  const day = Number(value.slice(8, 10))
  const date = new Date(0)
  date.setHours(12, 0, 0, 0)
  date.setFullYear(year, month - 1, day)
  return date
}

function formatLocalDate(value: Date) {
  const year = String(value.getFullYear()).padStart(4, "0")
  const month = String(value.getMonth() + 1).padStart(2, "0")
  const day = String(value.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function CalendarView({
  envelope,
  setStateValue,
}: CalendarViewProps) {
  const { commit, state } = useRevisionedState(
    envelope.state,
    setStateValue
  )
  const minDate = parseLocalDate(envelope.props.minDate)
  const maxDate = parseLocalDate(envelope.props.maxDate)
  const selectedDate = parseLocalDate(state.value)
  const [visibleMonth, setVisibleMonth] = useState(
    selectedDate ?? minDate ?? maxDate ?? new Date()
  )
  useEffect(() => {
    if (selectedDate !== undefined) {
      setVisibleMonth(selectedDate)
    }
  }, [state.value])
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

  return (
    <div
      aria-label={envelope.props.label}
      className="w-fit rounded-lg border"
      data-ssui-component="calendar"
      data-testid="ssui-v2-calendar"
      role="group"
    >
      <Calendar
        disabled={disabled}
        endMonth={maxDate}
        mode="single"
        month={visibleMonth}
        onMonthChange={setVisibleMonth}
        onSelect={(date) => {
          commit(date === undefined ? null : formatLocalDate(date))
        }}
        selected={selectedDate}
        startMonth={minDate}
      />
    </div>
  )
}
