import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {
  CardEnvelope,
  CardProps,
  MetricCardEnvelope,
} from "@/protocol/schema"

type CardViewProps = {
  envelope: CardEnvelope
}

type MetricCardViewProps = {
  envelope: MetricCardEnvelope
}

function CardBody({
  component,
  metric,
  props,
}: {
  component: "card" | "metric_card"
  metric: boolean
  props: CardProps
}) {
  const hasHeader = props.title !== null || props.description !== null
  return (
    <Card
      data-ssui-component={component}
      data-testid={`ssui-v2-${component.replace("_", "-")}`}
      size={props.size}
    >
      {hasHeader ? (
        <CardHeader>
          {props.title !== null ? (
            <CardTitle>{props.title}</CardTitle>
          ) : null}
          {props.description !== null ? (
            <CardDescription>{props.description}</CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
      {props.content !== null ? (
        <CardContent>
          {metric ? (
            <div className="text-2xl font-semibold tracking-tight">
              {props.content}
            </div>
          ) : (
            <div className="text-sm">{props.content}</div>
          )}
        </CardContent>
      ) : null}
    </Card>
  )
}

export function CardView({ envelope }: CardViewProps) {
  return (
    <CardBody
      component="card"
      metric={false}
      props={envelope.props}
    />
  )
}

export function MetricCardView({ envelope }: MetricCardViewProps) {
  return (
    <CardBody
      component="metric_card"
      metric
      props={envelope.props}
    />
  )
}
