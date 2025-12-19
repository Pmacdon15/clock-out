import { YearlyHoursChart } from '@/components/ui/charts/yearly-hours-chart'
import { getHoursWorkedByYear } from '@/lib/DAL/punch-clock'

export async function YearlyHoursWorked() {
	const yearlyHours = await getHoursWorkedByYear()
	console.log('Yearly hours: ', yearlyHours)

	return <YearlyHoursChart data={yearlyHours} />
}
