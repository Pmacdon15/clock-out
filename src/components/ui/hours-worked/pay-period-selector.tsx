'use client'

import { format, parse } from 'date-fns'
import { use } from 'react'
import { useHandleParamChange } from '@/lib/utils/filter-utils'
import { DatePicker } from '../inputs/date-picker'

export default function PayPeriodSelectorPayPeriodSelector({
	startDateEndDatePromise,
}: {
	startDateEndDatePromise: Promise<{
		startDate: string | string[] | undefined
		endDate: string | string[] | undefined
	}>
}) {
	const { startDate, endDate } = use(startDateEndDatePromise)
	return (
		<div className="flex w-full flex-col gap-2">
			<DateSelector date={startDate} />
			<DateSelector date={endDate} variant="endDate" />
		</div>
	)
}

function DateSelector({
	date,
	variant = 'startDate',
}: {
	date?: string | string[]
	variant?: 'startDate' | 'endDate'
}) {
	const handleParamChange = useHandleParamChange()

	const handleDateChange = (newDate?: Date) => {
		if (newDate) {
			const formattedDate = format(newDate, 'yyyy-MM-dd')
			handleParamChange(variant, formattedDate, '/hours-worked')
		}
	}

	return (
		<div className="flex w-full items-center gap-2">
			<h1 className="w-20 shrink-0">
				{variant === 'startDate' ? 'Start Date' : 'End Date'}
			</h1>
			<DatePicker
				date={
					date
						? parse(String(date), 'yyyy-MM-dd', new Date())
						: undefined
				}
				onSelect={handleDateChange}
			/>
		</div>
	)
}
