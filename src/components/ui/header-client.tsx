'use client'
import { OrganizationSwitcher, SignedIn, UserButton } from '@clerk/clerk-react'

export default function HeaderClient() {
	return (
		<SignedIn>
			<div className="flex justify-center text-white">
				<UserButton />
				<OrganizationSwitcher />
			</div>
		</SignedIn>
	)
}
