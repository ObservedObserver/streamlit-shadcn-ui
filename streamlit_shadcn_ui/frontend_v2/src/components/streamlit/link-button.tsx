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
  const wrapperClassName = envelope.props.stretch
    ? "flex w-full p-px"
    : "inline-flex p-px"

  if (envelope.props.disabled) {
    return (
      <div className={wrapperClassName} {...commonProps}>
        <Button
          disabled
          size={envelope.props.size}
          variant={envelope.props.variant}
          className={envelope.props.stretch ? "w-full" : undefined}
        >
          {envelope.props.text}
        </Button>
      </div>
    )
  }

  return (
    <div className={wrapperClassName} {...commonProps}>
      <a
        className={cn(
          buttonVariants({
            size: envelope.props.size,
            variant: envelope.props.variant,
          }),
          envelope.props.stretch && "w-full"
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
