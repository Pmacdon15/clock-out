import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import BorderBox from '../containers/border-box'
import LinkWithPath from '../links/link'

export default function UserOrgHeader({
	path,
}: {
	path: '/punch-clock' | '/admin/manage-hours' | '/hours-worked'
}) {
	return (
		<BorderBox>
			<div className="flex flex-col md:flex-row text-white justify-center items-center gap-4 ">
				<div>
					<UserButton />
					<OrganizationSwitcher />
				</div>
				<div className="flex flex-wrap gap-4 ">
					{path !== '/punch-clock' && (
						<LinkWithPath
							path={'/punch-clock'}
							text={'Punch Clock'}
						/>
					)}
					{path !== '/admin/manage-hours' && (
						<LinkWithPath
							path={'/admin/manage-hours'}
							text={'Manage Hours'}
						/>
					)}
					{path !== '/hours-worked' && (
						<LinkWithPath
							path={'/hours-worked'}
							text={'Hours Worked'}
						/>
					)}
				</div>
			</div>
		</BorderBox>
	)
}
