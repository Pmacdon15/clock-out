import { OrganizationSwitcher, SignedIn, UserButton } from '@clerk/nextjs'
import { Suspense } from 'react'
import BorderBox from '@/components/ui/containers/border-box'
import TimeInput from '@/components/ui/inputs/time-input'
import EditHoursLink from '@/components/ui/links/edit-hours-link'
import LinkWithPath from '@/components/ui/links/link'
import { getTimeCard } from '@/lib/DAL/punch-clock'

export default async function Page() {
	const timeCard = await getTimeCard()
	return (
		<BorderBox>
			<SignedIn>
				<div className="flex text-white justify-center">
					<UserButton />
					<OrganizationSwitcher />
				</div>
				<div className="flex justify-end gap-4">
					<Suspense>
						<EditHoursLink />
					</Suspense>
					<LinkWithPath
						path={'/hours-worked'}
						text={'Hours Worked'}
					/>
				</div>
			</SignedIn>
			<TimeInput clockInTime={timeCard?.time_in} disabled={!!timeCard} />
			<TimeInput
				clockInTime={timeCard?.time_in}
				disabled={!timeCard}
				punchOut
			/>
		</BorderBox>
	)
}
