import { isNumberInputValue, isSafeNumber } from "@/lib/number-input"
import type { NumberInputConstraints } from "@/lib/number-input"

export const PROTOCOL_VERSION = 1 as const
export const MAX_OPTIONS = 10_000
export const MAX_TEXT_BYTES = 16 * 1024
export const MAX_ENVELOPE_BYTES = 2 * 1024 * 1024

export type ComponentKind =
  | "elements"
  | "select"
  | "combobox"
  | "dropdown_menu"
  | "checkbox"
  | "button"
  | "alert"
  | "alert_dialog"
  | "avatar"
  | "badge"
  | "breadcrumb"
  | "card"
  | "chart"
  | "metric_card"
  | "aspect_ratio"
  | "progress"
  | "separator"
  | "skeleton"
  | "table"
  | "link_button"
  | "input"
  | "input_group"
  | "number_input"
  | "textarea"
  | "accordion"
  | "collapsible"
  | "input_otp"
  | "pagination"
  | "radio_group"
  | "scroll_area"
  | "slider"
  | "switch"
  | "tabs"
  | "toggle"
  | "toggle_group"
  | "calendar"
  | "popover"
  | "hover_card"
  | "date_picker"

export type StateCell<T, TKind extends ComponentKind> = {
  kind: TKind
  value: T
  clientRevision: number
  serverRevision: number
}

export type SelectOption = {
  label: string
  value: string
  disabled?: boolean
}

export type DropdownItem = {
  label: string
  value: string
  disabled?: boolean
  variant?: "default" | "destructive"
}

export type SelectEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "select"
  state: StateCell<string | null, "select">
  props: {
    disabled: boolean
    label: string
    options: SelectOption[]
    placeholder: string
  }
}

export type ComboboxEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "combobox"
  state: StateCell<string | string[] | null, "combobox">
  props: {
    clearable: boolean
    disabled: boolean
    emptyMessage: string
    label: string
    options: SelectOption[]
    placeholder: string
    selectionMode: "single" | "multiple"
  }
}

export type DropdownMenuEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "dropdown_menu"
  props: {
    disabled: boolean
    items: DropdownItem[]
    label: string
    menuLabel: string | null
  }
}

export type CheckboxEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "checkbox"
  state: StateCell<boolean, "checkbox">
  props: {
    disabled: boolean
    label: string
  }
}

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

export type ButtonSize =
  | "default"
  | "xs"
  | "sm"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg"

export type ButtonEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "button"
  props: {
    disabled: boolean
    help: string | null
    loading: boolean
    text: string
    variant: ButtonVariant
    size: ButtonSize
    stretch?: boolean
  }
}

export type AlertVariant = "default" | "destructive"

export type AlertEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "alert"
  props: {
    title: string
    description: string | null
    variant: AlertVariant
  }
}

export type AlertDialogEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "alert_dialog"
  props: {
    show: boolean
    openRequestId: number
    resolvedRequestId: number
    title: string
    description: string
    confirmLabel: string
    cancelLabel: string
  }
}

export type AvatarSize = "sm" | "default" | "lg"

export type AvatarEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "avatar"
  props: {
    src: string | null
    fallback: string
    alt: string
    size: AvatarSize
  }
}

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"

export type BadgeEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "badge"
  props: {
    badges: Array<{
      text: string
      variant: BadgeVariant
    }>
  }
}

export type BreadcrumbEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "breadcrumb"
  props: {
    label: string
    items: Array<{
      text: string
      href: string | null
      current: boolean
    }>
  }
}

export type CardProps = {
  title: string | null
  content: string | null
  description: string | null
  footer: string | null
  size: "default" | "sm"
}

export type CardEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "card"
  props: CardProps
}

export type MetricCardEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "metric_card"
  props: {
    label: string
    value: string
    description: string | null
    delta: string | null
    variant: "default" | "dashboard"
    size: "default" | "sm"
  }
}

export type AspectRatioEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "aspect_ratio"
  props: {
    src: string
    alt: string
    ratio: number
  }
}

export type ProgressEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "progress"
  props: {
    value: number
    label: string | null
    showValue: boolean
  }
}

export type SeparatorEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "separator"
  props: {
    orientation: "horizontal" | "vertical"
  }
}

export type CssDimension = string | number

export type SkeletonEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "skeleton"
  props: {
    shape: "rectangle" | "circle"
    width: CssDimension
    height: CssDimension
  }
}

export type ChartType = "line" | "area" | "bar" | "pie" | "radar" | "radial"
export type ChartEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "chart"
  props: {
    chartType: ChartType
    data: Array<{ category: string } & Record<string, string | number | null>>
    series: Array<{ key: string; label: string }>
    title: string | null
    description: string | null
    showLegend: boolean
    showTooltip: boolean
    stacked: boolean
    horizontal: boolean
    donut: boolean
  }
}

export type TableCellValue = string | number | boolean | null

export type TableEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "table"
  props: {
    columns: Array<{
      key: string
      label: string
      align: "left" | "center" | "right"
    }>
    rows: TableCellValue[][]
    caption: string | null
    maxHeight: number | null
  }
}

export type LinkButtonEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "link_button"
  props: {
    text: string
    url: string
    variant: ButtonVariant
    size: ButtonSize
    disabled: boolean
    target: "_blank" | "_self"
    stretch?: boolean
  }
}

export type InputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url"

export type InputEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "input"
  state: StateCell<string, "input">
  props: {
    label: string
    placeholder: string
    type: InputType
    disabled: boolean
    maxLength: number | null
  }
}

export type InputGroupIcon =
  | "at-sign"
  | "dollar-sign"
  | "link"
  | "mail"
  | "search"

export type InputGroupEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "input_group"
  state: StateCell<string, "input_group">
  props: {
    clearable: boolean
    copyable: boolean
    disabled: boolean
    label: string
    maxLength: number | null
    placeholder: string
    prefix: string | null
    startIcon: InputGroupIcon | null
    suffix: string | null
    type: InputType
  }
}

export type NumberInputEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "number_input"
  state: StateCell<number, "number_input">
  props: NumberInputConstraints & {
    label: string
    disabled: boolean
  }
}

export type TextareaEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "textarea"
  state: StateCell<string, "textarea">
  props: {
    label: string
    placeholder: string
    disabled: boolean
    rows: number
    maxLength: number | null
  }
}

export type AccordionEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "accordion"
  state: StateCell<string[], "accordion">
  props: {
    label: string
    disabled: boolean
    multiple: boolean
    items: Array<{
      label: string
      content: string
      value: string
      disabled: boolean
    }>
  }
}

export type CollapsibleEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "collapsible"
  state: StateCell<boolean, "collapsible">
  props: {
    title: string
    firstItem: string | null
    items: string[]
    disabled: boolean
  }
}

export type InputOtpEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "input_otp"
  state: StateCell<string, "input_otp">
  props: {
    label: string
    maxLength: number
    pattern: "digits" | "alphanumeric"
    disabled: boolean
  }
}

export type PaginationEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "pagination"
  state: StateCell<number, "pagination">
  props: {
    label: string
    totalPages: number
    siblingCount: number
    disabled: boolean
  }
}

export type ChoiceOption = {
  label: string
  value: string
  disabled: boolean
}

export type RadioGroupEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "radio_group"
  state: StateCell<string | null, "radio_group">
  props: {
    label: string
    options: ChoiceOption[]
    disabled: boolean
  }
}

export type ScrollAreaEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "scroll_area"
  props: {
    title: string | null
    items: string[]
    height: number
  }
}

export type SliderEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "slider"
  state: StateCell<number[], "slider">
  props: {
    label: string
    min: number
    max: number
    step: number
    disabled: boolean
  }
}

export type SwitchEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "switch"
  state: StateCell<boolean, "switch">
  props: {
    label: string
    disabled: boolean
  }
}

export type TabsEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "tabs"
  state: StateCell<string, "tabs">
  props: {
    label: string
    options: ChoiceOption[]
    orientation: "horizontal" | "vertical"
    variant: "default" | "line"
    disabled: boolean
  }
}

export type ToggleEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "toggle"
  state: StateCell<boolean, "toggle">
  props: {
    label: string
    icon: "bold" | "italic" | "underline" | null
    variant: "default" | "outline"
    size: "default" | "sm" | "lg"
    disabled: boolean
  }
}

export type ToggleGroupEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "toggle_group"
  state: StateCell<string[], "toggle_group">
  props: {
    label: string
    options: ChoiceOption[]
    multiple: boolean
    orientation: "horizontal" | "vertical"
    variant: "default" | "outline"
    size: "default" | "sm" | "lg"
    disabled: boolean
  }
}

export type CalendarEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "calendar"
  state: StateCell<string | null, "calendar">
  props: {
    label: string
    minDate: string | null
    maxDate: string | null
    disabled: boolean
  }
}

export type PopoverEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "popover"
  props: {
    label: string
    content: string | null
    disabled: boolean
  }
}

