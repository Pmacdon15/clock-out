import { OrganizationSwitcher, SignedIn, UserButton } from '@clerk/nextjs'
import { Suspense } from 'react'
import BorderBox from '@/components/ui/containers/border-box'
import LinkWithPath from '@/components/ui/links/link'
import PunchClockClient from '@/components/ui/punch-clock-client'
import { getTimeCard } from '@/lib/DAL/punch-clock'

export default function Page() {
	const timeCardPromise = getTimeCard()
	return (
		<BorderBox>
			<Suspense>
				<SignedIn>
					<div className="flex text-white justify-center">
						<UserButton />
						<OrganizationSwitcher />
					</div>
					<div className="flex justify-center gap-4 items-center ">
						<LinkWithPath
							path={'/hours-worked'}
							text={'Hours Worked'}
						/>
						<LinkWithPath
							path={'/admin/manage-hours'}
							text={'Manage Hours'}
						/>
					</div>
				</SignedIn>
			</Suspense>
			<Suspense>
				<PunchClockClient timeCardPromise={timeCardPromise} />
			</Suspense>
		</BorderBox>
	)
}
