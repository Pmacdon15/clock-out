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
	ChartConfig,
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
					config={chartConfig}
					className="aspect-auto h-96 w-full"
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
							type="monotoneX"
							fill="var(--color-hours)"
							fillOpacity={0.4}
							stroke="var(--color-hours)"
							baseLine={0}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 leading-none font-medium"></div>
						<div className="text-muted-foreground flex items-center gap-2 leading-none">
							January - December
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}
