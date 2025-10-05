'use client';

import { use, useState } from 'react';
import { HoursWorked } from '@/lib/DB/punch-clock-db';
import { HoursWorkedChart } from '@/components/ui/charts/hours-worked-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeekSelector } from './week-selector';

interface HoursWorkedFilterProps {
  initialHoursPromise: Promise<HoursWorked[]>;
  weeks: { label: string, value: string }[];
  currentWeek: string;
}

export function HoursWorkedFilter({ initialHoursPromise, weeks, currentWeek }: HoursWorkedFilterProps) {
  
  // const handleWeekChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const week = event.target.value;
  //   if (week === "") return
  //   setSelectedWeek(week);
  //   const newHours = await getWeeklyHours(week);
  //   setHours(newHours);
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hours Worked</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <WeekSelector weeks={weeks} />
          <div className="h-96">
            <HoursWorkedChart initialHoursPromise={initialHoursPromise} className="h-full aspect-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
