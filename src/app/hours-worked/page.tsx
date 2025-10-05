import { Button } from "@/components/ui/button";
import { HoursWorkedFilter } from "@/components/ui/filters/hours-worked-filter";
import { getAllWeeksWithWork, getHoursWorked } from "@/lib/DAL/punch-clock";
import { getWeekNumber } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default async function HoursWorkedPage() {
  
  const weeks = await getAllWeeksWithWork();

  // Get current week
  const now = new Date();
  const [currentYear, currentWeekNum] = getWeekNumber(now);
  const currentWeekValue = `${currentYear}-W${String(currentWeekNum).padStart(2, '0')}`;

  // Start to fetch data for the current week
  const hoursWorkedPromise =  getHoursWorked(currentWeekValue);

  return (
    <>
      <div className="flex justify-end p-6">
        <SignedIn>
          <Link href="/punch-clock">
            <Button>Punch Clock</Button>
          </Link>
        </SignedIn>
      </div>
      <div className="p-6">
        <HoursWorkedFilter initialHoursPromise={hoursWorkedPromise} weeks={weeks} currentWeek={currentWeekValue} />
      </div>
    </>
  );
}
