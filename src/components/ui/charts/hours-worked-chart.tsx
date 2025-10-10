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
	return (
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
					{hours.map((entry, index) => (
						<Cell fill={entry.fill} key={`cell-${index}`} />
					))}
				</Bar>
				<ChartTooltip
					content={<ChartTooltipContent />}
					cursor={false}
				/>
			</BarChart>
		</ChartContainer>
	)
}
