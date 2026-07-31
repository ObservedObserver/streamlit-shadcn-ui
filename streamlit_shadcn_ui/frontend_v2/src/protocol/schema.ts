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

export type Envelope =
  | SelectEnvelope
  | DropdownMenuEnvelope
  | CheckboxEnvelope
  | ButtonEnvelope
  | AlertEnvelope
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

function isStateCell<TKind extends "select" | "checkbox">(
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
