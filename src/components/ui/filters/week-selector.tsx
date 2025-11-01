'use client'

import { useSearchParams } from 'next/navigation'
import { use } from 'react'
import type { Week } from '@/lib/types/punch-clock-types'
import { useHandleParamChange } from '@/lib/utils/filter-utils'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../select'

interface WeekSelectorProps {
	weeksPromise: Promise<Week[]>
	variant?: '/hours-worked' | '/manage-hours'
}

export function WeekSelector({
	weeksPromise,
	variant = '/hours-worked',
}: WeekSelectorProps) {
	const weeks = use(weeksPromise)
	const searchParams = useSearchParams()
	const currentWeek = searchParams.get('week')
	const handleParamChange = useHandleParamChange()

	return (
		<div className="mb-4 flex gap-4 items-center">
			<label className="mr-2" htmlFor="week-select">
				Filter by week:
			</label>
			<Select
				onValueChange={(value) =>
					handleParamChange('week', value, variant)
				}
				value={currentWeek || weeks[0]?.value || undefined}
			>
				<SelectTrigger>
					<SelectValue placeholder="Select a Week" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Weeks</SelectLabel>
						{weeks.map((week, index) => (
							<SelectItem
								key={`${week.value}-${index}`}
								value={week.value}
							>
								{week.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}
