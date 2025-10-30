import { YearlyHoursChart } from '@/components/ui/charts/yearly-hours-chart'
import { getHoursWorkedByYear } from '@/lib/DAL/punch-clock'
import { getWeekNumber } from '@/lib/utils/utils'

export async function YearlyHoursWorked({
	props,
}: {
	props: PageProps<'/hours-worked'>
}) {
	const searchParams = await props.searchParams
	const weekParam = searchParams.week
	const week = Array.isArray(weekParam) ? weekParam[0] : weekParam

	const dateObject = week ? new Date(week) : new Date()
	const weekNumberResult = getWeekNumber(dateObject)
	const currentYear = weekNumberResult?.[0]
	const yearlyHours = await getHoursWorkedByYear(currentYear)
	return <YearlyHoursChart data={yearlyHours} year={currentYear} />
}
