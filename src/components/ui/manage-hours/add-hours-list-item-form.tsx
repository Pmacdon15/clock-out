'use client'
import { Plus } from 'lucide-react'
import { Activity, useState } from 'react'
import { ManageTimeForm } from './manage-time-form'

export default function AddHoursListItemForm({
  employeeId,
}: {
  employeeId?: string
}) {
  const [showAddHoursForm, setShowAddHoursForm] = useState(false)
  return (
    <li className="py-4 grid grid-cols-2 lg:grid-cols-6 items-center w-full">
      <div className="col-span-2 lg:col-span-5 md:col-span-2">
        <Activity mode={showAddHoursForm ? 'visible' : 'hidden'}>
          <ManageTimeForm employeeId={employeeId} />
        </Activity>
      </div>
      <div className="col-span-0 lg:col-span-1 mt-4 md:mt-0 md:col-span-0 flex justify-end">
        <button
          onClick={() => setShowAddHoursForm(!showAddHoursForm)}
          type="button"
        >
          <Plus />
        </button>
      </div>
    </li>
  )
}