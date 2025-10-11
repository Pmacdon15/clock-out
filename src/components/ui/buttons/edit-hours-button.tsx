'use client'
import { useEditHours } from '@/lib/mutations/edit-hours'
import { Button } from '../button'

export default function EditHoursButton({
	punchClockId,
}: {
	punchClockId: number
}) {
	const { mutate } = useEditHours()
	return (
		<Button
			className="w-full lg:w-auto"
			formAction={(formData: FormData) =>
				mutate({ formData, punchClockId })
			}
			type="submit"
			variant={'outline'}
		>
			Save
		</Button>
	)
}
