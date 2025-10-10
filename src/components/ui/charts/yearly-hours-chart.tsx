'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import type { MonthlyHours } from '@/lib/types/punch-clock-types'

const chartConfig = {
	hours: {
		label: 'Hours',
		color: 'var(--chart-1)',
	},
} satisfies ChartConfig

export function YearlyHoursChart({
	data,
	year,
}: {
	data: MonthlyHours[]
	year?: number
}) {
	// Get the last month with hours and the month before it
	const monthsWithHours = data.filter((month) => month.hours > 0)
	const lastMonthWithHours = monthsWithHours[monthsWithHours.length - 1]
	const secondLastMonthWithHours = monthsWithHours[monthsWithHours.length - 2]

	let trendingMessage = 'Not enough data to show trend'
	let trendingIcon = null

	if (lastMonthWithHours && secondLastMonthWithHours) {
		const currentMonthHours = lastMonthWithHours.hours
		const previousMonthHours = secondLastMonthWithHours.hours

		if (previousMonthHours !== 0) {
			const percentageChange =
				((currentMonthHours - previousMonthHours) /
					previousMonthHours) *
				100
			const trend = percentageChange >= 0 ? 'up' : 'down'
			const absPercentageChange = Math.abs(percentageChange).toFixed(1)
			trendingMessage = `Trending ${trend} by ${absPercentageChange}% this month`
			trendingIcon =
				percentageChange >= 0 ? (
					<TrendingUp className="h-4 w-4" />
				) : (
					<TrendingDown className="h-4 w-4" />
				)
		} else if (currentMonthHours > 0) {
			trendingMessage = `Trending up by 100.0% this month`
			trendingIcon = <TrendingUp className="h-4 w-4" />
		} else {
			trendingMessage = `No change this month`
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Yearly Hours</CardTitle>
				<CardDescription>
					Showing total hours worked for {year}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className="aspect-auto h-96 w-full"
					config={chartConfig}
				>
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{
							left: 12,
							right: 12,
							top: 24,
						}}
					>
						<CartesianGrid vertical={false} />
						<YAxis domain={[0, 'auto']} />
						<XAxis
							axisLine={false}
							dataKey="month"
							tickFormatter={(value) => value.slice(0, 3)}
							tickLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							content={<ChartTooltipContent indicator="line" />}
							cursor={false}
						/>
						<Area
							baseLine={0}
							dataKey="hours"
							fill="var(--color-hours)"
							fillOpacity={0.4}
							stroke="var(--color-hours)"
							type="monotoneX"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 leading-none font-medium">
							{trendingMessage} {trendingIcon}
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
