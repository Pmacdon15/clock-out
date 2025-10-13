'use client'
import { useEditHours } from '@/lib/mutations/edit-hours'
import { Button } from '../button'

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export default function EditHoursButton({
	punchClockId,
	onSuccess,
	employeeId,
}: {
	punchClockId?: number
	onSuccess: () => void
	employeeId?: string
}) {
	const { mutate, isPending } = useEditHours({
		onSuccess: () => {
			onSuccess()
		},
	})
	return (
		<Button
			className="w-full lg:w-auto"
			disabled={isPending}
			formAction={(formData: FormData) =>
				mutate({ formData, punchClockId, timeZone, userId: employeeId })
			}
			type="submit"
			variant={'outline'}
		>
			{!isPending ? 'Save' : 'Saving'}
		</Button>
	)
}
