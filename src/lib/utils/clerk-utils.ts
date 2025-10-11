import { auth } from '@clerk/nextjs/server'

export async function isAdmin(): Promise<boolean> {
	const { sessionClaims } = await auth.protect()
	// console.log('SessionClaims :', sessionClaims.org_role)
	return sessionClaims.org_role === 'org:admin'
}
