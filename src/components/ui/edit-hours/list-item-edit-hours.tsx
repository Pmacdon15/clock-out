'use client'
import { Edit } from 'lucide-react'
import { Activity, useState } from 'react'
import type { TimeCard } from '@/lib/types/punch-clock-types'
import { formatTimeForDisplay } from '@/lib/utils/utils'
import EditHoursButton from '../buttons/edit-hours-button'
import { Input } from '../input'
import DeleteHoursButton from '../buttons/delete-hours-button'
import { Button } from '../button'

export default function ListItemEditHours({
	entry,
}: {
	key: number
	entry: TimeCard
}) {
	const [editHoursState, setEditHours] = useState(false)

	return (
		<li
			className="py-4 grid grid-cols-2 lg:grid-cols-6 gap-4 items-center w-full"
			key={entry.id}
		>
			<div className="col-span-2 lg:col-span-4">
				{/* Display times  */}
				<Activity mode={!editHoursState ? 'visible' : 'hidden'}>
					<DisplayTimes
						timeIn={entry.time_in}
						timeOut={entry.time_out}
					/>
				</Activity>
				{/* Display form for editing */}
				<Activity mode={editHoursState ? 'visible' : 'hidden'}>
					<EditTimeForm
						id={entry.id}
						onSuccess={() => setEditHours(false)}
						timeIn={entry.time_in}
						timeOut={entry.time_out}
					/>
				</Activity>
			</div>
			<div className="col-span-1 lg:col-span-1 mt-4 lg:mt-0 text-left">
				<p className="text-sm text-gray-500">
					Hours:{' '}
					{entry.time_out
						? (
								(new Date(entry.time_out).getTime() -
									new Date(entry.time_in).getTime()) /
								(60 * 60 * 1000)
							).toFixed(2)
						: 'N/A'}
				</p>
			</div>
			<div className="col-span-1 lg:col-span-1 flex justify-end lg:justify-end mt-4 lg:mt-0 gap-2">
				<Button
					onClick={() => setEditHours(!editHoursState)}
					variant={'outline'}
				>
					<Edit size={20} />
				</Button>

				<DeleteHoursButton />
			</div>
		</li>
	)
}

function DisplayTimes({
	timeIn,
	timeOut,
}: {
	timeIn: Date
	timeOut?: Date | null
}) {
	return (
		<div className="grid grid-cols-2 gap-4">
			<p className="text-sm text-gray-500">
				{new Date(timeIn).toLocaleDateString()}{' '}
				{formatTimeForDisplay(timeIn)}
			</p>
			<p className="text-sm text-gray-500">
				{timeOut
					? `${new Date(timeOut).toLocaleDateString()} ${formatTimeForDisplay(timeOut)}`
					: 'Not punched out'}
			</p>
		</div>
	)
}

function EditTimeForm({
	id,
	timeIn,
	timeOut,
	onSuccess,
}: {
	id: number
	timeIn: Date
	timeOut?: Date | null
	onSuccess: () => void
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
				defaultValue={formatDateForInput(new Date(timeIn))}
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
			<EditHoursButton onSuccess={() => onSuccess()} punchClockId={id} />
		</form>
	)
}
