'use client'

import { format, parse } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useHandleParamChange } from '@/lib/utils/filter-utils'
import { DatePicker } from '../inputs/date-picker'

export default function PayPeriodSelector({
	startDate,
	endDate,
}: {
	startDate?: string
	endDate?: string
}) {
	return (
		<div className="flex flex-col gap-2">
			<DateSelector date={startDate} />
			<DateSelector date={endDate} variant="endDate" />
		</div>
	)
}

function DateSelector({
	date,
	variant = 'startDate',
}: {
	date?: string
	variant?: 'startDate' | 'endDate'
}) {
	const searchParams = useSearchParams()
	const dateFromParams = searchParams.get(variant)
	const dateToSet = dateFromParams ?? date

	const handleParamChange = useHandleParamChange()

	const handleDateChange = (newDate?: Date) => {
		if (newDate) {
			const formattedDate = format(newDate, 'yyyy-MM-dd')
			handleParamChange(variant, formattedDate, '/hours-worked')
		}
	}

	return (
		<div className="flex w-full items-center md:w-3/6">
			<h1 className="w-24 md:w-1/6">
				{variant === 'startDate' ? 'Start Date' : 'End Date'}
			</h1>
			<DatePicker
				date={
					dateToSet
						? parse(dateToSet, 'yyyy-MM-dd', new Date())
						: undefined
				}
				onSelect={handleDateChange}
			/>
		</div>
	)
}
