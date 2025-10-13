'use client'
import EditHoursButton from "../buttons/edit-hours-button"
import { Input } from "../input"

export function ManageTimeForm({
	id,
	timeIn,
	timeOut,
	onSuccess,
}: {
	id?: number
	timeIn?: Date
	timeOut?: Date | null
	onSuccess?: () => void
}) {
	function formatDateForInput(date: Date) {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		const hour = String(date.getHours()).padStart(2, '0')
		const minute = String(date.getMinutes()).padStart(2, '0')
		return `${year}-${month}-${day}T${hour}:${minute}`
	}

	return (
		<form className="grid grid-cols-1 lg:grid-cols-3 gap-4">
			<Input
				className="w-full"
				defaultValue={
					timeIn ? formatDateForInput(new Date(timeIn)) : ''
				}
				name="time_in"
				type="datetime-local"
			/>
			<Input
				className="w-full"
				defaultValue={
					timeOut ? formatDateForInput(new Date(timeOut)) : ''
				}
				name="time_out"
				type="datetime-local"
			/>
			<EditHoursButton onSuccess={() => onSuccess?.() || (() => {})} punchClockId={id} />
		</form>
	)
}
