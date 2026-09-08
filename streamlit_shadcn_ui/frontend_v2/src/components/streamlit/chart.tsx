import { useId } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart"
import type { ChartEnvelope } from "@/protocol/schema"

const CARTESIAN_MARGIN = { left: 12, right: 12 }

// Compositions follow the pinned shadcn chart examples. All container, legend,
// and tooltip styling belongs to the generated Chart and Card components.
export function ChartView({ envelope }: { envelope: ChartEnvelope }) {
  const props = envelope.props
  const descriptionId = useId()
  const segmented = props.chartType === "pie" || props.chartType === "radial"
  const config = Object.fromEntries(
    props.series.map((series, i) => [
      series.key,
      {
        label: series.label,
        color: `var(--chart-${i + 1})`
      }
    ])
  ) satisfies ChartConfig
  const data = segmented
    ? props.data.map((row) => ({
        ...row,
        fill: `var(--color-${row.category})`
      }))
    : props.data
  const tooltip = props.showTooltip ? (
    <ChartTooltip
      cursor={false}
      content={
        <ChartTooltipContent
          nameKey={segmented ? "category" : undefined}
          hideLabel={segmented}
          indicator={
            props.chartType === "bar"
              ? "dashed"
              : props.chartType === "radar"
                ? "line"
                : "dot"
          }
          labelFormatter={
            segmented
              ? undefined
              : (_label, payload) => payload[0]?.payload?.category
          }
        />
      }
    />
  ) : null
  const legend = props.showLegend ? (
    <ChartLegend
      content={
        <ChartLegendContent nameKey={segmented ? "category" : undefined} />
      }
    />
  ) : null
  const axis = (
    <XAxis
      dataKey="category"
      tickLine={false}
      axisLine={false}
      tickMargin={props.chartType === "bar" ? 10 : 8}
    />
  )
  const accessibility = {
    accessibilityLayer: true,
    "aria-label": props.title ?? `${props.chartType} chart`,
    "aria-describedby": props.description !== null ? descriptionId : undefined
  }
  let chart
  switch (props.chartType) {
    case "line":
      chart = (
        <LineChart data={data} margin={CARTESIAN_MARGIN} {...accessibility}>
          <CartesianGrid vertical={false} />
          {axis}
          {tooltip}
          {legend}
          {props.series.map((s) => (
            <Line
              key={s.key}
              dataKey={s.key}
              type="monotone"
              stroke={`var(--color-${s.key})`}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      )
      break
    case "area":
      chart = (
        <AreaChart data={data} margin={CARTESIAN_MARGIN} {...accessibility}>
          <CartesianGrid vertical={false} />
          {axis}
          {tooltip}
          {legend}
          {props.series.map((s) => (
            <Area
              key={s.key}
              dataKey={s.key}
              type="natural"
              fill={`var(--color-${s.key})`}
              fillOpacity={0.4}
              stroke={`var(--color-${s.key})`}
              stackId={props.stacked ? "stack" : undefined}
            />
          ))}
        </AreaChart>
      )
      break
    case "bar":
      chart = (
        <BarChart
          data={data}
          layout={props.horizontal ? "vertical" : "horizontal"}
          {...accessibility}
        >
          <CartesianGrid
            vertical={props.horizontal}
            horizontal={!props.horizontal}
          />
          {props.horizontal ? (
            <>
              <XAxis type="number" hide />
              <YAxis
                dataKey="category"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
            </>
          ) : (
            axis
          )}
          {tooltip}
          {legend}
          {props.series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              fill={`var(--color-${s.key})`}
              radius={4}
              stackId={props.stacked ? "stack" : undefined}
            />
          ))}
        </BarChart>
      )
      break
    case "pie":
      chart = (
        <PieChart {...accessibility}>
          {tooltip}
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            innerRadius={props.donut ? "60%" : 0}
          />
          {legend}
        </PieChart>
      )
      break
    case "radar":
      chart = (
        <RadarChart data={data} {...accessibility}>
          <PolarAngleAxis dataKey="category" />
          <PolarGrid />
          {tooltip}
          {props.series.map((s) => (
            <Radar
              key={s.key}
              dataKey={s.key}
              fill={`var(--color-${s.key})`}
              fillOpacity={0.6}
              stroke={`var(--color-${s.key})`}
            />
          ))}
          {legend}
        </RadarChart>
      )
      break
    case "radial":
      chart = (
        <RadialBarChart
          data={data}
          innerRadius="10%"
          outerRadius="80%"
          {...accessibility}
        >
          {tooltip}
          <RadialBar dataKey="value" background />
          {legend}
        </RadialBarChart>
      )
      break
  }
  return (
    <Card
      data-ssui-component="chart"
      data-chart-type={props.chartType}
      data-testid="ssui-v2-chart"
    >
      {props.title !== null || props.description !== null ? (
        <CardHeader>
          {props.title !== null ? <CardTitle>{props.title}</CardTitle> : null}
          {props.description !== null ? (
            <CardDescription id={descriptionId}>
              {props.description}
            </CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
      <CardContent>
        <ChartContainer config={config}>{chart}</ChartContainer>
      </CardContent>
    </Card>
  )
}
