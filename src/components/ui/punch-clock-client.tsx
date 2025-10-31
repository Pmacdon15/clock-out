'use client'
import { use } from 'react'
import type { TimeCard } from '@/lib/types/punch-clock-types'
import TimeInput from './inputs/time-input'

export default function PunchClockClient({
	timeCardPromise,
}: {
	timeCardPromise: Promise<TimeCard | null>
}) {
	const timeCard = use(timeCardPromise)
	return (
		<>
			<TimeInput clockInTime={timeCard?.time_in} disabled={!!timeCard} />
			<TimeInput
				clockInTime={timeCard?.time_in}
				disabled={!timeCard}
				punchOut
			/>
		</>
	)
}
