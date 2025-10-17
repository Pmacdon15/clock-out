import { Suspense } from 'react'
import BorderBox from '@/components/ui/containers/border-box'
import OrgMembersFilter from '@/components/ui/filters/org-member-filter'
import { WeekSelector } from '@/components/ui/filters/week-selector'
import UserOrgHeader from '@/components/ui/headers/user-org-header'
import ManageHoursList from '@/components/ui/manage-hours/Manage-hours-list'
import { fetchOrgMembers } from '@/lib/DAL/org-members'
import {
	getAllWeeksWithWorkForEmployee,
	getEmployeeTimeCards,
} from '@/lib/DAL/punch-clock'

export default async function Page(props: PageProps<'/admin/manage-hours'>) {
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
 


	   console.log("test")



	return (
		<>
			<UserOrgHeader editHours />
			<BorderBox>
				<h1 className="text-2xl font-bold mb-4">Manage Hours</h1>
				<Suspense>
					<OrgMembersFilter orgMemberPromise={orgMembersPromise} />
				</Suspense>
				<Suspense>
					<WeekSelector
						variant="/admin/manage-hours"
						weeksPromise={weeksPromise}
					/>
				</Suspense>
				<Suspense>
					<ManageHoursList hoursPromise={hoursPromise} />
				</Suspense>
			</BorderBox>
		</>
	)
}
