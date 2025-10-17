'use client'

import { useSearchParams } from 'next/navigation'
import {
	formatDateForInput,
	useHandleParamChange,
} from '@/lib/utils/filter-utils'
import { Input } from '../input'

export default function PayPeriodSelector({
	startDate,
	endDate,
}: {
	startDate?: string
	endDate?: string
}) {
	return (
		<div className='flex flex-col gap-2'>
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
	return (
		<div className="flex w-full md:w-3/6">
			<h1 className="w-24 md:w-1/6">
				{variant === 'startDate' ? 'Start Date' : 'End Date'}
			</h1>
			<Input
				className="w-38 md:w-2/6 text-white bg-transparent border-white [&::-webkit-datetime-edit]:text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:brightness-200"
				defaultValue={
					dateToSet ? formatDateForInput(new Date(dateToSet)) : ''
				}
				name={variant}
				onChange={(e) =>
					handleParamChange(variant, e.target.value, '/hours-worked')
				}
				type="date"
			/>
		</div>
	)
}
