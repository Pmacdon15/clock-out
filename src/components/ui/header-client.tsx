'use client'
import { OrganizationSwitcher, SignedIn, UserButton } from '@clerk/clerk-react'

export default function HeaderClient() {
	return (
		<SignedIn>
			<div className="flex text-white justify-center">
				<UserButton />
				<OrganizationSwitcher />
			</div>
		</SignedIn>
	)
}
