import { getHoursWorkedByYear } from "@/lib/DAL/punch-clock";
import { YearlyHoursChart } from "@/components/ui/charts/yearly-hours-chart";

export async function YearlyHoursWorked() {
    const currentYear = new Date().getFullYear();
    const data = await getHoursWorkedByYear(currentYear);

    return <YearlyHoursChart data={data} year={currentYear} />
}
