'use client';

interface WeekSelectorProps {
  weeks: { label: string, value: string }[];
  selectedWeek: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function WeekSelector({ weeks, selectedWeek, onChange }: WeekSelectorProps) {
  return (
    <div className="mb-4">
      <label htmlFor="week-select" className="mr-2">Filter by week:</label>
      <select id="week-select" value={selectedWeek} onChange={onChange} className="border p-1 rounded">
        <option value={""}>Select a Week</option>
        {weeks.map(week => (
          <option key={week.value} value={week.value}>{week.label}</option>
        ))}
      </select>
    </div>
  );
}
