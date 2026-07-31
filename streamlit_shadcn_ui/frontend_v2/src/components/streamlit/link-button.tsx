import {
  Button,
  buttonVariants,
} from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { LinkButtonEnvelope } from "@/protocol/schema"

type LinkButtonViewProps = {
  envelope: LinkButtonEnvelope
}

export function LinkButtonView({
  envelope,
}: LinkButtonViewProps) {
  const commonProps = {
    "data-ssui-component": "link_button",
    "data-testid": "ssui-v2-link-button",
  }

  if (envelope.props.disabled) {
    return (
      <div className="inline-flex p-px" {...commonProps}>
        <Button
          disabled
          size={envelope.props.size}
          variant={envelope.props.variant}
        >
          {envelope.props.text}
        </Button>
      </div>
    )
  }

  return (
    <div className="inline-flex p-px" {...commonProps}>
      <a
        className={cn(
          buttonVariants({
            size: envelope.props.size,
            variant: envelope.props.variant,
          })
        )}
        href={envelope.props.url}
        rel={
          envelope.props.target === "_blank"
            ? "noopener noreferrer"
            : undefined
        }
        target={envelope.props.target}
      >
        {envelope.props.text}
      </a>
    </div>
  )
}
