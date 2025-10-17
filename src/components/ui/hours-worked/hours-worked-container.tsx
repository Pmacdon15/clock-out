import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HoursWorkedChart } from '@/components/ui/charts/hours-worked-chart'
import type { HoursWorked, Week } from '@/lib/types/punch-clock-types'
import { WeekSelector } from '../filters/week-selector'
import PayPeriodSelector from './pay-period-selector'

interface HoursWorkedFilterProps {
	hoursPromise: Promise<HoursWorked[]>
	weeksPromise?: Promise<Week[]>
	startDate?: string
	endDate?: string
}

export function HoursWorkedContainer({
	hoursPromise,
	weeksPromise,
	startDate,
	endDate,
}: HoursWorkedFilterProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					{weeksPromise ? 'Hours Worked' : 'Pay Period'}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div>
					{weeksPromise ? (
						<WeekSelector weeksPromise={weeksPromise} />
					) : (
						<PayPeriodSelector
							endDate={endDate}
							startDate={startDate}
						/>
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
