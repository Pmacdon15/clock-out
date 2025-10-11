'use client'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import type { TimeCard } from '@/lib/types/punch-clock-types'
import EditHoursButton from '../buttons/edit-hours-button'
import { Input } from '../input'

export default function ListItemEditHours({
	entry,
}: {
	key: number
	entry: TimeCard
}) {
	function formatDateForInput(date: Date) {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		const hour = String(date.getHours()).padStart(2, '0')
		const minute = String(date.getMinutes()).padStart(2, '0')
		return `${year}-${month}-${day}T${hour}:${minute}`
	}
	const [editHoursState, setEditHours] = useState(false)

	return (
		<li
			className="py-4 grid grid-cols-2 lg:grid-cols-6 gap-4 items-center w-full"
			key={entry.id}
		>
			<div className="col-span-2 lg:col-span-4">
				{!editHoursState ? (
					<div className="grid grid-cols-2 gap-4">
						<p className="text-sm text-gray-500">
							{new Date(entry.time_in).toLocaleString()}
						</p>
						<p className="text-sm text-gray-500">
							{entry.time_out
								? new Date(entry.time_out).toLocaleString()
								: 'Not punched out'}
						</p>
					</div>
				) : (
					<form className="grid grid-cols-1 lg:grid-cols-3 gap-4">						
						<Input
							className="w-full"
							defaultValue={formatDateForInput(
								new Date(entry.time_in),
							)}
							name="time_in"
							type="datetime-local"
						/>
						<Input
							className="w-full"
							defaultValue={
								entry.time_out
									? formatDateForInput(
											new Date(entry.time_out),
										)
									: ''
							}
							name="time_out"
							type="datetime-local"
						/>
						<EditHoursButton
							onSuccess={() => setEditHours(false)}
							punchClockId={entry.id}
						/>
					</form>
				)}
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
			<div className="col-span-1 lg:col-span-1 flex justify-end lg:justify-end mt-4 lg:mt-0">
				<button
					className="p-2 rounded-full"
					onClick={() => setEditHours(!editHoursState)}
					type="button"
				>
					<Edit size={20} />
				</button>
			</div>
		</li>
	)
}
