import { OrganizationSwitcher, Show, UserButton } from '@clerk/nextjs'
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
				<Show when="signed-in">
					<div className="flex justify-center text-white">
						<UserButton />
						<OrganizationSwitcher />
					</div>
					<div className="flex items-center justify-center gap-4">
						<LinkWithPath
							path={'/hours-worked'}
							text={'Hours Worked'}
						/>
						<LinkWithPath
							path={'/manage-hours'}
							text={'Manage Hours'}
						/>
					</div>
				</Show>
			</Suspense>
			<Suspense>
				<PunchClockClient timeCardPromise={timeCardPromise} />
			</Suspense>
		</BorderBox>
	)
}
