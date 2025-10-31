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
			className="p-2 rounded-full"
			onClick={() => setEditHours(!editHoursState)}
			type="button"
		>
			<Edit size={20} />
		</button>
	)
}
