import AddHoursListItemForm from './add-hours-list-item-form'
import ListItemManageHours from './list-item-manage-hours'
import { getEmployeeTimeCards } from '@/lib/DAL/punch-clock'

export default async function ManageHoursList({
	props,
}: {
	props: PageProps<'/admin/manage-hours'>
}) {
	const searchParams = await props.searchParams
	const employeeIdValue = searchParams.employee
	const employeeId = Array.isArray(employeeIdValue)
		? employeeIdValue[0]
		: employeeIdValue

	const weekValue = searchParams.week
	const week = Array.isArray(weekValue) ? weekValue[0] : weekValue
	const hours = await getEmployeeTimeCards(week, employeeId)
	// const hours = await hoursPromise

	return (
		<ul className="divide-y divide-gray-200">
			{hours?.map((entry) => (
				<ListItemManageHours entry={entry} key={entry.id} />
			))}
			<AddHoursListItemForm />
		</ul>
	)
}
