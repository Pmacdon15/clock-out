import { Suspense } from 'react'
import type { Week } from '@/lib/types/punch-clock-types'
import { WeekSelector } from '../filters/week-selector'

export default function WeekSelectorWrapper({
	weekPromise,
	weeksPromise,
}: {
	weeksPromise: Promise<Week[]>
	weekPromise: Promise<string | string[] | undefined>
}) {
	//TODO: SHOW FALL BACK
	return (
		<Suspense>
			<WeekSelector
				variant="/manage-hours"
				weekPromise={weekPromise}
				weeksPromise={weeksPromise}
			/>
		</Suspense>
	)
}
