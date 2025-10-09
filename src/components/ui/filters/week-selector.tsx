'use client';

import { useHandleParamChange } from '@/lib/utils/filter-utils';
import { useRouter, useSearchParams } from 'next/navigation'

interface WeekSelectorProps {
  weeks: { label: string, value: string }[];
}

export function WeekSelector({ weeks }: WeekSelectorProps) {
 
  const searchParams = useSearchParams();
  const currentWeek = searchParams.get('week');
  const handleParamChange = useHandleParamChange();

  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleParamChange('week', event.target.value, '/hours-worked');
  };

  return (
    <div className="mb-4">
      <label htmlFor="week-select" className="mr-2">Filter by week:</label>
      <select
        id="week-select"
        value={currentWeek || ''}
        onChange={handleWeekChange}
        className="border p-1 rounded"
      >
        <option value="">Select a Week</option>
        {weeks.map(week => (
          <option key={week.value} value={week.value}>{week.label}</option>
        ))}
      </select>
    </div>
  );
}