import { neon } from '@neondatabase/serverless'
import type { HoursWorked, HoursWorkedRow } from '../types/punch-clock-types'

export async function getPayPeriodHoursWorkedDb(
	userId: string,
	orgId: string,
	startDate?: string,
	endDate?: string,
): Promise<HoursWorked[]> {
	const sql = neon(process.env.DATABASE_URL || '')

	if (startDate && endDate) {
		const result = (await sql`
            SELECT
                DATE(time_in) as date,
                SUM(EXTRACT(EPOCH FROM (time_out - time_in))) / 3600 as hours
            FROM time_clock
            WHERE user_id = ${userId} AND org_id = ${orgId} AND time_out IS NOT NULL
              AND DATE(time_in) >= ${startDate}
              AND DATE(time_in) <= ${endDate}
            GROUP BY DATE(time_in)
            ORDER BY date;
        `) as HoursWorkedRow[]

		return result.map((row) => {
			const hours = parseFloat(row.hours)
			const lightness = Math.max(30, 60 - hours * 3)
			return {
				...row,
				hours,
				fill: `hsl(220, 80%, ${lightness}%)`,
			}
		})
	} else {
		const result = (await sql`
            SELECT
                DATE(time_in) as date,
                SUM(EXTRACT(EPOCH FROM (time_out - time_in))) / 3600 as hours
            FROM time_clock
            WHERE user_id = ${userId} AND org_id = ${orgId} AND time_out IS NOT NULL
            GROUP BY DATE(time_in)
            ORDER BY date;
        `) as HoursWorkedRow[]

		return result.map((row) => {
			const hours = parseFloat(row.hours)
			const lightness = Math.max(30, 60 - hours * 3)
			return {
				...row,
				hours,
				fill: `hsl(220, 80%, ${lightness}%)`,
			}
		})
	}
}
