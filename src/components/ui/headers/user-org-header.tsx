import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Suspense } from 'react'
import BorderBox from '../containers/border-box'
import EditHoursLink from '../links/edit-hours-link'
import LinkWithPath from '../links/link'

export default function UserOrgHeader() {
	return (
		<BorderBox>
			<div className="flex flex-col md:flex-row text-white justify-center items-center gap-4 ">
				<div>
					<UserButton />
					<OrganizationSwitcher />
				</div>
				<div className="flex flex-wrap gap-4 ">
					<LinkWithPath path={'/punch-clock'} text={'Punch Clock'} />
					<Suspense>
						<EditHoursLink />
					</Suspense>
				</div>
			</div>
		</BorderBox>
	)
}
