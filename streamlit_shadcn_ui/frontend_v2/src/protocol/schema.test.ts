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

function wave2Envelopes() {
  return [
    {
      protocolVersion: 1,
      kind: "alert",
      props: {
        title: "Heads up",
        description: "Something changed.",
        variant: "default",
      },
    },
    {
      protocolVersion: 1,
      kind: "aspect_ratio",
      props: {
        src: "https://example.com/image.png",
        alt: "Example",
        ratio: 16 / 9,
      },
    },
    {
      protocolVersion: 1,
      kind: "avatar",
      props: {
        src: null,
        fallback: "OO",
        alt: "Observed Observer",
        size: "default",
      },
    },
    {
      protocolVersion: 1,
      kind: "badge",
      props: {
        badges: [
          { text: "Stable", variant: "default" },
          { text: "Risk", variant: "destructive" },
        ],
      },
    },
    {
      protocolVersion: 1,
      kind: "breadcrumb",
      props: {
        label: "Breadcrumb",
        items: [
          { text: "Home", href: "/", current: false },
          { text: "Current", href: null, current: true },
        ],
      },
    },
    {
      protocolVersion: 1,
      kind: "card",
      props: {
        title: "Card",
        content: "Content",
        description: null,
        size: "default",
      },
    },
    {
      protocolVersion: 1,
      kind: "metric_card",
      props: {
        title: "Revenue",
        content: "$42",
        description: "+5%",
        size: "sm",
      },
    },
    {
      protocolVersion: 1,
      kind: "progress",
      props: {
        value: 42,
        label: "Upload",
        showValue: true,
      },
    },
    {
      protocolVersion: 1,
      kind: "separator",
      props: { orientation: "horizontal" },
    },
    {
      protocolVersion: 1,
      kind: "skeleton",
      props: {
        shape: "rectangle",
        width: "10rem",
        height: 24,
      },
    },
    {
      protocolVersion: 1,
      kind: "table",
      props: {
        columns: [
          { key: "name", label: "Name", align: "left" },
          { key: "score", label: "Score", align: "right" },
        ],
        rows: [["Ada", 10]],
        caption: "Scores",
        maxHeight: 320,
      },
    },
    {
      protocolVersion: 1,
      kind: "link_button",
      props: {
        text: "Docs",
        url: "https://example.com/docs",
        variant: "outline",
        disabled: false,
        target: "_blank",
      },
    },
  ]
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

  it("accepts and normalizes every Wave 2 envelope", () => {
    for (const envelope of wave2Envelopes()) {
      expect(parseEnvelope(envelope)).toEqual({
        ok: true,
        envelope,
      })
    }
  })

  it.each([
    [
      "two current breadcrumbs",
      {
        ...wave2Envelopes()[4],
        props: {
          label: "Breadcrumb",
          items: [
            { text: "One", href: null, current: true },
            { text: "Two", href: null, current: true },
          ],
        },
      },
    ],
    [
      "out-of-range progress",
      {
        ...wave2Envelopes()[7],
        props: { value: 101, label: null, showValue: false },
      },
    ],
    [
      "unsafe skeleton dimension",
      {
        ...wave2Envelopes()[9],
        props: {
          shape: "rectangle",
          width: "calc(100% - 1rem)",
          height: 24,
        },
      },
    ],
    [
      "ragged table row",
      {
        ...wave2Envelopes()[10],
        props: {
          columns: [
            { key: "name", label: "Name", align: "left" },
          ],
          rows: [["Ada", 10]],
          caption: null,
          maxHeight: null,
        },
      },
    ],
    [
      "unsafe link URL",
      {
        ...wave2Envelopes()[11],
        props: {
          text: "Unsafe",
          url: "javascript:alert(1)",
          variant: "default",
          disabled: false,
          target: "_self",
        },
      },
    ],
    [
      "unsafe image URL",
      {
        ...wave2Envelopes()[1],
        props: {
          src: "javascript:alert(1)",
          alt: "Unsafe",
          ratio: 1,
        },
      },
    ],
  ])("rejects malformed Wave 2 input: %s", (_name, envelope) => {
    expect(parseEnvelope(envelope).ok).toBe(false)
  })
})
