'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '../chart'

const chartConfig = {
	hours: {
		label: 'Hours',
	},
} satisfies ChartConfig

export default function HoursWorkedChartFallback() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Hours Worked</CardTitle>
			</CardHeader>
			<CardContent>
				<div>
					<div className="mb-4">
						<label className="mr-2" htmlFor="week-select">
							Filter by week:
						</label>
						<select className="border p-1 rounded" id="week-select">
							<option value={''}>Select a Week</option>
						</select>
					</div>
					<div className="h-96">
						<ChartContainer
							className="h-full aspect-auto"
							config={chartConfig}
							id="hours-worked-chart"
						>
							<BarChart data={[]}>
								<XAxis
									dataKey="date"
									tickFormatter={(value) =>
										new Date(value).toLocaleDateString()
									}
								/>
								<YAxis domain={[0, 'auto']} />
								<Bar barSize={100} dataKey="hours"></Bar>
								<ChartTooltip
									content={<ChartTooltipContent />}
									cursor={false}
								/>
							</BarChart>
						</ChartContainer>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
