'use client'
import { Activity, useState } from 'react'
import type { TimeCard } from '@/lib/types/punch-clock-types'
import { formatTimeForDisplay } from '@/lib/utils/utils'
import EditTimesButton from '../buttons/edit-times-button'
import DeleteHoursDialog from '../dialogs/delete-hours-dialog'
import { ManageTimeForm } from './manage-time-form'

export default function ListItemManageHours({
	entry,
}: {
	key: number
	entry: TimeCard
}) {
	const [editHoursState, setEditHoursState] = useState(false)

	return (
		<li
			className="grid w-full grid-cols-2 items-center gap-4 py-4 lg:grid-cols-6"
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
					<ManageTimeForm
						id={entry.id}
						onSuccess={() => setEditHoursState(false)}
						timeIn={entry.time_in}
						timeOut={entry.time_out}
					/>
				</Activity>
			</div>
			<div className="col-span-1 mt-4 text-left lg:col-span-1 lg:mt-0">
				<p className="text-sm">
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
			<div className="col-span-1 mt-4 flex justify-end gap-2 lg:col-span-1 lg:mt-0 lg:justify-end">
				<EditTimesButton
					editHoursState={editHoursState}
					setEditHours={setEditHoursState}
				/>
				<DeleteHoursDialog hoursId={entry.id} />
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
			<p className="text-sm">
				{new Date(timeIn).toLocaleDateString()}{' '}
				{formatTimeForDisplay(timeIn)}
			</p>
			<p className="text-sm">
				{timeOut
					? `${new Date(timeOut).toLocaleDateString()} ${formatTimeForDisplay(timeOut)}`
					: 'Not punched out'}
			</p>
		</div>
	)
}
