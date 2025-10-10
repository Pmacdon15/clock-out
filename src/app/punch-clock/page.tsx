import { OrganizationSwitcher, SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BorderBox from '@/components/ui/containers/border-box'
import TimeInput from '@/components/ui/inputs/time-input'
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
				<div className="flex justify-end ">
					<Link href="/hours-worked">
						<Button>Hours Worked</Button>
					</Link>
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
