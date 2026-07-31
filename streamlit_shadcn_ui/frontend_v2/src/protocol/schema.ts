export const PROTOCOL_VERSION = 1 as const
export const MAX_OPTIONS = 10_000
export const MAX_TEXT_BYTES = 16 * 1024
export const MAX_ENVELOPE_BYTES = 2 * 1024 * 1024

export type ComponentKind =
  | "select"
  | "dropdown_menu"
  | "checkbox"
  | "button"

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

export type Envelope =
  | SelectEnvelope
  | DropdownMenuEnvelope
  | CheckboxEnvelope
  | ButtonEnvelope

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

  const envelope =
    value.kind === "select"
      ? parseSelect(value)
      : value.kind === "dropdown_menu"
        ? parseDropdownMenu(value)
        : value.kind === "checkbox"
          ? parseCheckbox(value)
          : value.kind === "button"
            ? parseButton(value)
            : null

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
