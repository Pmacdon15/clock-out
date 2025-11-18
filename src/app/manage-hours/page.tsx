import { Suspense } from 'react'
import BorderBox from '@/components/ui/containers/border-box'
import OrgMembersFilter from '@/components/ui/filters/org-member-filter'
import UserOrgHeader from '@/components/ui/headers/user-org-header'
import ManageHoursList from '@/components/ui/manage-hours/Manage-hours-list'
import WeekSelectorWrapper from '@/components/ui/wrappers/week-selector-wrapper'
import { fetchOrgMembers } from '@/lib/DAL/org-members'
import { getAllWeeksWithWorkForEmployee, getEmployeeTimeCards } from '@/lib/DAL/punch-clock'

export default function Page(props: PageProps<'/manage-hours'>) {
	const orgMembersPromise = fetchOrgMembers()
	const weekPromise = props.searchParams.then((search) => search.week)
	const weeksPromise = props.searchParams.then((search) =>
		getAllWeeksWithWorkForEmployee( Array.isArray(search.employee)? search.employee[0]: search.employee),
	)
	const hoursPromise = props.searchParams.then((search)=>
	 getEmployeeTimeCards(Array.isArray(search.week)? search.week[0]: search.week, Array.isArray(search.employee)? search.employee[0]: search.employee)
	)

	return (
		<>
			<UserOrgHeader path={'/manage-hours'} />
			<BorderBox>
				<h1 className="mb-4 font-bold text-2xl">Manage Hours</h1>
				<Suspense>
					<OrgMembersFilter orgMemberPromise={orgMembersPromise} />
				</Suspense>
				<WeekSelectorWrapper
					weekPromise={weekPromise}
					weeksPromise={weeksPromise}
				/>
				<Suspense>
					<ManageHoursList hoursPromise={hoursPromise} />
				</Suspense>
			</BorderBox>
		</>
	)
}
