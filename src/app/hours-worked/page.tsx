import { Button } from "@/components/ui/button";
import HoursWorkedFilterFallback from "@/components/ui/fallbacks/hours-worked-filter-fallback";
import { getAllWeeksWithWork, getHoursWorked, getHoursWorkedByYear } from "@/lib/DAL/punch-clock";
import { getWeekNumber } from "@/lib/utils/utils";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";
import { CardSkeleton } from "@/components/ui/card";
import { YearlyHoursWorked } from "@/components/ui/hours-worked/yearly-hours-worked";
import { HoursWorkedContainer } from "@/components/ui/hours-worked/hours-worked";

export default async function HoursWorkedPage(props: PageProps<"/hours-worked">) {
  const searchParams = await props.searchParams


  const dateParam = searchParams.date;
  const date = Array.isArray(dateParam) ? dateParam[0] : dateParam;

  const dateObject = date ? new Date(date) : undefined;
  const weekNumberResult = getWeekNumber(dateObject);
  const currentYear = weekNumberResult?.[0];

  const weeksPromise = getAllWeeksWithWork();
  const hoursWorkedPromise = getHoursWorked(date);
  const hoursWorkedByYearPromise = currentYear !== undefined ? getHoursWorkedByYear(currentYear) : Promise.resolve([]);
  return (

    <>
      <div className="rounded-xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 w-full md:w-4/6">
        <div className="flex flex-col gap-4 rounded-xl p-4 bg-black">
          <div className="flex text-white justify-center">
            <UserButton />
            <OrganizationSwitcher />
            <Link href="/punch-clock">
              <Button variant={"outline"}>Punch Clock</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-2 w-full md:w-5/6">
        <Suspense fallback={<HoursWorkedFilterFallback />}>
          <HoursWorkedContainer hoursPromise={hoursWorkedPromise} weeksPromise={weeksPromise} />
        </Suspense>
      </div>
      <div className="p-2 w-full md:w-5/6">
        <Suspense fallback={<CardSkeleton />}>
          <YearlyHoursWorked hoursWorkedByYearPromise={hoursWorkedByYearPromise} currentYear={currentYear} />
        </Suspense>
      </div>
    </>
  );
}

