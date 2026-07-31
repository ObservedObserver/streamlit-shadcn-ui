export const PROTOCOL_VERSION = 1 as const
export const MAX_OPTIONS = 10_000
export const MAX_TEXT_BYTES = 16 * 1024
export const MAX_ENVELOPE_BYTES = 2 * 1024 * 1024

export type ComponentKind =
  | "select"
  | "dropdown_menu"
  | "checkbox"
  | "button"
  | "alert"
  | "alert_dialog"
  | "avatar"
  | "badge"
  | "breadcrumb"
  | "card"
  | "metric_card"
  | "aspect_ratio"
  | "progress"
  | "separator"
  | "skeleton"
  | "table"
  | "link_button"
  | "input"
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

export type ButtonEnvelope = {
  protocolVersion: typeof PROTOCOL_VERSION
  kind: "button"
  props: {
    disabled: boolean
    text: string
    variant: ButtonVariant
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
  props: CardProps
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
    disabled: boolean
    target: "_blank" | "_self"
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

export type Envelope =
  | SelectEnvelope
  | DropdownMenuEnvelope
  | CheckboxEnvelope
  | ButtonEnvelope
  | AlertEnvelope
  | AlertDialogEnvelope
  | AvatarEnvelope
  | BadgeEnvelope
  | BreadcrumbEnvelope
  | CardEnvelope
  | MetricCardEnvelope
  | AspectRatioEnvelope
  | ProgressEnvelope
  | SeparatorEnvelope
  | SkeletonEnvelope
  | TableEnvelope
  | LinkButtonEnvelope
  | InputEnvelope
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

function parseButton(value: Record<string, unknown>): ButtonEnvelope | null {
  const props = value.props
  if (
    !isRecord(props) ||
    !isBoundedText(props.text) ||
    typeof props.disabled !== "boolean" ||
    typeof props.variant !== "string" ||
    !BUTTON_VARIANTS.has(props.variant as ButtonVariant)
  ) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind: "button",
    props: {
      disabled: props.disabled,
      text: props.text,
      variant: props.variant as ButtonVariant,
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
    (value.size !== "default" && value.size !== "sm")
  ) {
    return null
  }
  return {
    title: value.title,
    content: value.content,
    description: value.description,
    size: value.size,
  }
}

function parseCard(
  value: Record<string, unknown>,
  kind: "card" | "metric_card"
): CardEnvelope | MetricCardEnvelope | null {
  const props = parseCardProps(value.props)
  if (!props) {
    return null
  }
  return {
    protocolVersion: PROTOCOL_VERSION,
    kind,
    props,
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
    typeof props.disabled !== "boolean" ||
    (props.target !== "_blank" && props.target !== "_self")
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
      disabled: props.disabled,
      target: props.target,
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

function parseKnownEnvelope(
  value: Record<string, unknown>
): Envelope | null {
  switch (value.kind) {
    case "select":
      return parseSelect(value)
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
      return parseCard(value, "card")
    case "metric_card":
      return parseCard(value, "metric_card")
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
    case "link_button":
      return parseLinkButton(value)
    case "input":
      return parseInput(value)
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