export type HoverCardEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "hover_card"
  props: {
    label: string
    content: string
    disabled: boolean
  }
}

export type DatePickerValue = string | [string, string] | null

export type DatePickerEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "date_picker"
  state: StateCell<DatePickerValue, "date_picker">
  props: {
    label: string | null
    mode: "single" | "range"
    placeholder: string
    minDate: string | null
    maxDate: string | null
    disabled: boolean
  }
}

export type StandaloneEnvelope =
  | SelectEnvelope
  | ComboboxEnvelope
  | DropdownMenuEnvelope
  | CheckboxEnvelope
  | ButtonEnvelope
  | AlertEnvelope
  | AlertDialogEnvelope
  | AvatarEnvelope
  | BadgeEnvelope
  | BreadcrumbEnvelope
  | CardEnvelope
  | ChartEnvelope
  | MetricCardEnvelope
  | AspectRatioEnvelope
  | ProgressEnvelope
  | SeparatorEnvelope
  | SkeletonEnvelope
  | TableEnvelope
  | LinkButtonEnvelope
  | InputEnvelope
  | InputGroupEnvelope
  | NumberInputEnvelope
  | TextareaEnvelope
  | AccordionEnvelope
  | CollapsibleEnvelope
  | InputOtpEnvelope
  | PaginationEnvelope
  | RadioGroupEnvelope
  | ScrollAreaEnvelope
  | SliderEnvelope
  | SwitchEnvelope
  | TabsEnvelope
  | ToggleEnvelope
  | ToggleGroupEnvelope
  | CalendarEnvelope
  | PopoverEnvelope
  | HoverCardEnvelope
  | DatePickerEnvelope

export type ElementsLeafEnvelope =
  | SelectEnvelope
  | ComboboxEnvelope
  | CheckboxEnvelope
  | ButtonEnvelope
  | BadgeEnvelope
  | ProgressEnvelope
  | SeparatorEnvelope
  | AspectRatioEnvelope
  | LinkButtonEnvelope
  | InputEnvelope
  | InputGroupEnvelope
  | NumberInputEnvelope
  | TextareaEnvelope
  | RadioGroupEnvelope
  | SliderEnvelope
  | SwitchEnvelope

export type ElementsNodeState = {
  kind: ElementsStatefulKind
  value: unknown
  clientRevision: number
  serverRevision: number
  changeSequence: number
}

export type ElementsStateValue = {
  nodes: Record<string, ElementsNodeState>
  sequence: number
}

export type ElementsStatefulKind =
  | "select"
  | "combobox"
  | "checkbox"
  | "input"
  | "input_group"
  | "number_input"
  | "textarea"
  | "radio_group"
  | "slider"
  | "switch"

type ElementsContainerNode = {
  id: string
  children: ElementsNode[]
  envelope: null
} & (
  | {
      type: "stack"
      props: {
        direction: "vertical" | "horizontal"
        gap: ElementsGap
        align: "start" | "center" | "end" | "stretch"
        justify: "start" | "center" | "end" | "between"
        wrap: boolean
      }
    }
  | {
      type: "grid"
      props: {
        columns: number
        gap: ElementsGap
        minColumnWidth: number | null
      }
    }
  | {
      type: "card"
      props: { size: "default" | "sm" }
    }
  | {
      type: "card_header" | "card_content" | "card_footer"
      props: Record<string, never>
    }
  | {
      type: "button_group"
      props: {
        label: string
        orientation: "horizontal" | "vertical"
      }
    }
  | {
      type: "dialog"
      props: {
        description: string | null
        disabled: boolean
        showCloseButton: boolean
        title: string
        triggerLabel: string
        triggerSize: ButtonSize
        triggerVariant: ButtonVariant
      }
    }
  | {
      type: "dialog_footer"
      props: Record<string, never>
    }
  | {
      type:
        | "empty"
        | "empty_header"
        | "empty_content"
        | "field_group"
      props: Record<string, never>
    }
  | {
      type: "empty_media"
      props: { variant: "default" | "icon" }
    }
  | {
      type: "field_set"
      props: {
        description: string | null
        legend: string
        legendVariant: "legend" | "label"
      }
    }
  | {
      type: "field"
      props: {
        description: string | null
        error: string | null
        label: string
        orientation: "vertical" | "horizontal" | "responsive"
      }
    }
  | {
      type: "tooltip"
      props: {
        content: string
        side: "top" | "right" | "bottom" | "left"
      }
    }
)

export type ElementsGap = "none" | "xs" | "sm" | "md" | "lg" | "xl"

type ElementsContentNode = {
  id: string
  children: []
  envelope: null
} & (
  | {
      type: "text"
      props: {
        text: string
        variant: "body" | "muted" | "label" | "caption"
      }
    }
  | {
      type: "heading"
      props: { text: string; level: 2 | 3 | 4 }
    }
  | {
      type: "code"
      props: { text: string; language: string }
    }
  | {
      type: "button_group_separator"
      props: { orientation: "horizontal" | "vertical" }
    }
  | {
      type: "button_group_text" | "empty_title" | "empty_description"
      props: { text: string }
    }
  | {
      type: "dialog_close_button"
      props: {
        disabled: boolean
        loading: boolean
        size: ButtonSize
        text: string
        variant: ButtonVariant
      }
    }
  | {
      type: "field_separator"
      props: { text: string | null }
    }
  | {
      type: "spinner"
      props: { label: string }
    }
)

export type ElementsLeafNode = {
  id: string
  type: "leaf"
  props: Record<string, never>
  children: []
  envelope: ElementsLeafEnvelope
}

export type ElementsNode =
  | ElementsContainerNode
  | ElementsContentNode
  | ElementsLeafNode

export type ElementsEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "elements"
  state: StateCell<ElementsStateValue, "elements">
  props: { nodes: ElementsNode[] }
}

export type Envelope = StandaloneEnvelope | ElementsEnvelope

export type ProtocolFailure = {
  code: string
  kind: string
  protocolVersion: string
}

type ParseResult =
  | { ok: true; envelope: Envelope }
  | { ok: false; failure: ProtocolFailure }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isBoundedText(value: unknown): value is string {
  return (
    typeof value === "string" &&
    new TextEncoder().encode(value).byteLength <= MAX_TEXT_BYTES
  )
}

function isNullableBoundedText(value: unknown): value is string | null {
  return value === null || isBoundedText(value)
}

function isSafeUrl(value: unknown): value is string {
  if (!isBoundedText(value)) {
    return false
  }
  if (
    value.startsWith("/") ||
    value.startsWith("#") ||
    value.startsWith("?")
  ) {
    return true
  }
  try {
    const parsed = new URL(value)
    return (
      parsed.protocol === "http:" ||
      parsed.protocol === "https:" ||
      parsed.protocol === "mailto:"
    )
  } catch {
    return false
  }
}

function isSafeImageSource(value: unknown): value is string {
  if (!isBoundedText(value)) {
    return false
  }
  if (value.startsWith("data:image/") || value.startsWith("/")) {
    return true
  }
  try {
    const parsed = new URL(value)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}

function isNullableSafeImageSource(
  value: unknown
): value is string | null {
  return value === null || isSafeImageSource(value)
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value)
}

function isCssDimension(value: unknown): value is CssDimension {
  return (
    (typeof value === "number" &&
      Number.isFinite(value) &&
      value >= 0 &&
      value <= 10_000) ||
    (typeof value === "string" &&
      /^(?:0|\d+(?:\.\d+)?(?:px|rem|em|%|vw|vh))$/.test(value))
  )
}

function isRevision(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value >= 0
  )
}

function isStateCell<TKind extends ComponentKind>(
  value: unknown,
  kind: TKind
): value is StateCell<unknown, TKind> {
  return (
    isRecord(value) &&
    value.kind === kind &&
    isRevision(value.clientRevision) &&
    isRevision(value.serverRevision)
  )
}

function parseStateCell<TValue, TKind extends ComponentKind>(
  value: unknown,
  kind: TKind,
  isValue: (candidate: unknown) => candidate is TValue
): StateCell<TValue, TKind> | null {
  if (!isStateCell(value, kind) || !isValue(value.value)) {
    return null
  }
  return {
    kind,
    value: value.value,
    clientRevision: value.clientRevision,
    serverRevision: value.serverRevision,
  }
}

