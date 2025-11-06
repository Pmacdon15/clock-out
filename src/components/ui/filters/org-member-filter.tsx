'use client'
import { useSearchParams } from 'next/navigation'
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
	const searchParams = useSearchParams()
	const employeeParam = searchParams.get('employee')

	const defaultValue =
		employeeParam || (orgMembers.length > 0 ? orgMembers[0].userId : '')

	return (
		<h2 className="flex items-center gap-4">
			<span>For</span>
			<Select
				onValueChange={(value) =>
					handleParamChange('employee', value, '/manage-hours')
				}
				value={defaultValue}
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
								{`${member.firstName} ${member.lastName}`}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</h2>
	)
}
