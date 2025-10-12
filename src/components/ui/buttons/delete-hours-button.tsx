'use client'
import { useDeleteHours } from '@/lib/mutations/edit-hours'
import { Button } from '../button'

export default function DeleteHoursButton({ hoursId }: { hoursId: number }) {
	const { mutate, isPending } = useDeleteHours()
	return (
		<Button
			disabled={isPending}
			onClick={() => mutate(hoursId)}
			type="submit"
			variant={'outline'}
		>
			Delete
		</Button>
	)
}
