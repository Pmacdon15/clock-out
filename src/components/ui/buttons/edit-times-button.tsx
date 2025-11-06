'use client'
import { useOrganization } from '@clerk/nextjs'
import { Edit } from 'lucide-react'

export default function EditTimesButton({
	setEditHours,
	editHoursState,
}: {
	setEditHours: (editHoursState: boolean) => void
	editHoursState: boolean
}) {
	const { membership } = useOrganization()
	if (membership?.roleName !== 'Admin') return null
	return (
		<button
			className="rounded-full p-2"
			onClick={() => setEditHours(!editHoursState)}
			type="button"
		>
			<Edit size={20} />
		</button>
	)
}
