'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HoursWorkedChart } from '@/components/ui/charts/hours-worked-chart'
import type { HoursWorked, Week } from '@/lib/types/punch-clock-types'
import { WeekSelector } from '../filters/week-selector'

interface HoursWorkedFilterProps {
	hoursPromise?: Promise<HoursWorked[]>
	// weeks: { label: string, value: string }[];
	weeksPromise?: Promise<Week[]>
}

export function HoursWorkedContainer({
	hoursPromise,
	weeksPromise,
}: HoursWorkedFilterProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Hours Worked</CardTitle>
			</CardHeader>
			<CardContent>
				<div>
					{weeksPromise && (
						<WeekSelector weeksPromise={weeksPromise} />
					)}
					<div className="h-96">
						<HoursWorkedChart
							className="h-full aspect-auto"
							hoursPromise={hoursPromise}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
