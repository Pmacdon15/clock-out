import { neon } from '@neondatabase/serverless'
import type { z } from 'zod'
import type { TimeCard } from '../types/punch-clock-types'
import type { EditHoursSchema } from '../zod/edit-hours'

export async function updatePunchClock(
	punchClock: z.infer<typeof EditHoursSchema>,
): Promise<TimeCard[]> {
	const sql = neon(process.env.DATABASE_URL || '')

	const result = await sql`
        UPDATE time_clock
        SET time_in = ${punchClock.time_in}, time_out = ${punchClock.time_out}
        WHERE id = ${punchClock.id}
        RETURNING *;
    `
	return result as TimeCard[]
}
