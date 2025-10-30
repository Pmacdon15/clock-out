import { Suspense } from 'react'
import { CardSkeleton } from '@/components/ui/card'
import UserOrgHeader from '@/components/ui/headers/user-org-header'
import { HoursWorkedContainer } from '@/components/ui/hours-worked/hours-worked-container'
import TypeOfHoursSelector from '@/components/ui/hours-worked/type-of-hours-worked-selector'
import { YearlyHoursWorked } from '@/components/ui/hours-worked/yearly-hours-worked'
import { getAllWeeksWithWork } from '@/lib/DAL/punch-clock'

export default function HoursWorkedPage(props: PageProps<'/hours-worked'>) {
	const weeksPromise = getAllWeeksWithWork()
	
	return (
		<>
			<UserOrgHeader />
			<TypeOfHoursSelector
				child1={
					<div
						key="weekly"
						className="p-2 w-full md:w-5/6"
					>
						<Suspense>
							<HoursWorkedContainer
								props={props}
								weeksPromise={weeksPromise}
							/>
						</Suspense>
					</div>
				}
				child2={
					<div
						key="pay-period"
						className="p-2 w-full md:w-5/6"
					>
						<Suspense>
							<HoursWorkedContainer props={props} />
						</Suspense>
					</div>
				}
			/>
			<div className="p-2 w-full md:w-5/6">
				<Suspense fallback={<CardSkeleton />}>
					<YearlyHoursWorked
						props={props}
					/>
				</Suspense>
			</div>
		</>
	)
}
