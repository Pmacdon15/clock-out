'use client'
import { OrganizationSwitcher, Show, UserButton } from '@clerk/nextjs'

export default function HeaderClient() {
	return (
		<Show when="signed-in">
			<div className="flex justify-center text-white">
				<UserButton />
				<OrganizationSwitcher />
			</div>
		</Show>
	)
}
