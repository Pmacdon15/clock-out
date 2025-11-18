import { YearlyHoursChart } from '@/components/ui/charts/yearly-hours-chart'
import { getHoursWorkedByYear } from '@/lib/DAL/punch-clock'

export async function YearlyHoursWorked() {
	'use cache: private'
	const currentYear = new Date().getFullYear()
	const yearlyHours = await getHoursWorkedByYear(currentYear)

	return <YearlyHoursChart data={yearlyHours} year={currentYear} />
}
