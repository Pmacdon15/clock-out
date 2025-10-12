import { Suspense } from 'react'
import { CardSkeleton } from '@/components/ui/card'
import HoursWorkedFilterFallback from '@/components/ui/fallbacks/hours-worked-filter-fallback'
import UserOrgHeader from '@/components/ui/headers/user-org-header'
import { HoursWorkedContainer } from '@/components/ui/hours-worked/hours-worked'
import { YearlyHoursWorked } from '@/components/ui/hours-worked/yearly-hours-worked'
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
	const date = Array.isArray(dateParam) ? dateParam[0] : dateParam

	const dateObject = date ? new Date(date) : undefined
	const weekNumberResult = getWeekNumber(dateObject)
	const currentYear = weekNumberResult?.[0]

	const weeksPromise = getAllWeeksWithWork()
	const hoursWorkedPromise = getHoursWorked(date)
	const hoursWorkedByYearPromise = getHoursWorkedByYear(currentYear)

	return (
		<>
			<UserOrgHeader />
			<div className="p-2 w-full md:w-5/6">
				<Suspense fallback={<HoursWorkedFilterFallback />}>
					<HoursWorkedContainer
						hoursPromise={hoursWorkedPromise}
						weeksPromise={weeksPromise}
					/>
				</Suspense>
			</div>
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
