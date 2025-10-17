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
		<div>
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
	let dateToSet: string | null
	if (variant === 'startDate') dateToSet = searchParams.get('startDate')
	else if (variant === 'endDate') dateToSet = searchParams.get('endDate')
	else dateToSet = date ?? ''

	const handleParamChange = useHandleParamChange()
	return (
		<div className="flex w-3/6">
			<h1 className="w-1/6">
				{variant === 'startDate' ? 'Start Date' : 'End Date'}
			</h1>
			<Input
				className="w-2/6 text-white bg-transparent border-white focus:ring-white [&::-webkit-datetime-edit]:text-white [&::-webkit-calendar-picker-indicator]:invert"
				defaultValue={
					dateToSet ? formatDateForInput(new Date(dateToSet)) : ''
				}
				name={variant}
				onChange={(e) =>
					handleParamChange(variant, e.target.value, '/hours-worked')
				}
				type="datetime-local"
			/>
		</div>
	)
}
