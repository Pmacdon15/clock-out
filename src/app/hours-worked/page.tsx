import { Button } from "@/components/ui/button";
import HoursWorkedFilterFallback from "@/components/ui/fallbacks/hours-worked-filter-fallback";
import { HoursWorkedFilter } from "@/components/ui/filters/hours-worked-filter";
import { getAllWeeksWithWork, getHoursWorked, getHoursWorkedByYear } from "@/lib/DAL/punch-clock";
import { getWeekNumber } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";
import { CardSkeleton } from "@/components/ui/card";
import { YearlyHoursWorked } from "@/components/ui/hours-worked/yearly-hours-worked";

export default async function HoursWorkedPage(props: PageProps<"/hours-worked">) {
  const [weeks, searchParams] = await Promise.all([
    getAllWeeksWithWork(),
    props.searchParams
  ])

  const dateParam = searchParams.date;
  const dateValue = Array.isArray(dateParam) ? dateParam[0] : dateParam;
  const now = dateValue ? new Date(dateValue) : new Date();

  const [currentYear, currentWeekNum] = getWeekNumber(now);
  const currentWeekValue = `${currentYear}-W${String(currentWeekNum).padStart(2, '0')}`;

  const hoursWorkedPromise = getHoursWorked(currentWeekValue);
  const hoursWorkedByYearPromise = getHoursWorkedByYear(now.getFullYear());

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
        <Suspense fallback={<HoursWorkedFilterFallback />}>
          <HoursWorkedFilter initialHoursPromise={hoursWorkedPromise} weeks={weeks} currentWeek={currentWeekValue} />
        </Suspense>
      </div>
      <div className="p-6">
        <Suspense fallback={<CardSkeleton />}>
          <YearlyHoursWorked hoursWorkedByYearPromise={hoursWorkedByYearPromise} currentYear={now.getFullYear()} />
        </Suspense>
      </div>
    </>
  );
}

