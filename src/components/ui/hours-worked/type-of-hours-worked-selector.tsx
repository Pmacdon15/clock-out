'use client'

import { Activity, useState } from 'react'
import { Button } from '../button'

export default function TypeOfHoursSelector({
	child1,
	child2,
}: {
	child1: React.ReactNode
	child2: React.ReactNode
}) {
	const [typeOfHours, setTypeOfHours] = useState('Weekly')
	return (
		<>
			<Button
				onClick={() =>
					setTypeOfHours(
						typeOfHours !== 'weekly' ? 'weekly' : 'pay-period',
					)
				}
				variant={'outline'}
			>
				Show {typeOfHours !== 'weekly' ? ' Weekly' : 'Pay Period'}
			</Button>
			<Activity mode={typeOfHours === 'weekly' ? 'visible' : 'hidden'}>
				{child1}
			</Activity>

			<Activity mode={typeOfHours !== 'weekly' ? 'visible' : 'hidden'}>
				{child2}
			</Activity>
		</>
	)
}