function parseSelect(value: Record<string, unknown>): SelectEnvelope | null {
  const props = value.props
  const state = value.state
  if (
    !isRecord(props) ||
    !isStateCell(state, "select") ||
    !(state.value === null || isBoundedText(state.value)) ||
    !isBoundedText(props.label) ||
    !isBoundedText(props.placeholder) ||
    typeof props.disabled !== "boolean" ||
    !Array.isArray(props.options) ||
    props.options.length > MAX_OPTIONS
  ) {
    return null
  }

  const options: SelectOption[] = []
  const values = new Set<string>()
  for (const option of props.options) {
    if (
      !isRecord(option) ||
      !isBoundedText(option.label) ||
      !isBoundedText(option.value) ||
      (option.disabled !== undefined &&
        typeof option.disabled !== "boolean") ||
      values.has(option.value)
    ) {
      return null
    }
    values.add(option.value)
    options.push({
      label: option.label,
      value: option.value,
      ...(option.disabled === undefined
        ? {}
        : { disabled: option.disabled }),
    })
  }
  if (state.value !== null && !values.has(state.value)) {
    return null
  }

  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "select",
    state: {
      kind: "select",
      value: state.value,
      clientRevision: state.clientRevision,
      serverRevision: state.serverRevision,
    },
    props: {
      disabled: props.disabled,
      label: props.label,
      options,
      placeholder: props.placeholder,
    },
  }
}

function parseCombobox(
  value: Record<string, unknown>
): ComboboxEnvelope | null {
  const props = value.props
  const state = value.state
  if (
    !isRecord(props) ||
    !isStateCell(state, "combobox") ||
    !isBoundedText(props.label) ||
    !isBoundedText(props.placeholder) ||
    !isBoundedText(props.emptyMessage) ||
    typeof props.clearable !== "boolean" ||
    typeof props.disabled !== "boolean" ||
    (props.selectionMode !== "single" &&
      props.selectionMode !== "multiple") ||
    !Array.isArray(props.options) ||
    props.options.length > MAX_OPTIONS
  ) {
    return null
  }

  const options: SelectOption[] = []
  const values = new Set<string>()
  for (const option of props.options) {
    if (
      !isRecord(option) ||
      !isBoundedText(option.label) ||
      !isBoundedText(option.value) ||
      (option.disabled !== undefined &&
        typeof option.disabled !== "boolean") ||
      values.has(option.value)
    ) {
      return null
    }
    values.add(option.value)
    options.push({
      label: option.label,
      value: option.value,
      ...(option.disabled === undefined
        ? {}
        : { disabled: option.disabled }),
    })
  }

  let selected: string | string[] | null
  if (props.selectionMode === "single") {
    if (
      !(state.value === null || isBoundedText(state.value)) ||
      (typeof state.value === "string" && !values.has(state.value))
    ) {
      return null
    }
    selected = state.value
  } else {
    if (
      !Array.isArray(state.value) ||
      state.value.some(
        (item) => !isBoundedText(item) || !values.has(item)
      ) ||
      new Set(state.value).size !== state.value.length
    ) {
      return null
    }
    selected = [...state.value]
  }

  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "combobox",
    state: {
      kind: "combobox",
      value: selected,
      clientRevision: state.clientRevision,
      serverRevision: state.serverRevision,
    },
    props: {
      clearable: props.clearable,
      disabled: props.disabled,
      emptyMessage: props.emptyMessage,
      label: props.label,
      options,
      placeholder: props.placeholder,
      selectionMode: props.selectionMode,
    },
  }
}

function parseDropdownMenu(
  value: Record<string, unknown>
): DropdownMenuEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !(props.menuLabel === null || isBoundedText(props.menuLabel)) ||
    typeof props.disabled !== "boolean" ||
    !Array.isArray(props.items) ||
    props.items.length > MAX_OPTIONS
  ) {
    return null
  }

  const items: DropdownItem[] = []
  const values = new Set<string>()
  for (const item of props.items) {
    if (
      !isRecord(item) ||
      !isBoundedText(item.label) ||
      !isBoundedText(item.value) ||
      (item.disabled !== undefined &&
        typeof item.disabled !== "boolean") ||
      (item.variant !== undefined &&
        item.variant !== "default" &&
        item.variant !== "destructive") ||
      values.has(item.value)
    ) {
      return null
    }
    values.add(item.value)
    items.push({
      label: item.label,
      value: item.value,
      ...(item.disabled === undefined
        ? {}
        : { disabled: item.disabled }),
      ...(item.variant === undefined
        ? {}
        : { variant: item.variant }),
    })
  }

  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "dropdown_menu",
    props: {
      disabled: props.disabled,
      items,
      label: props.label,
      menuLabel: props.menuLabel,
    },
  }
}

function parseCheckbox(
  value: Record<string, unknown>
): CheckboxEnvelope | null {
  const props = value.props
  const state = value.state
  if (
    !isRecord(props) ||
    !isStateCell(state, "checkbox") ||
    typeof state.value !== "boolean" ||
    !isBoundedText(props.label) ||
    typeof props.disabled !== "boolean"
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "checkbox",
    state: {
      kind: "checkbox",
      value: state.value,
      clientRevision: state.clientRevision,
      serverRevision: state.serverRevision,
    },
    props: {
      disabled: props.disabled,
      label: props.label,
    },
  }
}

const BUTTON_VARIANTS = new Set<ButtonVariant>([
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
])
const BUTTON_SIZES = new Set<ButtonSize>([
  "default",
  "xs",
  "sm",
  "lg",
  "icon",
  "icon-xs",
  "icon-sm",
  "icon-lg",
])

function parseButton(value: Record<string, unknown>): ButtonEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isBoundedText(props.text) ||
    typeof props.disabled !== "boolean" ||
    !(
      props.help === undefined ||
      props.help === null ||
      isBoundedText(props.help)
    ) ||
    (props.loading !== undefined && typeof props.loading !== "boolean") ||
    typeof props.variant !== "string" ||
    !BUTTON_VARIANTS.has(props.variant as ButtonVariant) ||
    typeof props.size !== "string" ||
    !BUTTON_SIZES.has(props.size as ButtonSize) ||
    (props.stretch !== undefined && typeof props.stretch !== "boolean")
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "button",
    props: {
      disabled: props.disabled,
      help: typeof props.help === "string" ? props.help : null,
      loading: props.loading === true,
      text: props.text,
      variant: props.variant as ButtonVariant,
      size: props.size as ButtonSize,
      ...(typeof props.stretch === "boolean"
        ? { stretch: props.stretch }
        : {}),
    },
  }
}

const ALERT_VARIANTS = new Set<AlertVariant>([
  "default",
  "destructive",
])
const AVATAR_SIZES = new Set<AvatarSize>(["sm", "default", "lg"])
const BADGE_VARIANTS = new Set<BadgeVariant>([
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
])

function parseAlert(value: Record<string, unknown>): AlertEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isBoundedText(props.title) ||
    !isNullableBoundedText(props.description) ||
    typeof props.variant !== "string" ||
    !ALERT_VARIANTS.has(props.variant as AlertVariant)
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "alert",
    props: {
      title: props.title,
      description: props.description,
      variant: props.variant as AlertVariant,
    },
  }
}

function parseAvatar(value: Record<string, unknown>): AvatarEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isNullableSafeImageSource(props.src) ||
    !isBoundedText(props.fallback) ||
    !isBoundedText(props.alt) ||
    typeof props.size !== "string" ||
    !AVATAR_SIZES.has(props.size as AvatarSize)
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "avatar",
    props: {
      src: props.src,
      fallback: props.fallback,
      alt: props.alt,
      size: props.size as AvatarSize,
    },
  }
}

function parseBadge(value: Record<string, unknown>): BadgeEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !Array.isArray(props.badges) ||
    props.badges.length > MAX_OPTIONS
  ) {
    return null
  }
  const badges: BadgeEnvelope["props"]["badges"] = []
  for (const badge of props.badges) {
    if (
      !isRecord(badge) ||
      !isBoundedText(badge.text) ||
      typeof badge.variant !== "string" ||
      !BADGE_VARIANTS.has(badge.variant as BadgeVariant)
    ) {
      return null
    }
    badges.push({
      text: badge.text,
      variant: badge.variant as BadgeVariant,
    })
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "badge",
    props: { badges },
  }
}

function parseBreadcrumb(
  value: Record<string, unknown>
): BreadcrumbEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !Array.isArray(props.items) ||
    props.items.length > MAX_OPTIONS
  ) {
    return null
  }
  const items: BreadcrumbEnvelope["props"]["items"] = []
  let currentCount = 0
  for (const item of props.items) {
    if (
      !isRecord(item) ||
      !isBoundedText(item.text) ||
      !isNullableBoundedText(item.href) ||
      typeof item.current !== "boolean"
    ) {
      return null
    }
    currentCount += item.current ? 1 : 0
    items.push({
      text: item.text,
      href: item.href,
      current: item.current,
    })
  }
  if (currentCount > 1) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "breadcrumb",
    props: {
      label: props.label,
      items,
    },
  }
}

function parseCardProps(value: unknown): CardProps | null {
  if (
    !isRecord(value) ||
    !isNullableBoundedText(value.title) ||
    !isNullableBoundedText(value.content) ||
    !isNullableBoundedText(value.description) ||
    !isNullableBoundedText(value.footer) ||
    (value.size !== "default" && value.size !== "sm")
  ) {
    return null
  }
  return {
    title: value.title,
    content: value.content,
    description: value.description,
    footer: value.footer,
    size: value.size,
  }
}

