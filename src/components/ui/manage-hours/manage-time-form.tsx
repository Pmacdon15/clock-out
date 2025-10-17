'use client'
import { formatDateForInput } from '@/lib/utils/filter-utils'
import EditHoursButton from '../buttons/edit-hours-button'
import { Input } from '../input'
import { DateTimePicker } from '../inputs/date-time-picker'

export function ManageTimeForm({
	id,
	timeIn,
	timeOut,
	onSuccess,
	employeeId,
}: {
	id?: number
	timeIn?: Date
	timeOut?: Date | null
	onSuccess?: () => void
	employeeId?: string
}) {
	return (
		<form className="grid grid-cols-1 lg:grid-cols-3 gap-4">
			{/* <Input
				className=" w-full"
				defaultValue={
					timeIn ? formatDateForInput(new Date(timeIn)) : ''
				}
				name="time_in"
				type="datetime-local"
			/>
			<Input
				className=" w-full"
				defaultValue={
					timeOut ? formatDateForInput(new Date(timeOut)) : ''
				}
				name="time_out"
				type="datetime-local"
			/> */}
			<DateTimePicker />
			<DateTimePicker />
			<EditHoursButton
				employeeId={employeeId}
				onSuccess={() => onSuccess?.() || (() => {})}
				punchClockId={id}
			/>
		</form>
	)
}
