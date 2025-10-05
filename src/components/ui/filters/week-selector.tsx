'use client';

import { useRouter } from 'next/navigation'

interface WeekSelectorProps {
  weeks: { label: string, value: string }[];
}

export function WeekSelector({ weeks }: WeekSelectorProps) {
  const router = useRouter();

  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWeek = event.target.value;
    router.push(`/hours-worked/${selectedWeek}`);
  };

  return (
    <div className="mb-4">
      <label htmlFor="week-select" className="mr-2">Filter by week:</label>
      <select
        id="week-select"
        defaultValue={weeks[weeks.length - 1].value}
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