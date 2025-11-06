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
		<form className="grid grid-cols-1 gap-4 md:gap-x-16 lg:grid-cols-3">
			<div className="mx-auto flex flex-col gap-2">
				<h1>Start</h1>
				<DateTimePicker
					date={timeInDate}
					name="time_in"
					setDate={setTimeInDate}
					setTime={setTimeInTime}
					time={timeInTime}
				/>
			</div>
			<div className="mx-auto flex flex-col gap-2">
				<h1>End</h1>
				<DateTimePicker
					date={timeOutDate}
					name="time_out"
					setDate={setTimeOutDate}
					setTime={setTimeOutTime}
					time={timeOutTime}
				/>
			</div>
			<EditHoursButton
				employeeId={employeeId}
				onSuccess={() => onSuccess?.() || (() => {})}
				punchClockId={id}
			/>
		</form>
	)
}
