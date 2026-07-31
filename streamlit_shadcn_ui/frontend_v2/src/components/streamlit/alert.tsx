import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import type { AlertEnvelope } from "@/protocol/schema"

type AlertViewProps = {
  envelope: AlertEnvelope
}

export function AlertView({ envelope }: AlertViewProps) {
  return (
    <Alert
      data-ssui-component="alert"
      data-testid="ssui-v2-alert"
      variant={envelope.props.variant}
    >
      <AlertTitle>{envelope.props.title}</AlertTitle>
      {envelope.props.description !== null ? (
        <AlertDescription>
          {envelope.props.description}
        </AlertDescription>
      ) : null}
    </Alert>
  )
}
