import { Suspense } from 'react'
import BorderBox from '@/components/ui/containers/border-box'
import EditHoursList from '@/components/ui/edit-hours/edit-hours-list'
import OrgMembersFilter from '@/components/ui/filters/org-member-filter'
import { WeekSelector } from '@/components/ui/filters/week-selector'
import { fetchOrgMembers } from '@/lib/DAL/org-members'
import {
	getAllWeeksWithWorkForEmployee,
	getEmployeeTimeCards,
} from '@/lib/DAL/punch-clock'

export default async function Page(props: PageProps<'/admin/edit-hours'>) {
	const searchParams = await props.searchParams

	const employeeIdValue = searchParams.employee
	const employeeId = Array.isArray(employeeIdValue)
		? employeeIdValue[0]
		: employeeIdValue

	const weekValue = searchParams.week
	const week = Array.isArray(weekValue) ? weekValue[0] : weekValue

	const orgMembersPromise = fetchOrgMembers()
	const weeksPromise = getAllWeeksWithWorkForEmployee(employeeId)
	const hoursPromise = getEmployeeTimeCards(week, employeeId)

	return (
		<BorderBox>
			<h1 className="text-2xl font-bold mb-4">Edit Hours</h1>
			<Suspense>
				<OrgMembersFilter orgMemberPromise={orgMembersPromise} />
			</Suspense>
			<Suspense>
				<WeekSelector
					weeksPromise={weeksPromise}
					variant="/admin/edit-hours"
				/>
			</Suspense>
			<Suspense>
				<EditHoursList hoursPromise={hoursPromise} />
			</Suspense>
		</BorderBox>
	)
}
