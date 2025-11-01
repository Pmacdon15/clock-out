import { Suspense } from 'react'
import BorderBox from '@/components/ui/containers/border-box'
import OrgMembersFilter from '@/components/ui/filters/org-member-filter'
import UserOrgHeader from '@/components/ui/headers/user-org-header'
import ManageHoursList from '@/components/ui/manage-hours/Manage-hours-list'
import WeekSelectorWrapper from '@/components/ui/wrappers/week-selector-wrapper'
import { fetchOrgMembers } from '@/lib/DAL/org-members'

export default function Page(props: PageProps<'/manage-hours'>) {
	const orgMembersPromise = fetchOrgMembers()

	return (
		<>
			<UserOrgHeader path={'/manage-hours'} />
			<BorderBox>
				<h1 className="text-2xl font-bold mb-4">Manage Hours</h1>
				<Suspense>
					<OrgMembersFilter orgMemberPromise={orgMembersPromise} />
				</Suspense>
				<Suspense>
					<WeekSelectorWrapper props={props} />
				</Suspense>
				<Suspense>
					<ManageHoursList props={props} />
				</Suspense>
			</BorderBox>
		</>
	)
}