function parseCard(value: Record<string, unknown>): CardEnvelope | null {
  const props = parseCardProps(value.props)
  if (!props) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "card",
    props,
  }
}

function parseMetricCard(
  value: Record<string, unknown>
): MetricCardEnvelope | null {
  const props = value.props
  const variant = isRecord(props) && props.variant === undefined
    ? "default"
    : isRecord(props)
      ? props.variant
      : undefined
  if (
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !isBoundedText(props.value) ||
    !isNullableBoundedText(props.description) ||
    !isNullableBoundedText(props.delta) ||
    (variant !== "default" && variant !== "dashboard") ||
    (props.size !== "default" && props.size !== "sm")
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "metric_card",
    props: {
      label: props.label,
      value: props.value,
      description: props.description,
      delta: props.delta,
      variant,
      size: props.size,
    },
  }
}

function parseAspectRatio(
  value: Record<string, unknown>
): AspectRatioEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isSafeImageSource(props.src) ||
    !isBoundedText(props.alt) ||
    !isFiniteNumber(props.ratio) ||
    props.ratio <= 0 ||
    props.ratio > 100
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "aspect_ratio",
    props: {
      src: props.src,
      alt: props.alt,
      ratio: props.ratio,
    },
  }
}

function parseProgress(
  value: Record<string, unknown>
): ProgressEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isFiniteNumber(props.value) ||
    props.value < 0 ||
    props.value > 100 ||
    !isNullableBoundedText(props.label) ||
    typeof props.showValue !== "boolean"
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "progress",
    props: {
      value: props.value,
      label: props.label,
      showValue: props.showValue,
    },
  }
}

function parseSeparator(
  value: Record<string, unknown>
): SeparatorEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    (props.orientation !== "horizontal" &&
      props.orientation !== "vertical")
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "separator",
    props: { orientation: props.orientation },
  }
}

function parseSkeleton(
  value: Record<string, unknown>
): SkeletonEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    (props.shape !== "rectangle" && props.shape !== "circle") ||
    !isCssDimension(props.width) ||
    !isCssDimension(props.height)
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "skeleton",
    props: {
      shape: props.shape,
      width: props.width,
      height: props.height,
    },
  }
}

function isTableCellValue(value: unknown): value is TableCellValue {
  return (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    isFiniteNumber(value)
  )
}

function parseChart(value: Record<string, unknown>): ChartEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    typeof props.chartType !== "string" ||
    !["line", "area", "bar", "pie", "radar", "radial"].includes(props.chartType) ||
    !Array.isArray(props.data) || props.data.length < 1 || props.data.length > 1000 ||
    !Array.isArray(props.series) || props.series.length < 1 || props.series.length > 5 ||
    !isNullableBoundedText(props.title) || !isNullableBoundedText(props.description) ||
    typeof props.showLegend !== "boolean" || typeof props.showTooltip !== "boolean" ||
    typeof props.stacked !== "boolean" || typeof props.horizontal !== "boolean" ||
    typeof props.donut !== "boolean" ||
    (props.stacked && props.chartType !== "area" && props.chartType !== "bar") ||
    (props.horizontal && props.chartType !== "bar") ||
    (props.donut && props.chartType !== "pie")
  ) return null

  const segmented = props.chartType === "pie" || props.chartType === "radial"
  const polar = segmented || props.chartType === "radar"
  if ((segmented && props.data.length !== props.series.length) ||
      (props.chartType === "radar" && props.data.length < 3)) return null
  const series: ChartEnvelope["props"]["series"] = []
  for (const [i, item] of props.series.entries()) {
    if (!isRecord(item) || item.key !== `${segmented ? "segment" : "series"}-${i}` ||
        !isBoundedText(item.label) || !item.label) return null
    series.push({ key: item.key, label: item.label })
  }
  if (segmented && new Set(series.map(s => s.label)).size !== series.length) return null
  const data: ChartEnvelope["props"]["data"] = []
  const categories = new Set<string>()
  const measureKeys = segmented ? ["value"] : series.map(s => s.key)
  for (const [i, row] of props.data.entries()) {
    if (!isRecord(row) || !isBoundedText(row.category) || !row.category ||
        Object.keys(row).length !== measureKeys.length + 1 ||
        (segmented && row.category !== `segment-${i}`) ||
        (polar && categories.has(row.category))) return null
    categories.add(row.category)
    const normalized: ChartEnvelope["props"]["data"][number] = { category: row.category }
    for (const key of measureKeys) {
      const number = row[key]
      if (number === null && !polar) normalized[key] = null
      else if (typeof number === "number" && Number.isFinite(number) &&
               Math.abs(number) <= Number.MAX_SAFE_INTEGER && (!polar || number >= 0)) {
        normalized[key] = number
      } else return null
    }
    data.push(normalized)
  }
  if (measureKeys.some(key => data.every(row => row[key] === null))) return null
  if (segmented && !data.some(row => (row.value as number) > 0)) return null
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "chart",
    props: {
      chartType: props.chartType as ChartType, data, series,
      title: props.title, description: props.description,
      showLegend: props.showLegend, showTooltip: props.showTooltip,
      stacked: props.stacked, horizontal: props.horizontal, donut: props.donut,
    },
  }
}

function parseTable(value: Record<string, unknown>): TableEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !Array.isArray(props.columns) ||
    !Array.isArray(props.rows) ||
    props.columns.length > MAX_OPTIONS ||
    props.rows.length > MAX_OPTIONS ||
    !isNullableBoundedText(props.caption) ||
    !(
      props.maxHeight === null ||
      (Number.isSafeInteger(props.maxHeight) &&
        (props.maxHeight as number) >= 80 &&
        (props.maxHeight as number) <= 10_000)
    )
  ) {
    return null
  }

  const columns: TableEnvelope["props"]["columns"] = []
  const columnKeys = new Set<string>()
  for (const column of props.columns) {
    if (
      !isRecord(column) ||
      !isBoundedText(column.key) ||
      !isBoundedText(column.label) ||
      (column.align !== "left" &&
        column.align !== "center" &&
        column.align !== "right") ||
      columnKeys.has(column.key)
    ) {
      return null
    }
    columnKeys.add(column.key)
    columns.push({
      key: column.key,
      label: column.label,
      align: column.align,
    })
  }

  const rows: TableCellValue[][] = []
  for (const row of props.rows) {
    if (
      !Array.isArray(row) ||
      row.length !== columns.length ||
      row.some((cell) => !isTableCellValue(cell))
    ) {
      return null
    }
    rows.push([...row] as TableCellValue[])
  }

  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "table",
    props: {
      columns,
      rows,
      caption: props.caption,
      maxHeight: props.maxHeight as number | null,
    },
  }
}

function parseLinkButton(
  value: Record<string, unknown>
): LinkButtonEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isBoundedText(props.text) ||
    !isSafeUrl(props.url) ||
    typeof props.variant !== "string" ||
    !BUTTON_VARIANTS.has(props.variant as ButtonVariant) ||
    typeof props.size !== "string" ||
    !BUTTON_SIZES.has(props.size as ButtonSize) ||
    typeof props.disabled !== "boolean" ||
    (props.target !== "_blank" && props.target !== "_self") ||
    (props.stretch !== undefined && typeof props.stretch !== "boolean")
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "link_button",
    props: {
      text: props.text,
      url: props.url,
      variant: props.variant as ButtonVariant,
      size: props.size as ButtonSize,
      disabled: props.disabled,
      target: props.target,
      ...(typeof props.stretch === "boolean"
        ? { stretch: props.stretch }
        : {}),
    },
  }
}

const INPUT_TYPES = new Set<InputType>([
  "text",
  "email",
  "password",
  "search",
  "tel",
  "url",
])

function isOptionalMaxLength(value: unknown): value is number | null {
  return (
    value === null ||
    (Number.isSafeInteger(value) &&
      (value as number) >= 1 &&
      (value as number) <= MAX_TEXT_BYTES)
  )
}

function parseChoiceOptions(value: unknown): ChoiceOption[] | null {
  if (!Array.isArray(value) || value.length > MAX_OPTIONS) {
    return null
  }
  const options: ChoiceOption[] = []
  const values = new Set<string>()
  for (const option of value) {
    if (
      !isRecord(option) ||
      !isBoundedText(option.label) ||
      !isBoundedText(option.value) ||
      typeof option.disabled !== "boolean" ||
      values.has(option.value)
    ) {
      return null
    }
    values.add(option.value)
    options.push({
      label: option.label,
      value: option.value,
      disabled: option.disabled,
    })
  }
  return options
}

function isBoundedStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length <= MAX_OPTIONS &&
    value.every((item) => isBoundedText(item))
  )
}

function hasUniqueValues(values: string[]) {
  return new Set(values).size === values.length
}

