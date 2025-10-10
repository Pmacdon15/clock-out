'use client'
import { use } from 'react'
import type { OrgMember } from '@/lib/types/org-members'
import { useHandleParamChange } from '@/lib/utils/filter-utils'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../select'

export default function OrgMembersFilter({
	orgMemberPromise,
}: {
	orgMemberPromise: Promise<OrgMember[]>
}) {
	const orgMembers = use(orgMemberPromise)
	const handleParamChange = useHandleParamChange()

	const handleEmployeeChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		handleParamChange('employee', event.target.value, '/admin/edit-hours')
	}
	return (
		<h2 className="flex gap-4 items-center">
			<span>For</span>
			<Select
				onValueChange={(value) =>
					handleParamChange('employee', value, '/admin/edit-hours')
				}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select a member" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Members</SelectLabel>
						{orgMembers.map((member: OrgMember) => (
							<SelectItem
								key={member.userId}
								value={member.userId}
							>
								{member.firstName + ' ' + member.lastName}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</h2>
	)
}
