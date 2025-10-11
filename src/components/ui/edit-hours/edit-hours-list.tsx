import type { TimeCard } from '@/lib/types/punch-clock-types'
import ListItemEditHours from './list-item-edit-hours'

export default async function EditHoursList({
	hoursPromise,
}: {
	hoursPromise: Promise<TimeCard[] | null>
}) {
	const hours = await hoursPromise
	return (
		<ul className="divide-y divide-gray-200">
			{hours?.map((entry) => (
				<ListItemEditHours entry={entry} key={entry.id} />
			))}
		</ul>
	)
}
