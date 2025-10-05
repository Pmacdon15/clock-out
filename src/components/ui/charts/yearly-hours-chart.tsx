"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { MonthlyHours } from "@/lib/DB/punch-clock-db"

const chartConfig = {
  hours: {
    label: "Hours",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function YearlyHoursChart({data, year}: {data: MonthlyHours[], year: number}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yearly Hours</CardTitle>
        <CardDescription>
          Showing total hours worked for {year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="hours"
              type="natural"
              fill="var(--color-hours)"
              fillOpacity={0.4}
              stroke="var(--color-hours)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - December {year}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
