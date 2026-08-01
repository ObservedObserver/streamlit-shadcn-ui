import { Fragment } from "react"

import type { V2RendererArgs } from "@/app"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { BreadcrumbEnvelope } from "@/protocol/schema"

type BreadcrumbViewProps = {
  envelope: BreadcrumbEnvelope
  setTriggerValue: V2RendererArgs["setTriggerValue"]
}

export function BreadcrumbView({
  envelope,
  setTriggerValue,
}: BreadcrumbViewProps) {
  return (
    <Breadcrumb
      aria-label={envelope.props.label}
      data-ssui-component="breadcrumb"
      data-testid="ssui-v2-breadcrumb"
    >
      <BreadcrumbList>
        {envelope.props.items.map((item, index) => (
          <Fragment key={`${item.text}-${index}`}>
            <BreadcrumbItem>
              {item.current ? (
                <BreadcrumbPage>{item.text}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    setTriggerValue("action", {
                      text: item.text,
                      href: item.href,
                      index,
                    })
                  }}
                >
                  {item.text}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < envelope.props.items.length - 1 ? (
              <BreadcrumbSeparator />
            ) : null}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
