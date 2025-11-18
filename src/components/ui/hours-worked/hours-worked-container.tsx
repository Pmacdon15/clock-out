'use client'
import { Suspense, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HoursWorkedChart } from '@/components/ui/charts/hours-worked-chart'
import type { HoursWorked, Week } from '@/lib/types/punch-clock-types'
import { Button } from '../button'
import { HoursWorkedChartFallback } from '../fallbacks/hours-worked-chart-fallback'
import { WeekSelector } from '../filters/week-selector'
import PayPeriodSelector from './pay-period-selector'

interface HoursWorkedFilterProps {
	payPeriodHoursPromise: Promise<HoursWorked[]>
	weeklyHoursPromise: Promise<HoursWorked[]>
	startDateEndDatePromise: Promise<{
		startDate: string | string[] | undefined
		endDate: string | string[] | undefined
	}>
	weeksPromise?: Promise<Week[]>
	weekPromise: Promise<string | string[] | undefined>
}

export function HoursWorkedContainer({
	payPeriodHoursPromise,
	weeklyHoursPromise,
	startDateEndDatePromise,
	weeksPromise,
	weekPromise,
}: HoursWorkedFilterProps) {
	const [typeOfHours, setTypeOfHours] = useState('Weekly')
	const handleClick = () => {
		setTypeOfHours(typeOfHours !== 'Weekly' ? 'Weekly' : 'pay-period')
	}

	const hoursToShowPromise =
		typeOfHours === 'Weekly' ? weeklyHoursPromise : payPeriodHoursPromise

	return (
		<div className="w-5/6">
			<Button onClick={handleClick} variant={'outline'}>
				Show {typeOfHours !== 'Weekly' ? ' Weekly' : 'Pay Period'}
			</Button>
			<Card>
				<CardHeader>
					<CardTitle>
						{typeOfHours}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div>
						{typeOfHours === 'Weekly' ? (
							<Suspense>
								{/* //?TODO SHOW FALL BACK */}
								<WeekSelector
									weekPromise={weekPromise}
									weeksPromise={weeksPromise}
								/>
							</Suspense>
						) : (
							<Suspense>
								<PayPeriodSelector
									startDateEndDatePromise={
										startDateEndDatePromise
									}
								/>
							</Suspense>
						)}
						<div className="h-96">
							<Suspense fallback={<HoursWorkedChartFallback />}>
								<HoursWorkedChart
									className="aspect-auto h-full"
									hoursPromise={hoursToShowPromise}
								/>
							</Suspense>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