function isIsoDate(value: unknown): value is string {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return false
  }
  const year = Number(value.slice(0, 4))
  const month = Number(value.slice(5, 7))
  const day = Number(value.slice(8, 10))
  const date = new Date(0)
  date.setUTCHours(0, 0, 0, 0)
  date.setUTCFullYear(year, month - 1, day)
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

function isNullableIsoDate(value: unknown): value is string | null {
  return value === null || isIsoDate(value)
}

function parseInput(value: Record<string, unknown>): InputEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "input",
    isBoundedText
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !isBoundedText(props.placeholder) ||
    typeof props.type !== "string" ||
    !INPUT_TYPES.has(props.type as InputType) ||
    typeof props.disabled !== "boolean" ||
    !isOptionalMaxLength(props.maxLength) ||
    (props.maxLength !== null &&
      state.value.length > props.maxLength)
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "input",
    state,
    props: {
      label: props.label,
      placeholder: props.placeholder,
      type: props.type as InputType,
      disabled: props.disabled,
      maxLength: props.maxLength,
    },
  }
}

const INPUT_GROUP_ICONS = new Set<InputGroupIcon>([
  "at-sign",
  "dollar-sign",
  "link",
  "mail",
  "search",
])

function parseInputGroup(
  value: Record<string, unknown>
): InputGroupEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "input_group",
    isBoundedText
  )
  if (
    !state ||
    !isRecord(props) ||
    typeof props.clearable !== "boolean" ||
    typeof props.copyable !== "boolean" ||
    typeof props.disabled !== "boolean" ||
    !isBoundedText(props.label) ||
    !isBoundedText(props.placeholder) ||
    !isNullableBoundedText(props.prefix) ||
    !isNullableBoundedText(props.suffix) ||
    !(
      props.startIcon === null ||
      (typeof props.startIcon === "string" &&
        INPUT_GROUP_ICONS.has(props.startIcon as InputGroupIcon))
    ) ||
    (props.type !== "text" &&
      props.type !== "email" &&
      props.type !== "password" &&
      props.type !== "search" &&
      props.type !== "tel" &&
      props.type !== "url") ||
    !(
      props.maxLength === null ||
      (Number.isSafeInteger(props.maxLength) &&
        (props.maxLength as number) >= 1 &&
        (props.maxLength as number) <= 16 * 1024)
    ) ||
    (typeof props.maxLength === "number" &&
      state.value.length > props.maxLength)
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "input_group",
    state,
    props: {
      clearable: props.clearable,
      copyable: props.copyable,
      disabled: props.disabled,
      label: props.label,
      maxLength: props.maxLength as number | null,
      placeholder: props.placeholder,
      prefix: props.prefix,
      startIcon: props.startIcon as InputGroupIcon | null,
      suffix: props.suffix,
      type: props.type,
    },
  }
}

function parseNumberInput(
  value: Record<string, unknown>
): NumberInputEnvelope | null {
  const props = value.props
  const state = parseStateCell(value.state, "number_input", isSafeNumber)
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    typeof props.disabled !== "boolean" ||
    typeof props.integer !== "boolean" ||
    !(props.min === null || isSafeNumber(props.min)) ||
    !(props.max === null || isSafeNumber(props.max)) ||
    !isSafeNumber(props.step) ||
    props.step <= 0 ||
    (props.min !== null && props.max !== null && props.min > props.max) ||
    (props.integer &&
      [props.min, props.max, props.step].some(
        (number) => number !== null && !Number.isSafeInteger(number)
      ))
  ) {
    return null
  }
  const normalized = {
    label: props.label,
    disabled: props.disabled,
    integer: props.integer,
    min: props.min,
    max: props.max,
    step: props.step,
  }
  if (!isNumberInputValue(state.value, normalized)) return null
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "number_input",
    state,
    props: normalized,
  }
}

function parseTextarea(
  value: Record<string, unknown>
): TextareaEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "textarea",
    isBoundedText
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !isBoundedText(props.placeholder) ||
    typeof props.disabled !== "boolean" ||
    !Number.isSafeInteger(props.rows) ||
    (props.rows as number) < 2 ||
    (props.rows as number) > 20 ||
    !isOptionalMaxLength(props.maxLength) ||
    (props.maxLength !== null &&
      state.value.length > props.maxLength)
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "textarea",
    state,
    props: {
      label: props.label,
      placeholder: props.placeholder,
      disabled: props.disabled,
      rows: props.rows as number,
      maxLength: props.maxLength,
    },
  }
}

function parseAccordion(
  value: Record<string, unknown>
): AccordionEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "accordion",
    isBoundedStringArray
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    typeof props.disabled !== "boolean" ||
    typeof props.multiple !== "boolean" ||
    !Array.isArray(props.items) ||
    props.items.length > MAX_OPTIONS ||
    !hasUniqueValues(state.value) ||
    (!props.multiple && state.value.length > 1)
  ) {
    return null
  }

  const items: AccordionEnvelope["props"]["items"] = []
  const values = new Set<string>()
  for (const item of props.items) {
    if (
      !isRecord(item) ||
      !isBoundedText(item.label) ||
      !isBoundedText(item.content) ||
      !isBoundedText(item.value) ||
      typeof item.disabled !== "boolean" ||
      values.has(item.value)
    ) {
      return null
    }
    values.add(item.value)
    items.push({
      label: item.label,
      content: item.content,
      value: item.value,
      disabled: item.disabled,
    })
  }
  if (state.value.some((item) => !values.has(item))) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "accordion",
    state,
    props: {
      label: props.label,
      disabled: props.disabled,
      multiple: props.multiple,
      items,
    },
  }
}

function parseCollapsible(
  value: Record<string, unknown>
): CollapsibleEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "collapsible",
    (candidate): candidate is boolean =>
      typeof candidate === "boolean"
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.title) ||
    !isNullableBoundedText(props.firstItem) ||
    !isBoundedStringArray(props.items) ||
    typeof props.disabled !== "boolean"
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "collapsible",
    state,
    props: {
      title: props.title,
      firstItem: props.firstItem,
      items: [...props.items],
      disabled: props.disabled,
    },
  }
}

function parseInputOtp(
  value: Record<string, unknown>
): InputOtpEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "input_otp",
    isBoundedText
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !Number.isSafeInteger(props.maxLength) ||
    (props.maxLength as number) < 1 ||
    (props.maxLength as number) > 12 ||
    (props.pattern !== "digits" &&
      props.pattern !== "alphanumeric") ||
    typeof props.disabled !== "boolean" ||
    state.value.length > (props.maxLength as number) ||
    (props.pattern === "digits"
      ? !/^\d*$/.test(state.value)
      : !/^[a-z0-9]*$/i.test(state.value))
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "input_otp",
    state,
    props: {
      label: props.label,
      maxLength: props.maxLength as number,
      pattern: props.pattern,
      disabled: props.disabled,
    },
  }
}

function parsePagination(
  value: Record<string, unknown>
): PaginationEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "pagination",
    (candidate): candidate is number =>
      Number.isSafeInteger(candidate)
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !Number.isSafeInteger(props.totalPages) ||
    (props.totalPages as number) < 1 ||
    (props.totalPages as number) > MAX_OPTIONS ||
    !Number.isSafeInteger(props.siblingCount) ||
    (props.siblingCount as number) < 0 ||
    (props.siblingCount as number) > 10 ||
    typeof props.disabled !== "boolean" ||
    state.value < 1 ||
    state.value > (props.totalPages as number)
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "pagination",
    state,
    props: {
      label: props.label,
      totalPages: props.totalPages as number,
      siblingCount: props.siblingCount as number,
      disabled: props.disabled,
    },
  }
}

function parseRadioGroup(
  value: Record<string, unknown>
): RadioGroupEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "radio_group",
    isNullableBoundedText
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    typeof props.disabled !== "boolean"
  ) {
    return null
  }
  const options = parseChoiceOptions(props.options)
  if (
    !options ||
    (state.value !== null &&
      !options.some((option) => option.value === state.value))
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "radio_group",
    state,
    props: {
      label: props.label,
      options,
      disabled: props.disabled,
    },
  }
}

function parseScrollArea(
  value: Record<string, unknown>
): ScrollAreaEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isNullableBoundedText(props.title) ||
    !isBoundedStringArray(props.items) ||
    !Number.isSafeInteger(props.height) ||
    (props.height as number) < 80 ||
    (props.height as number) > 10_000
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "scroll_area",
    props: {
      title: props.title,
      items: [...props.items],
      height: props.height as number,
    },
  }
}

function parseSlider(
  value: Record<string, unknown>
): SliderEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "slider",
    (candidate): candidate is number[] =>
      Array.isArray(candidate) &&
      candidate.every((item) => isFiniteNumber(item))
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !isFiniteNumber(props.min) ||
    !isFiniteNumber(props.max) ||
    props.max <= props.min ||
    !isFiniteNumber(props.step) ||
    props.step <= 0 ||
    props.step > props.max - props.min ||
    typeof props.disabled !== "boolean" ||
    (state.value.length !== 1 && state.value.length !== 2)
  ) {
    return null
  }
  const min = props.min
  const max = props.max
  if (
    state.value.some((item) => item < min || item > max) ||
    (state.value.length === 2 &&
      (state.value[0] as number) > (state.value[1] as number))
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "slider",
    state,
    props: {
      label: props.label,
      min,
      max,
      step: props.step,
      disabled: props.disabled,
    },
  }
}

