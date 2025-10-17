'use client'

import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

export function DateTimePicker({date, setDate, time, setTime}: {date?: Date, setDate: (date?: Date) => void, time?: string, setTime: (time: string) => void}) {
	const [open, setOpen] = React.useState(false)

	return (
		<div className="flex gap-4">
			<div className="flex flex-col gap-3">
				<Label className="px-1" htmlFor="date-picker">
					Date
				</Label>
				<Popover onOpenChange={setOpen} open={open}>
					<PopoverTrigger asChild>
						<Button
							className="w-32 justify-between font-normal"
							id="date-picker"
							variant="outline"
						>
							{date ? date.toLocaleDateString() : 'Select date'}
							<ChevronDownIcon />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						align="start"
						className="w-auto overflow-hidden p-0"
					>
						<Calendar
							captionLayout="dropdown"
							mode="single"
							onSelect={(d) => {
								setDate(d)
								setOpen(false)
							}}
							selected={date}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className="flex flex-col gap-3">
				<Label className="px-1" htmlFor="time-picker">
					Time
				</Label>
				<Input
					className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
					value={time}
					onChange={(e) => setTime(e.target.value)}
					id="time-picker"
					step="1"
					type="time"
				/>
			</div>
		</div>
	)
}
