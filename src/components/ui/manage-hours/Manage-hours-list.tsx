import type { TimeCard } from '@/lib/types/punch-clock-types'
import ListItemManageHours from './list-item-manage-hours'
import { ManageTimeForm } from './manage-time-form'

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
			<li className="py-4 grid grid-cols-2 lg:grid-cols-6 gap-4 items-center w-full">
				<div className="col-span-2 lg:col-span-4">
					<ManageTimeForm />
				</div>
			</li>
		</ul>
	)
}
