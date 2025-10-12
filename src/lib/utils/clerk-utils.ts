import { auth } from '@clerk/nextjs/server'

export async function isAdminFunction(): Promise<{ isAdmin: boolean; userId: string; orgId?: string }> {
  const { sessionClaims, userId, orgId } = await auth.protect()
  return { isAdmin: sessionClaims.org_role === 'org:admin', userId, orgId }
}