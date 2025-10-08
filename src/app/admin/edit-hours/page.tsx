import BorderBox from "@/components/ui/containers/border-box";

// Dummy data for hours worked
const dummyHours = [
  { id: 1, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-18 09:00:00', time_out: '2024-03-18 17:00:00' },
  { id: 2, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-19 09:00:00', time_out: '2024-03-19 16:30:00' },
  { id: 3, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-20 09:00:00', time_out: '2024-03-20 17:15:00' },
  { id: 4, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-21 09:00:00', time_out: '2024-03-21 16:45:00' },
  { id: 5, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-22 09:00:00', time_out: '2024-03-22 17:00:00' },
  { id: 6, user_id: 'Bob', org_id: 'org1', time_in: '2024-03-23 09:00:00', time_out: '2024-03-23 17:30:00' },
];

export default function Page() {
  return (
    <BorderBox>
      <h1 className="text-2xl font-bold mb-4">Edit Hours</h1>
      <ul className="divide-y divide-gray-200">
        {dummyHours.map((entry) => (
          <li key={entry.id} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{entry.user_id}</p>
              <p className="text-sm text-gray-500">
                In: {new Date(entry.time_in).toLocaleString()} 
              </p>
              <p className="text-sm text-gray-500">
                Out: {new Date(entry.time_out).toLocaleString()}
              </p>
            </div>
            <p>
              Hours: {(new Date(entry.time_out).getTime() - new Date(entry.time_in).getTime()) / (60 * 60 * 1000).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </BorderBox>
  );
}