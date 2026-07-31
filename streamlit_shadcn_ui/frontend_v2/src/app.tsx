import type { FrontendRendererArgs } from "@streamlit/component-v2-lib"

import { ButtonView } from "@/components/streamlit/button"
import { CheckboxView } from "@/components/streamlit/checkbox"
import { DropdownMenuView } from "@/components/streamlit/dropdown-menu"
import { SelectView } from "@/components/streamlit/select"
import type { Envelope } from "@/protocol/schema"

export type V2FrontendState = Record<string, unknown>
export type V2RendererArgs = FrontendRendererArgs<
  V2FrontendState,
  unknown
>

type V2AppProps = {
  envelope: Envelope
  setStateValue: V2RendererArgs["setStateValue"]
  setTriggerValue: V2RendererArgs["setTriggerValue"]
}

export function V2App({
  envelope,
  setStateValue,
  setTriggerValue,
}: V2AppProps) {
  switch (envelope.kind) {
    case "select":
      return (
        <SelectView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "dropdown_menu":
      return (
        <DropdownMenuView
          envelope={envelope}
          setTriggerValue={setTriggerValue}
        />
      )
    case "checkbox":
      return (
        <CheckboxView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "button":
      return (
        <ButtonView
          envelope={envelope}
          setTriggerValue={setTriggerValue}
        />
      )
  }
}
