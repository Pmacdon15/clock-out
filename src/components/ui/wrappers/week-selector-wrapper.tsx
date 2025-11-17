import { getAllWeeksWithWorkForEmployee } from '@/lib/DAL/punch-clock'
import { WeekSelector } from '../filters/week-selector'

export default async function WeekSelectorWrapper({
	props,
}: {
	props: PageProps<'/manage-hours'>
}) {
	const searchParams = await props.searchParams

	const employeeIdValue = searchParams.employee
	const employeeId = Array.isArray(employeeIdValue)
		? employeeIdValue[0]
		: employeeIdValue

	const weeksPromise = getAllWeeksWithWorkForEmployee(employeeId)

	return <WeekSelector variant="/manage-hours" weeksPromise={weeksPromise} />
}
