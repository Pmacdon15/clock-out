'use client';

import { Week } from '@/lib/types/punch-clock-types';
import { useHandleParamChange } from '@/lib/utils/filter-utils';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../select";

interface WeekSelectorProps {
  weeksPromise: Promise<Week[]>
  variant?: "/hours-worked" | "/admin/edit-hours"
}

export function WeekSelector({ weeksPromise, variant = "/hours-worked" }: WeekSelectorProps) {

  const weeks = use(weeksPromise)
  const searchParams = useSearchParams();
  const currentWeek = searchParams.get('week');
  const handleParamChange = useHandleParamChange();

  return (
    <div className="mb-4 flex gap-4 items-center">
      <label htmlFor="week-select" className="mr-2">Filter by week:</label>
      <Select defaultValue={currentWeek || undefined} onValueChange={(value) => handleParamChange('week', value, variant)}>
        <SelectTrigger >
          <SelectValue placeholder="Select a Week" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Weeks</SelectLabel>
            {weeks.map(week => (
              <SelectItem key={week.value} value={week.value}>{week.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}