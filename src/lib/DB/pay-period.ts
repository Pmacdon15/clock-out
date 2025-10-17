import { neon } from '@neondatabase/serverless'
import type { HoursWorked, HoursWorkedRow } from '../types/punch-clock-types'

function getWeekBounds(date: Date): [Date, Date] {
	const d = new Date(date)
	d.setHours(0, 0, 0, 0)
	const day = d.getDay() // Sunday = 0, Monday = 1, etc.
	const diff = d.getDate() - day
	const startOfWeek = new Date(d.setDate(diff))

	const endOfWeek = new Date(startOfWeek)
	endOfWeek.setDate(startOfWeek.getDate() + 6)
	endOfWeek.setHours(23, 59, 59, 999)

	return [startOfWeek, endOfWeek]
}

export async function getPayPeriodHoursWorkedDb(
  userId: string,
  orgId: string,
  startDate?: string,
  endDate?: string,
): Promise<HoursWorked[]> {
  const sql = neon(process.env.DATABASE_URL || '')

  let finalStartDate: string | undefined = startDate
  let finalEndDate: string | undefined = endDate

  if (!startDate && !endDate) {
    const [startOfWeek, endOfWeek] = getWeekBounds(new Date())
    finalStartDate = startOfWeek.toISOString().split('T')[0]
    finalEndDate = endOfWeek.toISOString().split('T')[0]
  } else if (startDate && !endDate) {
    const [_, endOfWeek] = getWeekBounds(new Date(startDate))
    finalEndDate = endOfWeek.toISOString().split('T')[0]
  } else if (!startDate && endDate) {
    const [startOfWeek] = getWeekBounds(new Date(endDate))
    finalStartDate = startOfWeek.toISOString().split('T')[0]
  }

  const result = (await sql`
            SELECT
                MIN(time_in) as date,
                SUM(EXTRACT(EPOCH FROM (time_out - time_in))) / 3600 as hours
            FROM time_clock
            WHERE user_id = ${userId} AND org_id = ${orgId} AND time_out IS NOT NULL
              AND time_in >= ${finalStartDate} || ' 00:00:00'
              AND time_in <= ${finalEndDate} || ' 23:59:59'
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
