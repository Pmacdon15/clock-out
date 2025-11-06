import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HoursWorkedChart } from '@/components/ui/charts/hours-worked-chart'
import { getPayPeriodHoursWorked } from '@/lib/DAL/pay-period'
import { getHoursWorked } from '@/lib/DAL/punch-clock'
import type { Week } from '@/lib/types/punch-clock-types'
import { WeekSelector } from '../filters/week-selector'
import PayPeriodSelector from './pay-period-selector'

interface HoursWorkedFilterProps {
	props: PageProps<'/hours-worked'>
	// hoursPromise: Promise<HoursWorked[]>
	weeksPromise?: Promise<Week[]>
	startDate?: string
	endDate?: string
}

export async function HoursWorkedContainer({
	props,
	// hoursPromise,
	weeksPromise,
	// startDate,
	// endDate,
}: HoursWorkedFilterProps) {
	const searchParams = await props.searchParams

	const startDateParam = searchParams.startDate
	const endDateParam = searchParams.endDate

	const startDate = Array.isArray(startDateParam)
		? startDateParam[0]
		: startDateParam
	const endDate = Array.isArray(endDateParam) ? endDateParam[0] : endDateParam

	const payPeriodHoursPromise = getPayPeriodHoursWorked(startDate, endDate)

	const weekParam = searchParams.week
	const week = Array.isArray(weekParam) ? weekParam[0] : weekParam
	const weeklyHours = getHoursWorked(week)

	const hoursToShow = weeksPromise ? weeklyHours : payPeriodHoursPromise

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
							className="aspect-auto h-full"
							hoursPromise={hoursToShow}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
