import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import BorderBox from '../containers/border-box'
import LinkWithPath from '../links/link'

export default function UserOrgHeader({
	path,
}: {
	path: '/punch-clock' | '/manage-hours' | '/hours-worked'
}) {
	return (
		<BorderBox>
			<div className="flex flex-col items-center justify-center gap-4 text-white md:flex-row">
				<div>
					<UserButton />
					<OrganizationSwitcher />
				</div>
				<div className="flex flex-wrap gap-4">
					{path !== '/punch-clock' && (
						<LinkWithPath
							path={'/punch-clock'}
							text={'Punch Clock'}
						/>
					)}
					{path !== '/manage-hours' && (
						<LinkWithPath
							path={'/manage-hours'}
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
