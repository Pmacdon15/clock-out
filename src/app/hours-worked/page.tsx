import { HoursWorkedChart } from "@/components/ui/charts/hours-worked-chart";
import { getHoursWorked } from "@/lib/DAL/punch-clock";

export default async function HoursWorkedPage() {
  const hoursWorked = await getHoursWorked();
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Hours Worked</h1>
      <HoursWorkedChart data={hoursWorked} />
    </div>
  );
}
