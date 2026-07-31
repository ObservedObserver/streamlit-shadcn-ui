import type { FrontendRendererArgs } from "@streamlit/component-v2-lib"

import { AlertView } from "@/components/streamlit/alert"
import { AccordionView } from "@/components/streamlit/accordion"
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
import { CollapsibleView } from "@/components/streamlit/collapsible"
import { DropdownMenuView } from "@/components/streamlit/dropdown-menu"
import { DatePickerView } from "@/components/streamlit/date-picker"
import { HoverCardView } from "@/components/streamlit/hover-card"
import { CalendarView } from "@/components/streamlit/calendar"
import { InputOtpView } from "@/components/streamlit/input-otp"
import { InputView } from "@/components/streamlit/input"
import { LinkButtonView } from "@/components/streamlit/link-button"
import { PaginationView } from "@/components/streamlit/pagination"
import { PopoverView } from "@/components/streamlit/popover"
import { ProgressView } from "@/components/streamlit/progress"
import { RadioGroupView } from "@/components/streamlit/radio-group"
import { ScrollAreaView } from "@/components/streamlit/scroll-area"
import { SelectView } from "@/components/streamlit/select"
import { SeparatorView } from "@/components/streamlit/separator"
import { SkeletonView } from "@/components/streamlit/skeleton"
import { SliderView } from "@/components/streamlit/slider"
import { SwitchView } from "@/components/streamlit/switch"
import { TableView } from "@/components/streamlit/table"
import { TabsView } from "@/components/streamlit/tabs"
import { TextareaView } from "@/components/streamlit/textarea"
import { ToggleGroupView } from "@/components/streamlit/toggle-group"
import { ToggleView } from "@/components/streamlit/toggle"
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
    case "input":
      return (
        <InputView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "textarea":
      return (
        <TextareaView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "accordion":
      return (
        <AccordionView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "collapsible":
      return (
        <CollapsibleView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "input_otp":
      return (
        <InputOtpView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "pagination":
      return (
        <PaginationView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "radio_group":
      return (
        <RadioGroupView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "scroll_area":
      return <ScrollAreaView envelope={envelope} />
    case "slider":
      return (
        <SliderView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "switch":
      return (
        <SwitchView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "tabs":
      return (
        <TabsView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "toggle":
      return (
        <ToggleView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "toggle_group":
      return (
        <ToggleGroupView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "calendar":
      return (
        <CalendarView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
    case "popover":
      return <PopoverView envelope={envelope} />
    case "hover_card":
      return <HoverCardView envelope={envelope} />
    case "date_picker":
      return (
        <DatePickerView
          envelope={envelope}
          setStateValue={setStateValue}
        />
      )
  }
}
