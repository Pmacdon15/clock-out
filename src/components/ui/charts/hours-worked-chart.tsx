'use client'

import { use } from 'react'
import { Bar, BarChart, Cell, XAxis, YAxis } from 'recharts'
import type { HoursWorked } from '@/lib/types/punch-clock-types'
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

export function HoursWorkedChart({
	hoursPromise,
	className,
}: {
	hoursPromise: Promise<HoursWorked[]>
	className?: string
}) {
	const hours = use(hoursPromise)
	// console.log('Hours: ', hours)
	const totalHours = hours
		.reduce((acc, current) => acc + current.hours, 0)
		.toFixed(2)
	return (
		<>
			<ChartContainer
				className={className}
				config={chartConfig}
				id="hours-worked-chart"
			>
				<BarChart data={hours}>
					<XAxis
						dataKey="date"
						tickFormatter={(value) =>
							new Date(value).toLocaleDateString()
						}
					/>
					<YAxis domain={[0, 'auto']} />
					<Bar barSize={100} dataKey="hours">
						{hours.map((entry) => (
							<Cell fill={entry.fill} key={entry.date} />
						))}
					</Bar>
					<ChartTooltip
						content={<ChartTooltipContent />}
						cursor={false}
					/>
				</BarChart>
			</ChartContainer>
			<h1 className="mb-4">Total Hours: {totalHours}</h1>
		</>
	)
}
