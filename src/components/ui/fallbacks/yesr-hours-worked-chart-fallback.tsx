'use client'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '../chart'

const chartConfig = {
	hours: {
		label: 'Hours',
		color: 'var(--chart-1)',
	},
} satisfies ChartConfig

export default function YearlyHoursWorkedFallback() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Yearly Hours</CardTitle>
				<CardDescription>
					Showing total hours worked for
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className="aspect-auto h-96 w-full"
					config={chartConfig}
				>
					<AreaChart
						accessibilityLayer
						data={[]}
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
						<div className="flex items-center gap-2 font-medium leading-none"></div>
						<div className="flex items-center gap-2 text-muted-foreground leading-none">
							January - December
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}
