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
		<li className="py-4 grid grid-cols-2 lg:grid-cols-6 items-center w-full">
			<div className="col-span-2 lg:col-span-5 md:col-span-2">
				<Activity
					mode={showAddHoursForm && isLoaded ? 'visible' : 'hidden'}
				>
					<ManageTimeForm
						employeeId={user?.id}
						onSuccess={() => setShowAddHoursForm(false)}
					/>
				</Activity>
			</div>
			<div className="col-span-2 lg:col-span-6 flex justify-center items-center">
				<button
					className="p-2 rounded-full hover:bg-gray-100"
					onClick={() => setShowAddHoursForm(!showAddHoursForm)}
					type="button"
				>
					<Plus className="h-6 w-6" />
				</button>
			</div>
		</li>
	)
}
