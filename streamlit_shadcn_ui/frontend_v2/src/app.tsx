import type { FrontendRendererArgs } from "@streamlit/component-v2-lib"

import { AlertView } from "@/components/streamlit/alert"
import { AspectRatioView } from "@/components/streamlit/aspect-ratio"
import { AvatarView } from "@/components/streamlit/avatar"
import { BadgeView } from "@/components/streamlit/badge"
import { BreadcrumbView } from "@/components/streamlit/breadcrumb"
import { ButtonView } from "@/components/streamlit/button"
import {
  CardView,
  MetricCardView,
} from "@/components/streamlit/card"
import { CheckboxView } from "@/components/streamlit/checkbox"
import { DropdownMenuView } from "@/components/streamlit/dropdown-menu"
import { LinkButtonView } from "@/components/streamlit/link-button"
import { ProgressView } from "@/components/streamlit/progress"
import { SelectView } from "@/components/streamlit/select"
import { SeparatorView } from "@/components/streamlit/separator"
import { SkeletonView } from "@/components/streamlit/skeleton"
import { TableView } from "@/components/streamlit/table"
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
    case "alert":
      return <AlertView envelope={envelope} />
    case "avatar":
      return <AvatarView envelope={envelope} />
    case "badge":
      return <BadgeView envelope={envelope} />
    case "breadcrumb":
      return (
        <BreadcrumbView
          envelope={envelope}
          setTriggerValue={setTriggerValue}
        />
      )
    case "card":
      return <CardView envelope={envelope} />
    case "metric_card":
      return <MetricCardView envelope={envelope} />
    case "aspect_ratio":
      return <AspectRatioView envelope={envelope} />
    case "progress":
      return <ProgressView envelope={envelope} />
    case "separator":
      return <SeparatorView envelope={envelope} />
    case "skeleton":
      return <SkeletonView envelope={envelope} />
    case "table":
      return <TableView envelope={envelope} />
    case "link_button":
      return <LinkButtonView envelope={envelope} />
  }
}
