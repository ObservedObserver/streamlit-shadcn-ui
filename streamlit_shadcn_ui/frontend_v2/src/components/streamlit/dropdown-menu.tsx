import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { DropdownMenuEnvelope } from "@/protocol/schema"
import type { V2RendererArgs } from "@/app"

type DropdownMenuViewProps = {
  envelope: DropdownMenuEnvelope
  setTriggerValue: V2RendererArgs["setTriggerValue"]
}

export function DropdownMenuView({
  envelope,
  setTriggerValue,
}: DropdownMenuViewProps) {
  return (
    <div
      className="inline-flex p-px"
      data-ssui-component="dropdown-menu"
      data-testid="ssui-v2-dropdown-menu"
    >
      <DropdownMenu
        disabled={envelope.props.disabled}
        modal={false}
      >
        <DropdownMenuTrigger
          render={<Button variant="outline" />}
        >
          {envelope.props.label}
          <ChevronDownIcon
            aria-hidden="true"
            data-icon="inline-end"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          aria-label={
            envelope.props.menuLabel ?? envelope.props.label
          }
          data-testid="ssui-v2-dropdown-menu-content"
        >
          <DropdownMenuGroup>
            {envelope.props.menuLabel ? (
              <DropdownMenuLabel>
                {envelope.props.menuLabel}
              </DropdownMenuLabel>
            ) : null}
            {envelope.props.items.length > 0 ? (
              envelope.props.items.map((item) => (
                <DropdownMenuItem
                  disabled={item.disabled}
                  key={item.value}
                  onClick={() => {
                    setTriggerValue("action", item.value)
                  }}
                  variant={item.variant}
                >
                  {item.label}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>
                No actions
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
