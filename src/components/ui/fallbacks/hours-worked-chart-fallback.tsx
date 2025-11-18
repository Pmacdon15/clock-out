'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../chart'

const chartConfig = {
	hours: {
		label: 'Hours',
	},
}
export function HoursWorkedChartFallback() {
	return (
		<>
			<ChartContainer config={chartConfig} id="hours-worked-chart">
				<BarChart>
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
			<h1 className="mb-4">Total Hours: </h1>
		</>
	)
}
