import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import type { ProgressEnvelope } from "@/protocol/schema"

type ProgressViewProps = {
  envelope: ProgressEnvelope
}

export function ProgressView({ envelope }: ProgressViewProps) {
  const accessibleLabel = envelope.props.label ?? "Progress"
  return (
    <Progress
      aria-label={accessibleLabel}
      data-ssui-component="progress"
      data-testid="ssui-v2-progress"
      value={envelope.props.value}
    >
      {envelope.props.label !== null ? (
        <ProgressLabel>{envelope.props.label}</ProgressLabel>
      ) : null}
      {envelope.props.showValue ? (
        <ProgressValue>
          {(_formattedValue, value) =>
            `${Math.round(value ?? 0)}%`
          }
        </ProgressValue>
      ) : null}
    </Progress>
  )
}
