import type { TimeCard } from '@/lib/types/punch-clock-types'
import AddHoursListItemForm from './add-hours-list-item-form'
import ListItemManageHours from './list-item-manage-hours'

export default async function ManageHoursList({
  hoursPromise,
}: {
  hoursPromise: Promise<TimeCard[] | null>
}) {
  const hours = await hoursPromise
  const employeeId = hours?.[0]?.user_id

  return (
    <ul className="divide-y divide-gray-200">
      {hours?.map((entry) => (
        <ListItemManageHours entry={entry} key={entry.id} />
      ))}
      {employeeId && (
        <AddHoursListItemForm employeeId={employeeId} />
      )}
    </ul>
  )
}