function parseSwitch(
  value: Record<string, unknown>
): SwitchEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "switch",
    (candidate): candidate is boolean =>
      typeof candidate === "boolean"
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    typeof props.disabled !== "boolean"
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "switch",
    state,
    props: {
      label: props.label,
      disabled: props.disabled,
    },
  }
}

function parseTabs(value: Record<string, unknown>): TabsEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "tabs",
    isBoundedText
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    (props.orientation !== "horizontal" &&
      props.orientation !== "vertical") ||
    (props.variant !== "default" && props.variant !== "line") ||
    typeof props.disabled !== "boolean"
  ) {
    return null
  }
  const options = parseChoiceOptions(props.options)
  if (
    !options ||
    options.length === 0 ||
    !options.some((option) => option.value === state.value)
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "tabs",
    state,
    props: {
      label: props.label,
      options,
      orientation: props.orientation,
      variant: props.variant,
      disabled: props.disabled,
    },
  }
}

function parseToggle(
  value: Record<string, unknown>
): ToggleEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "toggle",
    (candidate): candidate is boolean =>
      typeof candidate === "boolean"
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !(
      props.icon === null ||
      props.icon === "bold" ||
      props.icon === "italic" ||
      props.icon === "underline"
    ) ||
    (props.variant !== "default" && props.variant !== "outline") ||
    (props.size !== "default" &&
      props.size !== "sm" &&
      props.size !== "lg") ||
    typeof props.disabled !== "boolean"
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "toggle",
    state,
    props: {
      label: props.label,
      icon: props.icon,
      variant: props.variant,
      size: props.size,
      disabled: props.disabled,
    },
  }
}

function parseToggleGroup(
  value: Record<string, unknown>
): ToggleGroupEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "toggle_group",
    isBoundedStringArray
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    typeof props.multiple !== "boolean" ||
    (props.orientation !== "horizontal" &&
      props.orientation !== "vertical") ||
    (props.variant !== "default" && props.variant !== "outline") ||
    (props.size !== "default" &&
      props.size !== "sm" &&
      props.size !== "lg") ||
    typeof props.disabled !== "boolean" ||
    !hasUniqueValues(state.value) ||
    (!props.multiple && state.value.length > 1)
  ) {
    return null
  }
  const options = parseChoiceOptions(props.options)
  if (
    !options ||
    options.length === 0 ||
    state.value.some(
      (selected) =>
        !options.some((option) => option.value === selected)
    )
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "toggle_group",
    state,
    props: {
      label: props.label,
      options,
      multiple: props.multiple,
      orientation: props.orientation,
      variant: props.variant,
      size: props.size,
      disabled: props.disabled,
    },
  }
}

function parseCalendar(
  value: Record<string, unknown>
): CalendarEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "calendar",
    isNullableIsoDate
  )
  if (
    !state ||
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !isNullableIsoDate(props.minDate) ||
    !isNullableIsoDate(props.maxDate) ||
    typeof props.disabled !== "boolean" ||
    (props.minDate !== null &&
      props.maxDate !== null &&
      props.minDate > props.maxDate) ||
    (state.value !== null &&
      ((props.minDate !== null && state.value < props.minDate) ||
        (props.maxDate !== null && state.value > props.maxDate)))
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "calendar",
    state,
    props: {
      label: props.label,
      minDate: props.minDate,
      maxDate: props.maxDate,
      disabled: props.disabled,
    },
  }
}

function parsePopover(
  value: Record<string, unknown>
): PopoverEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !isNullableBoundedText(props.content) ||
    typeof props.disabled !== "boolean"
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "popover",
    props: {
      label: props.label,
      content: props.content,
      disabled: props.disabled,
    },
  }
}

function parseHoverCard(
  value: Record<string, unknown>
): HoverCardEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isBoundedText(props.label) ||
    !isBoundedText(props.content) ||
    typeof props.disabled !== "boolean"
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "hover_card",
    props: {
      label: props.label,
      content: props.content,
      disabled: props.disabled,
    },
  }
}

function parseAlertDialog(
  value: Record<string, unknown>
): AlertDialogEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    typeof props.show !== "boolean" ||
    !isRevision(props.openRequestId) ||
    !isRevision(props.resolvedRequestId) ||
    props.resolvedRequestId > props.openRequestId ||
    !isBoundedText(props.title) ||
    !isBoundedText(props.description) ||
    !isBoundedText(props.confirmLabel) ||
    !isBoundedText(props.cancelLabel)
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "alert_dialog",
    props: {
      show: props.show,
      openRequestId: props.openRequestId,
      resolvedRequestId: props.resolvedRequestId,
      title: props.title,
      description: props.description,
      confirmLabel: props.confirmLabel,
      cancelLabel: props.cancelLabel,
    },
  }
}

function isDatePickerValue(
  value: unknown
): value is DatePickerValue {
  return (
    value === null ||
    isIsoDate(value) ||
    (Array.isArray(value) &&
      value.length === 2 &&
      isIsoDate(value[0]) &&
      isIsoDate(value[1]))
  )
}

function dateWithinBounds(
  value: string,
  minimum: string | null,
  maximum: string | null
): boolean {
  return (
    (minimum === null || value >= minimum) &&
    (maximum === null || value <= maximum)
  )
}

function parseDatePicker(
  value: Record<string, unknown>
): DatePickerEnvelope | null {
  const props = value.props
  const state = parseStateCell(
    value.state,
    "date_picker",
    isDatePickerValue
  )
  if (
    !state ||
    !isRecord(props) ||
    !isNullableBoundedText(props.label) ||
    (props.mode !== "single" && props.mode !== "range") ||
    !isBoundedText(props.placeholder) ||
    !isNullableIsoDate(props.minDate) ||
    !isNullableIsoDate(props.maxDate) ||
    typeof props.disabled !== "boolean" ||
    (props.minDate !== null &&
      props.maxDate !== null &&
      props.minDate > props.maxDate) ||
    (props.mode === "single" && Array.isArray(state.value)) ||
    (props.mode === "range" &&
      state.value !== null &&
      !Array.isArray(state.value))
  ) {
    return null
  }

  const minimum = props.minDate as string | null
  const maximum = props.maxDate as string | null
  const dates: string[] =
    state.value === null
      ? []
      : typeof state.value === "string"
        ? [state.value]
        : [...state.value]
  if (
    dates.some(
      (date) => !dateWithinBounds(date, minimum, maximum)
    ) ||
    (dates.length === 2 && dates[0]! > dates[1]!)
  ) {
    return null
  }

  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "date_picker",
    state,
    props: {
      label: props.label,
      mode: props.mode,
      placeholder: props.placeholder,
      minDate: minimum,
      maxDate: maximum,
      disabled: props.disabled,
    },
  }
}

const ELEMENTS_GAPS = new Set<ElementsGap>([
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
])
const ELEMENTS_STATEFUL_KINDS = new Set<ElementsStatefulKind>([
  "select",
  "combobox",
  "checkbox",
  "input",
  "input_group",
  "number_input",
  "textarea",
  "radio_group",
  "slider",
  "switch",
])
const ELEMENTS_LEAF_KINDS = new Set<ElementsLeafEnvelope["kind"]>([
  ...ELEMENTS_STATEFUL_KINDS,
  "button",
  "badge",
  "progress",
  "separator",
  "aspect_ratio",
  "link_button",
])

type ElementsParseContext = {
  count: number
  normalizedStates: Record<string, ElementsNodeState>
  rawStates: Record<string, unknown>
  seenIds: Set<string>
}

function isElementsNodeId(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[A-Za-z0-9][A-Za-z0-9_.\/-]{0,511}$/.test(value)
  )
}

function isElementsLeafEnvelope(
  envelope: StandaloneEnvelope
): envelope is ElementsLeafEnvelope {
  return ELEMENTS_LEAF_KINDS.has(
    envelope.kind as ElementsLeafEnvelope["kind"]
  )
}

function stateFromElementsLeaf(
  envelope: ElementsLeafEnvelope
): StateCell<unknown, ElementsStatefulKind> | null {
  switch (envelope.kind) {
    case "select":
    case "combobox":
    case "checkbox":
    case "input":
    case "input_group":
    case "number_input":
    case "textarea":
    case "radio_group":
    case "slider":
    case "switch":
      return envelope.state as StateCell<unknown, ElementsStatefulKind>
    default:
      return null
  }
}

