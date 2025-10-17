import { auth } from '@clerk/nextjs/server'
import { getPayPeriodHoursWorkedDb } from '../DB/pay-period'
import type { HoursWorked } from '../types/punch-clock-types'

export async function getPayPeriodHoursWorked(
	startDate?: string,
	endDate?: string,
): Promise<HoursWorked[]> {
	const { userId, orgId } = await auth.protect()
	if (!userId || !orgId) return [] as HoursWorked[]
	try {
		const result = await getPayPeriodHoursWorkedDb(
			userId,
			orgId,
			startDate,
			endDate,
		)
		console.log('Server Pay Period Hours: ', result)
		return result
	} catch (e) {
		console.log('Error: ', e)
	}
	return [] as HoursWorked[]
}
