import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type {
  CardEnvelope,
  MetricCardEnvelope,
} from "@/protocol/schema"

type CardViewProps = {
  envelope: CardEnvelope
}

type MetricCardViewProps = {
  envelope: MetricCardEnvelope
}

export function CardView({ envelope }: CardViewProps) {
  const { props } = envelope
  const hasHeader = props.title !== null || props.description !== null
  return (
    <Card
      data-ssui-component="card"
      data-testid="ssui-v2-card"
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
          <div className="text-sm">{props.content}</div>
        </CardContent>
      ) : null}
      {props.footer !== null ? (
        <CardFooter>{props.footer}</CardFooter>
      ) : null}
    </Card>
  )
}

export function MetricCardView({ envelope }: MetricCardViewProps) {
  const { props } = envelope
  const isDashboard = props.variant === "dashboard"
  return (
    <Card
      className={isDashboard ? "@container/card" : undefined}
      data-ssui-component="metric_card"
      data-testid="ssui-v2-metric-card"
      size={props.size}
    >
      <CardHeader>
        <CardDescription>{props.label}</CardDescription>
        <CardTitle
          className={
            isDashboard
              ? "text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
              : "text-2xl font-semibold tracking-tight"
          }
        >
          {props.value}
        </CardTitle>
        {isDashboard && props.delta !== null ? (
          <CardAction>
            <Badge variant="outline">{props.delta}</Badge>
          </CardAction>
        ) : null}
      </CardHeader>
      {props.description !== null ? (
        isDashboard ? (
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              {props.description}
            </div>
          </CardFooter>
        ) : (
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {props.description}
            </div>
          </CardContent>
        )
      ) : null}
      {!isDashboard && props.delta !== null ? (
        <CardFooter>
          <Badge variant="secondary">{props.delta}</Badge>
        </CardFooter>
      ) : null}
    </Card>
  )
}
