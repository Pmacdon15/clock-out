'use client';

import { use, useState } from 'react';
import { HoursWorked } from '@/lib/DB/punch-clock-db';
import { HoursWorkedChart } from '@/components/ui/charts/hours-worked-chart';
import { getWeeklyHours } from '@/lib/actions/punch-clock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeekSelector } from './week-selector';

interface HoursWorkedFilterProps {
  initialHoursPromise: Promise<HoursWorked[]>;
  weeks: { label: string, value: string }[];
  currentWeek: string;
}

export function HoursWorkedFilter({ initialHoursPromise, weeks, currentWeek }: HoursWorkedFilterProps) {
  const initialHours = use(initialHoursPromise);

  const [hours, setHours] = useState(initialHours);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const handleWeekChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const week = event.target.value;
    if (week === "") return
    setSelectedWeek(week);
    const newHours = await getWeeklyHours(week);
    setHours(newHours);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hours Worked {selectedWeek && `- ${selectedWeek}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <WeekSelector weeks={weeks} selectedWeek={selectedWeek} onChange={handleWeekChange} />
          <div className="h-96">
            <HoursWorkedChart data={hours} className="h-full aspect-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
