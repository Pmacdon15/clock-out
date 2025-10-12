'use client'
import dynamic from 'next/dynamic'

const DynamicTimeInput = dynamic(() => import('./inputs/time-input'), {
	ssr: false,
})

export default function PunchClockClient({
	timeCard,
}: {
	timeCard: { time_in?: Date } | null
}) {
	return (
		<>
			<DynamicTimeInput
				clockInTime={timeCard?.time_in}
				disabled={!!timeCard}
			/>
			<DynamicTimeInput
				clockInTime={timeCard?.time_in}
				disabled={!timeCard}
				punchOut
			/>
		</>
	)
}
