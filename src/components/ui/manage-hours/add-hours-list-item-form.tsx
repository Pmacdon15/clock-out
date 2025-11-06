'use client'
import { useOrganization, useUser } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { Activity, useState } from 'react'
import { ManageTimeForm } from './manage-time-form'

export default function AddHoursListItemForm() {
	const [showAddHoursForm, setShowAddHoursForm] = useState(false)
	const { user, isLoaded } = useUser()
	const { membership } = useOrganization()
	if (membership?.roleName !== 'Admin') return null
	return (
		<li className="grid w-full grid-cols-2 items-center py-4 lg:grid-cols-6">
			<div className="col-span-2 md:col-span-2 lg:col-span-5">
				<Activity
					mode={showAddHoursForm && isLoaded ? 'visible' : 'hidden'}
				>
					<ManageTimeForm
						employeeId={user?.id}
						onSuccess={() => setShowAddHoursForm(false)}
					/>
				</Activity>
			</div>
			<div className="col-span-2 flex items-center justify-center lg:col-span-6">
				<button
					className="rounded-full p-2 hover:bg-gray-100"
					onClick={() => setShowAddHoursForm(!showAddHoursForm)}
					type="button"
				>
					<Plus className="h-6 w-6" />
				</button>
			</div>
		</li>
	)
}
