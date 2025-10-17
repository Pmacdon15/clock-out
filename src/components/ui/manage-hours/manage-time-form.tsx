'use client'
import { useState } from 'react'
import EditHoursButton from '../buttons/edit-hours-button'
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
	const [timeInDate, setTimeInDate] = useState<Date | undefined>(
		timeIn ? new Date(timeIn) : undefined,
	)
	const [timeInTime, setTimeInTime] = useState<string>(
		timeIn ? new Date(timeIn).toTimeString().slice(0, 8) : '00:00:00',
	)
	const [timeOutDate, setTimeOutDate] = useState<Date | undefined>(
		timeOut ? new Date(timeOut) : undefined,
	)
	const [timeOutTime, setTimeOutTime] = useState<string>(
		timeOut ? new Date(timeOut).toTimeString().slice(0, 8) : '00:00:00',
	)

	return (
		<form className="grid grid-cols-1 lg:grid-cols-3 gap-4">
			<input
				name="time_in"
				type="hidden"
				value={
					timeInDate && timeInTime
						? `${timeInDate.toISOString().slice(0, 10)}T${timeInTime}`
						: ''
				}
			/>
			<input
				name="time_out"
				type="hidden"
				value={
					timeOutDate && timeOutTime
						? `${timeOutDate.toISOString().slice(0, 10)}T${timeOutTime}`
						: ''
				}
			/>

			<div className="flex flex-col gap-2">
				<h1>Start</h1>
				<DateTimePicker
					date={timeInDate}
					setDate={setTimeInDate}
					setTime={setTimeInTime}
					time={timeInTime}
				/>
			</div>
<div className='flex flex-col gap-2'><h1>End</h1><DateTimePicker date={timeOutDate} setDate={setTimeOutDate} time={timeOutTime} setTime={setTimeOutTime} /></div>
			<EditHoursButton
				employeeId={employeeId}
				onSuccess={() => onSuccess?.() || (() => {})}
				punchClockId={id}
			/>
		</form>
	)
}