function parseElementsNode(
  value: unknown,
  context: ElementsParseContext,
  depth: number,
  parentType: string | null
): ElementsNode | null {
  if (
    depth > 32 ||
    context.count >= 1_000 ||
    !isRecord(value) ||
    !isElementsNodeId(value.id) ||
    context.seenIds.has(value.id) ||
    typeof value.type !== "string" ||
    !isRecord(value.props) ||
    !Array.isArray(value.children) ||
    value.children.length > 1_000
  ) {
    return null
  }
  context.count += 1
  context.seenIds.add(value.id)

  const id = value.id
  const type = value.type
  const props = value.props

  if (type === "text") {
    if (
      value.children.length !== 0 ||
      !isBoundedText(props.text) ||
      (props.variant !== "body" &&
        props.variant !== "muted" &&
        props.variant !== "label" &&
        props.variant !== "caption")
    ) {
      return null
    }
    return {
      id,
      type,
      props: { text: props.text, variant: props.variant },
      children: [],
      envelope: null,
    }
  }
  if (type === "heading") {
    if (
      value.children.length !== 0 ||
      !isBoundedText(props.text) ||
      (props.level !== 2 && props.level !== 3 && props.level !== 4)
    ) {
      return null
    }
    return {
      id,
      type,
      props: { text: props.text, level: props.level },
      children: [],
      envelope: null,
    }
  }
  if (type === "code") {
    if (
      value.children.length !== 0 ||
      !isBoundedText(props.text) ||
      !isBoundedText(props.language)
    ) {
      return null
    }
    return {
      id,
      type,
      props: { text: props.text, language: props.language },
      children: [],
      envelope: null,
    }
  }
  if (type === "button_group_separator") {
    if (
      parentType !== "button_group" ||
      value.children.length !== 0 ||
      (props.orientation !== "horizontal" &&
        props.orientation !== "vertical")
    ) {
      return null
    }
    return {
      id,
      type,
      props: { orientation: props.orientation },
      children: [],
      envelope: null,
    }
  }
  if (
    type === "button_group_text" ||
    type === "empty_title" ||
    type === "empty_description"
  ) {
    const expectedParent =
      type === "button_group_text" ? "button_group" : "empty_header"
    if (
      parentType !== expectedParent ||
      value.children.length !== 0 ||
      !isBoundedText(props.text)
    ) {
      return null
    }
    return {
      id,
      type,
      props: { text: props.text },
      children: [],
      envelope: null,
    }
  }
  if (type === "dialog_close_button") {
    if (
      parentType !== "dialog_footer" ||
      value.children.length !== 0 ||
      !isBoundedText(props.text) ||
      typeof props.disabled !== "boolean" ||
      typeof props.loading !== "boolean" ||
      typeof props.size !== "string" ||
      !BUTTON_SIZES.has(props.size as ButtonSize) ||
      typeof props.variant !== "string" ||
      !BUTTON_VARIANTS.has(props.variant as ButtonVariant)
    ) {
      return null
    }
    return {
      id,
      type,
      props: {
        disabled: props.disabled,
        loading: props.loading,
        size: props.size as ButtonSize,
        text: props.text,
        variant: props.variant as ButtonVariant,
      },
      children: [],
      envelope: null,
    }
  }
  if (type === "field_separator") {
    if (
      (parentType !== "field_group" && parentType !== "field_set") ||
      value.children.length !== 0 ||
      !isNullableBoundedText(props.text)
    ) {
      return null
    }
    return {
      id,
      type,
      props: { text: props.text },
      children: [],
      envelope: null,
    }
  }
  if (type === "spinner") {
    if (
      value.children.length !== 0 ||
      !isBoundedText(props.label)
    ) {
      return null
    }
    return {
      id,
      type,
      props: { label: props.label },
      children: [],
      envelope: null,
    }
  }

  if (ELEMENTS_LEAF_KINDS.has(type as ElementsLeafEnvelope["kind"])) {
    if (value.children.length !== 0) {
      return null
    }
    const candidate: Record<string, unknown> = {
      protocolVersion: PROTOCOL_VERSION,
      kind: type,
      props,
    }
    let changeSequence: number | null = null
    if (ELEMENTS_STATEFUL_KINDS.has(type as ElementsStatefulKind)) {
      const rawState = context.rawStates[id]
      if (
        !isRecord(rawState) ||
        rawState.kind !== type ||
        !isRevision(rawState.clientRevision) ||
        !isRevision(rawState.serverRevision) ||
        !isRevision(rawState.changeSequence)
      ) {
        return null
      }
      changeSequence = rawState.changeSequence
      candidate.state = {
        kind: rawState.kind,
        value: rawState.value,
        clientRevision: rawState.clientRevision,
        serverRevision: rawState.serverRevision,
      }
    }
    const parsed = parseKnownEnvelope(candidate)
    if (!parsed || parsed.kind === "elements" || !isElementsLeafEnvelope(parsed)) {
      return null
    }
    const parsedState = stateFromElementsLeaf(parsed)
    if (parsedState !== null) {
      context.normalizedStates[id] = {
        kind: parsedState.kind,
        value: parsedState.value,
        clientRevision: parsedState.clientRevision,
        serverRevision: parsedState.serverRevision,
        changeSequence: changeSequence as number,
      }
    }
    return {
      id,
      type: "leaf",
      props: {},
      children: [],
      envelope: parsed,
    }
  }

  const parsedChildren: ElementsNode[] = []
  for (const child of value.children) {
    const parsedChild = parseElementsNode(
      child,
      context,
      depth + 1,
      type
    )
    if (!parsedChild) {
      return null
    }
    parsedChildren.push(parsedChild)
  }

  if (type === "stack") {
    if (
      (props.direction !== "vertical" && props.direction !== "horizontal") ||
      typeof props.gap !== "string" ||
      !ELEMENTS_GAPS.has(props.gap as ElementsGap) ||
      (props.align !== "start" &&
        props.align !== "center" &&
        props.align !== "end" &&
        props.align !== "stretch") ||
      (props.justify !== "start" &&
        props.justify !== "center" &&
        props.justify !== "end" &&
        props.justify !== "between") ||
      typeof props.wrap !== "boolean"
    ) {
      return null
    }
    return {
      id,
      type,
      props: {
        direction: props.direction,
        gap: props.gap as ElementsGap,
        align: props.align,
        justify: props.justify,
        wrap: props.wrap,
      },
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "grid") {
    if (
      !Number.isSafeInteger(props.columns) ||
      (props.columns as number) < 1 ||
      (props.columns as number) > 6 ||
      typeof props.gap !== "string" ||
      !ELEMENTS_GAPS.has(props.gap as ElementsGap) ||
      !(
        props.minColumnWidth === null ||
        (Number.isSafeInteger(props.minColumnWidth) &&
          (props.minColumnWidth as number) >= 160 &&
          (props.minColumnWidth as number) <= 1_200)
      )
    ) {
      return null
    }
    return {
      id,
      type,
      props: {
        columns: props.columns as number,
        gap: props.gap as ElementsGap,
        minColumnWidth: props.minColumnWidth as number | null,
      },
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "card") {
    const slotTypes = parsedChildren.map((child) => child.type)
    if (
      (props.size !== "default" && props.size !== "sm") ||
      parsedChildren.some(
        (child) =>
          child.type !== "card_header" &&
          child.type !== "card_content" &&
          child.type !== "card_footer"
      ) ||
      new Set(slotTypes).size !== slotTypes.length
    ) {
      return null
    }
    return {
      id,
      type,
      props: { size: props.size },
      children: parsedChildren,
      envelope: null,
    }
  }
  if (
    type === "card_header" ||
    type === "card_content" ||
    type === "card_footer"
  ) {
    if (parentType !== "card" || Object.keys(props).length !== 0) {
      return null
    }
    return {
      id,
      type,
      props: {},
      children: parsedChildren,
      envelope: null,
    }
  }
  const childKind = (child: ElementsNode) =>
    child.type === "leaf" ? child.envelope.kind : child.type
  const childKinds = parsedChildren.map(childKind)
  if (type === "button_group") {
    if (
      !isBoundedText(props.label) ||
      (props.orientation !== "horizontal" &&
        props.orientation !== "vertical") ||
      childKinds.some(
        (kind) =>
          kind !== "button" &&
          kind !== "button_group" &&
          kind !== "button_group_separator" &&
          kind !== "button_group_text"
      )
    ) {
      return null
    }
    return {
      id,
      type,
      props: {
        label: props.label,
        orientation: props.orientation,
      },
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "dialog") {
    if (
      !isBoundedText(props.title) ||
      !isNullableBoundedText(props.description) ||
      !isBoundedText(props.triggerLabel) ||
      typeof props.disabled !== "boolean" ||
      typeof props.showCloseButton !== "boolean" ||
      typeof props.triggerSize !== "string" ||
      !BUTTON_SIZES.has(props.triggerSize as ButtonSize) ||
      typeof props.triggerVariant !== "string" ||
      !BUTTON_VARIANTS.has(props.triggerVariant as ButtonVariant) ||
      childKinds.filter((kind) => kind === "dialog_footer").length > 1
    ) {
      return null
    }
    return {
      id,
      type,
      props: {
        description: props.description,
        disabled: props.disabled,
        showCloseButton: props.showCloseButton,
        title: props.title,
        triggerLabel: props.triggerLabel,
        triggerSize: props.triggerSize as ButtonSize,
        triggerVariant: props.triggerVariant as ButtonVariant,
      },
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "dialog_footer") {
    if (
      parentType !== "dialog" ||
      Object.keys(props).length !== 0 ||
      childKinds.some(
        (kind) =>
          kind !== "button" &&
          kind !== "dialog_close_button" &&
          kind !== "link_button"
      )
    ) {
      return null
    }
    return {
      id,
      type,
      props: {},
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "empty") {
    if (
      Object.keys(props).length !== 0 ||
      childKinds.some(
        (kind) => kind !== "empty_header" && kind !== "empty_content"
      ) ||
      new Set(childKinds).size !== childKinds.length
    ) {
      return null
    }
    return {
      id,
      type,
      props: {},
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "empty_header") {
    if (
      parentType !== "empty" ||
      Object.keys(props).length !== 0 ||
      childKinds.some(
        (kind) =>
          kind !== "empty_media" &&
          kind !== "empty_title" &&
          kind !== "empty_description"
      ) ||
      new Set(childKinds).size !== childKinds.length
    ) {
      return null
    }
    return {
      id,
      type,
      props: {},
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "empty_media") {
    if (
      parentType !== "empty_header" ||
      (props.variant !== "default" && props.variant !== "icon")
    ) {
      return null
    }
    return {
      id,
      type,
      props: { variant: props.variant },
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "empty_content") {
    if (parentType !== "empty" || Object.keys(props).length !== 0) {
      return null
    }
    return {
      id,
      type,
      props: {},
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "field_set") {
    if (
      !isBoundedText(props.legend) ||
      !isNullableBoundedText(props.description) ||
      (props.legendVariant !== "legend" &&
        props.legendVariant !== "label") ||
      childKinds.some(
        (kind) =>
          kind !== "field" &&
          kind !== "field_group" &&
          kind !== "field_separator"
      )
    ) {
      return null
    }
    return {
      id,
      type,
      props: {
        description: props.description,
        legend: props.legend,
        legendVariant: props.legendVariant,
      },
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "field_group") {
    if (
      Object.keys(props).length !== 0 ||
      childKinds.some(
        (kind) =>
          kind !== "field" &&
          kind !== "field_group" &&
          kind !== "field_separator"
      )
    ) {
      return null
    }
    return {
      id,
      type,
      props: {},
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "field") {
    const supportedControls = new Set([
      "checkbox",
      "combobox",
      "input",
      "input_group",
      "select",
      "switch",
      "textarea",
    ])
    if (
      !isBoundedText(props.label) ||
      !isNullableBoundedText(props.description) ||
      !isNullableBoundedText(props.error) ||
      (props.orientation !== "vertical" &&
        props.orientation !== "horizontal" &&
        props.orientation !== "responsive") ||
      parsedChildren.length !== 1 ||
      !supportedControls.has(childKinds[0]!)
    ) {
      return null
    }
    return {
      id,
      type,
      props: {
        description: props.description,
        error: props.error,
        label: props.label,
        orientation: props.orientation,
      },
      children: parsedChildren,
      envelope: null,
    }
  }
  if (type === "tooltip") {
    if (
      !isBoundedText(props.content) ||
      (props.side !== "top" &&
        props.side !== "right" &&
        props.side !== "bottom" &&
        props.side !== "left") ||
      parsedChildren.length !== 1 ||
      (childKinds[0] !== "button" && childKinds[0] !== "link_button")
    ) {
      return null
    }
    return {
      id,
      type,
      props: {
        content: props.content,
        side: props.side,
      },
      children: parsedChildren,
      envelope: null,
    }
  }
  return null
}

function parseElements(value: Record<string, unknown>): ElementsEnvelope | null {
  const props = value.props
  const state = value.state
  if (
    !isRecord(props) ||
    !Array.isArray(props.nodes) ||
    props.nodes.length > 1_000 ||
    !isStateCell(state, "elements") ||
    !isRecord(state.value) ||
    !isRecord(state.value.nodes) ||
    !isRevision(state.value.sequence)
  ) {
    return null
  }
  const stateValue = state.value as Record<string, unknown>
  const context: ElementsParseContext = {
    count: 0,
    normalizedStates: {},
    rawStates: stateValue.nodes as Record<string, unknown>,
    seenIds: new Set<string>(),
  }
  const nodes: ElementsNode[] = []
  for (const node of props.nodes) {
    const parsed = parseElementsNode(node, context, 1, null)
    if (!parsed) {
      return null
    }
    nodes.push(parsed)
  }
  if (
    Object.keys(context.normalizedStates).length !==
      Object.keys(context.rawStates).length ||
    Object.values(context.normalizedStates).some(
      (nodeState) =>
        nodeState.changeSequence > (stateValue.sequence as number)
    )
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "elements",
    state: {
      kind: "elements",
      value: {
        nodes: context.normalizedStates,
        sequence: stateValue.sequence as number,
      },
      clientRevision: state.clientRevision,
      serverRevision: state.serverRevision,
    },
    props: { nodes },
  }
}

function parseKnownEnvelope(
  value: Record<string, unknown>
): Envelope | null {
  switch (value.kind) {
    case "elements":
      return parseElements(value)
    case "select":
      return parseSelect(value)
    case "combobox":
      return parseCombobox(value)
    case "dropdown_menu":
      return parseDropdownMenu(value)
    case "checkbox":
      return parseCheckbox(value)
    case "button":
      return parseButton(value)
    case "alert":
      return parseAlert(value)
    case "alert_dialog":
      return parseAlertDialog(value)
    case "avatar":
      return parseAvatar(value)
    case "badge":
      return parseBadge(value)
    case "breadcrumb":
      return parseBreadcrumb(value)
    case "card":
      return parseCard(value)
    case "metric_card":
      return parseMetricCard(value)
    case "aspect_ratio":
      return parseAspectRatio(value)
    case "progress":
      return parseProgress(value)
    case "separator":
      return parseSeparator(value)
    case "skeleton":
      return parseSkeleton(value)
    case "table":
      return parseTable(value)
    case "chart":
      return parseChart(value)
    case "link_button":
      return parseLinkButton(value)
    case "input":
      return parseInput(value)
    case "input_group":
      return parseInputGroup(value)
    case "number_input":
      return parseNumberInput(value)
    case "textarea":
      return parseTextarea(value)
    case "accordion":
      return parseAccordion(value)
    case "collapsible":
      return parseCollapsible(value)
    case "input_otp":
      return parseInputOtp(value)
    case "pagination":
      return parsePagination(value)
    case "radio_group":
      return parseRadioGroup(value)
    case "scroll_area":
      return parseScrollArea(value)
    case "slider":
      return parseSlider(value)
    case "switch":
      return parseSwitch(value)
    case "tabs":
      return parseTabs(value)
    case "toggle":
      return parseToggle(value)
    case "toggle_group":
      return parseToggleGroup(value)
    case "calendar":
      return parseCalendar(value)
    case "popover":
      return parsePopover(value)
    case "hover_card":
      return parseHoverCard(value)
    case "date_picker":
      return parseDatePicker(value)
    default:
      return null
  }
}

export function parseEnvelope(value: unknown): ParseResult {
  const valueKind =
    isRecord(value) && typeof value.kind === "string"
      ? value.kind
      : "unknown"
  const valueVersion =
    isRecord(value) &&
    (typeof value.protocolVersion === "string" ||
      typeof value.protocolVersion === "number")
      ? String(value.protocolVersion)
      : "unknown"

  let serializedBytes = Number.POSITIVE_INFINITY
  try {
    serializedBytes = new TextEncoder().encode(
      JSON.stringify(value)
    ).byteLength
  } catch {
    // The bounded failure below intentionally contains no user value.
  }

  if (
    serializedBytes > MAX_ENVELOPE_BYTES ||
    !isRecord(value) ||
    value.protocolVersion !== PROTOCOL_VERSION
  ) {
    return {
      ok: false,
      failure: {
        code:
          serializedBytes > MAX_ENVELOPE_BYTES
            ? "SSUI_V2_ENVELOPE_TOO_LARGE"
            : "SSUI_V2_PROTOCOL_VERSION",
        kind: valueKind,
        protocolVersion: valueVersion,
      },
    }
  }

  const envelope = parseKnownEnvelope(value)

  return envelope
    ? { ok: true, envelope }
    : {
        ok: false,
        failure: {
          code: "SSUI_V2_MALFORMED_ENVELOPE",
          kind: valueKind,
          protocolVersion: valueVersion,
        },
      }
}
