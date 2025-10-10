import { neon } from '@neondatabase/serverless'
import {
	HoursWorked,
	MonthlyHours,
	TimeCard,
	Week,
} from '../types/punch-clock-types'

export async function punchInOrOutDB(
	punchOut: boolean,
	userId: string,
	orgId: string,
): Promise<TimeCard[]> {
	const sql = neon(process.env.DATABASE_URL!)
	const currentTime = new Date()

	if (punchOut) {
		// Punching out: Update the existing open time card.
		const result = await sql`
            UPDATE time_clock
            SET time_out = ${currentTime}
            WHERE user_id = ${userId} AND org_id = ${orgId} AND time_out IS NULL
            RETURNING *;
        `
		return result as TimeCard[]
	} else {
		// Punching in: Insert a new time card.
		const result = await sql`
            INSERT INTO time_clock (user_id, org_id, time_in)
            VALUES (${userId}, ${orgId}, ${currentTime})
            RETURNING *;
        `
		return result as TimeCard[]
	}
}

export async function getTimeCardDb(
	userId: string,
	orgId: string,
): Promise<TimeCard[]> {
	const sql = neon(process.env.DATABASE_URL!)
	const result = await sql`
        SELECT * FROM time_clock
        WHERE user_id = ${userId} AND org_id = ${orgId} AND time_out IS NULL
    `

	return result as TimeCard[]
}

export async function getTimeCardsDb(
	employeeId: string,
	orgId: string,
	week?: string,
): Promise<TimeCard[]> {
	const sql = neon(process.env.DATABASE_URL!)

	let weekToUse = week
	if (!weekToUse) {
		// Get the last week they worked
		const weeksResult = await sql`
      SELECT DISTINCT
        to_char(time_in, 'IYYY') as year,
        to_char(time_in, 'IW') as week
      FROM time_clock
      WHERE user_id = ${employeeId} AND org_id = ${orgId} AND time_out IS NOT NULL
      ORDER BY year DESC, week DESC
      LIMIT 1
    `
		if (weeksResult.length > 0) {
			const year = weeksResult[0].year
			const weekNum = String(weeksResult[0].week).padStart(2, '0')
			weekToUse = `${year}-W${weekNum}`
		}
	}

	if (weekToUse) {
		const [year, weekNumber] = weekToUse.split('-W').map(Number)
		const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7)
		startDate.setDate(startDate.getDate() - startDate.getDay() + 1) // Monday
		const endDate = new Date(startDate)
		endDate.setDate(endDate.getDate() + 6) // Sunday

		const result = await sql`
      SELECT * FROM time_clock
      WHERE user_id = ${employeeId} AND org_id = ${orgId}
        AND DATE(time_in) >= ${startDate.toISOString().split('T')[0]}
        AND DATE(time_in) <= ${endDate.toISOString().split('T')[0]}
      ORDER BY time_in DESC
    `

		return result as TimeCard[]
	} else {
		// If no week and no previous work, return empty
		return []
	}
}

export async function getHoursWorkedDb(
	userId: string,
	orgId: string,
	week?: string,
): Promise<HoursWorked[]> {
	const sql = neon(process.env.DATABASE_URL!)

	if (week && week !== '') {
		const [year, weekNumber] = week.split('-W').map(Number)
		const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7)
		startDate.setDate(startDate.getDate() - startDate.getDay() + 1) // Monday
		const endDate = new Date(startDate)
		endDate.setDate(endDate.getDate() + 6) // Sunday

		const result = await sql`
            SELECT
                DATE(time_in) as date,
                SUM(EXTRACT(EPOCH FROM (time_out - time_in))) / 3600 as hours
            FROM time_clock
            WHERE user_id = ${userId} AND org_id = ${orgId} AND time_out IS NOT NULL
              AND DATE(time_in) >= ${startDate.toISOString().split('T')[0]}
              AND DATE(time_in) <= ${endDate.toISOString().split('T')[0]}
            GROUP BY DATE(time_in)
            ORDER BY date;
        `

		return result.map((row: any) => {
			const hours = parseFloat(row.hours)
			const lightness = Math.max(30, 60 - hours * 3)
			return {
				...row,
				hours,
				fill: `hsl(220, 80%, ${lightness}%)`,
			}
		}) as HoursWorked[]
	} else {
		const result = await sql`
            SELECT
                DATE(time_in) as date,
                SUM(EXTRACT(EPOCH FROM (time_out - time_in))) / 3600 as hours
            FROM time_clock
            WHERE user_id = ${userId} AND org_id = ${orgId} AND time_out IS NOT NULL
            GROUP BY DATE(time_in)
            ORDER BY date;
        `

		return result.map((row: any) => {
			const hours = parseFloat(row.hours)
			const lightness = Math.max(30, 60 - hours * 3)
			return {
				...row,
				hours,
				fill: `hsl(220, 80%, ${lightness}%)`,
			}
		}) as HoursWorked[]
	}
}

export async function getAllWeeksWithWorkDb(
	userId: string,
	orgId: string,
): Promise<Week[]> {
	const sql = neon(process.env.DATABASE_URL!)
	const result = await sql`
        SELECT DISTINCT
            to_char(time_in, 'IYYY') as year,
            to_char(time_in, 'IW') as week,
            date_trunc('week', time_in) as week_start_date
        FROM time_clock
        WHERE user_id = ${userId} AND org_id = ${orgId} AND time_out IS NOT NULL
        ORDER BY year DESC, week DESC;
    `

	return result.map((row: any) => {
		const year = row.year
		const week = String(row.week).padStart(2, '0')
		const value = `${year}-W${week}`

		const date = new Date(row.week_start_date)
		const month = date.toLocaleString('default', { month: 'long' })
		const dayOfMonth = date.getDate()
		const weekOfMonth = Math.ceil(dayOfMonth / 7)
		const label = `${month} W${weekOfMonth}`

		return { label, value }
	})
}

interface Row {
	month: string
	month_number: number
	hours: string
}

export async function getHoursWorkedByYearDb(
	userId: string,
	orgId: string,
	year?: number,
): Promise<MonthlyHours[]> {
	const sql = neon(process.env.DATABASE_URL!)
	const currentYear = new Date().getFullYear()
	const targetYear = year ?? currentYear

	const result = await sql`
        SELECT
            to_char(time_in, 'Month') as month,
            EXTRACT(MONTH FROM time_in) as month_number,
            SUM(EXTRACT(EPOCH FROM (time_out - time_in))) / 3600 as hours
        FROM time_clock
        WHERE user_id = ${userId}
          AND org_id = ${orgId}
          AND time_out IS NOT NULL
          AND EXTRACT(YEAR FROM time_in) = ${targetYear}
        GROUP BY month, month_number
        ORDER BY month_number;
    `

	const monthlyHoursMap = new Map<string, number>()
	result.forEach((row) => {
		monthlyHoursMap.set(row.month.trim(), parseFloat(row.hours))
	})

	const allMonths = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	return allMonths.map((month) => ({
		month: month,
		hours: monthlyHoursMap.get(month) || 0,
	}))
}
