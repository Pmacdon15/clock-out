import { Suspense } from 'react'
import { CardSkeleton } from '@/components/ui/card'
import UserOrgHeader from '@/components/ui/headers/user-org-header'
import { HoursWorkedContainer } from '@/components/ui/hours-worked/hours-worked-container'
import TypeOfHoursSelector from '@/components/ui/hours-worked/type-of-hours-worked-selector'
import { YearlyHoursWorked } from '@/components/ui/hours-worked/yearly-hours-worked'
import { getPayPeriodHoursWorked } from '@/lib/DAL/pay-period'
import {
	getAllWeeksWithWork,
	getHoursWorked,
	getHoursWorkedByYear,
} from '@/lib/DAL/punch-clock'
import { getWeekNumber } from '@/lib/utils/utils'

export default async function HoursWorkedPage(
	props: PageProps<'/hours-worked'>,
) {
	const searchParams = await props.searchParams

	const dateParam = searchParams.date
	const startDateParam = searchParams.startDate
	const endDateParam = searchParams.endDate

	const date = Array.isArray(dateParam) ? dateParam[0] : dateParam
	const startDate = Array.isArray(startDateParam)
		? startDateParam[0]
		: startDateParam
	const endDate = Array.isArray(endDateParam) ? endDateParam[0] : endDateParam

	const dateObject = date ? new Date(date) : undefined
	const weekNumberResult = getWeekNumber(dateObject)
	const currentYear = weekNumberResult?.[0]

	const weeksPromise = getAllWeeksWithWork()
	const hoursWorkedPromise = getHoursWorked(date)
	const payPeriodHoursPromise = getPayPeriodHoursWorked(startDate, endDate)
	const hoursWorkedByYearPromise = getHoursWorkedByYear(currentYear)

	return (
		<>
			<UserOrgHeader />
			<TypeOfHoursSelector
				child1={
					<div className="p-2 w-full md:w-5/6">
						<HoursWorkedContainer
							hoursPromise={hoursWorkedPromise}
							weeksPromise={weeksPromise}
						/>
					</div>
				}
				child2={
					<div className="p-2 w-full md:w-5/6">
						<HoursWorkedContainer
							endDate={endDate}
							hoursPromise={payPeriodHoursPromise}
							startDate={startDate}
						/>
					</div>
				}
			></TypeOfHoursSelector>
			<div className="p-2 w-full md:w-5/6">
				<Suspense fallback={<CardSkeleton />}>
					<YearlyHoursWorked
						currentYear={currentYear}
						hoursWorkedByYearPromise={hoursWorkedByYearPromise}
					/>
				</Suspense>
			</div>
		</>
	)
}
