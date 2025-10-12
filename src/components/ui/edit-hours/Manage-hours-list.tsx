import type { TimeCard } from '@/lib/types/punch-clock-types'
import ListItemManageHours from './list-item-manage-hours'

export default async function ManageHoursList({
	hoursPromise,
}: {
	hoursPromise: Promise<TimeCard[] | null>
}) {
	const hours = await hoursPromise
	return (
		<ul className="divide-y divide-gray-200">
			{hours?.map((entry) => (
				<ListItemManageHours entry={entry} key={entry.id} />
			))}
		</ul>
	)
}
