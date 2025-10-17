'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

export function DatePicker({
	date,
	onSelect,
}: {
	date?: Date
	onSelect: (date?: Date) => void
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className="data-[empty=true]:text-muted-foreground w-36 justify-start text-left font-normal"
					data-empty={!date}
					variant="outline"
				>
					<CalendarIcon />
					{date ? format(date, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" onSelect={onSelect} selected={date} />
			</PopoverContent>
		</Popover>
	)
}
