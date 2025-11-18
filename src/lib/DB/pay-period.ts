import { neon } from '@neondatabase/serverless'
import type { HoursWorked, HoursWorkedRow } from '../types/punch-clock-types'

// function getWeekBounds(date: Date): [Date, Date] {
// 	const d = new Date(date)
// 	d.setHours(0, 0, 0, 0)
// 	const day = d.getDay() // Sunday = 0, Monday = 1, etc.
// 	const diff = d.getDate() - day
// 	const startOfWeek = new Date(d.setDate(diff))

// 	const endOfWeek = new Date(startOfWeek)
// 	endOfWeek.setDate(startOfWeek.getDate() + 6)
// 	endOfWeek.setHours(23, 59, 59, 999)

// 	return [startOfWeek, endOfWeek]
// }
export async function getPayPeriodHoursWorkedDb(
	userId: string,
	orgId: string,
	startDate?: string,
	endDate?: string,
): Promise<HoursWorked[]> {
	if (!process.env.DATABASE_URL) {
		console.error('DATABASE_URL is not defined.')
		return []
	}
	const sql = neon(process.env.DATABASE_URL)

	const query = sql`
    SELECT
      time_in as date,
      SUM(EXTRACT(EPOCH FROM (time_out - time_in))) / 3600 as hours
    FROM time_clock
    WHERE user_id = ${userId} AND org_id = ${orgId} AND time_out IS NOT NULL
      ${startDate && startDate !== 'undefined' ? sql`AND time_in >= ${startDate}` : sql``}
      ${endDate && endDate !== 'undefined' ? sql`AND time_in <= ${endDate}` : sql``}
    GROUP BY time_in
    ORDER BY time_in;
  `

	try {
		const result = (await query) as HoursWorkedRow[]
		return result.map((row) => {
			const hours = parseFloat(row.hours)
			const lightness = Math.max(30, 60 - hours * 3)
			return {
				...row,
				hours,
				fill: `hsl(220, 80%, ${lightness}%)`,
			}
		})
	} catch (error) {
		console.error(error)
		return []
	}
}
