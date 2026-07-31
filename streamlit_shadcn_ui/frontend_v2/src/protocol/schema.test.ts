import { describe, expect, it } from "vitest"

import {
  MAX_ENVELOPE_BYTES,
  MAX_OPTIONS,
  MAX_TEXT_BYTES,
  parseEnvelope,
} from "@/protocol/schema"

function selectEnvelope() {
  return {
    protocolVersion: 1,
    kind: "select",
    state: {
      kind: "select",
      value: "alpha",
      clientRevision: 3,
      serverRevision: 2,
    },
    props: {
      disabled: false,
      label: "Choice",
      options: [
        { label: "Alpha", value: "alpha" },
        { disabled: true, label: "Beta", value: "beta" },
      ],
      placeholder: "Choose",
    },
  }
}

describe("parseEnvelope", () => {
  it("accepts and normalizes a valid Select envelope", () => {
    const parsed = parseEnvelope(selectEnvelope())

    expect(parsed.ok).toBe(true)
    if (parsed.ok) {
      expect(parsed.envelope).toEqual(selectEnvelope())
    }
  })

  it.each([
    ["wrong protocol", { ...selectEnvelope(), protocolVersion: 2 }],
    [
      "wrong state kind",
      {
        ...selectEnvelope(),
        state: { ...selectEnvelope().state, kind: "checkbox" },
      },
    ],
    [
      "non-integral revision",
      {
        ...selectEnvelope(),
        state: { ...selectEnvelope().state, clientRevision: 1.5 },
      },
    ],
    [
      "value outside options",
      {
        ...selectEnvelope(),
        state: { ...selectEnvelope().state, value: "missing" },
      },
    ],
    [
      "duplicate values",
      {
        ...selectEnvelope(),
        props: {
          ...selectEnvelope().props,
          options: [
            { label: "One", value: "same" },
            { label: "Two", value: "same" },
          ],
        },
        state: { ...selectEnvelope().state, value: "same" },
      },
    ],
  ])("rejects %s", (_name, envelope) => {
    expect(parseEnvelope(envelope).ok).toBe(false)
  })

  it("enforces the item-count boundary", () => {
    const atLimit = selectEnvelope()
    atLimit.props.options = Array.from(
      { length: MAX_OPTIONS },
      (_, index) => ({
        label: `Option ${index}`,
        value: `option-${index}`,
      })
    )
    atLimit.state.value = "option-0"

    expect(parseEnvelope(atLimit).ok).toBe(true)

    atLimit.props.options.push({
      label: "One too many",
      value: "overflow",
    })
    expect(parseEnvelope(atLimit).ok).toBe(false)
  })

  it("enforces UTF-8 text and serialized-envelope boundaries", () => {
    const oversizedText = selectEnvelope()
    oversizedText.props.label = "界".repeat(
      Math.floor(MAX_TEXT_BYTES / 3) + 1
    )
    expect(parseEnvelope(oversizedText).ok).toBe(false)

    const oversizedEnvelope = {
      ...selectEnvelope(),
      padding: "x".repeat(MAX_ENVELOPE_BYTES),
    }
    const parsed = parseEnvelope(oversizedEnvelope)
    expect(parsed).toEqual({
      ok: false,
      failure: {
        code: "SSUI_V2_ENVELOPE_TOO_LARGE",
        kind: "select",
        protocolVersion: "1",
      },
    })
  })

  it("returns a bounded failure for non-serializable input", () => {
    const circular: Record<string, unknown> = {
      kind: "select",
      protocolVersion: 1,
    }
    circular.self = circular

    expect(parseEnvelope(circular)).toEqual({
      ok: false,
      failure: {
        code: "SSUI_V2_ENVELOPE_TOO_LARGE",
        kind: "select",
        protocolVersion: "1",
      },
    })
  })
})
