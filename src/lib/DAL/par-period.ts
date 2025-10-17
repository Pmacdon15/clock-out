import { auth } from '@clerk/nextjs/server'

export async function getPayPeriodHoursWorked(
	startDate?: string,
	endDate?: string,
) {
	const { userId, orgId } = await auth.protect()
}
