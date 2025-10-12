'use client'
import { Label } from '@radix-ui/react-label'
import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import PunchClockButton from '../buttons/punch-clock'
import { Input } from '../input'

export default function TimeInput({
	punchOut = false,
	disabled,
	clockInTime,
}: {
	punchOut?: boolean
	disabled: boolean
	clockInTime?: Date
}) {
	const [currentTime, setCurrentTime] = useState<Date | null>(null)

	useEffect(() => {
		setCurrentTime(new Date())
		const interval = setInterval(() => setCurrentTime(new Date()), 1000)
		return () => clearInterval(interval)
	}, [])

	const formattedCurrentTime = currentTime ? formatTime(currentTime) : ''
	const displayTime = punchOut
		? formattedCurrentTime
		: clockInTime
			? formatTime(new Date(clockInTime))
			: formattedCurrentTime

	const elapsedTime =
		punchOut && clockInTime && currentTime
			? calculateElapsedTime(clockInTime, currentTime)
			: ''

	return (
		<div className="flex flex-col gap-3">
			{punchOut && clockInTime && (
				<>
					<Label className="px-1 text-gray-400">Time Worked:</Label>
					<div className="flex items-center gap-2">
						<Input
							className="w-30"
							disabled
							readOnly
							type="text"
							value={elapsedTime}
						/>
						<Clock size={28} />
					</div>
				</>
			)}
			<Label
				className={`px-1 ${disabled ? 'text-gray-400' : ''}`}
				htmlFor="time-picker"
			>
				{punchOut ? 'Punch Out Time:' : 'Punch In Time:'}
			</Label>
			<div className="flex items-center gap-2">
				<Input
					className={`bg-background appearance-none w-30 ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}`}
					disabled={disabled}
					id="time-picker"
					readOnly
					type="text"
					value={displayTime}
				/>
				<Clock size={28} />
			</div>
			<PunchClockButton disabled={disabled} punchOut={punchOut} />
		</div>
	)
}

// helper to format time
function formatTime(date: Date) {
	const hours = date.getHours()
	const minutes = date.getMinutes().toString().padStart(2, '0')
	const seconds = date.getSeconds().toString().padStart(2, '0')
	const ampm = hours >= 12 ? 'PM' : 'AM'
	const formattedHours = (hours % 12 || 12).toString().padStart(2, '0')
	return `${formattedHours}:${minutes}:${seconds} ${ampm}`
}

// helper to calculate elapsed time
function calculateElapsedTime(startTime: Date, endTime: Date) {
	const diff = endTime.getTime() - new Date(startTime).getTime()
	const hours = Math.floor(diff / (1000 * 60 * 60))
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((diff % (1000 * 60)) / 1000)
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
