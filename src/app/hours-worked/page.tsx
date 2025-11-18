import { Suspense } from 'react'
import UserOrgHeader from '@/components/ui/headers/user-org-header'
import { HoursWorkedContainer } from '@/components/ui/hours-worked/hours-worked-container'
import { YearlyHoursWorked } from '@/components/ui/hours-worked/yearly-hours-worked'
import { getPayPeriodHoursWorked } from '@/lib/DAL/pay-period'
import { getAllWeeksWithWork, getHoursWorked } from '@/lib/DAL/punch-clock'

export default function HoursWorkedPage(props: PageProps<'/hours-worked'>) {
	const weeksPromise = getAllWeeksWithWork()
	const weeklyHoursPromise = props.searchParams.then((search) =>
		getHoursWorked(String(search.week)),
	)
	const payPeriodHoursPromise = props.searchParams.then((search) =>
		getPayPeriodHoursWorked(
			String(search.startDate),
			String(search.endDate),
		),
	)

	const startDateEndDatePromise = props.searchParams.then((search) => ({
		startDate: search.startDate,
		endDate: search.endDate,
	}))

	return (
		<>
			<UserOrgHeader path={'/hours-worked'} />
			<HoursWorkedContainer
				payPeriodHoursPromise={payPeriodHoursPromise}
				startDateEndDatePromise={startDateEndDatePromise}
				weeklyHoursPromise={weeklyHoursPromise}
				weeksPromise={weeksPromise}
			/>

			<div className="w-full p-2 md:w-5/6">
				<Suspense>
					<YearlyHoursWorked />
				</Suspense>
			</div>
		</>
	)
}
