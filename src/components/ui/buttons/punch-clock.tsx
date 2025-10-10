'use client'
import { usePunchClock } from '@/lib/mutations/punch-clock'
import { Button } from '../button'
export default function PunchClockButton({
	punchOut = false,
	disabled = false,
}: {
	punchOut?: boolean
	disabled?: boolean
}) {
	const { mutate, isPending } = usePunchClock()

	return (
		<Button
			disabled={isPending || disabled}
			onClick={() => mutate(punchOut)}
			variant={'outline'}
		>
			{punchOut ? 'Punch Out' : 'Punch In'}
		</Button>
	)
}
