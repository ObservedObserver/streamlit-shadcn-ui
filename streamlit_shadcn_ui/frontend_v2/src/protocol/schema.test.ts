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
        footer: null,
        size: "default",
      },
    },
    {
      protocolVersion: 1,
      kind: "metric_card",
      props: {
        label: "Revenue",
        value: "$42",
        description: null,
        delta: "+5%",
        variant: "dashboard",
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
        size: "default",
        disabled: false,
        target: "_blank",
      },
    },
  ]
}

function stateCell<T>(kind: string, value: T) {
  return {
    kind,
    value,
    clientRevision: 0,
    serverRevision: 0,
  }
}

function wave3Envelopes() {
  const choices = [
    {
      label: "Alpha",
      value: "alpha",
      disabled: false,
    },
    {
      label: "Beta",
      value: "beta",
      disabled: true,
    },
  ]
  return [
    {
      protocolVersion: 1,
      kind: "input",
      state: stateCell("input", "Ada"),
      props: {
        label: "Name",
        placeholder: "Type a name",
        type: "text",
        disabled: false,
        maxLength: 40,
      },
    },
    {
      protocolVersion: 1,
      kind: "textarea",
      state: stateCell("textarea", "Notes"),
      props: {
        label: "Notes",
        placeholder: "",
        disabled: false,
        rows: 4,
        maxLength: null,
      },
    },
    {
      protocolVersion: 1,
      kind: "accordion",
      state: stateCell("accordion", ["first"]),
      props: {
        label: "Questions",
        disabled: false,
        multiple: true,
        items: [
          {
            label: "First",
            content: "Answer",
            value: "first",
            disabled: false,
          },
        ],
      },
    },
    {
      protocolVersion: 1,
      kind: "collapsible",
      state: stateCell("collapsible", true),
      props: {
        title: "Details",
        firstItem: null,
        items: ["One", "Two"],
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "input_otp",
      state: stateCell("input_otp", "123"),
      props: {
        label: "Code",
        maxLength: 6,
        pattern: "digits",
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "pagination",
      state: stateCell("pagination", 3),
      props: {
        label: "Pages",
        totalPages: 10,
        siblingCount: 1,
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "radio_group",
      state: stateCell("radio_group", "alpha"),
      props: {
        label: "Choices",
        options: choices,
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "scroll_area",
      props: {
        title: "Tags",
        items: ["One", "Two"],
        height: 240,
      },
    },
    {
      protocolVersion: 1,
      kind: "slider",
      state: stateCell("slider", [20, 80]),
      props: {
        label: "Range",
        min: 0,
        max: 100,
        step: 2,
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "switch",
      state: stateCell("switch", true),
      props: {
        label: "Enabled",
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "tabs",
      state: stateCell("tabs", "alpha"),
      props: {
        label: "Sections",
        options: choices,
        orientation: "horizontal",
        variant: "line",
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "toggle",
      state: stateCell("toggle", false),
      props: {
        label: "Bold",
        icon: "bold",
        variant: "outline",
        size: "default",
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "toggle_group",
      state: stateCell("toggle_group", ["alpha"]),
      props: {
        label: "Formatting",
        options: choices,
        multiple: true,
        orientation: "horizontal",
        variant: "outline",
        size: "default",
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "calendar",
      state: stateCell("calendar", "2026-07-30"),
      props: {
        label: "Date",
        minDate: "2026-01-01",
        maxDate: "2026-12-31",
        disabled: false,
      },
    },
  ]
}

function wave4Envelopes() {
  return [
    {
      protocolVersion: 1,
      kind: "popover",
      props: {
        label: "Migration details",
        content: "One ShadowRoot.",
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "hover_card",
      props: {
        label: "Architecture",
        content: "shadcn plus Base UI",
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "date_picker",
      state: stateCell("date_picker", "2026-07-30"),
      props: {
        label: "Release date",
        mode: "single",
        placeholder: "Pick a date",
        minDate: "2026-07-01",
        maxDate: "2026-08-31",
        disabled: false,
      },
    },
    {
      protocolVersion: 1,
      kind: "date_picker",
      state: stateCell("date_picker", [
        "2026-07-30",
        "2026-08-02",
      ]),
      props: {
        label: "Release window",
        mode: "range",
        placeholder: "Pick a date",
        minDate: null,
        maxDate: null,
        disabled: false,
      },
    },
  ]
}

function wave5Envelope() {
  return {
    protocolVersion: 1,
    kind: "alert_dialog",
    props: {
      show: true,
      openRequestId: 2,
      resolvedRequestId: 1,
      title: "Delete release?",
      description: "This action cannot be undone.",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
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

  it("accepts and normalizes every Wave 2 envelope", () => {
    for (const envelope of wave2Envelopes()) {
      expect(parseEnvelope(envelope)).toEqual({
        ok: true,
        envelope,
      })
    }
  })

  it("preserves protocol compatibility with the default metric variant", () => {
    const envelope = {
      protocolVersion: 1,
      kind: "metric_card",
      props: {
        label: "Revenue",
        value: "$42",
        description: "Compared with last month",
        delta: null,
        size: "default",
      },
    }

    expect(parseEnvelope(envelope)).toEqual({
      ok: true,
      envelope: {
        ...envelope,
        props: { ...envelope.props, variant: "default" },
      },
    })
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
      "invalid metric card variant",
      {
        protocolVersion: 1,
        kind: "metric_card",
        props: {
          label: "Revenue",
          value: "$42",
          description: null,
          delta: null,
          variant: "restyled",
          size: "default",
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

  it("accepts and normalizes every Wave 3 envelope", () => {
    for (const envelope of wave3Envelopes()) {
      expect(parseEnvelope(envelope)).toEqual({
        ok: true,
        envelope,
      })
    }
  })

  it("validates ISO years below 100 without the Date.UTC 1900 offset", () => {
    const calendar = wave3Envelopes()[13]
    const ancient = {
      ...calendar,
      state: stateCell("calendar", "0001-01-01"),
      props: {
        label: "Ancient date",
        minDate: "0001-01-01",
        maxDate: "0099-12-31",
        disabled: false,
      },
    }
    expect(parseEnvelope(ancient)).toEqual({
      ok: true,
      envelope: ancient,
    })
  })

  it.each([
    [
      "input value above max length",
      {
        ...wave3Envelopes()[0],
        state: stateCell("input", "too long"),
        props: {
          ...wave3Envelopes()[0]?.props,
          maxLength: 2,
        },
      },
    ],
    [
      "single accordion with two open items",
      {
        ...wave3Envelopes()[2],
        state: stateCell("accordion", ["first", "second"]),
        props: {
          label: "Questions",
          disabled: false,
          multiple: false,
          items: [
            {
              label: "First",
              content: "One",
              value: "first",
              disabled: false,
            },
            {
              label: "Second",
              content: "Two",
              value: "second",
              disabled: false,
            },
          ],
        },
      },
    ],
    [
      "OTP characters outside policy",
      {
        ...wave3Envelopes()[4],
        state: stateCell("input_otp", "12a"),
      },
    ],
    [
      "page outside total",
      {
        ...wave3Envelopes()[5],
        state: stateCell("pagination", 11),
      },
    ],
    [
      "descending slider range",
      {
        ...wave3Envelopes()[8],
        state: stateCell("slider", [80, 20]),
      },
    ],
    [
      "unknown selected tab",
      {
        ...wave3Envelopes()[10],
        state: stateCell("tabs", "missing"),
      },
    ],
    [
      "duplicate toggle values",
      {
        ...wave3Envelopes()[12],
        state: stateCell("toggle_group", ["alpha", "alpha"]),
      },
    ],
    [
      "impossible calendar date",
      {
        ...wave3Envelopes()[13],
        state: stateCell("calendar", "2026-02-30"),
      },
    ],
  ])("rejects malformed Wave 3 input: %s", (_name, envelope) => {
    expect(parseEnvelope(envelope).ok).toBe(false)
  })

  it("accepts and normalizes every Wave 4 envelope", () => {
    for (const envelope of wave4Envelopes()) {
      expect(parseEnvelope(envelope)).toEqual({
        ok: true,
        envelope,
      })
    }
  })

  it.each([
    [
      "single mode with a range value",
      {
        ...wave4Envelopes()[2],
        state: stateCell("date_picker", [
          "2026-07-30",
          "2026-08-02",
        ]),
      },
    ],
    [
      "range mode with a single value",
      {
        ...wave4Envelopes()[3],
        state: stateCell("date_picker", "2026-07-30"),
      },
    ],
    [
      "descending range",
      {
        ...wave4Envelopes()[3],
        state: stateCell("date_picker", [
          "2026-08-02",
          "2026-07-30",
        ]),
      },
    ],
    [
      "date outside bounds",
      {
        ...wave4Envelopes()[2],
        state: stateCell("date_picker", "2026-06-30"),
      },
    ],
    [
      "invalid range date",
      {
        ...wave4Envelopes()[3],
        state: stateCell("date_picker", [
          "2026-07-30",
          "2026-02-30",
        ]),
      },
    ],
  ])("rejects malformed Wave 4 input: %s", (_name, envelope) => {
    expect(parseEnvelope(envelope).ok).toBe(false)
  })

  it("accepts and normalizes the Wave 5 Alert Dialog envelope", () => {
    const envelope = wave5Envelope()
    expect(parseEnvelope(envelope)).toEqual({
      ok: true,
      envelope,
    })
  })

  it.each([
    [
      "resolved request above open request",
      {
        ...wave5Envelope(),
        props: {
          ...wave5Envelope().props,
          openRequestId: 2,
          resolvedRequestId: 3,
        },
      },
    ],
    [
      "fractional request id",
      {
        ...wave5Envelope(),
        props: {
          ...wave5Envelope().props,
          openRequestId: 1.5,
        },
      },
    ],
    [
      "non-boolean visibility",
      {
        ...wave5Envelope(),
        props: {
          ...wave5Envelope().props,
          show: "yes",
        },
      },
    ],
  ])("rejects malformed Wave 5 input: %s", (_name, envelope) => {
    expect(parseEnvelope(envelope).ok).toBe(false)
  })
})
