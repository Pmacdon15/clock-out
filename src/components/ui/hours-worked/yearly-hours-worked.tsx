import { YearlyHoursChart } from "@/components/ui/charts/yearly-hours-chart";
import { MonthlyHours } from "@/lib/types/punch-clock-types";

interface YearlyHoursWorkedProps {
  hoursWorkedByYearPromise: Promise<MonthlyHours[]>;
  currentYear: number;
}

export async function YearlyHoursWorked({ hoursWorkedByYearPromise, currentYear }: YearlyHoursWorkedProps) {
  const yearlyHours = await hoursWorkedByYearPromise;
  return <YearlyHoursChart data={yearlyHours} year={currentYear} />;
}